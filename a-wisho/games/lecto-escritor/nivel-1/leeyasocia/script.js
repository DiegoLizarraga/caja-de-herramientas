// Variables globales
let currentRound = 0;
let score = 0;
let currentExercise = null;
let selectedImage = null;
let difficulty = 'normal';
let wrongAttempts = 0;
let hintUsed = false;
let readingErrors = {}; // Rastrear errores de lectura

// Utilidad para dividir palabras en sílabas
function splitSyllables(word) {
    const syllableMap = {
        'mariposa': 'ma-ri-po-sa',
        'teléfono': 'te-lé-fo-no',
        'bicicleta': 'bi-ci-cle-ta',
        'elefante': 'e-le-fan-te',
        'pajaro': 'pa-ja-ro',
        'cocodrilo': 'co-co-dri-lo',
        'canguro': 'can-gu-ro',
        'hipopótamo': 'hi-po-pó-ta-mo',
        'dinosaurio': 'di-no-sau-rio',
        'pinguino': 'pin-güi-no',
    };
    return syllableMap[word.toLowerCase()] || word;
}

const exercises = {
    easy: [
        {
            sentence: "El gato duerme.",
            correctImageIndex: 0,
            difficultWords: ['gato'],
            origin: 'semantic',
            explanation: "La oración describe a un gato durmiendo. Es una acción simple y clara.",
            images: [
                { src: 'https://img2.clipart-library.com/27/cat-sleeping-clipart/cat-sleeping-clipart-3.jpg?w=300&h=200&fit=crop', label: 'Gato durmiendo' },
                { src: 'https://image.shutterstock.com/image-vector/little-doggy-cute-puppy-playing-600w-255443107.jpg?w=300&h=200&fit=crop', label: 'Perro jugando' },
                { src: 'https://static.vecteezy.com/system/resources/previews/003/286/369/original/cartoon-character-exotic-shorthair-cat-running-vector.jpg?w=300&h=200&fit=crop', label: 'Gato corriendo' }
            ]
        },
        {
            sentence: "El niño juega en el parque.",
            correctImageIndex: 1,
            difficultWords: ['parque'],
            origin: 'semantic',
            explanation: "La oración habla de un niño jugando. El parque es el lugar donde ocurre la acción.",
            images: [
                { src: 'https://thumbs.dreamstime.com/z/caricatura-de-un-ni%C3%B1o-que-barre-el-suelo-ni%C3%B1os-haciendo-tareas-dom%C3%A9sticas-en-concepto-casa-dibujo-198013814.jpg?w=300&h=200&fit=crop', label: 'Niño en casa' },
                { src: 'https://static.vecteezy.com/system/resources/previews/008/666/296/non_2x/kids-playing-outdoor-in-park-vector.jpg?w=300&h=200&fit=crop', label: 'Niño en parque' },
                { src: 'https://static.vecteezy.com/system/resources/previews/002/538/755/large_2x/happy-cute-cartoon-school-children-vector.jpg?w=300&h=200&fit=crop', label: 'Niño en escuela' }
            ]
        },
        {
            sentence: "El pajarito canta.",
            correctImageIndex: 2,
            difficultWords: ['pajarito'],
            origin: 'semantic',
            explanation: "Un pajarito es un pájaro pequeño. La acción es cantar.",
            images: [
                { src: 'https://static.vecteezy.com/system/resources/previews/005/162/515/original/cartoon-blue-bird-sitting-in-a-nest-free-vector.jpg?w=300&h=200&fit=crop', label: 'Pajaro en nido' },
                { src: 'https://img.freepik.com/vector-premium/pajaro-azul-dibujos-animados-sentado-rama-arbol_29190-5361.jpg?w=300&h=200&fit=crop', label: 'Pajaro en rama' },
                { src: 'https://img.freepik.com/vector-premium/ilustracion-vectorial-dibujos-animados-pajaro-lindo-cantando_869472-1107.jpg?w=300&h=200&fit=crop', label: 'Pajaro cantando' }
            ]
        }
    ],
    normal: [
        {
            sentence: "La mariposa vuela entre las flores.",
            correctImageIndex: 1,
            difficultWords: ['mariposa', 'flores'],
            origin: 'semantic',
            explanation: "Una mariposa es un insecto colorido que vuela. Está entre flores naturalmente.",
            images: [
                { src: 'https://img.freepik.com/vector-premium/lindo-gato-flor-vector-dibujos-animados-sobre-fondo-blanco_1026278-7253.jpg?w=300&h=200&fit=crop', label: 'Gato en flores' },
                { src: 'https://img.freepik.com/vector-premium/mariposas-vuelo-flor-jardin_1308-4021.jpg?w=300&h=200&fit=crop', label: 'Mariposa en flores' },
                { src: 'https://static.vecteezy.com/system/resources/previews/017/675/147/original/cute-cartoon-postcard-sunny-lawn-with-bees-flying-under-red-daisy-flowers-and-grass-isolated-on-white-background-bees-are-collecting-honey-in-the-sunny-summer-day-vector.jpg?w=300&h=200&fit=crop', label: 'Abeja en flores' }
            ]
        },
        {
            sentence: "El elefante camina lentamente por la sabana.",
            correctImageIndex: 0,
            difficultWords: ['elefante', 'sabana'],
            origin: 'semantic',
            explanation: "Un elefante es un animal grande. La sabana es su hábitat natural.",
            images: [
                { src: 'https://i.pinimg.com/736x/9a/e4/39/9ae43949a771f9fb650c7786fed63cdc--elephants.jpg?w=300&h=200&fit=crop', label: 'Elefante en sabana' },
                { src: 'https://img.freepik.com/vector-premium/feliz-leon-dibujos-animados-sabana_133260-14519.jpg?w=300&h=200&fit=crop', label: 'León en sabana' },
                { src: 'https://static.vecteezy.com/system/resources/previews/060/831/743/non_2x/giraffe-eating-leaves-from-tree-with-green-foliage-in-simple-nature-background-illustration-vector.jpg?w=300&h=200&fit=crop', label: 'Jirafa comiendo' }
            ]
        },
        {
            sentence: "El cocodrilo nada en el río.",
            correctImageIndex: 2,
            difficultWords: ['cocodrilo'],
            origin: 'semantic',
            explanation: "Un cocodrilo es un reptil que vive en el agua. Nada es su actividad principal.",
            images: [
                { src: 'https://static.vecteezy.com/system/resources/previews/003/278/420/large_2x/animal-character-funny-crocodile-in-cartoon-style-vector.jpg?w=300&h=200&fit=crop', label: 'Cocodrilo en tierra' },
                { src: 'https://static.vecteezy.com/system/resources/previews/021/458/217/non_2x/cute-green-snake-cartoon-on-white-background-vector.jpg?w=300&h=200&fit=crop', label: 'Serpiente en río' },
                { src: 'https://img.freepik.com/vector-premium/cocodrilo-agua-cocodrilo-anfibio-reptil-salvaje-verde-enojado-salvaje-animal-natacion-dibujos-animados-fondo_80590-4822.jpg?w=300&h=200&fit=crop', label: 'Cocodrilo nadando' }
            ]
        }
    ],
    hard: [
        {
            sentence: "La majestuosa orquesta sinfónica interpretaba una sonata extraordinaria.",
            correctImageIndex: 1,
            difficultWords: ['majestuosa', 'orquesta', 'sinfónica', 'interpretaba', 'sonata', 'extraordinaria'],
            origin: 'semantic',
            explanation: "Describe músicos tocando instrumento juntos. Las palabras complejas hacen la lectura más desafiante.",
            images: [
                { src: 'https://static.vecteezy.com/system/resources/previews/016/704/376/original/cartoon-illustration-acoustic-guitar-colorful-musical-instrument-vector.jpg?w=300&h=200&fit=crop', label: 'Guitarra sola' },
                { src: 'https://img.freepik.com/vector-premium/conjunto-grupo-orquesta-conductor-escenario_7496-856.jpg?w=300&h=200&fit=crop', label: 'Orquesta tocando' },
                { src: 'https://static.vecteezy.com/system/resources/previews/016/269/586/original/open-air-concert-illustration-concept-on-white-background-vector.jpg?w=300&h=200&fit=crop', label: 'Concierto moderno' }
            ]
        },
        {
            sentence: "El hippopótamo se sumerge profundamente en el pantano cenagoso.",
            correctImageIndex: 0,
            difficultWords: ['hippopótamo', 'sumerge', 'profundamente', 'pantano', 'cenagoso'],
            origin: 'semantic',
            explanation: "Describe un hipopótamo en su ambiente acuático. Palabras complejas para vocabulario avanzado.",
            images: [
                { src: 'https://static.vecteezy.com/system/resources/previews/005/561/609/non_2x/hippo-cartoon-colored-illustration-free-vector.jpg?w=300&h=200&fit=crop', label: 'Hipopótamo en agua' },
                { src: 'https://static.vecteezy.com/system/resources/previews/044/841/151/original/cartoon-elephant-animal-illustration-vector.jpg?w=300&h=200&fit=crop', label: 'Elefante' },
                { src: 'https://png.pngtree.com/png-clipart/20220823/original/pngtree-the-cute-baby-rhino-with-the-excited-expression-png-image_8451466.png?w=300&h=200&fit=crop', label: 'Rinoceronte' }
            ]
        },
        {
            sentence: "El diligente investigador examinaba meticulosamente los artefactos arqueológicos.",
            correctImageIndex: 2,
            difficultWords: ['diligente', 'investigador', 'examinaba', 'meticulosamente', 'artefactos', 'arqueológicos'],
            origin: 'semantic',
            explanation: "Describe un arqueólogo trabajando. Vocabulario académico para estimular pensamiento crítico.",
            images: [
                { src: 'https://static.vecteezy.com/system/resources/previews/000/299/564/large_2x/childrens-doing-activities-in-library-vector.jpg?w=300&h=200&fit=crop', label: 'Biblioteca' },
                { src: 'https://c8.alamy.com/compes/2gak438/diseno-de-dibujos-animados-de-cientifico-de-pie-en-el-laboratorio-2gak438.jpg?w=300&h=200&fit=crop', label: 'Laboratorio científico' },
                { src: 'https://img.freepik.com/vector-premium/ninos-arqueologos-ninos-arqueologia-dibujos-animados-nino-arqueologo-o-paleontologo-historia-excavacion-ninos-que-trabajan-explorando-fosiles-antiguos-suelo-ilustracion-vectorial-reciente_81894-14923.jpg?w=300&h=200&fit=crop', label: 'Arqueólogo excavando' }
            ]
        }
    ]
};

