// Variables globales
let currentQuestion = 0;
let answers = [];

const questions = [
    // Preguntas originales del ejemplo del usuario (Interacción Social / Sensorial / Patrón)
    {
        question: "¿Te gusta jugar con otros niños?",
        options: [
            "Sí, siempre me gusta jugar con amigos",
            "A veces me gusta, a veces prefiero estar solo",
            "Prefiero jugar solo la mayoría del tiempo"
        ]
    },
    {
        question: "¿Cómo te sientes cuando hay ruidos fuertes?",
        options: [
            "No me molestan mucho",
            "A veces me molestan un poco",
            "Me molestan mucho y me asustan"
        ]
    },
    {
        question: "¿Te gusta hacer las cosas siempre de la misma manera?",
        options: [
            "No, me gusta cambiar y probar cosas nuevas",
            "A veces me gusta que sea igual",
            "Sí, me gusta que todo sea siempre igual"
        ]
    },
    {
        question: "¿Qué haces cuando alguien te habla?",
        options: [
            "Los miro a los ojos y les contesto",
            "A veces los miro, a veces no",
            "Me cuesta mirarlos a los ojos"
        ]
    },
    {
        question: "¿Tienes algún juguete o tema favorito del que te gusta hablar mucho?",
        options: [
            "Me gustan muchas cosas diferentes",
            "Tengo algunos favoritos",
            "Sí, tengo uno o dos que me encantan mucho"
        ]
    },
    // Preguntas Adicionales (Interacción Social y Reciprocidad)
    {
        question: "¿Buscas compartir tus intereses o logros con otros (ej. señalar un dibujo, mostrar un juguete)?",
        options: [
            "Sí, a menudo señalo o muestro cosas a mis padres o amigos",
            "A veces, pero no siempre tengo la necesidad de mostrar",
            "Rara vez o nunca busco señalar o mostrar mis intereses"
        ]
    },
    {
        question: "¿Imitas las acciones o sonidos de otras personas de forma espontánea?",
        options: [
            "Sí, me gusta imitar a las personas que veo",
            "Solo si me piden que lo haga",
            "No, no suelo imitar"
        ]
    },
    {
        question: "¿Entiendes fácilmente lo que otra persona siente con solo mirar su cara o su tono de voz?",
        options: [
            "Sí, casi siempre sé si alguien está feliz, triste o enojado",
            "A veces me confundo, pero con ayuda lo entiendo",
            "Me cuesta mucho saber lo que sienten los demás si no me lo dicen"
        ]
    },
    {
        question: "¿Respondes cuando te llaman por tu nombre?",
        options: [
            "Sí, casi siempre volteo y respondo la primera vez",
            "A veces me distraigo y tardo en responder",
            "Parece que a veces no escucho, incluso cuando me hablan fuerte"
        ]
    },
    {
        question: "¿Cómo reaccionas ante los abrazos o el contacto físico inesperado?",
        options: [
            "Me gusta o me da igual",
            "Solo me gusta si es de mis padres o personas cercanas",
            "Me molesta mucho y me tenso o lo evito"
        ]
    },
    // Preguntas Adicionales (Comunicación y Lenguaje)
    {
        question: "¿Usas gestos (como señalar, decir adiós con la mano) para pedir cosas o comunicar?",
        options: [
            "Sí, uso gestos y palabras para comunicarme",
            "A veces uso gestos, pero prefiero hablar",
            "Rara vez uso gestos, solo uso palabras"
        ]
    },
    {
        question: "¿Repites frases o palabras que escuchas en películas, canciones o de otras personas?",
        options: [
            "No, no suelo repetir palabras",
            "Solo repito algunas palabras si me gustan mucho",
            "Sí, repito mucho frases o palabras sin un contexto claro (ecolalia)"
        ]
    },
    {
        question: "¿Qué tan fácil es para ti entender las bromas, el sarcasmo o los chistes con doble sentido?",
        options: [
            "Los entiendo sin problema",
            "A veces los entiendo, a veces tengo que preguntar",
            "Casi siempre entiendo todo de forma literal (tal como se dice)"
        ]
    },
    {
        question: "¿Sobre cuántos temas diferentes te gusta hablar y saber?",
        options: [
            "Me gusta conversar sobre muchas cosas diferentes",
            "Tengo un par de temas favoritos, pero hablo de otros si me preguntan",
            "Solo me interesa hablar de uno o dos temas muy específicos y no me gusta cambiar"
        ]
    },
    {
        question: "¿Qué haces cuando alguien interrumpe tu juego o una actividad que estás haciendo?",
        options: [
            "Lo acepto sin problema y me adapto",
            "Me molesta un poco, pero lo supero rápido",
            "Me da mucho enojo, lloro o me da una rabieta muy fuerte"
        ]
    },
    // Preguntas Adicionales (Comportamiento Repetitivo y Sensorial)
    {
        question: "¿Cómo juegas con tus juguetes?",
        options: [
            "Los uso para crear historias o juegos de simulación",
            "Uso algunos para jugar de forma imaginativa y otros de forma simple",
            "Me gusta alinearlos, agruparlos o girar partes repetidamente en lugar de jugar con ellos"
        ]
    },
    {
        question: "¿Haces movimientos repetitivos con tu cuerpo (ej. aletear las manos, mecerte, girar) cuando estás emocionado o nervioso?",
        options: [
            "No, no suelo hacer esos movimientos",
            "A veces, cuando estoy muy emocionado",
            "Sí, lo hago a menudo, en especial cuando estoy feliz, nervioso o molesto"
        ]
    },
    {
        question: "¿Cómo reaccionas si hay un cambio inesperado en tus planes o tu rutina diaria?",
        options: [
            "Me adapto y no me molesta",
            "Me frustra un poco, pero lo acepto",
            "Me da mucha ansiedad o me molesta fuertemente"
        ]
    },
    {
        question: "¿Qué tan sensible eres a la textura de ciertas telas o de ciertos alimentos?",
        options: [
            "No me importa mucho la textura",
            "Tengo algunas preferencias, pero puedo comer/usar casi todo",
            "Hay ciertas telas o alimentos que no soporto ni tocar o probar"
        ]
    },
    {
        question: "¿Buscas activamente sentir ciertos movimientos (ej. correr muy rápido, saltar mucho, girar sobre ti mismo)?",
        options: [
            "Busco movimientos normales como la mayoría de los niños",
            "A veces disfruto de movimientos intensos",
            "Sí, necesito o busco sentir constantemente movimientos muy fuertes e intensos"
        ]
    }
];

