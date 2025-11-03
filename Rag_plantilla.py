# =============================================================================
# SISTEMA RAG BÁSICO - "El cerebito personal de tus documentos"
# =============================================================================

# Primero, importamos todas las herramientas que vamos a necesitar
# Son como los ingredientes de nuestra receta digital
import os
from langchain.document_loaders import TextLoader  # Para cargar archivos de texto
from langchain.text_splitter import CharacterTextSplitter  # Para cortar el texto en cachitos
from langchain.embeddings import OpenAIEmbeddings  # Para convertir texto a números (vectores)
from langchain.vectorstores import Chroma  # Nuestra base de datos donde guardamos los vectores
from langchain.chat_models import ChatOpenAI  # El modelo de lenguaje que va a responder
from langchain.chains import RetrievalQA  # La cadena que une todo: recuperación + generación

# =============================================================================
# PASO 1: CARGAR Y PROCESAR LOS DOCUMENTOS
# =============================================================================

def cargar_y_procesar_documentos(ruta_archivos):
    """
    Esta función se encarga de cargar los documentos y cortarlos en pedacitos
    más pequeños para que el modelo no se ahogue con tanto texto de golpe.
    """
    print("📂 Cargando documentos...")
    
    # Cargamos todos los archivos de texto de la carpeta que indiquemos
    # Es como abrir todos los libros que queremos que nuestra IA aprenda
    loaders = []
    for archivo in os.listdir(ruta_archivos):
        if archivo.endswith('.txt'):
            ruta_completa = os.path.join(ruta_archivos, archivo)
            loaders.append(TextLoader(ruta_completa))
    
    # Si no hay archivos, nos vamos a casa
    if not loaders:
        print("❌ No hay archivos .txt en la carpeta especificada")
        return None
    
    # Cargamos los documentos
    documentos = []
    for loader in loaders:
        documentos.extend(loader.load())
    
    print(f"✅ Se cargaron {len(documentos)} documentos")
    
    # Ahora cortamos los documentos en pedazos más pequeños
    # Es como si hiciéramos flashcards de un libro grande
    text_splitter = CharacterTextSplitter(chunk_size=1000, chunk_overlap=100)
    textos = text_splitter.split_documents(documentos)
    
    print(f"✂️ Se dividieron en {len(textos)} fragmentos")
    
    return textos

# =============================================================================
# PASO 2: CREAR Y GUARDAR LOS VECTORES
# =============================================================================

def crear_base_vectorial(textos, nombre_db="mi_base_vectorial"):
    """
    Aquí convertimos los textos en vectores (números) y los guardamos
    en una base de datos especial. Es como traducir nuestros documentos
    al idioma que entienden las máquinas.
    """
    print("🔄 Creando embeddings (traduciendo texto a números)...")
    
    # Necesitamos una API key de OpenAI para esto
    # Si no tienes, puedes usar otras alternativas como HuggingFace
    if "OPENAI_API_KEY" not in os.environ:
        print("❌ No se encontró la variable de entorno OPENAI_API_KEY")
        print("💡 Configúrala con: export OPENAI_API_KEY='tu-api-key'")
        return None
    
    # Creamos los embeddings (la magia que convierte texto en vectores)
    embeddings = OpenAIEmbeddings()
    
    # Creamos la base de datos vectorial con Chroma
    # Es como una biblioteca donde cada libro tiene una coordenada espacial
    persist_directory = f"./{nombre_db}"
    
    # Si ya existe la base de datos, la cargamos
    if os.path.exists(persist_directory):
        print("📚 Cargando base de datos existente...")
        db = Chroma(persist_directory=persist_directory, embedding_function=embeddings)
    else:
        # Si no, creamos una nueva
        print("🆕 Creando nueva base de datos...")
        db = Chroma.from_documents(textos, embeddings, persist_directory=persist_directory)
        print("💾 Base de datos guardada en disco")
    
    return db

# =============================================================================
# PASO 3: CREAR LA CADENA DE RAG
# =============================================================================

def crear_cadena_rag(db):
    """
    Aquí creamos la cadena que une todo: recuperación de información + generación de respuesta
    Es como conectar el cerebro (base de datos) con la boca (modelo de lenguaje)
    """
    print("🔗 Creando cadena RAG...")
    
    # Usamos el modelo de lenguaje de OpenAI
    # Puedes cambiarlo por otro si quieres
    llm = ChatOpenAI(model_name="gpt-3.5-turbo", temperature=0)
    
    # Creamos la cadena de RetrievalQA
    # Esto hace que el modelo busque en nuestra base de datos antes de responder
    qa_chain = RetrievalQA.from_chain_type(
        llm=llm,
        chain_type="stuff",  # "Stuff" significa que mete toda la info relevante en el contexto
        retriever=db.as_retriever()  # El recuperador que busca en nuestra base de datos
    )
    
    print("✅ Cadena RAG lista para usar")
    
    return qa_chain

# =============================================================================
# PASO 4: INTERFAZ DE CHAT
# =============================================================================

def chatear_con_rag(qa_chain):
    """
    Esta es la parte divertida: hablamos con nuestra IA personalizada
    """
    print("\n🤖 ¡Hola! Soy tu asistente RAG. Pregúntame lo que quieras sobre tus documentos.")
    print("💡 Escribe 'salir' cuando termines de charlar.\n")
    
    while True:
        # Pedimos al usuario que escriba su pregunta
        pregunta = input("👤 Tú: ")
        
        # Si el usuario quiere salir, nos despedimos
        if pregunta.lower() == "salir":
            print("👋 ¡Hasta luego! Fue un placer ayudarte.")
            break
        
        # Si no hay pregunta, seguimos esperando
        if not pregunta.strip():
            continue
        
        # Procesamos la pregunta con nuestra cadena RAG
        print("🤔 Pensando...")
        respuesta = qa_chain.run(pregunta)
        
        # Mostramos la respuesta
        print(f"🤖 Asistente: {respuesta}\n")

# =============================================================================
# FUNCIÓN PRINCIPAL - Donde todo se junta
# =============================================================================

def main():
    """
    Esta es la función principal que orquesta todo el proceso
    """
    print("=" * 50)
    print("🚀 SISTEMA RAG BÁSICO - Tu IA personalizada")
    print("=" * 50)
    
    # Paso 1: Cargar y procesar documentos
    # Cambia esta ruta a la carpeta donde tienes tus archivos .txt
    ruta_documentos = "./documentos"
    
    # Creamos la carpeta si no existe
    if not os.path.exists(ruta_documentos):
        os.makedirs(ruta_documentos)
        print(f"📁 Se creó la carpeta '{ruta_documentos}'. Coloca tus archivos .txt allí y vuelve a ejecutar.")
        return
    
    textos = cargar_y_procesar_documentos(ruta_documentos)
    
    if textos is None:
        return
    
    # Paso 2: Crear base de datos vectorial
    db = crear_base_vectorial(textos)
    
    if db is None:
        return
    
    # Paso 3: Crear cadena RAG
    qa_chain = crear_cadena_rag(db)
    
    if qa_chain is None:
        return
    
    # Paso 4: Iniciar el chat
    chatear_con_rag(qa_chain)

# =============================================================================
# EJECUTAMOS EL PROGRAMA
# =============================================================================

if __name__ == "__main__":
    main()