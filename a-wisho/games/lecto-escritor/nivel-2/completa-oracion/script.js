// Variables globales
let currentRound = 0;
let score = 0;
let currentExercise = null;
let userAnswer = '';
let difficulty = 'normal';
let wrongAttempts = 0;
let hintUsed = false;
let startTime = 0;
let comprehensionLevel = 'normal';
let visualMemoryLevel = 'normal';
let spellingErrors = {}; // Rastrear errores ortográficos

// Algoritmo para calcular similaridad (distancia de Levenshtein)
function levenshteinDistance(a, b) {
    const aLower = a.toLowerCase().trim();
    const bLower = b.toLowerCase().trim();
    
    if (aLower === bLower) return 0;
    
    const m = aLower.length;
    const n = bLower.length;
    const dp = Array(n + 1).fill(null).map(() => Array(m + 1).fill(0));
    
    for (let i = 0; i <= m; i++) dp[i][0] = i;
    for (let j = 0; j <= n; j++) dp[0][j] = j;
    
    for (let i = 1; i <= m; i++) {
        for (let j = 1; j <= n; j++) {
            if (aLower[i - 1] === bLower[j - 1]) {
                dp[i][j] = dp[i - 1][j - 1];
            } else {
                dp[i][j] = 1 + Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]);
            }
        }
    }
    
    return dp[m][n];
}

