// ===== SISTEMA DE IA ADAPTATIVO PARA CLASIFICACIÓN =====
class AIClassificationGame {
    constructor() {
        this.currentRound = 0;
        this.score = 0;
        this.currentPuzzle = null;
        this.showFeedback = false;
        
        // Parámetros de IA
        this.classificationScore = 0;
        this.difficulty = 'easy';
        this.consecutiveCorrect = 0;
        this.consecutiveWrong = 0;
        this.totalQuestions = 5;
        
        // Análisis de errores
        this.distractorsSelected = {};
        this.confusingItems = [];
        this.categoryStats = {};
        this.preferredInterests = {};
        
        // Base de puzzles con múltiples intereses
        this.allPuzzles = {
            easy: [
                {
                    name: "animales_comida_ropa",
                    categories: {
                        animals: { name: '🐾 Animales', color: '#0066CC', items: ['🐱', '🐕', '🐻'] },
                        food: { name: '🍎 Comida', color: '#00B4D8', items: ['🍕', '🍎', '🥕'] },
                        clothes: { name: '👕 Ropa', color: '#0099FF', items: ['👔', '👗', '👟'] }
                    },
                    distractors: ['🌟', '⭐', '☀️'],
                    interest: "numbers"
                },
                {
                    name: "mascotas_frutas_zapatos",
                    categories: {
                        animals: { name: '🐾 Mascotas', color: '#0066CC', items: ['🐶', '🐱', '🐰'] },
                        food: { name: '🍎 Frutas', color: '#00B4D8', items: ['🍌', '🍊', '🍇'] },
                        clothes: { name: '👠 Zapatos', color: '#0099FF', items: ['👞', '👟', '🩴'] }
                    },
                    distractors: ['🎨', '🎭', '🎪'],
                    interest: "numbers"
                }
            ],
            medium: [
                {
                    name: "animales_comida_accesorios",
                    categories: {
                        animals: { name: '🐾 Animales', color: '#0066CC', items: ['🦁', '🐘', '🦒'] },
                        food: { name: '🍔 Comida', color: '#00B4D8', items: ['🍔', '🌭', '🍟'] },
                        clothes: { name: '⌚ Accesorios', color: '#0099FF', items: ['👓', '⌚', '👜'] }
                    },
                    distractors: ['🚗', '✈️', '🚢'],
                    interest: "general"
                },
                {
                    name: "aves_verduras_prendas",
                    categories: {
                        animals: { name: '🦅 Aves', color: '#0066CC', items: ['🦅', '🦆', '🦉'] },
                        food: { name: '🥬 Verduras', color: '#00B4D8', items: ['🥬', '🌽', '🥒'] },
                        clothes: { name: '🧥 Prendas', color: '#0099FF', items: ['🧥', '👖', '🧢'] }
                    },
                    distractors: ['🎸', '🎹', '🎺'],
                    interest: "general"
                }
            ],
            hard: [
                {
                    name: "animales_marinos_postre_ropa_formal",
                    categories: {
                        animals: { name: '🐠 Marinos', color: '#0066CC', items: ['🐠', '🐙', '🦈'] },
                        food: { name: '🍰 Postres', color: '#00B4D8', items: ['🍰', '🍪', '🍩'] },
                        clothes: { name: '🤵 Formal', color: '#0099FF', items: ['🤵', '👰', '🎩'] }
                    },
                    distractors: ['💎', '👑', '🔱'],
                    interest: "sophisticated"
                },
                {
                    name: "insectos_bebidas_deportes",
                    categories: {
                        animals: { name: '🦋 Insectos', color: '#0066CC', items: ['🦋', '🐛', '🐝'] },
                        food: { name: '🥤 Bebidas', color: '#00B4D8', items: ['🥤', '🍷', '☕'] },
                        clothes: { name: '⚽ Deportes', color: '#0099FF', items: ['⚽', '🏀', '🎾'] }
                    },
                    distractors: ['🌴', '🌲', '🌳'],
                    interest: "sports"
                }
            ]
        };
        
        // Inicializar estadísticas
        this.initializeStats();
        this.loadPuzzle();
    }
    
