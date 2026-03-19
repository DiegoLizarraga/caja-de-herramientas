const GAME_TRANSLATIONS = {
  "sol": { en: "sun", pt: "sol" },
  "luna": { en: "moon", pt: "lua" },
  "estrella": { en: "star", pt: "estrela" },
  "nube": { en: "cloud", pt: "nuvem" },
  "lluvia": { en: "rain", pt: "chuva" },
  "dinosaurio": { en: "dinosaur", pt: "dinossauro" },
  "mariposa": { en: "butterfly", pt: "borboleta" },
  "computadora": { en: "computer", pt: "computador" },
  "árbol": { en: "tree", pt: "árvore" },
  "pescado": { en: "fish", pt: "peixe" },
  "martillo": { en: "hammer", pt: "martelo" },
  "pelota": { en: "ball", pt: "bola" },
  "agua": { en: "water", pt: "água" },
  "zumo": { en: "juice", pt: "suco" },
  "leche": { en: "milk", pt: "leite" },
  "bella": { en: "beautiful", pt: "bela" },
  "metalica": { en: "metallic", pt: "metálica" },
  "fuego": { en: "fire", pt: "fogo" },
  "el cielo": { en: "the sky", pt: "o céu" },
  "el mar": { en: "the sea", pt: "o mar" },
  "la cueva": { en: "the cave", pt: "a caverna" },
  "el parque": { en: "the park", pt: "o parque" },
  "la escuela": { en: "the school", pt: "a escola" },
  "la casa": { en: "the house", pt: "a casa" },
  "guau": { en: "woof", pt: "au au" },
  "miau": { en: "meow", pt: "miau" },
  "pío": { en: "tweet", pt: "piu" },
  "muuu": { en: "moo", pt: "muuu" },
  "beee": { en: "baa", pt: "méee" },
  "quiquiriqui": { en: "cock-a-doodle-doo", pt: "cocoricó" },
  "cua": { en: "quack", pt: "quá" },
  "oinc": { en: "oink", pt: "oinc" },
  "Mira": { en: "Look", pt: "Olha" },
  "Escucha": { en: "Listen", pt: "Escuta" },
  "Salta": { en: "Jump", pt: "Pula" },
  "Sonríe": { en: "Smile", pt: "Sorri" },
  "Canta": { en: "Sing", pt: "Canta" },
  "Feliz": { en: "Happy", pt: "Feliz" },
  "Triste": { en: "Sad", pt: "Triste" },
  "Enojado": { en: "Angry", pt: "Zangado" },
  "Asustado": { en: "Scared", pt: "Assustado" },
  "Sorprendido": { en: "Surprised", pt: "Surpreso" },
  "Levanta los brazos": { en: "Raise your arms", pt: "Levante os braços" },
  "levanta los brazos hacia arriba": { en: "raise your arms up", pt: "levante os braços para cima" },
  "Baja los brazos": { en: "Lower your arms", pt: "Abaixe os braços" },
  "baja los brazos hacia abajo": { en: "lower your arms down", pt: "abaixe os braços para baixo" },
  "salta hacia arriba": { en: "jump up", pt: "pule para cima" },
  "Gira a la derecha": { en: "Turn right", pt: "Vire à direita" },
  "gira el cuerpo a la derecha": { en: "turn your body right", pt: "vire seu corpo para a direita" },
  "Agáchate": { en: "Squat down", pt: "Abaixe-se" },
  "agáchate hacia abajo": { en: "squat down low", pt: "abaixe-se bem" },
  "Saluda": { en: "Wave", pt: "Acene" },
  "saluda con la mano": { en: "wave your hand", pt: "acene com a mão" },
  "gato": { en: "cat", pt: "gato" },
  "perro": { en: "dog", pt: "cachorro" },
  "elefante": { en: "elephant", pt: "elefante" },
  "bicicleta": { en: "bicycle", pt: "bicicleta" },
  "casa": { en: "house", pt: "casa" },
  "mesa": { en: "table", pt: "mesa" },
  "mano": { en: "hand", pt: "mão" },
  "libro": { en: "book", pt: "livro" },
  "Celebra": { en: "Celebrate", pt: "Celebre" },
  "celebra con alegría": { en: "celebrate with joy", pt: "celebre com alegria" },
  "El gato son bonito.": { en: "The cat are pretty.", pt: "O gato são bonito." },
  "Los niño corren rápido.": { en: "The boy run fast.", pt: "Os menino correm rápido." },
  "La gata es blanca y grande.": { en: "The cat is white and big.", pt: "A gata é branca e grande." },
  "Los carros es muy rápidos.": { en: "The cars is very fast.", pt: "Os carros é muito rápidos." },
  "Ella tiene unos libros rojo.": { en: "She has some red books.", pt: "Ela tem uns livros vermelho." },
  "El profesor dijo a los estudiantes que trabajien duro.": { en: "The teacher told the students to worked hard.", pt: "O professor disse aos estudantes que trabalhem duro." },
  "Si yo taria rico, viajaría al mundo.": { en: "If I would be rich, I would travel the world.", pt: "Se eu taria rico, viajaria pelo mundo." },
  "A pesar de sus errores, el estudiante anduvo con sus estudios.": { en: "Despite his mistakes, the student walked with his studies.", pt: "Apesar de seus erros, o estudante andou com seus estudos." },
  "Aunque allia sido difícil, nosotros lograremos éxito.": { en: "Although it there been difficult, we will achieve success.", pt: "Embora avia sido difícil, nós alcançaremos o sucesso." },
  "El gato duerme.": { en: "The cat sleeps.", pt: "O gato dorme." },
  "El niño juega en el parque.": { en: "The boy plays in the park.", pt: "O menino brinca no parque." },
  "El pajarito canta.": { en: "The little bird sings.", pt: "O passarinho canta." },
  "La mariposa vuela entre las flores.": { en: "The butterfly flies among the flowers.", pt: "A borboleta voa entre as flores." },
  "El elefante camina lentamente por la sabana.": { en: "The elephant walks slowly through the savanna.", pt: "O elefante caminha lentamente pela savana." },
  "El cocodrilo nada en el río.": { en: "The crocodile swims in the river.", pt: "O crocodilo nada no rio." },
  "La majestuosa orquesta sinfónica interpretaba una sonata extraordinaria.": { en: "The majestic symphony orchestra was playing an extraordinary sonata.", pt: "A majestosa orquestra sinfônica interpretava uma sonata extraordinária." },
  "El hippopótamo se sumerge profundamente en el pantano cenagoso.": { en: "The hippopotamus dives deep into the muddy swamp.", pt: "O hipopótamo mergulha profundamente no pântano lamacento." },
  "El diligente investigador examinaba meticulosamente los artefactos arqueológicos.": { en: "The diligent researcher meticulously examined the archaeological artifacts.", pt: "O pesquisador diligente examinava meticulosamente os artefatos arqueológicos." },
  "El": { en: "The", pt: "O" },
  "corre": { en: "runs", pt: "corre" },
  "La": { en: "The", pt: "A" },
  "niña": { en: "girl", pt: "menina" },
  "salta": { en: "jumps", pt: "pula" },
  "duerme": { en: "sleeps", pt: "dorme" },
  "pájaro": { en: "bird", pt: "pássaro" },
  "vuela": { en: "flies", pt: "voa" },
  "brilla": { en: "shines", pt: "brilha" },
  "flor": { en: "flower", pt: "flor" },
  "teléfono": { en: "phone", pt: "telefone" },
  "montaña": { en: "mountain", pt: "montanha" },
  "extraordinario": { en: "extraordinary", pt: "extraordinário" },
  "hipopótamo": { en: "hippopotamus", pt: "hipopótamo" },
  "investigador": { en: "researcher", pt: "pesquisador" },
  "arquitectura": { en: "architecture", pt: "arquitetura" },
  "biblioteca": { en: "library", pt: "biblioteca" },
  "El hipopótamo se sumerge profundamente en el pantano cenagoso.": { en: "The hippopotamus dives deep into the muddy swamp.", pt: "O hipopótamo mergulha profundamente no pântano lamacento." },
  "El pájaro está en el": { en: "The bird is in the", pt: "O pássaro está no" },
  "cielo": { en: "sky", pt: "céu" },
  "El perro come su": { en: "The dog eats its", pt: "O cachorro come sua" },
  "comida": { en: "food", pt: "comida" },
  "La niña lee un": { en: "The girl reads a", pt: "A menina lê um" },
  "El sol es": { en: "The sun is", pt: "O sol é" },
  "amarillo": { en: "yellow", pt: "amarelo" },
  "La luna sale de": { en: "The moon comes out at", pt: "A lua sai de" },
  "noche": { en: "night", pt: "noite" },
  "El pez nada en el": { en: "The fish swims in the", pt: "O peixe nada no" },
  "río": { en: "river", pt: "rio" },
  "La abeja hace": { en: "The bee makes", pt: "A abelha faz" },
  "miel": { en: "honey", pt: "mel" },
  "El tren va muy": { en: "The train goes very", pt: "O trem vai muito" },
  "rápido": { en: "fast", pt: "rápido" },
  "La flor necesita": { en: "The flower needs", pt: "A flor precisa de" },
  "El oso come mucha": { en: "The bear eats a lot of", pt: "O urso come muita" },
  "El coche tiene cuatro": { en: "The car has four", pt: "O carro tem quatro" },
  "ruedas": { en: "wheels", pt: "rodas" },
  "El gato bebe": { en: "The cat drinks", pt: "O gato bebe" },
  "La mariposa tiene colores en sus": { en: "The butterfly has colors on its", pt: "A borboleta tem cores em suas" },
  "alas": { en: "wings", pt: "asas" },
  "El reloj marca la": { en: "The clock shows the", pt: "O relógio marca a" },
  "hora": { en: "time", pt: "hora" },
  "El barco navega en el": { en: "The ship sails on the", pt: "O barco navega no" },
  "mar": { en: "sea", pt: "mar" },
  "El viento mueve las hojas del": { en: "The wind moves the leaves of the", pt: "O vento move as folhas da" },
  "Bombero": { en: "Firefighter", pt: "Bombeiro" },
  "Doctora": { en: "Doctor", pt: "Doutora" },
  "Policía": { en: "Police", pt: "Polícia" },
  "Chef": { en: "Chef", pt: "Cozinheiro" },
  "Astronauta": { en: "Astronaut", pt: "Astronauta" },
  "Maestra": { en: "Teacher", pt: "Professora" },
  "Constructora": { en: "Builder", pt: "Construtora" },
  "Veterinario": { en: "Veterinarian", pt: "Veterinário" },
  "Mecánica": { en: "Mechanic", pt: "Mecânica" },
  "Encuentra al": { en: "Find the", pt: "Encontre o/a" },
  "Tigre": { en: "Tiger", pt: "Tigre" },
  "León": { en: "Lion", pt: "Leão" },
  "Mono": { en: "Monkey", pt: "Macaco" },
  "Pez": { en: "Fish", pt: "Peixe" },
  "Rana": { en: "Frog", pt: "Sapo" },
  "Pájaro": { en: "Bird", pt: "Pássaro" },
  "Serpiente": { en: "Snake", pt: "Cobra" },
  "Pingüino": { en: "Penguin", pt: "Pinguim" },
  "Elefante": { en: "Elephant", pt: "Elefante" },
  "Jirafa": { en: "Giraffe", pt: "Girafa" },
  "Oso": { en: "Bear", pt: "Urso" },
  "Cebra": { en: "Zebra", pt: "Zebra" },
  "Ardilla": { en: "Squirrel", pt: "Esquilo" },
  "Conejo": { en: "Rabbit", pt: "Coelho" },
  "Tortuga": { en: "Turtle", pt: "Tartaruga" },
  "Caballo": { en: "Horse", pt: "Cavalo" },
  "Vaca": { en: "Cow", pt: "Vaca" },
  "Oveja": { en: "Sheep", pt: "Ovelha" },
  "Cerdo": { en: "Pig", pt: "Porco" },
  "Gallo": { en: "Rooster", pt: "Galo" }
};