const exercises = {
    easy: [
        {
            image: 'https://img.freepik.com/vector-premium/lindo-gato-naranja-durmiendo-clipart-ninos-personaje-gato-dibujos-animados_594975-459.jpg?w=400&h=300&fit=crop',
            before: 'El',
            after: 'duerme en la casa.',
            correctAnswer: 'gato',
            alternatives: ['gatos', 'gata', 'gatillo'],
            explanation: 'La imagen muestra un gato durmiendo. Completamos con la palabra singular "gato".',
            wordType: 'sustantivo',
            difficulty: 1
        },
        {
            image: 'https://img.freepik.com/vector-premium/ilustracion-vectorial-dibujos-animados-pajaro-lindo-cantando_869472-1107.jpg?w=400&h=300&fit=crop',
            before: 'El pájaro',
            after: 'en la rama.',
            correctAnswer: 'canta',
            alternatives: ['cantio', 'cantan', 'cantaré'],
            explanation: 'Un pájaro singular necesita verbo singular. "Canta" es el verbo correcto en presente.',
            wordType: 'verbo',
            difficulty: 1
        },
        {
            image: 'https://image.freepik.com/vector-gratis/pelota-deportiva-roja-pelota-goma-o-cuero-dibujos-animados-que-ninos-jueguen-al-aire-libre-juegos-ninos-ilustracion-vectorial-plana_81894-5611.jpg?w=400&h=300&fit=crop',
            before: 'La pelota es',
            after: '.',
            correctAnswer: 'roja',
            alternatives: ['rojito', 'rojos', 'rojas'],
            explanation: 'Pelota es femenino singular. El adjetivo debe concordar: "roja".',
            wordType: 'adjetivo',
            difficulty: 1
        }
    ],
    normal: [
        {
            image: 'https://image.freepik.com/vector-gratis/ninos-jugando-parque_23-2147584893.jpg?w=400&h=300&fit=crop',
            before: 'Los niños',
            after: 'en el parque todos los días.',
            correctAnswer: 'juegan',
            alternatives: ['juega', 'volavan', 'comieron'],
            explanation: 'Niños es plural. El verbo debe ser "juegan" (plural, presente indicativo).',
            wordType: 'verbo conjugado', 
            difficulty: 2
        },
        {
            image: 'https://img.freepik.com/vector-premium/dibujo-mariposa-flores-mariposas-flores_730620-512566.jpg?w=400&h=300&fit=crop',
            before: 'La mariposa',
            after: 'sobre las flores con sus alas hermosas.',
            correctAnswer: 'descansa',
            alternatives: ['descansan', 'panzo', 'descansito'],
            explanation: 'Mariposa es singular. "Descansa" es la forma correcta en tercera persona singular.',
            wordType: 'verbo conjugado',
            difficulty: 2
        },
        {
            image: 'https://static.vecteezy.com/system/resources/previews/044/841/151/original/cartoon-elephant-animal-illustration-vector.jpg?w=400&h=300&fit=crop',
            before: 'El elefante es un animal',
            after: '.',
            correctAnswer: 'gigante',
            alternatives: ['chiquito', 'mediano', 'enormes'],
            explanation: 'Necesitamos un adjetivo singular que describe al elefante. "Gigante" es perfecto.',
            wordType: 'adjetivo',
            difficulty: 2
        }
    ],
    hard: [
        {
            image: 'https://img.freepik.com/premium-vector/cute-conductor-leading-orchestra-cartoon-vector_1022901-101517.jpg?w=400&h=300&fit=crop',
            before: 'La orquesta sinfónica',
            after: 'una sonata extraordinaria en el concierto.',
            correctAnswer: 'interpretaba',
            alternatives: ['interpreta', 'interpretó', 'interpretarán'],
            explanation: 'Necesita pretérito imperfecto. "Interpretaba" describe una acción pasada en progreso.',
            wordType: 'verbo complejo',
            difficulty: 3
        },
        {
            image: 'https://img.freepik.com/vector-premium/ninos-arqueologos-ninos-arqueologia-dibujos-animados-nino-arqueologo-o-paleontologo-historia-excavacion-ninos-que-trabajan-explorando-fosiles-antiguos-suelo-ilustracion-vectorial-reciente_81894-14923.jpg?w=400&h=300&fit=crop',
            before: 'El investigador',
            after: 'los artefactos arqueológicos con precisión científica.',
            correctAnswer: 'examinaba',
            alternatives: ['examina', 'examinó', 'examinaría'],
            explanation: 'Pretérito imperfecto describe una acción pasada repetida. "Examinaba" es correcto.',
            wordType: 'verbo complejo',
            difficulty: 3
        },
        {
            image: 'https://static.vecteezy.com/system/resources/previews/005/520/150/non_2x/cartoon-drawing-of-a-construction-worker-vector.jpg?w=400&h=300&fit=crop',
            before: 'Aunque el trabajo fue',
            after: ', el equipo persistió en alcanzar el objetivo.',
            correctAnswer: 'arduo',
            alternatives: ['ardua', 'tacuo', 'arduos'],
            explanation: 'Trabajo es masculino singular. "Arduo" es el adjetivo que concuerda correctamente.',
            wordType: 'adjetivo formal',
            difficulty: 3
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
    document.getElementById('answer-input').addEventListener('input', (e) => {
        userAnswer = e.target.value;
    });
    document.getElementById('answer-input').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            checkAnswer();
        }
    });
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
    userAnswer = '';
    wrongAttempts = 0;
    hintUsed = false;
    startTime = Date.now();

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

    // Mostrar imagen
    document.getElementById('exercise-image').src = currentExercise.image;

    // Mostrar oración
    document.getElementById('sentence-before').textContent = currentExercise.before + ' ';
    document.getElementById('sentence-after').textContent = ' ' + currentExercise.after;

    // Limpiar input
    const answerInput = document.getElementById('answer-input');
    answerInput.value = '';
    answerInput.classList.remove('correct', 'incorrect');
    answerInput.focus();

    // Mostrar sugerencias de palabras
    showSuggestions();

    // Limpiar feedback
    document.getElementById('feedback').classList.add('hidden');
    document.getElementById('explanation').classList.add('hidden');
    document.getElementById('spelling-hint').classList.add('hidden');
    document.getElementById('analysis-info').classList.add('hidden');
}

// Mostrar sugerencias de palabras
function showSuggestions() {
    const suggestionsList = document.getElementById('suggestions-list');
    suggestionsList.innerHTML = '';
    
    // Mostrar alternativas correctas e incorrectas
    const allSuggestions = [currentExercise.correctAnswer, ...currentExercise.alternatives];
    const shuffled = allSuggestions.sort(() => Math.random() - 0.5);
    
    shuffled.forEach(word => {
        const button = document.createElement('button');
        button.className = 'suggestion-button';
        button.textContent = word;
        button.addEventListener('click', () => {
            document.getElementById('answer-input').value = word;
            userAnswer = word;
        });
        suggestionsList.appendChild(button);
    });
    
    document.getElementById('word-suggestions').classList.remove('hidden');
}

// Mostrar pista
function showHint() {
    if (hintUsed) {
        showFeedback("Ya usaste la pista", false);
        return;
    }

    hintUsed = true;
    
    // Mostrar pista de ortografía
    const hint = currentExercise.correctAnswer[0] + '*'.repeat(currentExercise.correctAnswer.length - 1);
    document.getElementById('spelling-text').textContent = `La palabra comienza con "${currentExercise.correctAnswer[0]}" y tiene ${currentExercise.correctAnswer.length} letras.`;
    document.getElementById('spelling-hint').classList.remove('hidden');

    showFeedback("💡 Pista mostrada", true);
}

