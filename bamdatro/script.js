class PokerRoguelike {
    constructor() {
        this.deck = [];
        this.hand = [];
        this.selectedCards = new Set();
        this.score = 0;
        this.multiplier = 1;
        this.round = 1;
        this.targetScore = 300;
        this.handsLeft = 20;
        this.discardsLeft = 10;
        this.currentHandScore = 0;
        this.currentMultiplier = 1;
        
        this.suits = ['♠', '♥', '♦', '♣'];
        this.ranks = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
        this.rankValues = {
            'A': 14, 'K': 13, 'Q': 12, 'J': 11, '10': 10,
            '9': 9, '8': 8, '7': 7, '6': 6, '5': 5, '4': 4, '3': 3, '2': 2
        };
        
        this.initializeEventListeners();
        this.startNewRound();
    }
    
    initializeEventListeners() {
        document.getElementById('playBtn').addEventListener('click', () => this.playHand());
        document.getElementById('discardBtn').addEventListener('click', () => this.discardCards());
        document.getElementById('endRoundBtn').addEventListener('click', () => this.endRound());
        document.getElementById('nextRoundBtn').addEventListener('click', () => this.nextRound());
        document.getElementById('restartBtn').addEventListener('click', () => this.restartGame());
    }
    
    createDeck() {
        this.deck = [];
        for (let suit of this.suits) {
            for (let rank of this.ranks) {
                this.deck.push({
                    suit: suit,
                    rank: rank,
                    value: this.rankValues[rank],
                    color: (suit === '♥' || suit === '♦') ? 'red' : 'black'
                });
            }
        }
        this.shuffleDeck();
    }
    
    shuffleDeck() {
        for (let i = this.deck.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [this.deck[i], this.deck[j]] = [this.deck[j], this.deck[i]];
        }
    }
    
    dealHand() {
        this.hand = [];
        for (let i = 0; i < 5; i++) {
            if (this.deck.length === 0) {
                this.createDeck();
            }
            this.hand.push(this.deck.pop());
        }
        this.selectedCards.clear();
        this.renderHand();
    }
    
    renderHand() {
        const handContainer = document.getElementById('hand');
        handContainer.innerHTML = '';
        
        this.hand.forEach((card, index) => {
            const cardElement = document.createElement('div');
            cardElement.className = `card ${card.color} dealing`;
            if (this.selectedCards.has(index)) {
                cardElement.classList.add('selected');
            }
            
            cardElement.innerHTML = `
                <div class="card-rank">${card.rank}</div>
                <div class="card-suit">${card.suit}</div>
            `;
            
            cardElement.addEventListener('click', () => this.toggleCardSelection(index));
            handContainer.appendChild(cardElement);
        });
    }
    
    toggleCardSelection(index) {
        if (this.selectedCards.has(index)) {
            this.selectedCards.delete(index);
        } else {
            this.selectedCards.add(index);
        }
        this.renderHand();
    }
    
    evaluateHand() {
        const ranks = this.hand.map(card => card.rank);
        const suits = this.hand.map(card => card.suit);
        const values = this.hand.map(card => card.value).sort((a, b) => a - b);
        
        const rankCounts = {};
        ranks.forEach(rank => {
            rankCounts[rank] = (rankCounts[rank] || 0) + 1;
        });
        
        const counts = Object.values(rankCounts).sort((a, b) => b - a);
        const isFlush = suits.every(suit => suit === suits[0]);
        const isStraight = this.checkStraight(values);
        
        // Evaluación de manos (de mayor a menor valor)
        if (isStraight && isFlush && values[4] === 14) {
            return { name: 'Escalera Real', baseScore: 1000, multiplier: 8 };
        }
        if (isStraight && isFlush) {
            return { name: 'Escalera de Color', baseScore: 800, multiplier: 6 };
        }
        if (counts[0] === 4) {
            return { name: 'Póker', baseScore: 600, multiplier: 5 };
        }
        if (counts[0] === 3 && counts[1] === 2) {
            return { name: 'Full House', baseScore: 400, multiplier: 4 };
        }
        if (isFlush) {
            return { name: 'Color', baseScore: 300, multiplier: 3 };
        }
        if (isStraight) {
            return { name: 'Escalera', baseScore: 250, multiplier: 3 };
        }
        if (counts[0] === 3) {
            return { name: 'Trío', baseScore: 150, multiplier: 2 };
        }
        if (counts[0] === 2 && counts[1] === 2) {
            return { name: 'Doble Par', baseScore: 100, multiplier: 2 };
        }
        if (counts[0] === 2) {
            return { name: 'Par', baseScore: 50, multiplier: 1 };
        }
        
        return { name: 'Carta Alta', baseScore: 10, multiplier: 1 };
    }
    
    checkStraight(values) {
        // Verificar escalera normal
        for (let i = 1; i < values.length; i++) {
            if (values[i] !== values[i-1] + 1) {
                // Verificar si es A-2-3-4-5
                if (values[0] === 2 && values[1] === 3 && values[2] === 4 && 
                    values[3] === 5 && values[4] === 14) {
                    return true;
                }
                return false;
            }
        }
        return true;
    }
    
    playHand() {
        if (this.handsLeft <= 0) {
            this.showMessage('¡No te quedan manos! Termina la ronda.');
            return;
        }
        
        const evaluation = this.evaluateHand();
        this.currentHandScore = evaluation.baseScore;
        this.currentMultiplier = evaluation.multiplier;
        
        const handScore = this.currentHandScore * this.currentMultiplier;
        this.score += handScore;
        this.handsLeft--;
        
        document.getElementById('handInfo').textContent = 
            `${evaluation.name} - ${evaluation.baseScore} x ${evaluation.multiplier} = ${handScore} puntos`;
        
        this.updateUI();
        this.showMessage(`¡${evaluation.name}! +${handScore} puntos`);
        
        setTimeout(() => {
            this.dealHand();
            document.getElementById('handInfo').textContent = '';
        }, 2000);
        
        if (this.handsLeft === 0) {
            document.getElementById('playBtn').disabled = true;
        }
    }
    
    discardCards() {
        if (this.discardsLeft <= 0) {
            this.showMessage('¡No te quedan descartes!');
            return;
        }
        
        if (this.selectedCards.size === 0) {
            this.showMessage('Selecciona cartas para descartar');
            return;
        }
        
        // Descartar cartas seleccionadas y reemplazarlas
        const selectedIndices = Array.from(this.selectedCards).sort((a, b) => b - a);
        selectedIndices.forEach(index => {
            if (this.deck.length === 0) {
                this.createDeck();
            }
            this.hand[index] = this.deck.pop();
        });
        
        this.discardsLeft--;
        this.selectedCards.clear();
        this.renderHand();
        this.updateUI();
        this.showMessage(`${selectedIndices.length} carta(s) descartada(s)`);
    }
    
    endRound() {
        const modal = document.getElementById('roundEndModal');
        const title = document.getElementById('modalTitle');
        const message = document.getElementById('modalMessage');
        
        if (this.score >= this.targetScore) {
            title.textContent = '¡Ronda Completada!';
            message.textContent = `¡Excelente! Conseguiste ${this.score} puntos. ¡Pasa a la siguiente ronda balatreate!`;
        } else {
            title.textContent = 'Ronda Fallida tontito';
            message.textContent = `Solo conseguiste ${this.score} de ${this.targetScore} puntos. ¡Game Over!`;
            document.getElementById('nextRoundBtn').style.display = 'none';
        }
        
        modal.classList.add('show');
    }
    
    nextRound() {
        const modal = document.getElementById('roundEndModal');
        modal.classList.remove('show');
        document.getElementById('nextRoundBtn').style.display = 'block';
        
        this.round++;
        this.targetScore = Math.floor(this.targetScore * 1.5);
        this.handsLeft = 3;
        this.discardsLeft = 2;
        
        this.startNewRound();
    }
    
    startNewRound() {
        this.createDeck();
        this.dealHand();
        this.updateUI();
        this.showMessage(`Ronda ${this.round} - Objetivo: ${this.targetScore} puntos`);
    }
    
    restartGame() {
        const modal = document.getElementById('gameOverModal');
        modal.classList.remove('show');
        
        this.score = 0;
        this.round = 1;
        this.targetScore = 300;
        this.handsLeft = 3;
        this.discardsLeft = 2;
        
        this.startNewRound();
    }
    
    updateUI() {
        document.getElementById('score').textContent = this.score;
        document.getElementById('multiplier').textContent = this.multiplier;
        document.getElementById('round').textContent = this.round;
        document.getElementById('target').textContent = this.targetScore;
        document.getElementById('hands').textContent = this.handsLeft;
        document.getElementById('discards').textContent = this.discardsLeft;
        
        document.getElementById('playBtn').disabled = this.handsLeft <= 0;
        document.getElementById('discardBtn').disabled = this.discardsLeft <= 0;
    }
    
    showMessage(message) {
        const messageArea = document.getElementById('messageArea');
        messageArea.textContent = message;
        messageArea.classList.add('score-update');
        setTimeout(() => {
            messageArea.classList.remove('score-update');
        }, 500);
    }
}

// Iniciar el juego cuando se carga la página
document.addEventListener('DOMContentLoaded', () => {
    new PokerRoguelike();
});