import requests
import json
import re
import math
from datetime import datetime
import sys

# --- Constantes de Estilo y Color ---
class Style:
    RESET = '\033[0m'
    BOLD = '\033[1m'
    ITALIC = '\033[3m'
    
class Color:
    HEADER = '\033[95m'  # Magenta
    OKBLUE = '\033[94m'  # Azul
    OKCYAN = '\033[96m'  # Cyan
    OKGREEN = '\033[92m' # Verde
    WARNING = '\033[93m' # Amarillo
    FAIL = '\033[91m'   # Rojo
    ENDC = '\033[0m'    # Final de Color

# --- Clase del Chatbot (Renombrada para claridad en el código) ---
class El_Asistente_ChatBot:
    def __init__(self, api_key):
        self.api_key = api_key
        self.base_url = "https://api.groq.com/openai/v1/chat/completions" 
        self.conversation_history = []
        self.headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json"
        }
    
    def search_web(self, query):
        """Función de búsqueda web (indicativa)"""
        try:
            # Aquí puedes integrar con APIs como Google Custom Search, Bing, etc.
            return f"Búsqueda web para '{query}': Función de búsqueda disponible para integrar con APIs externas."
        except Exception as e:
            return f"Error en búsqueda web: {str(e)}"
    
    def solve_math(self, expression):
        """Resuelve expresiones matematicas básicas y seguras"""
        try:
            # Limpia la expresión matemática
            clean_expr = re.sub(r'[^0-9+\-*/().\s]', '', expression)
            
            # Evalúa expresiones matemáticas seguras (solo usando el módulo math)
            allowed_names = {
                k: v for k, v in math.__dict__.items() 
                if not k.startswith("__")
            }
            allowed_names.update({"abs": abs, "round": round})
            
            result = eval(clean_expr, {"__builtins__": {}}, allowed_names)
            return f"{Color.OKGREEN}{Style.BOLD}Resultado Matemático:{Style.RESET} {result}"
        except Exception as e:
            return f"{Color.FAIL}¡Error de Cálculo!{Style.RESET} No puedo resolver esa expresión: {str(e)}"
    
    def detect_intent(self, message):
        """Detecta la intención del mensaje"""
        message_lower = message.lower()
        
        # Detecta búsqueda web
        web_keywords = ['buscar', 'busca', 'search', 'google', 'web', 'internet', 'información sobre']
        if any(keyword in message_lower for keyword in web_keywords):
            return 'web_search'
        
        # Detecta matemáticas (mejorada: detecta si hay números y al menos un operador)
        math_keywords = ['calcular', 'resolver', 'matemática', 'suma', 'resta', 'multiplicar', 'dividir']
        if any(keyword in message_lower for keyword in math_keywords) or re.search(r'^\s*[\d\s()*/+.-]+\s*$', message):
            return 'math'
        
        return 'conversation'
    
    def call_groq_api(self, messages):
        """Llama a la API de Groq"""
        try:
            payload = {
                "model": "llama3-8b-8192",  #uso del groq gratis
                "messages": messages,
                "max_tokens": 1000,
                "temperature": 0.7,
                "stream": False
            }
            
            response = requests.post(
                self.base_url,
                headers=self.headers,
                json=payload,
                timeout=30
            )
            
            if response.status_code == 200:
                return response.json()['choices'][0]['message']['content']
            else:
                return f"{Color.FAIL}Error de API (Status {response.status_code}):{Style.RESET} {response.text}"
                
        except Exception as e:
            return f"{Color.FAIL}Error de conexión:{Style.RESET} No se pudo conectar a Groq: {str(e)}"
    
    def process_message(self, user_message):
        """Procesa el mensaje del usuario y devuelve la respuesta del asistente"""
        intent = self.detect_intent(user_message)
        
        # Añade mensaje del usuario al historial
        self.conversation_history.append({
            "role": "user",
            "content": user_message
        })
        
        messages_to_send = []
        
        if intent == 'web_search':
            # Extrae términos de busqueda
            search_terms = user_message.lower()
            for keyword in ['buscar', 'busca', 'search', 'información sobre']:
                search_terms = search_terms.replace(keyword, '').strip()
            
            web_result = self.search_web(search_terms)
            
            # Mensaje mejorado para Groq
            enhanced_message = f"El usuario pregunta: {user_message}\n<<Información de Herramienta>>: {web_result}\nPor favor, responde de forma útil al usuario usando esta información."
            
            # Usar historial, pero el último mensaje es el mejorado
            messages_to_send = self.conversation_history[:-1] + [{
                "role": "user",
                "content": enhanced_message
            }]
            
        elif intent == 'math':
            # Intenta resolver matemáticas
            math_result = self.solve_math(user_message)
            
            # Mensaje mejorado para Groq para explicación
            enhanced_message = f"El usuario solicita: {user_message}\n<<Resultado de Herramienta>>: {math_result}\nExplica o amplía esta respuesta matemática para el usuario."
            
            # Usar historial, pero el último mensaje es el mejorado
            messages_to_send = self.conversation_history[:-1] + [{
                "role": "user", 
                "content": enhanced_message
            }]
            
        else:
            # Conversación normal
            messages_to_send = self.conversation_history
        
        # Obtiene respuesta de Groq
        response = self.call_groq_api(messages_to_send)
        
        # Añade respuesta al historial
        self.conversation_history.append({
            "role": "assistant",
            "content": response
        })
        
        return response
    
    def chat_loop(self):
        """Bucle principal del chat"""
        print(f"\n{Color.OKCYAN}{Style.BOLD}--- {Style.ITALIC}Bienvenido al Chatbot El asistente{Style.RESET}{Color.OKCYAN}{Style.BOLD} ---{Style.RESET}")
        print(f"{Color.OKBLUE}Hola, soy El asistente. Estoy aquí para ayudarte.{Style.RESET}")
        print(f"Escribe {Color.WARNING}'salir'{Style.RESET} para terminar la conversación.\n")
        
        while True:
            try:
                user_input = input(f"{Color.OKGREEN}{Style.BOLD}Tú: {Style.RESET}").strip()
                
                if user_input.lower() in ['salir', 'exit', 'quit']:
                    print(f"\n{Color.WARNING}El asistente:{Style.RESET} ¡Adiós! Que tengas un excelente día.")
                    break
                
                if not user_input:
                    continue
                
                print(f"{Color.OKBLUE}El asistente:{Style.RESET} {Style.ITALIC}Ta pensando...{Style.RESET}")
                response = self.process_message(user_input)
                print(f"{Color.OKBLUE}{Style.BOLD}El asistente:{Style.RESET} {response}\n")
                
            except KeyboardInterrupt:
                print(f"\n{Color.WARNING}El asistente:{Style.RESET} Conversación interrumpida. ¡Hasta pronto!")
                break
            except Exception as e:
                print(f"{Color.FAIL}Error inesperado: {str(e)}{Style.RESET}\n")

def main():
    # Configuración
    print(f"\n{Color.HEADER}================================================={Style.RESET}")
    print(f"{Color.HEADER}{Style.BOLD}        Chatbot impulsado por Groq (El asistente)    {Style.RESET}")
    print(f"{Color.HEADER}================================================={Style.RESET}")
    print(f"Consigue tu API key para conversar aquí: {Color.OKCYAN}https://console.groq.com/keys{Style.RESET}\n")
    
    api_key = input(f"{Color.WARNING}Ingresa API key de Groq: {Style.RESET}").strip()
    
    if not api_key:
        print(f"\n{Color.FAIL}¡ADVERTENCIA!{Style.RESET} Necesitas una API key para usar El asistente.")
        return
    
    # Inicializa y ejecuta el chatbot
    try:
        bot = El_Asistente_ChatBot(api_key)
        bot.chat_loop()
    except Exception as e:
        print(f"{Color.FAIL}Error al inicializar el bot: {str(e)}{Style.RESET}")

if __name__ == "__main__":
    main()