    initializeStats() {
        Object.values(this.allPuzzles).forEach(puzzles => {
            puzzles.forEach(puzzle => {
                Object.keys(puzzle.categories).forEach(categoryKey => {
                    const category = puzzle.categories[categoryKey];
                    this.categoryStats[category.name] = {
                        attempts: 0,
                        correct: 0,
                        errors: []
                    };
                });
                this.preferredInterests[puzzle.interest] = 0;
            });
        });
    }
    
    selectNextPuzzle() {
        const puzzlesForDifficulty = this.allPuzzles[this.difficulty];
        
        // Priorizar puzzles problemáticos
        const problematicPuzzles = puzzlesForDifficulty.filter(puzzle => {
            const allCorrect = Object.keys(puzzle.categories).every(key => {
                const categoryName = puzzle.categories[key].name;
                const stats = this.categoryStats[categoryName];
                return stats && stats.correct > 0;
            });
            return !allCorrect;
        });
        
        if (problematicPuzzles.length > 0 && Math.random() > 0.4) {
            return problematicPuzzles[Math.floor(Math.random() * problematicPuzzles.length)];
        }
        
        return puzzlesForDifficulty[Math.floor(Math.random() * puzzlesForDifficulty.length)];
    }
    
    adjustDifficulty() {
        this.classificationScore = (this.score / (this.totalQuestions * 30)) * 100;
        
        // Si 3 aciertos seguidos y >= 80% → aumentar dificultad
        if (this.consecutiveCorrect >= 3 && this.classificationScore >= 80) {
            if (this.difficulty === 'easy') {
                this.difficulty = 'medium';
                audioManager.speak('Aumentando dificultad a nivel medio', 0.9);
            } else if (this.difficulty === 'medium') {
                this.difficulty = 'hard';
                audioManager.speak('Aumentando dificultad a nivel difícil', 0.9);
            }
        }
        // Si está teniendo dificultad → reducir
        else if (this.consecutiveWrong >= 2 || this.classificationScore < 50) {
            if (this.difficulty === 'hard') {
                this.difficulty = 'medium';
                audioManager.speak('Reduciendo dificultad a nivel medio', 0.9);
            } else if (this.difficulty === 'medium') {
                this.difficulty = 'easy';
                audioManager.speak('Reduciendo dificultad a nivel fácil', 0.9);
            }
            this.consecutiveWrong = 0;
        }
        
        this.showDifficultyIndicator();
    }
    
    showDifficultyIndicator() {
        const indicator = document.getElementById('difficulty-indicator');
        const numDistracters = this.difficulty === 'easy' ? 2 : (this.difficulty === 'medium' ? 3 : 4);
        const levels = {
            easy: `⭐ Dificultad: FÁCIL (${numDistracters} distractores)`,
            medium: `⭐⭐ Dificultad: MEDIO (${numDistracters} distractores)`,
            hard: `⭐⭐⭐ Dificultad: DIFÍCIL (${numDistracters} distractores)`
        };
        
        indicator.textContent = levels[this.difficulty];
        indicator.style.display = 'block';
    }
    
    detectConfusion() {
        // Si hay muchos errores → mostrar pista con audio
        if (this.consecutiveWrong >= 1 && this.confusingItems.length > 0) {
            this.showAudioHint();
        } else {
            document.getElementById('audio-hint').style.display = 'none';
        }
    }
    
    showAudioHint() {
        const hintBox = document.getElementById('audio-hint');
        const confusingItem = this.confusingItems[this.confusingItems.length - 1];
        const hints = [
            `💡 Pista: "${confusingItem}" pertenece a la categoría principal de su grupo`,
            `💡 Pista: Piensa en la función principal de "${confusingItem}"`,
            `💡 Pista: "${confusingItem}" es más similar a elementos del mismo color`
        ];
        const selectedHint = hints[Math.floor(Math.random() * hints.length)];
        hintBox.textContent = selectedHint;
        hintBox.style.display = 'block';
        
        // Reproducir audio de pista
        audioManager.speak(selectedHint.replace('💡 Pista: ', ''), 0.9);
    }
    
