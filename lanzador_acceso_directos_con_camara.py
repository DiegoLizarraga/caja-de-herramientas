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
            'paper': r'C:\ruta\a\tu\aplicacion2.lnk',              # PAPEL
            'scissors': r'C:\ruta\a\tu\aplicacion3.lnk'            # TIJERAS
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
        """Detecta la contorno de la mano usando color de piel"""
        # Convertir a HSV para mejor detección de piel
        hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
        
        # Rango de color de piel
        lower_skin = np.array([0, 20, 70], dtype=np.uint8)
        upper_skin = np.array([20, 255, 255], dtype=np.uint8)
        
        # Crear máscara
        mask = cv2.inRange(hsv, lower_skin, upper_skin)
        
        # Aplicar operaciones morfológicas
        kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (5, 5))
        mask = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, kernel)
        mask = cv2.morphologyEx(mask, cv2.MORPH_OPEN, kernel)
        
        # Encontrar contornos
        contours, _ = cv2.findContours(mask, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE)
        
        if len(contours) > 0:
            hand_contour = max(contours, key=cv2.contourArea)
            if cv2.contourArea(hand_contour) > 5000:
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
        
        # Aproximar contorno
        epsilon = 0.02 * perimeter
        approx = cv2.approxPolyDP(hand_contour, epsilon, True)
        num_points = len(approx)
        
        # Contar defectos (dedos)
        finger_count = 0
        try:
            hull = cv2.convexHull(hand_contour)
            if hull is not None and len(hull) > 3:
                defects = cv2.convexityDefects(hand_contour, hull)
                if defects is not None:
                    finger_count = len(defects)
        except:
            finger_count = 0
        
        # Clasificar gestos basado en circularidad y dedos
        if circularity > 0.7:  # Forma circular = puño cerrado
            return 'rock'
        elif finger_count > 8:  # Muchos defectos = mano abierta
            return 'paper'
        elif 3 <= finger_count <= 6:  # Defectos medios = tijeras
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
        
        if not os.path.exists(path):
            print(f"⚠️  Error: La ruta no existe: {path}")
            return False
        
        try:
            subprocess.Popen(path)
            print(f"✅ Aplicación abierta: {gesture.upper()}")
            self.last_launch_time = current_time
            return True
        except Exception as e:
            print(f"❌ Error al abrir la aplicación: {e}")
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
        
        # Fondo para el texto
        cv2.rectangle(frame, (10, 10), (450, 120), (0, 0, 0), -1)
        cv2.rectangle(frame, (10, 10), (450, 120), (0, 255, 0), 2)
        
        cv2.putText(frame, gesture_display, (20, 60),
                   cv2.FONT_HERSHEY_SIMPLEX, 1.5, (0, 255, 0), 2)
        
        # Mostrar tiempo de espera
        if is_holding and gesture != 'none':
            elapsed = time.time() - self.gesture_start_time
            remaining = max(0, self.gesture_hold_time - elapsed)
            color = (0, int(255 * (1 - remaining / self.gesture_hold_time)), 
                    int(255 * (remaining / self.gesture_hold_time)))
            cv2.putText(frame, f"Abriendo en: {remaining:.1f}s", (20, 100),
                       cv2.FONT_HERSHEY_SIMPLEX, 0.9, color, 2)
        
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