const totalRounds = 5;

// Inicializar el juego
document.addEventListener('DOMContentLoaded', () => {
    setupEventListeners();
    startNewRound();
});

// Configurar event listeners
function setupEventListeners() {
    document.getElementById('check-button').addEventListener('click', checkAnswer);
    document.getElementById('reset-button').addEventListener('click', resetRound);
    document.getElementById('hint-button').addEventListener('click', showHint);
    document.getElementById('read-button').addEventListener('click', readSentence);
}

// Seleccionar pool de dificultad
function selectDifficultyPool() {
    if (wrongAttempts >= 2) {
        difficulty = 'easy';
        return exercises.easy;
    } else if (score >= 70 && currentRound > 2) {
        difficulty = 'hard';
        return exercises.hard;
    } else {
        difficulty = 'normal';
        return exercises.normal;
    }
}

// Iniciar nueva ronda
function startNewRound() {
    const difficultyPool = selectDifficultyPool();
    const randomIndex = Math.floor(Math.random() * difficultyPool.length);
    
    currentExercise = difficultyPool[randomIndex];
    selectedImage = null;
    wrongAttempts = 0;
    hintUsed = false;

    updateUI();
    updateDifficulty();
}

// Actualizar interfaz
function updateUI() {
    document.getElementById('current-round').textContent = currentRound + 1;
    document.getElementById('total-rounds').textContent = totalRounds;
    document.getElementById('score').textContent = score + ' puntos';
    document.getElementById('score-display').textContent = score + ' puntos';

    const progress = ((currentRound + 1) / totalRounds) * 100;
    document.getElementById('progress-fill').style.width = progress + '%';

    // Mostrar oración
    document.getElementById('sentence-display').textContent = currentExercise.sentence;

    // Mostrar palabras difíciles
    if (currentExercise.difficultWords.length > 0) {
        const difficultWordsDiv = document.getElementById('difficult-words');
        difficultWordsDiv.innerHTML = '';
        
        currentExercise.difficultWords.forEach(word => {
            const wordDiv = document.createElement('div');
            wordDiv.className = 'difficult-word';
            const syllables = splitSyllables(word);
            wordDiv.innerHTML = `
                <div>${word}</div>
                <div class="syllables">${syllables}</div>
            `;
            wordDiv.addEventListener('click', () => speakWord(word));
            difficultWordsDiv.appendChild(wordDiv);
        });
        
        document.getElementById('word-difficulty').classList.remove('hidden');
    }

    // Mostrar imágenes
    const imagesContainer = document.getElementById('images-container');
    imagesContainer.innerHTML = '';
    
    currentExercise.images.forEach((image, index) => {
        const imageCard = document.createElement('div');
        imageCard.className = 'image-card';
        imageCard.innerHTML = `
            <img src="${image.src}" alt="${image.label}">
            <div class="image-label">${image.label}</div>
        `;
        imageCard.addEventListener('click', () => selectImage(index, imageCard));
        imagesContainer.appendChild(imageCard);
    });

    // Limpiar feedback
    document.getElementById('feedback').classList.add('hidden');
    document.getElementById('explanation').classList.add('hidden');
}