    loadPuzzle() {
        this.showFeedback = false;
        
        // Seleccionar puzzle
        const selectedPuzzle = this.selectNextPuzzle();
        this.currentPuzzle = {
            data: selectedPuzzle,
            categories: JSON.parse(JSON.stringify(selectedPuzzle.categories)),
            allItems: []
        };
        
        // Crear items con distractores
        Object.keys(this.currentPuzzle.categories).forEach(key => {
            this.currentPuzzle.allItems.push(...this.currentPuzzle.categories[key].items);
            this.currentPuzzle.categories[key].items = [];
        });
        
        // Agregar distractores ESPECÍFICOS (elegidos manualmente)
        const numDistracters = selectedPuzzle.distractors.length;
        this.currentPuzzle.allItems.push(...selectedPuzzle.distractors);
        
        // Barajar todos los items
        this.currentPuzzle.allItems.sort(() => Math.random() - 0.5);
        
        // Actualizar UI
        document.getElementById('current-round').textContent = this.currentRound + 1;
        document.getElementById('total-rounds').textContent = this.totalQuestions;
        
        const progress = ((this.currentRound + 1) / this.totalQuestions) * 100;
        document.getElementById('progress-fill').style.width = progress + '%';
        
        this.renderCategories();
        this.renderItems();
        
        document.getElementById('feedback').classList.remove('show');
        document.getElementById('ai-analysis').classList.remove('show');
        
        this.adjustDifficulty();
        this.detectConfusion();
        
        // Audio: Anunciar la ronda
        audioManager.speak(`Ronda ${this.currentRound + 1}. Agrupa los emojis por categoría`, 1);
    }
    
    renderCategories() {
        const container = document.getElementById('categories-container');
        container.innerHTML = '';
        
        Object.keys(this.currentPuzzle.categories).forEach(categoryKey => {
            const category = this.currentPuzzle.categories[categoryKey];
            const categoryBox = document.createElement('div');
            categoryBox.className = 'category-box';
            categoryBox.dataset.category = categoryKey;
            
            categoryBox.addEventListener('dragover', (e) => this.handleDragOver(e));
            categoryBox.addEventListener('drop', (e) => this.handleDrop(e, categoryKey));
            
            categoryBox.innerHTML = `
                <div class="category-title" style="background: linear-gradient(135deg, ${category.color} 0%, ${this.lightenColor(category.color)} 100%);">
                    ${category.name}
                </div>
                <div class="category-items" id="category-${categoryKey}">
                    ${category.items.map((item, idx) => `
                        <div class="item-emoji" onclick="window.game.removeItemFromCategory('${categoryKey}', ${idx})" title="Haz clic para sacar">
                            ${item}
                        </div>
                    `).join('')}
                </div>
            `;
            container.appendChild(categoryBox);
        });
    }
    
    handleDragOver(e) {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        return false;
    }
    
    handleDrop(e, categoryKey) {
        e.preventDefault();
        const item = e.dataTransfer.getData('text/plain');
        this.addItemToCategory(item, categoryKey);
        return false;
    }
    
    renderItems() {
        const pool = document.getElementById('items-pool');
        pool.innerHTML = '';
        
        const usedItems = new Set();
        Object.keys(this.currentPuzzle.categories).forEach(key => {
            this.currentPuzzle.categories[key].items.forEach(item => usedItems.add(item));
        });
        
        this.currentPuzzle.allItems.forEach((item) => {
            if (!usedItems.has(item)) {
                const itemDiv = document.createElement('div');
                itemDiv.className = 'draggable-item';
                itemDiv.textContent = item;
                itemDiv.draggable = true;
                itemDiv.dataset.item = item;
                
                itemDiv.addEventListener('dragstart', (e) => this.handleDragStart(e, item));
                itemDiv.addEventListener('dragend', (e) => this.handleDragEnd(e));
                
                pool.appendChild(itemDiv);
            }
        });
    }
    
    handleDragStart(e, item) {
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', item);
        e.target.style.opacity = '0.5';
    }
    
    handleDragEnd(e) {
        e.target.style.opacity = '1';
    }
    
