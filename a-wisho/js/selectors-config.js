// Este archivo contiene la configuración de todas las categorías y sus juegos

const categoryConfig = {
    auditivo: {
        name: 'Auditivo',
        icon: 'fa-volume-up',
        color: '#0066CC',
        description: 'Aprende escuchando y a través del sonido',
        games: {
            nivel1: [
                {
                    id: 'eco-palabras',
                    title: 'El Eco de las Palabras',
                    description: 'Repite las palabras que escuchas',
                    icon: '🔊',
                    path: '../games/auditivo/nivel-1/eco-palabras/index.html'
                }
            ],
            nivel2: [
                {
                    id: 'adivinanza-sonidos',
                    title: 'Adivinanza de Sonidos',
                    description: 'Identifica qué objeto produce cada sonido',
                    icon: '🎵',
                    path: '../games/auditivo/nivel-2/adivinanza-sonidos/index.html'
                }
            ],
            nivel3: [
                {
                    id: 'historia-audio',
                    title: 'Historia de Audio',
                    description: 'Escucha y responde preguntas sobre la historia',
                    icon: '🎧',
                    path: '../games/auditivo/nivel-3/historia-audio/index.html'
                }
            ]
        }
    },
    kinestesico: {
        name: 'Kinestésico',
        icon: 'fa-hand-paper',
        color: '#00B4D8',
        description: 'Aprende a través del movimiento y la práctica',
        games: {
            nivel1: [
                {
                    id: 'emotion-game',
                    title: 'Reconoce Emociones',
                    description: 'Aprende a identificar diferentes emociones',
                    icon: '😊',
                    path: '../games/kinestesico/nivel-1/emotion-game/index.html'
                },
                {
                    id: 'sigue-lider',
                    title: 'Sigue al Líder de Movimiento',
                    description: 'Imita movimientos y mejora coordinación',
                    icon: '🏃',
                    path: '../games/kinestesico/nivel-1/sigue-lider/index.html'
                }
            ],
            nivel2: [
                {
                    id: 'ritmo-movimiento',
                    title: 'Ritmo y Movimiento',
                    description: 'Sigue el ritmo con movimientos coordinados',
                    icon: '💃',
                    path: '../games/kinestesico/nivel-2/ritmo-movimiento/index.html'
                }
            ],
            nivel3: []
        }
    },
    'lecto-escritor': {
        name: 'Lector-Escritor',
        icon: 'fa-book',
        color: '#E91E63',
        description: 'Aprende leyendo y escribiendo información',
        games: {
            nivel1: [
                {
                    id: 'oracion-colores',
                    title: 'Arma la Oración con Colores',
                    description: 'Ordena las palabras para formar oraciones',
                    icon: '📝',
                    path: '../games/lecto-escritor/nivel-1/oracion-colores/index.html'
                }
            ],
            nivel2: [
                {
                    id: 'completar-oracion',
                    title: 'Completa la Oración',
                    description: 'Escribe la palabra que falta en la oración',
                    icon: '✍️',
                    path: '../games/lecto-escritor/nivel-2/completar-oracion/index.html'
                }
            ],
            nivel3: []
        }
    },
    visual: {
        name: 'Visual',
        icon: 'fa-eye',
        color: '#F59E0B',
        description: 'Aprende a través de imágenes y representaciones',
        games: {
            nivel1: [
                {
                    id: 'memory-game',
                    title: 'Juego de Memoria',
                    description: 'Repite la secuencia de colores',
                    icon: '🎮',
                    path: '../games/visual/nivel-1/memory-game/index.html'
                },
                {
                    id: 'memoriza-imagen',
                    title: 'Memoriza y Encuentra',
                    description: 'Observa la imagen y encuéntrala entre las opciones',
                    icon: '🎨',
                    path: '../games/visual/nivel-1/memoriza-imagen/index.html'
                },
                {
                    id: 'detective-errores',
                    title: 'Detective de Errores',
                    description: 'Forma oraciones correctas detectando errores',
                    icon: '🔍',
                    path: '../games/visual/nivel-1/detective-errores/index.html'
                }
            ],
            nivel2: [
                {
                    id: 'completa-escena',
                    title: 'Completa la Escena',
                    description: 'Completa oraciones seleccionando la imagen correcta',
                    icon: '🖼️',
                    path: '../games/visual/nivel-2/completa-escena/index.html'
                },
                {
                    id: 'ordena-historia',
                    title: 'Ordena la Historia',
                    description: 'Ordena las imágenes en secuencia lógica',
                    icon: '📖',
                    path: '../games/visual/nivel-2/ordena-historia/index.html'
                },
                {
                    id: 'explora-profesiones',
                    title: 'Explora Profesiones',
                    description: 'Aprende sobre diferentes trabajos',
                    icon: '💼',
                    path: '../games/visual/nivel-2/explora-profesiones/index.html'
                }
            ],
            nivel3: [
                {
                    id: 'asocia-imagen',
                    title: 'Asocia la Imagen Correcta',
                    description: 'Asocia palabras con las imágenes correctas',
                    icon: '🎯',
                    path: '../games/visual/nivel-3/asocia-imagen/index.html'
                },
                {
                    id: 'clasificacion-grupos',
                    title: 'Clasificación de Grupos',
                    description: 'Agrupa elementos por categorías',
                    icon: '📦',
                    path: '../games/visual/nivel-3/clasificacion-grupos/index.html'
                },
                {
                    id: 'patterns-game',
                    title: 'Juego de Patrones',
                    description: 'Completa los patrones secuenciales',
                    icon: '🧩',
                    path: '../games/visual/nivel-3/patterns-game/index.html'
                }
            ]
        }
    }
};

// Función para obtener configuración de una categoría
function getCategoryConfig(categoryName) {
    return categoryConfig[categoryName];
}

// Función para obtener todos los juegos de una categoría
function getCategoryGames(categoryName) {
    const config = categoryConfig[categoryName];
    if (!config) return [];
    
    const allGames = [];
    Object.keys(config.games).forEach(level => {
        config.games[level].forEach(game => {
            allGames.push({
                ...game,
                nivel: level.replace('nivel', '')
            });
        });
    });
    return allGames;
}