function tg(spanishString) {
  if (!spanishString) return spanishString;
  const lang = localStorage.getItem('blueminds_lang') || 'es';
  if (lang === 'es') return spanishString;

  if (GAME_TRANSLATIONS[spanishString] && GAME_TRANSLATIONS[spanishString][lang]) {
    return GAME_TRANSLATIONS[spanishString][lang];
  }

  return spanishString;
}

window.tg = tg;
Object.assign(GAME_TRANSLATIONS, {
    "Tip: Escucha atentamente la palabra y trata de repetirla lo más parecido posible.": {
        en: "Tip: Listen carefully to the word and try to repeat it as closely as possible.",
        pt: "Dica: Ouça atentamente a palavra e tente repeti-la o mais próximo possível."
    },
    "Tip: Ordena las palabras en el mismo orden que las escuchaste.": {
        en: "Tip: Order the words in the same sequence you heard them.",
        pt: "Dica: Ordene as palavras na mesma sequência em que as ouviu."
    },
    "Tip: Haz clic en la imagen en el momento exacto en que escuchas su nombre.": {
        en: "Tip: Click on the image at the exact moment you hear its name.",
        pt: "Dica: Clique na imagem no exato momento em que ouvir o seu nome."
    },
    "Tip: Trata de sentir cada emoción mientras la identificas.": {
        en: "Tip: Try to feel each emotion as you identify it.",
        pt: "Dica: Tente sentir cada emoção enquanto a identifica."
    },
    "Tip: Imita al personaje con energía.": {
        en: "Tip: Imitate the character with energy.",
        pt: "Dica: Imite o personagem com energia."
    },
    "Tip: Mantén el volumen en la franja verde para ganar puntos.": {
        en: "Tip: Keep the volume in the green zone to earn points.",
        pt: "Dica: Mantenha o volume na zona verde para ganhar pontos."
    },
    "Tip: Sigue el ritmo constante para una mejor puntuación.": {
        en: "Tip: Follow a steady rhythm for a better score.",
        pt: "Dica: Siga um ritmo constante para uma melhor pontuação."
    },
    "Tip: Fíjate en la escritura de cada palabra para encontrar el error.": {
        en: "Tip: Look closely at the spelling of each word to find the error.",
        pt: "Dica: Preste atenção na ortografia de cada palavra para encontrar o erro."
    },
    "Tip: Lee detenidamente y visualiza la acción.": {
        en: "Tip: Read carefully and visualize the action.",
        pt: "Dica: Leia atentamente e visualize a ação."
    },
    "Tip: Tómate tu tiempo para armar oraciones lógicas.": {
        en: "Tip: Take your time to build logical sentences.",
        pt: "Dica: Leve o seu tempo para construir frases lógicas."
    },
    "Tip: Repasa la ortografía mentalmente antes de escribir.": {
        en: "Tip: Review the spelling mentally before writing.",
        pt: "Dica: Revise a ortografia mentalmente antes de escrever."
    },
    "Tip: Busca el elemento que no concuerda con el grupo.": {
        en: "Tip: Find the element that does not belong to the group.",
        pt: "Dica: Encontre o elemento que não pertence ao grupo."
    },
    "Tip: Utiliza técnicas de visualización para recordar mejor.": {
        en: "Tip: Use visualization techniques to remember better.",
        pt: "Dica: Use técnicas de visualização para lembrar melhor."
    },
    "Tip: Encuentra las coincidencias haciendo clic en dos tarjetas.": {
        en: "Tip: Find the matches by clicking on two cards.",
        pt: "Dica: Encontre as correspondências clicando em duas cartas."
    },
    "Tip: Observa qué elemento falta en el dibujo principal.": {
        en: "Tip: Observe which element is missing in the main drawing.",
        pt: "Dica: Observe qual elemento está faltando no desenho principal."
    },
    "Tip: Arrastra cada herramienta a la profesión correspondiente.": {
        en: "Tip: Drag each tool to the corresponding profession.",
        pt: "Dica: Arraste cada ferramenta para a profissão correspondente."
    },
    "Tip: Coloca las imágenes en el orden en que suceden los eventos.": {
        en: "Tip: Place the images in the order the events happen.",
        pt: "Dica: Coloque as imagens na ordem em que os eventos acontecem."
    },
    "Tip: Une la palabra con la imagen que la representa.": {
        en: "Tip: Match the word with the image that represents it.",
        pt: "Dica: Ligue a palavra à imagem que a representa."
    },
    "Tip: Agrupa los elementos similares en la misma categoría.": {
        en: "Tip: Group similar elements into the same category.",
        pt: "Dica: Agrupe elementos semelhantes na mesma categoria."
    },
    "Tip: Identifica el patrón y selecciona la pieza que sigue.": {
        en: "Tip: Identify the pattern and select the piece that follows.",
        pt: "Dica: Identifique o padrão e selecione a peça que segue."
    },
    "Reproduciendo...": {
        en: "Playing...",
        pt: "Reproduzindo..."
    },
    "Escuchar palabra": {
        en: "Listen word",
        pt: "Ouvir palavra"
    },
    "Grabar mi voz": {
        en: "Record my voice",
        pt: "Gravar minha voz"
    },
    "¡Muy bien!": {
        en: "Very good!",
        pt: "Muito bem!"
    },
    "Siguiente Ronda": {
        en: "Next Round",
        pt: "Próxima Rodada"
    },
    "Ver Resultados": {
        en: "View Results",
        pt: "Ver Resultados"
    },
    "Validar Respuesta": {
        en: "Validate Answer",
        pt: "Validar Resposta"
    },
    "Escuchar Oración": {
        en: "Listen Sentence",
        pt: "Ouvir Frase"
    },
    "Escuchar Secuencia": {
        en: "Listen Sequence",
        pt: "Ouvir Sequência"
    },
    "Completar Movimiento": {
        en: "Complete Movement",
        pt: "Completar Movimento"
    }
});