    addItemToCategory(item, categoryKey) {
        if (!this.currentPuzzle.categories[categoryKey].items.includes(item)) {
            this.currentPuzzle.categories[categoryKey].items.push(item);
            
            // Detectar si es un error
            const isInCorrectCategory = this.currentPuzzle.data.categories[categoryKey].items.includes(item);
            if (!isInCorrectCategory) {
                this.distractorsSelected[item] = (this.distractorsSelected[item] || 0) + 1;
                this.confusingItems.push(item);
                
                // Animar error
                this.animateError(item);
            }
            
            this.renderCategories();
            this.renderItems();
        }
    }
    
    removeItemFromCategory(categoryKey, index) {
        this.currentPuzzle.categories[categoryKey].items.splice(index, 1);
        this.renderCategories();
        this.renderItems();
    }
    
    animateError(item) {
        const itemElements = document.querySelectorAll('.draggable-item');
        itemElements.forEach(el => {
            if (el.textContent === item) {
                el.classList.add('error-shake');
                setTimeout(() => el.classList.remove('error-shake'), 400);
            }
        });
    }
    
    resetClassification() {
        Object.keys(this.currentPuzzle.categories).forEach(key => {
            this.currentPuzzle.categories[key].items = [];
        });
        this.confusingItems = [];
        this.renderCategories();
        this.renderItems();
    }
    
    checkClassification() {
        let allCorrect = true;

        Object.keys(this.currentPuzzle.categories).forEach(key => {
            const currentItems = this.currentPuzzle.categories[key].items;
            const correctItems = this.currentPuzzle.data.categories[key].items;

            if (JSON.stringify(currentItems.sort()) !== JSON.stringify(correctItems.sort())) {
                allCorrect = false;
            }
        });

        const feedbackElement = document.getElementById('feedback');
        const feedbackText = document.getElementById('feedback-text');

        if (allCorrect) {
            this.score += 30;
            this.consecutiveCorrect++;
            this.consecutiveWrong = 0;
            
            feedbackText.textContent = '¡Perfecto! Todas las clasificaciones son correctas 🎉';
            feedbackElement.className = 'feedback correct show';
            audioManager.speak('Perfecto. Todas las clasificaciones son correctas', 0.95);
            
            // Reproducir sonido
            this.playSuccessSound();
        } else {
            this.consecutiveWrong++;
            this.consecutiveCorrect = 0;
            
            feedbackText.textContent = 'Algunos items no están en la categoría correcta. Intenta de nuevo 😊';
            feedbackElement.className = 'feedback incorrect show';
            audioManager.speak('Algunos items no están en la categoría correcta. Intenta de nuevo', 0.95);
        }

        document.getElementById('score').textContent = this.score + ' puntos';
        document.getElementById('score-display').textContent = this.score + ' puntos';
        
        this.showFeedback = true;
        this.adjustDifficulty();
        this.detectConfusion();
        this.showAIAnalysis();

        setTimeout(() => {
            if (this.currentRound + 1 >= this.totalQuestions) {
                this.endGame();
            } else {
                this.currentRound++;
                this.loadPuzzle();
            }
        }, 2500);
    }
    