// Verificar respuesta
function checkAnswer() {
    const userInputTrimmed = userAnswer.trim();
    
    if (!userInputTrimmed) {
        showFeedback("Por favor, escribe una respuesta", false);
        return;
    }

    // Calcular similaridad
    const distance = levenshteinDistance(userInputTrimmed, currentExercise.correctAnswer);
    const maxDistance = Math.max(userInputTrimmed.length, currentExercise.correctAnswer.length);
    const similarity = 1 - (distance / maxDistance);
    
    const isCorrect = similarity >= 0.85; // 85% de similitud

    if (isCorrect) {
        // Calcular tiempo de respuesta
        const responseTime = (Date.now() - startTime) / 1000;
        
        let points = 20;
        if (hintUsed) points = 15;
        if (responseTime > 30) points = Math.max(10, points - 5);
        
        score += points;

        showFeedback(`¡Correcto! +${points} puntos 🎉`, true);
        
        const answerInput = document.getElementById('answer-input');
        answerInput.classList.add('correct');

        // Mostrar análisis
        analyzePerformance(responseTime);

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
        
        // Registrar error ortográfico
        const key = currentExercise.wordType;
        spellingErrors[key] = (spellingErrors[key] || 0) + 1;

        showFeedback(`Incorrecto. La respuesta es: "${currentExercise.correctAnswer}"`, false);
        
        const answerInput = document.getElementById('answer-input');
        answerInput.classList.add('incorrect');

        updateDifficulty();
    }

    document.getElementById('score').textContent = score + ' puntos';
    document.getElementById('score-display').textContent = score + ' puntos';
}

// Analizar desempeño
function analyzePerformance(responseTime) {
    // Analizar comprensión lectora
    if (wrongAttempts === 0) {
        comprehensionLevel = 'Excelente';
    } else if (wrongAttempts === 1) {
        comprehensionLevel = 'Normal';
    } else {
        comprehensionLevel = 'Necesita apoyo';
    }

    // Analizar memoria visual (basada en velocidad)
    if (responseTime < 10) {
        visualMemoryLevel = 'Excelente';
    } else if (responseTime < 20) {
        visualMemoryLevel = 'Normal';
    } else {
        visualMemoryLevel = 'Necesita práctica';
    }

    // Mostrar análisis
    document.getElementById('comprehension-level').textContent = comprehensionLevel;
    document.getElementById('visual-memory').textContent = visualMemoryLevel;
    document.getElementById('analysis-info').classList.remove('hidden');
}

// Mostrar explicación
function showExplanation() {
    document.getElementById('explanation-text').textContent = currentExercise.explanation;
    document.getElementById('explanation').classList.remove('hidden');
}

// Reiniciar ronda
function resetRound() {
    userAnswer = '';
    const answerInput = document.getElementById('answer-input');
    answerInput.value = '';
    answerInput.classList.remove('correct', 'incorrect');
    answerInput.focus();
    
    document.getElementById('feedback').classList.add('hidden');
    document.getElementById('explanation').classList.add('hidden');
    document.getElementById('spelling-hint').classList.add('hidden');
    document.getElementById('analysis-info').classList.add('hidden');
    
    wrongAttempts = 0;
    hintUsed = false;
    startTime = Date.now();
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
    const errorSummary = Object.entries(spellingErrors)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 2)
        .map(([type, count]) => `${type} (${count})`)
        .join(', ');

    const completaCard = document.querySelector('.completa-card');
    completaCard.innerHTML = `
        <h2>¡Juego Completado! 🏆</h2>
        <div class="feedback correct" style="margin-top: 20px;">
            <p><strong>Tu puntaje final:</strong> ${score} puntos</p>
        </div>
        <div class="explanation" style="margin-top: 20px;">
            <h3>Resumen de tu desempeño</h3>
            <p><strong>Comprensión lectora:</strong> ${comprehensionLevel}</p>
            <p><strong>Memoria visual:</strong> ${visualMemoryLevel}</p>
            ${errorSummary ? `<p><strong>Áreas para mejorar:</strong> ${errorSummary}</p>` : ''}
            <p style="margin-top: 10px; font-size: 14px;">¡Continúa practicando para mejorar tu escritura y comprensión!</p>
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