Object.assign(GAME_TRANSLATIONS, {
    "Cargando...": { en: "Loading...", pt: "Carregando..." },
    "Escuchar palabra": { en: "Listen to word", pt: "Ouvir palavra" },
    "Grabar mi voz": { en: "Record my voice", pt: "Gravar minha voz" },
    "Terminar juego": { en: "End game", pt: "Terminar jogo" },
    "Reintentar": { en: "Retry", pt: "Tentar de novo" },
    "Dificultad: ": { en: "Difficulty: ", pt: "Dificuldade: " },
    "Fácil": { en: "Easy", pt: "Fácil" },
    "fácil": { en: "Easy", pt: "Fácil" },
    "Medio": { en: "Medium", pt: "Médio" },
    "medio": { en: "Medium", pt: "Médio" },
    "Difícil": { en: "Hard", pt: "Difícil" },
    "difícil": { en: "Hard", pt: "Difícil" },
    "Dificultad con sonido \"r\"": { en: "Difficulty with sound 'r'", pt: "Dificuldade com som 'r'" },
    "Dificultad con \"r\" vibrante (rotacismo)": { en: "Difficulty with vibrating 'r' (rotacism)", pt: "Dificuldade com 'r' vibrante (rotacismo)" },
    "Dificultad con \"g\" vibrante": { en: "Difficulty with vibrating 'g'", pt: "Dificuldade com 'g' vibrante" },
    "Dificultad con \"j\" fricativa": { en: "Difficulty with fricative 'j'", pt: "Dificuldade com 'j' fricativa" }
});