    playSuccessSound() {
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
    
    showAIAnalysis() {
        const analysisEl = document.getElementById('ai-analysis');
        const analysisText = document.getElementById('analysis-text');
        
        let analysis = '';
        
        if (Object.keys(this.distractorsSelected).length > 0) {
            const topDistractor = Object.entries(this.distractorsSelected)
                .sort((a, b) => b[1] - a[1])[0];
            analysis += `🚫 Distractor frecuente: "${topDistractor[0]}". `;
        }
        
        if (this.consecutiveCorrect > 0) {
            analysis += `✅ ${this.consecutiveCorrect} clasificación(es) perfecta(s). `;
        }
        if (this.consecutiveWrong > 0) {
            analysis += `❌ ${this.consecutiveWrong} error(es) seguido(s). `;
        }
        
        if (this.difficulty === 'hard') {
            analysis += '📈 Nivel: DIFÍCIL. ';
        } else if (this.difficulty === 'easy') {
            analysis += '📉 Nivel: FÁCIL. ';
        } else {
            analysis += '➡️ Nivel: MEDIO. ';
        }
        
        analysisText.textContent = analysis || 'Clasificación en desarrollo...';
        analysisEl.classList.add('show');
    }
    
    endGame() {
        const gameCard = document.querySelector('.game-card');
        const avgAccuracy = ((this.score / (this.totalQuestions * 30)) * 100).toFixed(1);
        const finalScore = this.classificationScore.toFixed(0);
        
        let performanceMessage = '¡Excelente clasificación! 🏆';
        let performanceAudio = 'Excelente clasificación';
        
        if (avgAccuracy < 60) {
            performanceMessage = '¡Sigue practicando! La clasificación mejorará. 💪';
            performanceAudio = 'Sigue practicando, la clasificación mejorará';
        } else if (avgAccuracy < 80) {
            performanceMessage = '¡Muy buen trabajo! Tu clasificación mejora. 🌟';
            performanceAudio = 'Muy buen trabajo, tu clasificación mejora';
        }

        audioManager.speak(`Juego completado. Puntuación: ${this.score} puntos. Precisión: ${avgAccuracy} por ciento. ${performanceAudio}`, 0.95);
        
        gameCard.innerHTML = `
            <h2>¡Juego Completado!</h2>
            <div style="font-size: 80px; margin: 30px 0;">🎉</div>
            
            <div style="background: linear-gradient(135deg, #0066CC 0%, #0099FF 100%); color: white; padding: 20px; border-radius: 12px; margin: 20px 0;">
                <div style="font-size: 24px; font-weight: 700; margin-bottom: 10px;">Tu puntaje final: ${this.score} puntos</div>
                <div style="font-size: 18px; opacity: 0.9;">Precisión: ${avgAccuracy}%</div>
            </div>

            <div style="background: rgba(0, 102, 204, 0.1); border-left: 4px solid #0066CC; padding: 15px; border-radius: 8px; margin: 20px 0; text-align: left; color: #1F2937; font-size: 14px;">
                <strong>📊 Análisis Final de IA - Clasificación:</strong>
                <div style="margin-top: 10px; line-height: 1.8;">
                    <div>✓ Puntuación de clasificación: ${finalScore}%</div>
                    <div>✓ Distractores que confundieron: ${Object.keys(this.distractorsSelected).length}</div>
                    <div>✓ Elementos problemáticos: ${this.confusingItems.length > 0 ? this.confusingItems.slice(0, 3).join(', ') : 'Ninguno'}</div>
                    <div>✓ Nivel final: ${this.difficulty.toUpperCase()}</div>
                </div>
            </div>

            <div style="color: var(--primary-blue); font-size: 18px; font-weight: 600; margin: 15px 0;">
                ${performanceMessage}
            </div>

            <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 15px; margin-top: 20px;">
                <button style="background: linear-gradient(135deg, #0066CC 0%, #0099FF 100%); color: white; padding: 15px; border: none; border-radius: 12px; font-size: 16px; font-weight: 700; cursor: pointer; transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'" onclick="location.reload()">
                    Jugar de Nuevo
                </button>
                <button style="background-color: #00B4D8; color: white; padding: 15px; border: none; border-radius: 12px; font-size: 16px; font-weight: 700; cursor: pointer; transition: transform 0.2s;" onmouseover="this.style.transform='scale(1.05)'" onmouseout="this.style.transform='scale(1)'" onclick="goToMainPage()">
                    Volver al Menú
                </button>
            </div>
        `;
    }
    
    lightenColor(color) {
        const num = parseInt(color.replace("#", ""), 16);
        const amt = 30;
        const R = (num >> 16) + amt;
        const G = (num >> 8 & 0x00FF) + amt;
        const B = (num & 0x0000FF) + amt;
        return "#" + (0x1000000 + (R < 255 ? R : 255) * 0x10000 +
            (G < 255 ? G : 255) * 0x100 + (B < 255 ? B : 255))
            .toString(16).slice(1);
    }
    
    goToMainPage() {
        window.location.href = 'https://plekdev.github.io/BlueMinds/selectores/selector-visual.html';
    }
}

// Inicializar el juego
let game;
document.addEventListener('DOMContentLoaded', () => {
    game = new AIClassificationGame();
    window.game = game;
    window.goToMainPage = () => game.goToMainPage();
});