// Seleccionar imagen
function selectImage(index, element) {
    document.querySelectorAll('.image-card').forEach(card => {
        card.classList.remove('selected');
    });
    
    element.classList.add('selected');
    selectedImage = index;
}

// Leer oración en voz alta
function readSentence() {
    const utterance = new SpeechSynthesisUtterance(currentExercise.sentence);
    utterance.lang = 'es-ES';
    utterance.rate = 0.9;
    
    const button = document.getElementById('read-button');
    button.classList.add('playing');
    
    utterance.onend = () => {
        button.classList.remove('playing');
    };
    
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
}

// Hablar palabra individual
function speakWord(word) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'es-ES';
    utterance.rate = 0.8;
    
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
}

// Mostrar pista
function showHint() {
    if (hintUsed) {
        showFeedback("Ya usaste la pista", false);
        return;
    }

    hintUsed = true;
    const correctCard = document.querySelectorAll('.image-card')[currentExercise.correctImageIndex];
    correctCard.style.boxShadow = '0 0 20px rgba(34, 197, 94, 0.5)';
    correctCard.style.borderColor = 'rgba(34, 197, 94, 0.5)';
    
    showFeedback("💡 La imagen correcta está destacada", true);
}

// Verificar respuesta
function checkAnswer() {
    if (selectedImage === null) {
        showFeedback("Debes seleccionar una imagen", false);
        return;
    }

    const isCorrect = selectedImage === currentExercise.correctImageIndex;

    if (isCorrect) {
        let points = hintUsed ? 15 : 20;
        score += points;

        showFeedback(`¡Correcto! +${points} puntos 🎉`, true);
        
        const correctCard = document.querySelectorAll('.image-card')[currentExercise.correctImageIndex];
        correctCard.classList.add('correct');

        setTimeout(() => {
            showExplanation();
        }, 500);

        document.getElementById('check-button').disabled = true;
        document.getElementById('reset-button').disabled = true;
        document.getElementById('hint-button').disabled = true;

        setTimeout(() => {
            if (currentRound + 1 >= totalRounds) {
                completeGame();
            } else {
                currentRound++;
                startNewRound();
                document.getElementById('check-button').disabled = false;
                document.getElementById('reset-button').disabled = false;
                document.getElementById('hint-button').disabled = false;
            }
        }, 3000);
    } else {
        wrongAttempts++;
        showFeedback("Incorrecto. Intenta de nuevo", false);
        
        const incorrectCard = document.querySelectorAll('.image-card')[selectedImage];
        incorrectCard.classList.add('incorrect');

        updateDifficulty();
    }

    document.getElementById('score').textContent = score + ' puntos';
    document.getElementById('score-display').textContent = score + ' puntos';
}

