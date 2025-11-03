import speech_recognition as sr
import random
import time  


def mostrar_transcripcion(texto):
    """
    Muestra la transcripción de forma visual en pantalla
    """
    print("\n" + "="*70)
    print("🎤 PALABRAS ESCUCHADAS:")
    print("="*70)
    print(f"\n    {texto}\n")
    print("="*70)

def escuchar_y_transcribir():
    """
    Escucha el micrófono y transcribe lo que dice el usuario
    """
    # Crear el objeto reconocedor
    recognizer = sr.Recognizer()
    
    # Usar el micrófono como fuente de audio
    with sr.Microphone() as source:
        print("\n🎤 Ajustando al ruido ambiente...")
        recognizer.adjust_for_ambient_noise(source, duration=1)
        
        print("✅ Listo. ¡Habla ahora!")
        
        try:
            # Escuchar el audio (con los tiempos aumentados que ya tenías)
            audio = recognizer.listen(source, timeout=10, phrase_time_limit=30)
            print("🔄 Transcribiendo...")
            
            # Transcribir usando Google Speech Recognition
            texto = recognizer.recognize_google(audio, language='es-MX')
            
            return texto
            
        except sr.WaitTimeoutError:
            print("⏱️  No se detectó ningún sonido en el tiempo esperado.")
            return None
        except sr.UnknownValueError:
            print("❌ No se pudo entender el audio.")
            return None
        except sr.RequestError as e:
            print(f"❌ Error con el servicio de reconocimiento: {e}")
            return None

def procesar_comando(texto):
    """
    Analiza el texto transcrito y ejecuta una acción.
    """
    texto_lower = texto.lower()
    
    if "acomodar" in texto_lower:
        print("\n--- ACCIÓN EJECUTADA ---")
        print("✅ ACOMODAR")
        print("-----------------------")
    elif "numero" in texto_lower and "productos" in texto_lower or "número" in texto_lower and "productos" in texto_lower:
        numero_aleatorio = random.randint(1, 100)
        print("\n--- ACCIÓN EJECUTADA ---")
        print(f"✅ Número de productos: {numero_aleatorio}")
        print("-----------------------")
    elif "salir" in texto_lower:
        print("\n👋 Saliendo del programa...")
        return True
    else:
        print("\n--- COMANDO NO RECONOCIDO ---")
        print("💡 Comandos disponibles:")
        print("   • 'acomodar'")
        print("   • 'numero de productos'")
        print("   • 'salir'")
        print("-------------------------------")
    
    return False

# --- PROGRAMA PRINCIPAL (MODIFICADO) ---
if __name__ == "__main__":
    print("="*70)
    print("🚀 SISTEMA DE TRANSCRIPIÓN DE VOZ A TEXTO (ESCUCHA CONTINUA)")
    print("="*70)
    print("\n📋 Comandos disponibles:")
    print("   • 'acomodar' - Ejecuta acción de acomodar")
    print("   • 'numero de productos' - Muestra un número aleatorio")
    print("   • 'salir' - Cierra el programa")
    print("\n" + "="*70 + "\n")
    
    while True:
        texto_transcrito = escuchar_y_transcribir()
        
        if texto_transcrito:
            # Mostrar las palabras escuchadas
            mostrar_transcripcion(texto_transcrito)
            
            # Procesar el comando
            debe_salir = procesar_comando(texto_transcrito)
            
            if debe_salir:
                break
        
        # --- LÍNEAS MODIFICADAS ---
        # En lugar de esperar a que el usuario presione Enter, el programa espera 2 segundos
        # y luego vuelve a escuchar automáticamente.
        print("\n" + "-"*70)
        print("⏳ Escuchando de nuevo...")
        time.sleep(0.1) # Pequeña pausa antes de continuar
        print("-"*70)
    
    print("\n✅ Programa finalizado. ¡Hasta pronto!")