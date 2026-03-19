// Variables globales
let currentRound = 0;
let score = 0;
let currentPatternData = null;
let correctAnswer = "";
let showFeedback = false;

const totalRounds = 5;

// PATRONES DEFINIDOS MANUALMENTE CON EMOJIS
const patternsDatabase = [
    {
        name: "alternancia_cuadrados_rojo_azul",
        display: ["🟥", "🟦", "🟥", "🟦", "🟥", "?"],
        correct: "🟦",
        options: ["🟥", "🟦", "🟩"]
    },
    {
        name: "alternancia_cuadrados_verde_amarillo",
        display: ["🟩", "🟨", "🟩", "🟨", "🟩", "?"],
        correct: "🟨",
        options: ["🟩", "🟨", "🟪"]
    },
    {
        name: "tres_partes_rojo_azul_verde",
        display: ["🟥", "🟦", "🟩", "🟥", "🟦", "?"],
        correct: "🟩",
        options: ["🟥", "🟦", "🟩"]
    },
    {
        name: "doble_rojo_azul",
        display: ["🟥", "🟥", "🟦", "🟦", "🟥", "?"],
        correct: "🟥",
        options: ["🟥", "🟦", "🟨"]
    },
    {
        name: "alternancia_morado_negro",
        display: ["🟪", "⬛", "🟪", "⬛", "🟪", "?"],
        correct: "⬛",
        options: ["🟪", "⬛", "⬜"]
    },
    {
        name: "tres_partes_amarillo_morado_negro",
        display: ["🟨", "🟪", "⬛", "🟨", "🟪", "?"],
        correct: "⬛",
        options: ["🟨", "🟪", "⬛"]
    },
    {
        name: "doble_verde_amarillo",
        display: ["🟩", "🟩", "🟨", "🟨", "🟩", "?"],
        correct: "🟩",
        options: ["🟩", "🟨", "🟦"]
    },
    {
        name: "alternancia_azul_verde",
        display: ["🟦", "🟩", "🟦", "🟩", "🟦", "?"],
        correct: "🟩",
        options: ["🟦", "🟩", "🟥"]
    },
    {
        name: "tres_partes_blanco_negro_rojo",
        display: ["⬜", "⬛", "🟥", "⬜", "⬛", "?"],
        correct: "🟥",
        options: ["⬜", "⬛", "🟥"]
    },
    {
        name: "doble_morado_blanco",
        display: ["🟪", "🟪", "⬜", "⬜", "🟪", "?"],
        correct: "🟪",
        options: ["🟪", "⬜", "🟦"]
    }
];

// Inicializar el juego
document.addEventListener('DOMContentLoaded', () => {
    startNewRound();
});

// Iniciar una nueva ronda
function startNewRound() {
    // Seleccionar un patrón aleatorio
    const randomPattern = patternsDatabase[Math.floor(Math.random() * patternsDatabase.length)];
    currentPatternData = randomPattern;
    correctAnswer = randomPattern.correct;
    showFeedback = false;
    
    // Actualizar la interfaz
    updateUI();
    
    // Audio: Anunciar la ronda
    audioManager.speak(`Ronda ${currentRound + 1}. ¿Qué falta en el patrón? Observa la secuencia y elige la opción correcta`, 1);
}

// Actualizar la interfaz de usuario
function updateUI() {
    // Actualizar progreso
    document.getElementById('current-round').textContent = currentRound + 1;
    document.getElementById('total-rounds').textContent = totalRounds;
    document.getElementById('score').textContent = score + ' puntos';
    document.getElementById('score-display').textContent = score + ' puntos';
    
    // Actualizar barra de progreso
    const progress = ((currentRound + 1) / totalRounds) * 100;
    document.getElementById('progress-fill').style.width = progress + '%';
    
    // Actualizar patrón
    const patternDisplay = document.getElementById('pattern-display');
    patternDisplay.innerHTML = '';
    
    currentPatternData.display.forEach((item, idx) => {
        const div = document.createElement('div');
        div.className = 'pattern-item';
        if (item === "?") {
            div.classList.add('missing');
            div.innerHTML = '<span class="question-mark">?</span>';
        } else {
            div.textContent = item;
        }
        patternDisplay.appendChild(div);
    });
    
    // Actualizar opciones
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    
    // Barajar opciones
    const shuffledOptions = [...currentPatternData.options].sort(() => Math.random() - 0.5);
    
    shuffledOptions.forEach((option, index) => {
        const button = document.createElement('button');
        button.className = 'option-button';
        button.textContent = option;
        button.onclick = () => handleAnswer(option, button);
        optionsContainer.appendChild(button);
    });
    
    // Ocultar feedback
    document.getElementById('feedback').classList.add('hidden');
}

