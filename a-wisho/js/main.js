// Lista de minijuegos existentes
const games = [
    {
        id: 'emotion-game',
        title: 'Reconoce Emociones',
        description: 'Aprende a identificar diferentes emociones',
        icon: 'fa-smile',
        path: 'games/emotion-game/index.html'
    },
    {
        id: 'memory-game',
        title: 'Juego de Memoria',
        description: 'Repite la secuencia de colores',
        icon: 'fa-brain',
        path: 'games/memory-game/index.html'
    },
    {
        id: 'patterns-game',
        title: 'Juego de Patrones',
        description: 'Completa los patrones secuenciales',
        icon: 'fa-shapes',
        path: 'games/patterns-game/index.html'
    },
    {
        id: 'auditorio',
        title: 'Juego Auditivo',
        description: 'Desarrolla tu capacidad auditiva',
        icon: 'fa-headphones',
        path: 'games/auditivo/eco-palabras/index.html'
    },
    {
        id: 'kinestico',
        title: 'Juego Kinestésico',
        description: 'Mejora tu coordinación motora',
        icon: 'fa-running',
        path: 'games/kinestesico/sigue-lider/index.html'
    },
    {
        id: 'lecto-escritor',
        title: 'Lectoescritura',
        description: 'Practica la lectura y escritura',
        icon: 'fa-book-open',
        path: 'games/lecto-escritor/oracion-colores/index.html'
    },
    {
        id: 'explora-profesiones',
        title: 'Explora Profesiones',
        description: 'Aprende sobre diferentes profesiones',
        icon: 'fa-user-tie',
        path: 'games/ocupacional/explora-profesiones/index.html'
    },
    {
        id: 'visual-games',
        title: 'Juegos Visuales',
        description: 'Estimula tu percepción visual',
        icon: 'fa-eye',
        path: 'games/visual-games/asocia-imagen/index.html'
    }
];

// Cargar página inicial
document.addEventListener('DOMContentLoaded', () => {
    showPage('home');
});

// Función para mostrar diferentes páginas
function showPage(page) {
    const contentContainer = document.getElementById('content-container');
    
    switch(page) {
        case 'home':
            showHomePage();
            break;
        case 'games':
            showGamesPage();
            break;
        case 'test':
            showTestPage();
            break;
        case 'about':
            showAboutPage();
            break;
        default:
            showHomePage();
    }
}

// Mostrar página de inicio
function showHomePage() {
    const contentContainer = document.getElementById('content-container');
    contentContainer.innerHTML = `
        <div class="container">
            <section class="home-section">
                <h1 class="home-title">Bienvenido a Blue Minds</h1>
                <p class="home-description">
                    Una plataforma educativa diseñada para niños con necesidades especiales, 
                    con minijuegos interactivos que ayudan en el desarrollo de habilidades cognitivas, 
                    sociales y emocionales.
                </p>
                
                <div class="feature-cards">
                    <div class="feature-card games" onclick="showPage('games')">
                        <div class="feature-icon">
                            <i class="fas fa-gamepad"></i>
                        </div>
                        <h3 class="feature-title">Minijuegos</h3>
                        <p class="feature-description">
                            Juegos educativos diseñados para desarrollar diferentes habilidades
                        </p>
                    </div>
                    
                    <div class="feature-card test" onclick="showPage('test')">
                        <div class="feature-icon">
                            <i class="fas fa-clipboard-check"></i>
                        </div>
                        <h3 class="feature-title">Test de Evaluación</h3>
                        <p class="feature-description">
                            Evaluación inicial para personalizar la experiencia de aprendizaje
                        </p>
                    </div>
                    
                    <div class="feature-card progress" onclick="showPage('progress')">
                        <div class="feature-icon">
                            <i class="fas fa-chart-line"></i>
                        </div>
                        <h3 class="feature-title">Seguimiento</h3>
                        <p class="feature-description">
                            Monitorea el progreso y logros de tu hijo
                        </p>
                    </div>
                </div>
            </section>
        </div>
    `;
}

// Mostrar página de juegos
function showGamesPage() {
    const contentContainer = document.getElementById('content-container');
    
    let gamesHTML = '<div class="container"><h2 class="section-title">Minijuegos Educativos</h2><div class="games-grid">';
    
    games.forEach(game => {
        gamesHTML += `
            <div class="game-card">
                <div class="game-thumbnail">
                    <i class="fas ${game.icon}"></i>
                </div>
                <div class="game-info">
                    <h3 class="game-title">${game.title}</h3>
                    <p class="game-description">${game.description}</p>
                    <a href="${game.path}" class="game-button">Jugar</a>
                </div>
            </div>
        `;
    });
    
    gamesHTML += '</div></div>';
    contentContainer.innerHTML = gamesHTML;
}

// Mostrar página de test (ahora redirige al selector)
function showTestPage() {
    const contentContainer = document.getElementById('content-container');
    contentContainer.innerHTML = `
        <div class="container">
            <div class="home-section">
                <h2 class="section-title">Test de Evaluación</h2>
                <p class="home-description">
                    Realiza una evaluación inicial para personalizar la experiencia de aprendizaje.
                    Elige si eres padre o niño para comenzar.
                </p>
                <div style="margin-top: 30px;">
                    <a href="pages/test-selector.html" class="game-button" style="font-size: 18px; padding: 12px 24px;">
                        Comenzar Evaluación
                    </a>
                </div>
            </div>
        </div>
    `;
}

// Mostrar página acerca de
function showAboutPage() {
    const contentContainer = document.getElementById('content-container');
    contentContainer.innerHTML = `
        <div class="container">
            <div class="home-section">
                <h2 class="section-title">Acerca de Blue Minds :D </h2>
                <p class="home-description">
                    Blue Minds es una plataforma educativa diseñada específicamente para niños 
                    con necesidades especiales de aprendizaje. Nuestro objetivo es proporcionar un 
                    entorno seguro y divertido donde los niños puedan desarrollar habilidades 
                    cognitivas, sociales y emocionales a través de minijuegos interactivos.
                </p>
                <p class="home-description">
                    Cada juego está cuidadosamente diseñado por expertos en educación especial 
                    y desarrolladores de software para garantizar una experiencia de aprendizaje 
                    efectiva y atractiva.
                </p>
            </div>
        </div>
    `;
}