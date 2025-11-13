import cv2
import subprocess
import time
import os
import numpy as np

class GestureAppLauncher:
    def __init__(self):
        # ============================================
        # CONFIGURA TUS LINKS AQUÍ
        # ============================================
        self.gesture_paths = {
            'rock': r'C:\Users\DiegoB)\Desktop\linux core.lnk',      # PIEDRA
            'paper': r'C:\Users\DiegoB)\Desktop\insters.xlsx', # PAPEL
            'scissors': r'"C:\Users\DiegoB)\Desktop\Arduino IDE.lnk"'            # TIJERAS
        }
        # ============================================
        
        self.cap = cv2.VideoCapture(0)
        self.cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
        self.cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)
        
        self.current_gesture = 'none'
        self.gesture_start_time = 0
        self.gesture_hold_time = 2  # 2 segundos para activar
        self.launch_cooldown = 3  # 3 segundos entre lanzamientos
        self.last_launch_time = 0
        
    def detect_hand_contour(self, frame):
        """Detecta la contorno de la mano usando color de piel y filtros mejorados"""
        # Convertir a HSV y YCrCb para mejor detección de piel
        hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
        ycrcb = cv2.cvtColor(frame, cv2.COLOR_BGR2YCR_CB)
        
        # Rangos de color de piel en HSV
        lower_skin_hsv = np.array([0, 30, 60], dtype=np.uint8)
        upper_skin_hsv = np.array([20, 150, 255], dtype=np.uint8)
        
        # Rangos de color de piel en YCrCb
        lower_skin_ycrcb = np.array([0, 135, 85], dtype=np.uint8)
        upper_skin_ycrcb = np.array([255, 180, 135], dtype=np.uint8)
        
        # Crear máscaras
        mask_hsv = cv2.inRange(hsv, lower_skin_hsv, upper_skin_hsv)
        mask_ycrcb = cv2.inRange(ycrcb, lower_skin_ycrcb, upper_skin_ycrcb)
        
        # Combinar máscaras
        mask = cv2.bitwise_and(mask_hsv, mask_ycrcb)
        
        # Aplicar operaciones morfológicas más agresivas
        kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))
        mask = cv2.erode(mask, kernel, iterations=1)
        mask = cv2.dilate(mask, kernel, iterations=2)
        mask = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, kernel, iterations=2)
        
        # Encontrar contornos
        contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        
        # Filtrar contornos por área y forma
        valid_contours = []
        for contour in contours:
            area = cv2.contourArea(contour)
            if area < 7000:  # Ignora contornos muy pequeños
                continue
                
            # Calcular la proporción de aspecto del contorno
            x, y, w, h = cv2.boundingRect(contour)
            aspect_ratio = float(w) / h
            
            # Las manos típicamente tienen una proporción de aspecto entre 0.5 y 1.5
            if 0.5 <= aspect_ratio <= 1.5:
                valid_contours.append(contour)
        
        if valid_contours:
            # Seleccionar el contorno más grande que cumple los criterios
            hand_contour = max(valid_contours, key=cv2.contourArea)
            return hand_contour, mask
        
        return None, mask
    
    def detect_gesture(self, frame):
        """Detecta el gesto basado en el contorno de la mano"""
        hand_contour, mask = self.detect_hand_contour(frame)
        
        if hand_contour is None:
            return 'none'
        
        # Calcular área y perímetro
        area = cv2.contourArea(hand_contour)
        perimeter = cv2.arcLength(hand_contour, True)
        
        # Calcular circularidad (compacidad)
        if perimeter == 0:
            return 'none'
        circularity = 4 * np.pi * area / (perimeter ** 2)
        
        # Calcular hull y defectos
        hull = cv2.convexHull(hand_contour, returnPoints=False)
        defects = cv2.convexityDefects(hand_contour, hull)
        
        # Contar dedos usando defectos de convexidad
        finger_count = 0
        if defects is not None:
            for i in range(defects.shape[0]):
                s, e, f, d = defects[i, 0]
                start = tuple(hand_contour[s][0])
                end = tuple(hand_contour[e][0])
                far = tuple(hand_contour[f][0])
                
                # Calcular el ángulo entre los puntos
                a = np.sqrt((end[0] - start[0])**2 + (end[1] - start[1])**2)
                b = np.sqrt((far[0] - start[0])**2 + (far[1] - start[1])**2)
                c = np.sqrt((end[0] - far[0])**2 + (end[1] - far[1])**2)
                angle = np.arccos((b**2 + c**2 - a**2)/(2*b*c))
                
                # Si el ángulo es menor que 90 grados, cuenta como un dedo
                if angle <= np.pi/2:
                    finger_count += 1
        
        # Dibujar contorno y hull para debug visual
        cv2.drawContours(frame, [hand_contour], -1, (0, 255, 0), 2)
        hull_points = cv2.convexHull(hand_contour)
        cv2.drawContours(frame, [hull_points], -1, (0, 0, 255), 2)
        
        # Clasificar gestos basado en circularidad y dedos
        if circularity > 0.85:  # Forma más circular = puño cerrado (piedra)
            return 'rock'
        elif finger_count >= 4:  # 4 o más dedos = mano abierta (papel)
            return 'paper'
        elif 1 <= finger_count <= 3:  # 1-3 dedos = tijeras
            return 'scissors'
        
        return 'none'
    
    def launch_application(self, gesture):
        """Abre la aplicación asociada al gesto"""
        if gesture not in self.gesture_paths or gesture == 'none':
            return False
        
        current_time = time.time()
        if current_time - self.last_launch_time < self.launch_cooldown:
            return False
        
        path = self.gesture_paths[gesture]
        
        # Eliminar comillas extras si existen
        path = path.strip('"')
        
        if not os.path.exists(path):
            print(f"⚠️  Error: La ruta no existe: {path}")
            return False
        
        try:
            # Usar os.startfile para archivos .lnk en Windows
            if path.lower().endswith('.lnk'):
                os.startfile(path)
            else:
                # Para otros tipos de archivos, usar subprocess con shell=True
                subprocess.Popen([path], shell=True)
            
            print(f"✅ Aplicación abierta: {gesture.upper()} -> {path}")
            self.last_launch_time = current_time
            return True
        except Exception as e:
            print(f"❌ Error al abrir la aplicación: {e}")
            print(f"   Ruta: {path}")
            print(f"   Tipo de archivo: {os.path.splitext(path)[1]}")
            return False
    
    def draw_hand_contour(self, frame):
        """Dibuja el contorno de la mano en rojo"""
        hand_contour, mask = self.detect_hand_contour(frame)
        
        if hand_contour is not None:
            # Dibujar el contorno en rojo grueso
            cv2.drawContours(frame, [hand_contour], 0, (0, 0, 255), 3)
            
            # Dibujar círculos rojos en los puntos del contorno
            for point in hand_contour:
                x, y = point[0]
                cv2.circle(frame, (x, y), 2, (0, 0, 255), -1)
        
        return frame
    
    def draw_info(self, frame, gesture, is_holding):
        """Dibuja información en el video"""
        height, width, _ = frame.shape
        
        gesture_icons = {
            'rock': '✊ PIEDRA',
            'paper': '✋ PAPEL',
            'scissors': '✌️ TIJERAS',
            'none': '🤚 Detectando...'
        }
        
        gesture_display = gesture_icons.get(gesture, gesture.upper())
        
        # Etiqueta de gesto en la esquina superior derecha
        label_size = cv2.getTextSize(gesture_display, cv2.FONT_HERSHEY_SIMPLEX, 1.0, 2)[0]
        label_x = width - label_size[0] - 20
        
        # Fondo para la etiqueta
        cv2.rectangle(frame, 
                     (label_x - 10, 10), 
                     (width - 10, 50), 
                     (0, 0, 0), -1)
        cv2.rectangle(frame, 
                     (label_x - 10, 10), 
                     (width - 10, 50), 
                     (0, 255, 0), 2)
        
        # Texto de la etiqueta
        cv2.putText(frame, gesture_display, 
                   (label_x, 40),
                   cv2.FONT_HERSHEY_SIMPLEX, 1.0, 
                   (0, 255, 0), 2)
        
        # Panel de información principal
        cv2.rectangle(frame, (10, 10), (300, 120), (0, 0, 0), -1)
        cv2.rectangle(frame, (10, 10), (300, 120), (0, 255, 0), 2)
        
        # Mostrar tiempo de espera
        if is_holding and gesture != 'none':
            elapsed = time.time() - self.gesture_start_time
            remaining = max(0, self.gesture_hold_time - elapsed)
            progress = 1 - remaining / self.gesture_hold_time
            color = (0, int(255 * progress), int(255 * (1 - progress)))
            
            cv2.putText(frame, f"Gesto detectado!", (20, 40),
                       cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 255, 0), 2)
            cv2.putText(frame, f"Abriendo en: {remaining:.1f}s", (20, 80),
                       cv2.FONT_HERSHEY_SIMPLEX, 0.9, color, 2)
        else:
            cv2.putText(frame, "Esperando gesto...", (20, 60),
                       cv2.FONT_HERSHEY_SIMPLEX, 0.9, (0, 255, 0), 2)
        
        # Instrucciones
        cv2.putText(frame, "ESC para salir", (10, height - 20),
                   cv2.FONT_HERSHEY_SIMPLEX, 0.6, (200, 200, 200), 1)
        
        return frame
    
    def run(self):
        """Ejecuta el programa principal"""
        print("=" * 60)
        print("🎮 DETECTOR DE GESTOS - ABRE APLICACIONES")
        print("=" * 60)
        print("\n📌 Rutas configuradas:")
        print(f"✊ PIEDRA  → {self.gesture_paths['rock']}")
        print(f"✋ PAPEL   → {self.gesture_paths['paper']}")
        print(f"✌️ TIJERAS → {self.gesture_paths['scissors']}")
        print("\n💡 INSTRUCCIONES:")
        print("  • Muestra tu mano a la cámara")
        print("  • Forma el gesto (piedra, papel o tijeras)")
        print("  • Mantén el gesto durante 2 segundos")
        print("  • La aplicación se abrirá automáticamente")
        print("\n⚠️  Presiona ESC para salir\n")
        
        frame_count = 0
        
        while True:
            ret, frame = self.cap.read()
            if not ret:
                break
            
            # Espejo horizontal
            frame = cv2.flip(frame, 1)
            
            # Detectar gesto cada 2 frames para mejor rendimiento
            if frame_count % 2 == 0:
                new_gesture = self.detect_gesture(frame)
                
                if new_gesture != 'none':
                    if new_gesture != self.current_gesture:
                        self.current_gesture = new_gesture
                        self.gesture_start_time = time.time()
                    
                    # Verificar si se ha mantenido el gesto suficiente tiempo
                    elapsed = time.time() - self.gesture_start_time
                    if elapsed >= self.gesture_hold_time:
                        self.launch_application(new_gesture)
                        self.current_gesture = 'none'
                else:
                    self.current_gesture = 'none'
            
            frame_count += 1
            
            # Dibujar contorno de la mano en rojo
            frame = self.draw_hand_contour(frame)
            
            # Dibujar información
            is_holding = time.time() - self.gesture_start_time < self.gesture_hold_time
            frame = self.draw_info(frame, self.current_gesture, is_holding)
            
            cv2.imshow('Detector de Gestos', frame)
            
            # Salir con ESC
            if cv2.waitKey(1) & 0xFF == 27:
                print("\n👋 ¡Hasta luego!")
                break
        
        self.cap.release()
        cv2.destroyAllWindows()

if __name__ == '__main__':
    launcher = GestureAppLauncher()
    launcher.run()