// Inicialización - Verificar si el usuario ya completó el test
document.addEventListener('DOMContentLoaded', () => {
    checkUserStatus();
});

// Verificar el estado del usuario
function checkUserStatus() {
    const hasCompletedTest = localStorage.getItem('blueminds_test_completed') === 'true';
    
    if (hasCompletedTest) {
        // Si ya completó el test, mostrar directamente la pantalla principal
        showMainScreen();
    } else {
        // Si no, mostrar la pantalla de bienvenida
        document.getElementById('welcomeScreen').style.display = 'flex';
        document.getElementById('testScreen').style.display = 'none';
        document.getElementById('mainScreen').style.display = 'none';
    }
}

// Funciones de navegación
function showTestIntro() {
    document.getElementById('welcomeScreen').style.display = 'none';
    document.getElementById('testScreen').style.display = 'block';
    document.getElementById('mainScreen').style.display = 'none';
}

function startTest() {
    document.getElementById('testIntro').classList.add('hidden');
    document.getElementById('testQuestion').style.display = 'block';
    loadQuestion();
}

function showMainScreen() {
    document.getElementById('welcomeScreen').style.display = 'none';
    document.getElementById('testScreen').style.display = 'none';
    document.getElementById('mainScreen').style.display = 'block';
    
    // Marcar que el usuario ha completado el test
    localStorage.setItem('blueminds_test_completed', 'true');
    
    // Animar progreso
    setTimeout(() => {
        animateMainProgress();
    }, 300);
}

// Cargar pregunta
function loadQuestion() {
    if (currentQuestion >= questions.length) {
        completeTest();
        return;
    }

    const q = questions[currentQuestion];
    const progress = ((currentQuestion + 1) / questions.length) * 100;

    document.getElementById('questionCounter').textContent = `Pregunta ${currentQuestion + 1} de ${questions.length}`;
    document.getElementById('progressPercentage').textContent = `${Math.round(progress)}%`;
    document.getElementById('progressFill').style.width = `${progress}%`;
    document.getElementById('questionNum').textContent = currentQuestion + 1;
    document.getElementById('questionText').textContent = q.question;

    const optionsContainer = document.getElementById('optionsContainer');
    optionsContainer.innerHTML = '';

    q.options.forEach((option, index) => {
        const optionDiv = document.createElement('div');
        optionDiv.className = 'option';
        optionDiv.onclick = () => selectOption(index);
        optionDiv.innerHTML = `
            <div class="option-radio"></div>
            <span>${option}</span>
        `;
        optionsContainer.appendChild(optionDiv);
    });

    document.getElementById('btnNext').classList.remove('active');
}

// Seleccionar opción
function selectOption(index) {
    const options = document.querySelectorAll('.option');
    options.forEach(opt => opt.classList.remove('selected'));
    options[index].classList.add('selected');

    answers[currentQuestion] = index;
    document.getElementById('btnNext').classList.add('active');
}

// Siguiente pregunta
function nextQuestion() {
    if (!document.getElementById('btnNext').classList.contains('active')) {
        return;
    }

    currentQuestion++;
    loadQuestion();
}

// Completar test
function completeTest() {
    // Guardar que el usuario completó el test
    localStorage.setItem('blueminds_test_completed', 'true');
    
    // Mostrar la pantalla principal
    showMainScreen();
}

// Ir a la aplicación principal
function goToMainApp() {
    window.location.href = 'BlueMindsMain.html';
}

// Reiniciar test
function restartTest() {
    currentQuestion = 0;
    answers = [];
    localStorage.setItem('blueminds_test_completed', 'false');
    document.getElementById('testResults').style.display = 'none';
    document.getElementById('testIntro').classList.remove('hidden');
    document.getElementById('testQuestion').style.display = 'none';
}

// Animaciones de la pantalla principal
function animateMainProgress() {
    const progressBar = document.querySelector('.level-path-progress');
    progressBar.style.width = '0%';
    
    setTimeout(() => {
        progressBar.style.width = '70%';
    }, 300);

    const categoryProgresses = document.querySelectorAll('.category-level-progress');
    categoryProgresses.forEach(progress => {
        const targetWidth = progress.style.width;
        progress.style.width = '0%';
        setTimeout(() => {
            progress.style.width = targetWidth;
        }, 500);
    });
}

function animateCard(card) {
    card.style.transform = 'scale(0.95)';
    setTimeout(() => {
        card.style.transform = '';
    }, 200);
    
    console.log('Navegando a:', card.querySelector('.category-title').textContent);
}