// Mostrar explicación
function showExplanation() {
    document.getElementById('explanation-text').textContent = currentExercise.explanation;
    document.getElementById('explanation').classList.remove('hidden');
}

// Reiniciar ronda
function resetRound() {
    selectedImage = null;
    document.querySelectorAll('.image-card').forEach(card => {
        card.classList.remove('selected', 'incorrect', 'correct');
        card.style.boxShadow = '';
        card.style.borderColor = '';
    });
    document.getElementById('feedback').classList.add('hidden');
    document.getElementById('explanation').classList.add('hidden');
    wrongAttempts = 0;
    hintUsed = false;
}

// Mostrar feedback
function showFeedback(message, isCorrect) {
    const feedbackElement = document.getElementById('feedback');
    feedbackElement.textContent = message;
    feedbackElement.className = isCorrect ? 'feedback correct' : 'feedback incorrect';
    feedbackElement.classList.remove('hidden');
}

// Actualizar dificultad
function updateDifficulty() {
    let newDifficulty = 'normal';
    
    if (wrongAttempts >= 2) {
        newDifficulty = 'easy';
    } else if (score >= 70 && currentRound > 2) {
        newDifficulty = 'hard';
    }

    const badge = document.getElementById('difficulty-badge');
    const badgeTexts = {
        'easy': '🎯 Fácil',
        'normal': 'Normal',
        'hard': '⭐ Avanzado'
    };
    badge.textContent = badgeTexts[newDifficulty];
}

// Completar juego
function completeGame() {
    const leeCard = document.querySelector('.lee-card');
    leeCard.innerHTML = `
        <h2>¡Juego Completado! 🏆</h2>
        <div class="feedback correct" style="margin-top: 20px;">
            <p><strong>Tu puntaje final:</strong> ${score} puntos</p>
        </div>
        <div class="explanation" style="margin-top: 20px;">
            <h3>Resumen de tu desempeño</h3>
            <p>Completaste todas las actividades de lectura y asociación. ¡Excelente trabajo identificando las imágenes correctas!</p>
            <p style="margin-top: 10px; font-size: 14px;">Continúa practicando la lectura para mejorar tu vocabulario y comprensión.</p>
        </div>
        <div class="action-controls" style="margin-top: 30px;">
            <button class="action-button primary" onclick="location.reload()">
                <i class="fas fa-redo"></i> Jugar de Nuevo
            </button>
            <button class="action-button blue" onclick="goToMainPage()">
                <i class="fas fa-home"></i> Volver al Menú
            </button>
        </div>
    `;
}

// Función para volver a la página principal
function goToMainPage() {
    window.location.href = 'https://plekdev.github.io/BlueMinds/selectores/selector-lecto-escritor.html';
}