// Manejar respuesta del usuario
function handleAnswer(selected, buttonElement) {
    if (showFeedback) return;
    
    const isCorrect = selected === correctAnswer;
    const feedbackElement = document.getElementById('feedback');
    const feedbackText = document.getElementById('feedback-text');
    
    // Deshabilitar todos los botones
    const allButtons = document.querySelectorAll('.option-button');
    allButtons.forEach(btn => btn.disabled = true);
    
    if (isCorrect) {
        score += 20;
        feedbackText.textContent = "¡Correcto! ✅";
        feedbackElement.className = 'feedback correct';
        audioManager.speak('Correcto. Has identificado el patrón correctamente', 0.95);
        
        // Animar el botón correcto
        buttonElement.classList.add('answer-correct');
        
        // Reproducir sonido de éxito
        playSuccessSound();
    } else {
        feedbackText.innerHTML = `Incorrecto ❌<br>La respuesta correcta era: <strong>${correctAnswer}</strong>`;
        feedbackElement.className = 'feedback incorrect';
        audioManager.speak(`Incorrecto. La respuesta correcta era ${correctAnswer}`, 0.95);
        
        // Mostrar respuesta correcta
        allButtons.forEach(btn => {
            if (btn.textContent === correctAnswer) {
                btn.classList.add('answer-correct');
            } else {
                btn.classList.add('answer-incorrect');
            }
        });
    }
    
    feedbackElement.classList.remove('hidden');
    showFeedback = true;
    
    // Actualizar puntaje
    document.getElementById('score').textContent = score + ' puntos';
    document.getElementById('score-display').textContent = score + ' puntos';
    
    // Avanzar a la siguiente ronda o finalizar el juego
    setTimeout(() => {
        if (currentRound + 1 >= totalRounds) {
            completeGame();
        } else {
            currentRound++;
            startNewRound();
        }
    }, 2500);
}

// Reproducir sonido de éxito
function playSuccessSound() {
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    const notes = [523, 659, 784]; // Do, Mi, Sol
    
    notes.forEach((freq, idx) => {
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.frequency.value = freq;
        oscillator.type = 'sine';
        
        gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.2);
        
        oscillator.start(audioContext.currentTime + idx * 0.1);
        oscillator.stop(audioContext.currentTime + idx * 0.1 + 0.2);
    });
}

// Completar el juego
function completeGame() {
    // Mostrar mensaje de finalización
    const patternCard = document.querySelector('.pattern-card');
    const accuracy = ((score / (totalRounds * 20)) * 100).toFixed(0);
    
    let message = '¡Excelente! 🏆';
    let audioMessage = 'Excelente';
    
    if (accuracy < 60) {
        message = '¡Sigue practicando! 💪';
        audioMessage = 'Sigue practicando';
    } else if (accuracy < 80) {
        message = '¡Muy buen trabajo! 🌟';
        audioMessage = 'Muy buen trabajo';
    }
    
    // Audio: Anunciar finalización
    audioManager.speak(`Juego completado. Puntuación: ${score} puntos. Precisión: ${accuracy} por ciento. ${audioMessage}`, 0.95);
    
    patternCard.innerHTML = `
        <h2>¡Juego Completado!</h2>
        <div class="completion-emoji">🎉</div>
        <div class="completion-score">
            <p>Tu puntaje final: <strong>${score} puntos</strong></p>
            <p>Precisión: <strong>${accuracy}%</strong></p>
            <p style="font-size: 20px; margin-top: 10px;">${message}</p>
        </div>
        <div class="options-container">
            <button class="option-button" onclick="location.reload()">
                Jugar de Nuevo
            </button>
            <button class="option-button" onclick="goToMainPage()">
                Volver al Menú
            </button>
        </div>
    `;
}

// Función para volver a la página principal
function goToMainPage() {
     window.location.href = 'https://plekdev.github.io/BlueMinds/selectores/selector-visual.html';
}