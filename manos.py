import cv2
import numpy as np
import pyautogui
import time
from collections import deque
import math

class SimpleHandController:
    def __init__(self):
        """Controlador de gestos simple usando detección de color"""
        # Configuración de cámara
        self.cap = cv2.VideoCapture(0)
        self.cap.set(cv2.CAP_PROP_FRAME_WIDTH, 640)
        self.cap.set(cv2.CAP_PROP_FRAME_HEIGHT, 480)
        
        # Configuración de PyAutoGUI
        pyautogui.FAILSAFE = True
        pyautogui.PAUSE = 0.01
        self.screen_width, self.screen_height = pyautogui.size()
        
        # Variables de control
        self.mouse_smoothing = deque(maxlen=5)
        self.gesture_buffer = deque(maxlen=5)
        self.last_action_time = 0
        self.action_cooldown = 0.5  # Tiempo entre acciones
        
        # Estado del programa
        self.running = True
        self.calibrating = False
        self.skin_lower = np.array([0, 20, 70])
        self.skin_upper = np.array([20, 255, 255])
        
        # Solo control del mouse en toda la pantalla
        self.mouse_control_active = True
        
        self.show_zones = True
        
        print("🎮 Control de Mouse por Gestos")
        print("=" * 40)
        print("INSTRUCCIONES:")
        print("1. Usa un objeto de color (ej: papel rojo/azul)")
        print("2. O usa tu mano con buena iluminación")
        print("3. Mueve el objeto para controlar el cursor")
        print("4. Presiona 'c' para calibrar color")
        print("5. Presiona 'q' para salir")
        print("=" * 40)

    def calibrate_color(self, frame, x, y):
        """Calibra el color basado en un punto específico"""
        if 0 <= x < frame.shape[1] and 0 <= y < frame.shape[0]:
            # Obtener color en formato HSV
            hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
            color = hsv[y, x]
            
            # Crear rango de color más amplio
            self.skin_lower = np.array([
                max(0, color[0] - 15),
                max(0, color[1] - 60), 
                max(0, color[2] - 60)
            ])
            self.skin_upper = np.array([
                min(179, color[0] + 15),
                255,
                255
            ])
            
            print(f"✅ Color calibrado: HSV {color}")
            print(f"   Rango: {self.skin_lower} - {self.skin_upper}")
            return True
        return False

    def detect_hand_center(self, frame):
        """Detecta el centro del objeto/mano más grande"""
        # Convertir a HSV
        hsv = cv2.cvtColor(frame, cv2.COLOR_BGR2HSV)
        
        # Crear máscara de color
        mask = cv2.inRange(hsv, self.skin_lower, self.skin_upper)
        
        # Aplicar filtros para limpiar la máscara
        kernel = np.ones((5, 5), np.uint8)
        mask = cv2.morphologyEx(mask, cv2.MORPH_OPEN, kernel)
        mask = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, kernel)
        mask = cv2.medianBlur(mask, 15)
        
        # Encontrar contornos
        contours, _ = cv2.findContours(mask, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)
        
        if contours:
            # Encontrar el contorno más grande
            largest_contour = max(contours, key=cv2.contourArea)
            area = cv2.contourArea(largest_contour)
            
            # Solo procesar si el área es suficientemente grande
            if area > 1000:
                # Calcular centro
                M = cv2.moments(largest_contour)
                if M["m00"] != 0:
                    cx = int(M["m10"] / M["m00"])
                    cy = int(M["m01"] / M["m00"])
                    
                    # Dibujar contorno y centro
                    cv2.drawContours(frame, [largest_contour], -1, (0, 255, 0), 2)
                    cv2.circle(frame, (cx, cy), 10, (255, 0, 0), -1)
                    
                    return (cx, cy), area, mask
        
        return None, 0, mask

    def get_zone(self, x, y, frame_width, frame_height):
        """Determina en qué zona está el punto"""
        # Normalizar coordenadas
        norm_x = x / frame_width
        norm_y = y / frame_height
        
        for zone_name, (x1, y1, x2, y2) in self.zones.items():
            if x1 <= norm_x <= x2 and y1 <= norm_y <= y2:
                return zone_name
        
        return None

    def execute_action(self, center_pos):
        """Solo controla el movimiento del mouse"""
        if center_pos and self.mouse_control_active:
            self.control_mouse(center_pos)

    def control_mouse(self, center_pos):
        """Controla el cursor del mouse"""
        x, y = center_pos
        
        # Convertir coordenadas de cámara a pantalla
        screen_x = self.screen_width - int((x / 640) * self.screen_width)  # Invertir X
        screen_y = int((y / 480) * self.screen_height)
        
        # Suavizar movimiento
        self.mouse_smoothing.append((screen_x, screen_y))
        
        if len(self.mouse_smoothing) >= 3:
            avg_x = sum(pos[0] for pos in self.mouse_smoothing) // len(self.mouse_smoothing)
            avg_y = sum(pos[1] for pos in self.mouse_smoothing) // len(self.mouse_smoothing)
            pyautogui.moveTo(avg_x, avg_y)

    def draw_zones(self, frame):
        """Ya no dibujamos zonas, solo una indicación de área activa"""
        height, width = frame.shape[:2]
        
        # Dibujar marco indicando área de control
        cv2.rectangle(frame, (50, 50), (width-50, height-50), (0, 255, 0), 2)
        cv2.putText(frame, "AREA DE CONTROL DEL MOUSE", 
                   (60, 40), cv2.FONT_HERSHEY_SIMPLEX, 0.7, (0, 255, 0), 2)

    def draw_info(self, frame, area):
        """Dibuja información simplificada en el frame"""
        height, width = frame.shape[:2]
        
        # Fondo para información
        info_bg = frame.copy()
        cv2.rectangle(info_bg, (10, height-80), (width-10, height-10), (0, 0, 0), -1)
        cv2.addWeighted(info_bg, 0.7, frame, 0.3, 0, frame)
        
        # Información
        cv2.putText(frame, f"Control de Mouse Activo", 
                   (20, height-60), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 255, 0), 2)
        
        cv2.putText(frame, f"Area Detectada: {int(area)}", 
                   (20, height-40), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (255, 255, 0), 2)
        
        # Controles
        cv2.putText(frame, "C=Calibrar | Q=Salir | H=Ayuda", 
                   (20, height-20), cv2.FONT_HERSHEY_SIMPLEX, 0.5, (200, 200, 200), 1)

    def show_help(self):
        """Muestra ayuda simplificada"""
        print("\n🆘 AYUDA:")
        print("=" * 40)
        print("FUNCIÓN:")
        print("🖱️  Control del cursor del mouse")
        print("   - Mueve tu objeto/mano para mover el cursor")
        print("   - El movimiento es suave y natural")
        print("=" * 40)
        print("CALIBRACIÓN:")
        print("1. Mantén tu objeto/mano en el centro")
        print("2. Presiona 'C' para calibrar el color")
        print("3. ¡Ya puedes controlar el mouse!")
        print("=" * 40)
        print("CONTROLES:")
        print("C = Calibrar color del objeto")
        print("Q = Salir del programa")
        print("H = Mostrar esta ayuda")
        print("=" * 40)

    def run(self):
        """Bucle principal"""
        click_x, click_y = None, None
        
        try:
            while self.running:
                ret, frame = self.cap.read()
                if not ret:
                    break
                
                # Voltear frame para efecto espejo
                frame = cv2.flip(frame, 1)
                height, width = frame.shape[:2]
                
                # Detectar centro del objeto
                center, area, mask = self.detect_hand_center(frame)
                
                if center:
                    # Ejecutar control del mouse
                    self.execute_action(center)
                
                # Dibujar área de control
                self.draw_zones(frame)
                
                # Dibujar información
                self.draw_info(frame, area)
                
                # Si estamos calibrando, mostrar crosshair
                if self.calibrating:
                    cv2.line(frame, (width//2 - 20, height//2), (width//2 + 20, height//2), (0, 0, 255), 2)
                    cv2.line(frame, (width//2, height//2 - 20), (width//2, height//2 + 20), (0, 0, 255), 2)
                    cv2.putText(frame, "Coloca objeto en el centro y presiona C", 
                               (width//2 - 150, height//2 - 30), cv2.FONT_HERSHEY_SIMPLEX, 0.6, (0, 0, 255), 2)
                
                # Mostrar frames
                cv2.imshow('Control por Gestos', frame)
                cv2.imshow('Mascara de Deteccion', mask)
                
                # Manejar teclas
                key = cv2.waitKey(1) & 0xFF
                
                if key == ord('q'):
                    self.running = False
                    
                elif key == ord('c'):
                    if not self.calibrating:
                        self.calibrating = True
                        print("🎯 Modo calibración activado - coloca objeto en el centro y presiona C")
                    else:
                        # Calibrar con el centro de la pantalla
                        if self.calibrate_color(frame, width//2, height//2):
                            self.calibrating = False
                            print("✅ Calibración completada")
                        else:
                            print("❌ Error en calibración")
                            
                elif key == ord('h'):
                    self.show_help()
                
                # Calibración con click del mouse
                def mouse_callback(event, x, y, flags, param):
                    nonlocal click_x, click_y
                    if event == cv2.EVENT_LBUTTONDOWN:
                        click_x, click_y = x, y
                        if self.calibrate_color(frame, x, y):
                            self.calibrating = False
                            print("✅ Calibración completada por click")
                
                cv2.setMouseCallback('Control por Gestos', mouse_callback)
        
        except KeyboardInterrupt:
            print("\n🛑 Programa interrumpido")
        
        finally:
            self.cleanup()

    def cleanup(self):
        """Limpia recursos"""
        print("🧹 Cerrando programa...")
        self.cap.release()
        cv2.destroyAllWindows()
        print("✅ Programa cerrado")

if __name__ == "__main__":
    print("🚀 Iniciando Control Simple por Gestos")
    print("📋 Dependencias necesarias: opencv-python pyautogui numpy")
    
    try:
        controller = SimpleHandController()
        controller.run()
    except ImportError as e:
        print(f"❌ Falta dependencia: {e}")
        print("💡 Instala con: pip install opencv-python pyautogui numpy")
    except Exception as e:
        print(f"❌ Error: {e}")