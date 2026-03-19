/**
 * BlueMinds i18n - Sistema de internacionalización
 * Soporta: Español (es), English (en), Português (pt)
 */

const BLUEMINDS_TRANSLATIONS = {
  es: {
    // ── NAV / HEADER ──────────────────────────────────────────────
    "nav.home":            "Inicio",
    "nav.test":            "Test",
    "nav.about":           "Acerca de",
    "nav.logout":          "Cerrar Sesión",
    "nav.about_us":        "Sobre Nosotros",

    // ── INDEX ─────────────────────────────────────────────────────
    "index.badge":         "Plataforma de Educación Inclusiva",
    "index.title":         "Bienvenido a BlueMinds",
    "index.subtitle":      "Una plataforma educativa diseñada para niños con necesidades especiales, con minijuegos interactivos que ayudan en el desarrollo de habilidades cognitivas, sociales y emocionales.",
    "index.btn_register":  "Crear Cuenta",
    "index.btn_login":     "Iniciar Sesión",
    "index.feat1_title":   "Desarrollo Cognitivo",
    "index.feat1_desc":    "Actividades diseñadas para estimular el pensamiento y la memoria",
    "index.feat2_title":   "Habilidades Sociales",
    "index.feat2_desc":    "Aprende a comunicarte y relacionarte de forma efectiva",
    "index.feat3_title":   "Progreso Personalizado",
    "index.feat3_desc":    "Seguimiento de tu avance con reportes detallados",
    "index.footer":        "© 2025 BlueMinds - Plataforma de Educación Inclusiva",

    // ── LOGIN ─────────────────────────────────────────────────────
    "login.tagline":       "Plataforma de Educación Inclusiva",
    "login.status_ok":     "Servidor conectado",
    "login.status_fail":   "Servidor no disponible - Verifica la conexión",
    "login.title":         "Iniciar Sesión",
    "login.email":         "Email",
    "login.password":      "Contraseña",
    "login.remember":      "Recuérdame",
    "login.btn":           "Iniciar Sesión",
    "login.or_google":     "O inicia sesión / regístrate con Google",
    "login.no_account":    "¿No tienes cuenta?",
    "login.create_here":   "Crear una cuenta aquí",
    "login.register_title":"Crear Cuenta",
    "login.name":          "Nombre Completo",
    "login.birth":         "Fecha de Nacimiento",
    "login.country":       "País",
    "login.confirm":       "Confirmar Contraseña",
    "login.btn_register":  "Crear Cuenta",
    "login.have_account":  "¿Ya tienes cuenta?",
    "login.login_here":    "Inicia sesión aquí",

    // ── ONBOARDING ────────────────────────────────────────────────
    "onboard.title":       "Completa tu Perfil",
    "onboard.subtitle":    "Para personalizar tu experiencia en BlueMinds y cumplir con los requisitos, necesitamos estos datos.",
    "onboard.birth":       "Fecha de Nacimiento",
    "onboard.country":     "País",
    "onboard.select":      "Selecciona tu país",
    "onboard.btn":         "Continuar",
    "onboard.saving":      "Guardando...",
    "onboard.footer":      "BlueMinds • Educación Inclusiva con IA • 2025-2026",

    // ── MAIN (BlueMindsMain) ──────────────────────────────────────
    "main.adventure":      "Selecciona tu aventura",
    "main.dino_msg":       "\"¡Hola! ¿A qué mundo quieres viajar hoy?\"",
    "main.cat_auditivo":   "Auditivo",
    "main.cat_auditivo_d": "Aprende escuchando",
    "main.cat_kines":      "Kinestésico",
    "main.cat_kines_d":    "Aprende haciendo",
    "main.cat_visual":     "Visual",
    "main.cat_visual_d":   "Aprende viendo",
    "main.cat_lecto":      "Lecto-escritor",
    "main.cat_lecto_d":    "Lectura y escritura",
    "main.progress_title": "Tu progreso con Dino Edu",
    "main.games_played":   "Juegos jugados",
    "main.avg_accuracy":   "Precisión promedio",
    "main.best_score":     "Mejor puntaje",
    "main.improvement":    "Mejora general",
    "main.analyzing":      "Analizando tu aventura...",
    "main.specialist":     "Análisis de Especialista BlueBot",
    "main.specialist_sub": "Nivel de dominio detectado por nuestra IA",
    "main.games_short":    "jgs",
    "main.consulting":     "Consultando con BlueBot sobre tus talentos...",
    "main.chart_score":    "Tu Evolución (Puntos)",
    "main.chart_style":    "Estilos Dominantes",
    "main.history":        "Historial de Evaluaciones",
    "main.history_date":   "Fecha",
    "main.history_type":   "Tipo",
    "main.history_style":  "Mejor Estilo",
    "main.history_level":  "Nivel",
    "main.history_points": "Puntos",
    "main.history_time":   "Tiempo",
    "main.history_load":   "Cargando tu historia...",
    "main.recs":           "Recomendaciones para ti",
    "main.footer":         "© BlueMinds - Plataforma de Educación Inclusiva",

    // ── PERFIL ────────────────────────────────────────────────────
    "perfil.title":        "Mi Perfil",
    "perfil.name":         "Nombre",
    "perfil.email":        "Email",
    "perfil.email_note":   "El email no se puede cambiar",
    "perfil.birth":        "Fecha de Nacimiento",
    "perfil.country":      "País",
    "perfil.change_photo": "Cambiar foto de perfil",
    "perfil.birth_none":   "No especificada",
    "perfil.country_none": "No especificado",
    "perfil.save":         "Guardar",
    "perfil.cancel":       "Cancelar",
    "perfil.tasks":        "Tareas Completadas",
    "perfil.streak":       "Racha Actual (días)",
    "perfil.achievements": "Logros Desbloqueados",
    "perfil.ach_title":    "Logros",
    "perfil.ach_sub":      "Tus logros desbloqueados en BlueMinds",
    "perfil.ach_unlocked": "Desbloqueado",
    "perfil.account":      "Información de la Cuenta",
    "perfil.account_sub":  "Detalles y configuración de tu cuenta",
    "perfil.status":       "Estado de la cuenta",
    "perfil.status_desc":  "Tu cuenta está activa",
    "perfil.status_badge": "Activa",
    "perfil.member":       "Miembro desde",
    "perfil.new_user":     "Nuevo usuario",
    "perfil.select_country": "Selecciona tu país",

    // ── TEST SELECTOR ─────────────────────────────────────────────
    "test.who":            "¿Quién tomará el test?",
    "test.desc":           "Selecciona la opción que corresponda para comenzar la evaluación",
    "test.parent":         "Soy Padre/Madre",
    "test.child":          "Soy Niño/Niña",
    "test.back":           "Volver",

    // ── SELECTORES DE CATEGORÍA ───────────────────────────────────
    "sel.back":            "Volver",
    "sel.home":            "Inicio",
    "sel.all":             "Todos los Niveles",
    "sel.level":           "Nivel",
    "sel.play":            "Jugar",
    "sel.no_games":        "No hay juegos disponibles para este nivel",
    "sel.games_singular":  "juego",
    "sel.games_plural":    "juegos",

    "sel.aud_title":       "Auditivo",
    "sel.aud_desc":        "Aprende escuchando y a través del sonido",
    "sel.kin_title":       "Kinestésico",
    "sel.kin_desc":        "Aprende a través del movimiento y la práctica",
    "sel.lec_title":       "Lector-Escritor",
    "sel.lec_desc":        "Aprende leyendo y escribiendo información",
    "sel.vis_title":       "Visual",
    "sel.vis_desc":        "Aprende a través de imágenes y representaciones",

    // ── JUEGOS AUDITIVO ───────────────────────────────────────────────
    "game.cadena_palabras":     "La Cadena de Palabras",
    "game.cadena_desc":         "Escucha una cadena de palabras y selecciona las imágenes en orden correcto",
    "game.eco_palabras":        "El Eco de las Palabras",
    "game.eco_desc":            "Repite las palabras que escuchas con precisión",
    "game.cadena_palabras_2":   "La Cadena de Palabras 2",
    "game.cadena_2_desc":       "Versión adaptativa con IA que se ajusta a tu nivel de memoria auditiva",
    "game.completa_oracion_aud": "Completa la Oración Auditiva",
    "game.completa_aud_desc":   "Escucha oraciones incompletas y elige la palabra que las completa",
    "game.eco_palabras_2":      "Eco de Palabras 2",
    "game.eco_2_desc":          "Escucha e imita los sonidos de diferentes animales",

    // ── JUEGOS KINESTÉSICO ────────────────────────────────────────────
    "game.emotion":             "Narración Emocional Interactiva",
    "game.emotion_desc":        "Observa GIFs emocionales e imita las expresiones",
    "game.sigue_lider":         "Sigue al Líder de Movimiento",
    "game.sigue_lider_desc":    "Imita movimientos del avatar y mejora coordinación",
    "game.atencion":            "Atención Conjunta con Sonido",
    "game.atencion_desc":       "Sigue objetos animados y repite palabras",
    "game.regulando":           "Regulando el Grito",
    "game.regulando_desc":      "Aprende técnicas de respiración y control emocional",
    "game.ritmo":               "El Ritmo de las Sílabas",
    "game.ritmo_desc":          "Sigue el ritmo de palabras con movimientos",
    "game.emotion_3":           "Narración Emocional Avanzada",
    "game.emotion_3_desc":      "Versión avanzada con análisis profundo",
    "game.ritmo_2":             "Ritmo de Sílabas Avanzado",
    "game.ritmo_2_desc":        "Mayor complejidad y velocidad variable",
    "game.sigue_lider_2":       "Sigue al Líder Avanzado",
    "game.sigue_lider_2_desc":  "Movimientos más complejos y análisis detallado",

    // ── JUEGOS LECTO-ESCRITOR ────────────────────────────────────────
    "game.error_gramatical":    "Encuentra el Error Gramatical",
    "game.error_desc":          "Identifica y corrige errores de verbo, género y número.",
    "game.lee_asocia":          "Lee y Asocia",
    "game.lee_asocia_desc":     "Lee oraciones y selecciona la imagen correcta. Análisis IA avanzado.",
    "game.oracion_colores":     "Arma la Oración con Colores",
    "game.oracion_desc":        "Arrastra palabras en orden correcto. Sistema de pistas progresivo.",
    "game.completa_oracion_esc": "Completa la Oración Escrita",
    "game.completa_esc_desc":   "Completa oraciones observando imágenes. Análisis de comprensión.",
    "game.escribe_palabra":     "Escribe la Palabra de la Imagen",
    "game.escribe_desc":        "Memoriza y escribe palabras. Sistema de dos fases con countdown.",
    "game.lee_asocia_2":        "Lee y Asocia 2",
    "game.lee_asocia_2_desc":   "Versión avanzada con vocabulario complejo y análisis profundo.",

    // ── JUEGOS VISUAL ─────────────────────────────────────────────────
    "game.memory":              "Juego de Memoria",
    "game.memory_desc":         "Repite la secuencia de colores",
    "game.memoriza":            "Memoriza y Encuentra",
    "game.memoriza_desc":       "Observa la imagen y encuéntrala entre las opciones",
    "game.detective":           "Detective de Errores",
    "game.detective_desc":      "Forma oraciones correctas detectando errores",
    "game.completa_escena":     "Completa la Escena",
    "game.completa_escena_desc": "Completa oraciones seleccionando la imagen correcta",
    "game.ordena_historia":     "Ordena la Historia",
    "game.ordena_desc":         "Ordena las imágenes en secuencia lógica",
    "game.explora_profesiones": "Explora Profesiones",
    "game.explora_desc":        "Aprende sobre diferentes trabajos",
    "game.asocia_imagen":       "Asocia la Imagen Correcta",
    "game.asocia_desc":         "Asocia palabras con las imágenes correctas",
    "game.clasificacion":       "Clasificación de Grupos",
    "game.clasificacion_desc":  "Agrupa elementos por categorías",
    "game.patterns":            "Juego de Patrones",
    "game.patterns_desc":       "Completa los patrones secuenciales",

    // ── LANG PICKER ───────────────────────────────────────────────

    // ── QUIZ NIÑOS ────────────────────────────────────────────────────
    "quiz.verify":          "VERIFICAR RESPUESTA",
    "quiz.excellent":       "¡Excelente Trabajo! 🎉",
    "quiz.completed_all":   "Has completado todas las preguntas",
    "quiz.questions":       "Preguntas",
    "quiz.correct":         "Correctas",
    "quiz.time":            "Tiempo",
    "quiz.analysis_title":  "📊 Análisis de Aprendizaje",
    "quiz.restart":         "Volver a Empezar",
    "quiz.go_app":          "Ir a la App",
    "quiz.next":            "SIGUIENTE PREGUNTA",
    "quiz.finish":          "TERMINAR QUIZ",
    "quiz.correct_ans":     "¡Correcto!",
    "quiz.incorrect_ans":   "Incorrecto",
    "quiz.well_seen":       "Bien visto",
    "quiz.review_image":    "Revisa la imagen de nuevo",
    "quiz.great":           "¡Muy bien! ✨",
    "quiz.recorded":        "Respuesta registrada 📝",
    "quiz.keep_going":      "Excelente trabajo, sigamos adelante",
    "quiz.continue_next":   "Continuamos con la siguiente pregunta",
    "quiz.is_correct":      "¿Es correcto?",
    "quiz.yes":             "SÍ",
    "quiz.no":              "NO",
    "quiz.dominant_style":  "Estilo de aprendizaje predominante",
    "quiz.suggested_level": "Nivel sugerido",
    "quiz.breakdown":       "Desglose por estilo",
    "quiz.personalized_recs": "Recomendaciones personalizadas",
    "quiz.not_detected":    "No detectado",
    "quiz.welcome_back":    "¡Bienvenido de nuevo! Continuamos desde la pregunta",
    "quiz.fallback_mode":   "Modo fallback: análisis local",

    // ── QUIZ PADRES ───────────────────────────────────────────────────
    "quiz_p.subtitle":      "Inventario de Base Adaptativa - Evaluación para Padres",
    "quiz_p.of":            "de",
    "quiz_p.questions":     "preguntas",
    "quiz_p.prev":          "Anterior",
    "quiz_p.next":          "Siguiente",
    "quiz_p.see_results":   "Ver Resultados",
    "quiz_p.question":      "Pregunta",
    "quiz_p.completed_title": "¡Evaluación Completada!",
    "quiz_p.completed_sub": "Gracias por completar el inventario BlueMinds",
    "quiz_p.answers_label": "📊 Respuestas",
    "quiz_p.completed_questions": "Preguntas completadas",
    "quiz_p.learning_style_label": "👂 Estilo de Aprendizaje",
    "quiz_p.predominant":   "Predominante",
    "quiz_p.comm_profile_label": "🎯 Perfil de Comunicación",
    "quiz_p.identified_level": "Nivel identificado",
    "quiz_p.detailed_analysis": "Análisis Detallado",
    "quiz_p.download":      "Descargar Resultados",
    "quiz_p.go_main":       "Ir a la Aplicación Principal",
    "quiz_p.new_eval":      "Iniciar Nueva Evaluación",
    "quiz_p.not_detected":  "No detectado",
    "quiz_p.not_calculated":"No calculado",
    "quiz_p.eval_of":       "Evaluación del",
    "quiz_p.dominant_style":"Estilo Predominante",
    "quiz_p.comm_profile":  "Perfil de Comunicación",
    "quiz_p.recs":          "Recomendaciones",
    "quiz_p.style_dist":    "Distribución de estilos de aprendizaje",
    "quiz_p.alert_completed": "Tu última evaluación está completa. Puedes ver resultados o iniciar una nueva.",
    "quiz_p.alert_continue": "¡Bienvenido de nuevo! Continuamos desde la pregunta",
    "quiz_p.alert_load_error": "No pudimos cargar tus resultados anteriores.",
    "quiz_p.alert_server_error": "Hubo un problema al procesar los resultados. Intenta de nuevo.",
    "quiz_p.alert_new_error": "No pudimos iniciar una nueva evaluación. Intenta de nuevo.",
    "quiz_p.confirm_new":   "¿Seguro que quieres reiniciar el inventario? Perderás el progreso actual.",

    "game.ordena_historia_desc": "Ordena las imágenes en secuencia lógica",
    "lang.es": "Español",
    "lang.en": "English",
    "lang.pt": "Português",
  },

  // ════════════════════════════════════════════════════════════════
  en: {
    "nav.home":            "Home",
    "nav.test":            "Test",
    "nav.about":           "About",
    "nav.logout":          "Log Out",
    "nav.about_us":        "About Us",

    "index.badge":         "Inclusive Education Platform",
    "index.title":         "Welcome to BlueMinds",
    "index.subtitle":      "An educational platform designed for children with special needs, featuring interactive mini-games that help develop cognitive, social, and emotional skills.",
    "index.btn_register":  "Create Account",
    "index.btn_login":     "Log In",
    "index.feat1_title":   "Cognitive Development",
    "index.feat1_desc":    "Activities designed to stimulate thinking and memory",
    "index.feat2_title":   "Social Skills",
    "index.feat2_desc":    "Learn to communicate and relate effectively",
    "index.feat3_title":   "Personalised Progress",
    "index.feat3_desc":    "Track your progress with detailed reports",
    "index.footer":        "© 2025 BlueMinds - Inclusive Education Platform",

    "login.tagline":       "Inclusive Education Platform",
    "login.status_ok":     "Server connected",
    "login.status_fail":   "Server unavailable - Check your connection",
    "login.title":         "Log In",
    "login.email":         "Email",
    "login.password":      "Password",
    "login.remember":      "Remember me",
    "login.btn":           "Log In",
    "login.or_google":     "Or sign in / sign up with Google",
    "login.no_account":    "Don't have an account?",
    "login.create_here":   "Create one here",
    "login.register_title":"Create Account",
    "login.name":          "Full Name",
    "login.birth":         "Date of Birth",
    "login.country":       "Country",
    "login.confirm":       "Confirm Password",
    "login.btn_register":  "Create Account",
    "login.have_account":  "Already have an account?",
    "login.login_here":    "Log in here",

    "onboard.title":       "Complete Your Profile",
    "onboard.subtitle":    "To personalise your BlueMinds experience we need a few details.",
    "onboard.birth":       "Date of Birth",
    "onboard.country":     "Country",
    "onboard.select":      "Select your country",
    "onboard.btn":         "Continue",
    "onboard.saving":      "Saving...",
    "onboard.footer":      "BlueMinds • AI-powered Inclusive Education • 2025-2026",

    "main.adventure":      "Choose your adventure",
    "main.dino_msg":       "\"Hi! Which world do you want to explore today?\"",
    "main.cat_auditivo":   "Auditory",
    "main.cat_auditivo_d": "Learn by listening",
    "main.cat_kines":      "Kinaesthetic",
    "main.cat_kines_d":    "Learn by doing",
    "main.cat_visual":     "Visual",
    "main.cat_visual_d":   "Learn by seeing",
    "main.cat_lecto":      "Reading & Writing",
    "main.cat_lecto_d":    "Reading and writing",
    "main.progress_title": "Your progress with Dino Edu",
    "main.games_played":   "Games played",
    "main.avg_accuracy":   "Average accuracy",
    "main.best_score":     "Best score",
    "main.improvement":    "Overall improvement",
    "main.analyzing":      "Analysing your adventure...",
    "main.specialist":     "BlueBot Specialist Analysis",
    "main.specialist_sub": "Skill level detected by our AI",
    "main.games_short":    "gms",
    "main.consulting":     "Consulting BlueBot about your talents...",
    "main.chart_score":    "Your Evolution (Points)",
    "main.chart_style":    "Dominant Styles",
    "main.history":        "Assessment History",
    "main.history_date":   "Date",
    "main.history_type":   "Type",
    "main.history_style":  "Best Style",
    "main.history_level":  "Level",
    "main.history_points": "Points",
    "main.history_time":   "Time",
    "main.history_load":   "Loading your history...",
    "main.recs":           "Recommendations for you",
    "main.footer":         "© BlueMinds - Inclusive Education Platform",

    "perfil.title":        "My Profile",
    "perfil.name":         "Name",
    "perfil.email":        "Email",
    "perfil.email_note":   "Email cannot be changed",
    "perfil.birth":        "Date of Birth",
    "perfil.country":      "Country",
    "perfil.change_photo": "Change profile photo",
    "perfil.birth_none":   "Not specified",
    "perfil.country_none": "Not specified",
    "perfil.save":         "Save",
    "perfil.cancel":       "Cancel",
    "perfil.tasks":        "Completed Tasks",
    "perfil.streak":       "Current Streak (days)",
    "perfil.achievements": "Achievements Unlocked",
    "perfil.ach_title":    "Achievements",
    "perfil.ach_sub":      "Your unlocked achievements in BlueMinds",
    "perfil.ach_unlocked": "Unlocked",
    "perfil.account":      "Account Information",
    "perfil.account_sub":  "Your account details and settings",
    "perfil.status":       "Account status",
    "perfil.status_desc":  "Your account is active",
    "perfil.status_badge": "Active",
    "perfil.member":       "Member since",
    "perfil.new_user":     "New user",
    "perfil.select_country": "Select your country",

    "test.who":            "Who will take the test?",
    "test.desc":           "Select the option that applies to start the assessment",
    "test.parent":         "I'm a Parent",
    "test.child":          "I'm a Child",
    "test.back":           "Back",

    "sel.back":            "Back",
    "sel.home":            "Home",
    "sel.all":             "All Levels",
    "sel.level":           "Level",
    "sel.play":            "Play",
    "sel.no_games":        "No games available for this level",
    "sel.games_singular":  "game",
    "sel.games_plural":    "games",

    "sel.aud_title":       "Auditory",
    "sel.aud_desc":        "Learn by listening and through sound",
    "sel.kin_title":       "Kinaesthetic",
    "sel.kin_desc":        "Learn through movement and practice",
    "sel.lec_title":       "Reader-Writer",
    "sel.lec_desc":        "Learn by reading and writing information",
    "sel.vis_title":       "Visual",
    "sel.vis_desc":        "Learn through images and representations",

    // ── AUDITORY GAMES ────────────────────────────────────────────────
    "game.cadena_palabras":     "The Word Chain",
    "game.cadena_desc":         "Listen to a word chain and select the images in correct order",
    "game.eco_palabras":        "The Echo of Words",
    "game.eco_desc":            "Repeat the words you hear with precision",
    "game.cadena_palabras_2":   "The Word Chain 2",
    "game.cadena_2_desc":       "Adaptive version with AI that adjusts to your auditory memory level",
    "game.completa_oracion_aud": "Complete the Auditory Sentence",
    "game.completa_aud_desc":   "Listen to incomplete sentences and choose the word that completes them",
    "game.eco_palabras_2":      "Echo of Words 2",
    "game.eco_2_desc":          "Listen and imitate the sounds of different animals",

    // ── KINESTHETIC GAMES ─────────────────────────────────────────────
    "game.emotion":             "Interactive Emotional Narration",
    "game.emotion_desc":        "Observe emotional GIFs and imitate the expressions",
    "game.sigue_lider":         "Follow the Movement Leader",
    "game.sigue_lider_desc":    "Imitate the avatar's movements and improve coordination",
    "game.atencion":            "Joint Attention with Sound",
    "game.atencion_desc":       "Follow animated objects and repeat words",
    "game.regulando":           "Regulating the Shout",
    "game.regulando_desc":      "Learn breathing techniques and emotional control",
    "game.ritmo":               "The Rhythm of Syllables",
    "game.ritmo_desc":          "Follow the rhythm of words with movements",
    "game.emotion_3":           "Advanced Emotional Narration",
    "game.emotion_3_desc":      "Advanced version with in-depth analysis",
    "game.ritmo_2":             "Advanced Rhythm of Syllables",
    "game.ritmo_2_desc":        "Greater complexity and variable speed",
    "game.sigue_lider_2":       "Advanced Movement Leader",
    "game.sigue_lider_2_desc":  "More complex movements and detailed analysis",

    // ── READING-WRITING GAMES ────────────────────────────────────────
    "game.error_gramatical":    "Find the Grammatical Error",
    "game.error_desc":          "Identify and correct verb, gender, and number errors.",
    "game.lee_asocia":          "Read and Associate",
    "game.lee_asocia_desc":     "Read sentences and select the correct image. Advanced AI analysis.",
    "game.oracion_colores":     "Build the Sentence with Colors",
    "game.oracion_desc":        "Drag words in correct order. Progressive hint system.",
    "game.completa_oracion_esc": "Complete the Written Sentence",
    "game.completa_esc_desc":   "Complete sentences by observing images. Comprehension analysis.",
    "game.escribe_palabra":     "Write the Word from the Image",
    "game.escribe_desc":        "Memorize and write words. Two-phase system with countdown.",
    "game.lee_asocia_2":        "Read and Associate 2",
    "game.lee_asocia_2_desc":   "Advanced version with complex vocabulary and in-depth analysis.",

    // ── VISUAL GAMES ──────────────────────────────────────────────────
    "game.memory":              "Memory Game",
    "game.memory_desc":         "Repeat the color sequence",
    "game.memoriza":            "Memorize and Find",
    "game.memoriza_desc":       "Observe the image and find it among the options",
    "game.detective":           "Error Detective",
    "game.detective_desc":      "Form correct sentences by detecting errors",
    "game.completa_escena":     "Complete the Scene",
    "game.completa_escena_desc": "Complete sentences by selecting the correct image",
    "game.ordena_historia":     "Order the Story",
    "game.ordena_desc":         "Order the images in logical sequence",
    "game.explora_profesiones": "Explore Professions",
    "game.explora_desc":        "Learn about different jobs",
    "game.asocia_imagen":       "Associate the Correct Image",
    "game.asocia_desc":         "Associate words with the correct images",
    "game.clasificacion":       "Group Classification",
    "game.clasificacion_desc":  "Group elements by categories",
    "game.patterns":            "Patterns Game",
    "game.patterns_desc":       "Complete the sequential patterns",
    "game.ordena_historia_desc": "Order the images in logical sequence",

    // ── CHILDREN QUIZ ─────────────────────────────────────────────────
    "quiz.verify":          "VERIFY ANSWER",
    "quiz.excellent":       "Excellent Work! 🎉",
    "quiz.completed_all":   "You have completed all the questions",
    "quiz.questions":       "Questions",
    "quiz.correct":         "Correct",
    "quiz.time":            "Time",
    "quiz.analysis_title":  "📊 Learning Analysis",
    "quiz.restart":         "Start Again",
    "quiz.go_app":          "Go to App",
    "quiz.next":            "NEXT QUESTION",
    "quiz.finish":          "FINISH QUIZ",
    "quiz.correct_ans":     "Correct!",
    "quiz.incorrect_ans":   "Incorrect",
    "quiz.well_seen":       "Well spotted",
    "quiz.review_image":    "Review the image again",
    "quiz.great":           "Well done! ✨",
    "quiz.recorded":        "Answer recorded 📝",
    "quiz.keep_going":      "Excellent work, let's keep going",
    "quiz.continue_next":   "Moving on to the next question",
    "quiz.is_correct":      "Is this correct?",
    "quiz.yes":             "YES",
    "quiz.no":              "NO",
    "quiz.dominant_style":  "Predominant learning style",
    "quiz.suggested_level": "Suggested level",
    "quiz.breakdown":       "Breakdown by style",
    "quiz.personalized_recs": "Personalised recommendations",
    "quiz.not_detected":    "Not detected",
    "quiz.welcome_back":    "Welcome back! Continuing from question",
    "quiz.fallback_mode":   "Fallback mode: local analysis",

    // ── PARENTS QUIZ ──────────────────────────────────────────────────
    "quiz_p.subtitle":      "Adaptive Base Inventory - Parent Assessment",
    "quiz_p.of":            "of",
    "quiz_p.questions":     "questions",
    "quiz_p.prev":          "Previous",
    "quiz_p.next":          "Next",
    "quiz_p.see_results":   "See Results",
    "quiz_p.question":      "Question",
    "quiz_p.completed_title": "Assessment Completed!",
    "quiz_p.completed_sub": "Thank you for completing the BlueMinds inventory",
    "quiz_p.answers_label": "📊 Answers",
    "quiz_p.completed_questions": "Questions completed",
    "quiz_p.learning_style_label": "👂 Learning Style",
    "quiz_p.predominant":   "Predominant",
    "quiz_p.comm_profile_label": "🎯 Communication Profile",
    "quiz_p.identified_level": "Level identified",
    "quiz_p.detailed_analysis": "Detailed Analysis",
    "quiz_p.download":      "Download Results",
    "quiz_p.go_main":       "Go to Main App",
    "quiz_p.new_eval":      "Start New Assessment",
    "quiz_p.not_detected":  "Not detected",
    "quiz_p.not_calculated":"Not calculated",
    "quiz_p.eval_of":       "Assessment from",
    "quiz_p.dominant_style":"Predominant Style",
    "quiz_p.comm_profile":  "Communication Profile",
    "quiz_p.recs":          "Recommendations",
    "quiz_p.style_dist":    "Learning style distribution",
    "quiz_p.alert_completed": "Your last assessment is complete. You can view results or start a new one.",
    "quiz_p.alert_continue": "Welcome back! Continuing from question",
    "quiz_p.alert_load_error": "We could not load your previous results.",
    "quiz_p.alert_server_error": "There was a problem processing results. Please try again.",
    "quiz_p.alert_new_error": "We could not start a new assessment. Please try again.",
    "quiz_p.confirm_new":   "Are you sure you want to restart the inventory? You will lose your current progress.",


    "lang.es": "Español",
    "lang.en": "English",
    "lang.pt": "Português",
  },

  // ════════════════════════════════════════════════════════════════
  pt: {
    "nav.home":            "Início",
    "nav.test":            "Teste",
    "nav.about":           "Sobre",
    "nav.logout":          "Sair",
    "nav.about_us":        "Sobre Nós",

    "index.badge":         "Plataforma de Educação Inclusiva",
    "index.title":         "Bem-vindo ao BlueMinds",
    "index.subtitle":      "Uma plataforma educacional criada para crianças com necessidades especiais, com minijogos interativos que auxiliam no desenvolvimento de habilidades cognitivas, sociais e emocionais.",
    "index.btn_register":  "Criar Conta",
    "index.btn_login":     "Entrar",
    "index.feat1_title":   "Desenvolvimento Cognitivo",
    "index.feat1_desc":    "Atividades criadas para estimular o raciocínio e a memória",
    "index.feat2_title":   "Habilidades Sociais",
    "index.feat2_desc":    "Aprenda a se comunicar e se relacionar de forma eficaz",
    "index.feat3_title":   "Progresso Personalizado",
    "index.feat3_desc":    "Acompanhe seu avanço com relatórios detalhados",
    "index.footer":        "© 2025 BlueMinds - Plataforma de Educação Inclusiva",

    "login.tagline":       "Plataforma de Educação Inclusiva",
    "login.status_ok":     "Servidor conectado",
    "login.status_fail":   "Servidor indisponível - Verifique a conexão",
    "login.title":         "Entrar",
    "login.email":         "E-mail",
    "login.password":      "Senha",
    "login.remember":      "Lembrar-me",
    "login.btn":           "Entrar",
    "login.or_google":     "Ou entre / cadastre-se com o Google",
    "login.no_account":    "Não tem uma conta?",
    "login.create_here":   "Crie uma conta aqui",
    "login.register_title":"Criar Conta",
    "login.name":          "Nome Completo",
    "login.birth":         "Data de Nascimento",
    "login.country":       "País",
    "login.confirm":       "Confirmar Senha",
    "login.btn_register":  "Criar Conta",
    "login.have_account":  "Já tem uma conta?",
    "login.login_here":    "Entre aqui",

    "onboard.title":       "Complete seu Perfil",
    "onboard.subtitle":    "Para personalizar sua experiência no BlueMinds precisamos de alguns dados.",
    "onboard.birth":       "Data de Nascimento",
    "onboard.country":     "País",
    "onboard.select":      "Selecione seu país",
    "onboard.btn":         "Continuar",
    "onboard.saving":      "Salvando...",
    "onboard.footer":      "BlueMinds • Educação Inclusiva com IA • 2025-2026",

    "main.adventure":      "Escolha sua aventura",
    "main.dino_msg":       "\"Olá! Para qual mundo você quer viajar hoje?\"",
    "main.cat_auditivo":   "Auditivo",
    "main.cat_auditivo_d": "Aprenda ouvindo",
    "main.cat_kines":      "Cinestésico",
    "main.cat_kines_d":    "Aprenda fazendo",
    "main.cat_visual":     "Visual",
    "main.cat_visual_d":   "Aprenda vendo",
    "main.cat_lecto":      "Leitura e Escrita",
    "main.cat_lecto_d":    "Leitura e escrita",
    "main.progress_title": "Seu progresso com Dino Edu",
    "main.games_played":   "Jogos jogados",
    "main.avg_accuracy":   "Precisão média",
    "main.best_score":     "Melhor pontuação",
    "main.improvement":    "Melhora geral",
    "main.analyzing":      "Analisando sua aventura...",
    "main.specialist":     "Análise do Especialista BlueBot",
    "main.specialist_sub": "Nível de domínio detectado pela nossa IA",
    "main.games_short":    "jgs",
    "main.consulting":     "Consultando o BlueBot sobre seus talentos...",
    "main.chart_score":    "Sua Evolução (Pontos)",
    "main.chart_style":    "Estilos Dominantes",
    "main.history":        "Histórico de Avaliações",
    "main.history_date":   "Data",
    "main.history_type":   "Tipo",
    "main.history_style":  "Melhor Estilo",
    "main.history_level":  "Nível",
    "main.history_points": "Pontos",
    "main.history_time":   "Tempo",
    "main.history_load":   "Carregando seu histórico...",
    "main.recs":           "Recomendações para você",
    "main.footer":         "© BlueMinds - Plataforma de Educação Inclusiva",

    "perfil.title":        "Meu Perfil",
    "perfil.name":         "Nome",
    "perfil.email":        "E-mail",
    "perfil.email_note":   "O e-mail não pode ser alterado",
    "perfil.birth":        "Data de Nascimento",
    "perfil.country":      "País",
    "perfil.change_photo": "Alterar foto de perfil",
    "perfil.birth_none":   "Não especificada",
    "perfil.country_none": "Não especificado",
    "perfil.save":         "Salvar",
    "perfil.cancel":       "Cancelar",
    "perfil.tasks":        "Tarefas Concluídas",
    "perfil.streak":       "Sequência Atual (dias)",
    "perfil.achievements": "Conquistas Desbloqueadas",
    "perfil.ach_title":    "Conquistas",
    "perfil.ach_sub":      "Suas conquistas desbloqueadas no BlueMinds",
    "perfil.ach_unlocked": "Desbloqueada",
    "perfil.account":      "Informações da Conta",
    "perfil.account_sub":  "Detalhes e configurações da sua conta",
    "perfil.status":       "Status da conta",
    "perfil.status_desc":  "Sua conta está ativa",
    "perfil.status_badge": "Ativa",
    "perfil.member":       "Membro desde",
    "perfil.new_user":     "Novo usuário",
    "perfil.select_country": "Selecione seu país",

    "test.who":            "Quem vai fazer o teste?",
    "test.desc":           "Selecione a opção correspondente para iniciar a avaliação",
    "test.parent":         "Sou Pai/Mãe",
    "test.child":          "Sou Criança",
    "test.back":           "Voltar",

    "sel.back":            "Voltar",
    "sel.home":            "Início",
    "sel.all":             "Todos os Níveis",
    "sel.level":           "Nível",
    "sel.play":            "Jogar",
    "sel.no_games":        "Nenhum jogo disponível para este nível",
    "sel.games_singular":  "jogo",
    "sel.games_plural":    "jogos",

    "sel.aud_title":       "Auditivo",
    "sel.aud_desc":        "Aprenda ouvindo e através do som",
    "sel.kin_title":       "Cinestésico",
    "sel.kin_desc":        "Aprenda por meio do movimento e da prática",
    "sel.lec_title":       "Leitor-Escritor",
    "sel.lec_desc":        "Aprenda lendo e escrevendo informações",
    "sel.vis_title":       "Visual",
    "sel.vis_desc":        "Aprenda por meio de imagens e representações",

    // ── JOGOS AUDITIVO ────────────────────────────────────────────────
    "game.cadeia_palabras":     "A Cadeia de Palavras",
    "game.cadeia_desc":         "Ouça uma cadeia de palavras e selecione as imagens na ordem correta",
    "game.eco_palabras":        "O Eco das Palavras",
    "game.eco_desc":            "Repita as palavras que você ouve com precisão",
    "game.cadeia_palabras_2":   "A Cadeia de Palavras 2",
    "game.cadeia_2_desc":       "Versão adaptativa com IA que se ajusta ao seu nível de memória auditiva",
    "game.completa_oracion_aud": "Complete a Sentença Auditiva",
    "game.completa_aud_desc":   "Ouça sentenças incompletas e escolha a palavra que as completa",
    "game.eco_palabras_2":      "Eco de Palavras 2",
    "game.eco_2_desc":          "Ouça e imite os sons de diferentes animais",

    // ── JOGOS CINESTÉSICO ─────────────────────────────────────────────
    "game.emotion":             "Narração Emocional Interativa",
    "game.emotion_desc":        "Observe GIFs emocionais e imite as expressões",
    "game.sigue_lider":         "Siga o Líder de Movimento",
    "game.sigue_lider_desc":    "Imite os movimentos do avatar e melhore a coordenação",
    "game.atencion":            "Atenção Conjunta com Som",
    "game.atencion_desc":       "Siga objetos animados e repita palavras",
    "game.regulando":           "Regulando o Grito",
    "game.regulando_desc":      "Aprenda técnicas de respiração e controle emocional",
    "game.ritmo":               "O Ritmo das Sílabas",
    "game.ritmo_desc":          "Siga o ritmo das palavras com movimentos",
    "game.emotion_3":           "Narração Emocional Avançada",
    "game.emotion_3_desc":      "Versão avançada com análise profunda",
    "game.ritmo_2":             "Ritmo de Sílabas Avançado",
    "game.ritmo_2_desc":        "Maior complexidade e velocidade variável",
    "game.sigue_lider_2":       "Siga o Líder Avançado",
    "game.sigue_lider_2_desc":  "Movimentos mais complexos e análise detalhada",

    // ── JOGOS LEITOR-ESCRITOR ─────────────────────────────────────────
    "game.error_gramatical":    "Encontre o Erro Gramatical",
    "game.error_desc":          "Identifique e corrija erros de verbo, gênero e número.",
    "game.lee_asocia":          "Leia e Associe",
    "game.lee_asocia_desc":     "Leia orações e selecione a imagem correta. Análise avançada de IA.",
    "game.oracion_colores":     "Construa a Sentença com Cores",
    "game.oracion_desc":        "Arraste palavras na ordem correta. Sistema de dicas progressivas.",
    "game.completa_oracion_esc": "Complete a Sentença Escrita",
    "game.completa_esc_desc":   "Complete sentenças observando imagens. Análise de compreensão.",
    "game.escribe_palabra":     "Escreva a Palavra da Imagem",
    "game.escribe_desc":        "Memorize e escreva palavras. Sistema de duas fases com contagem regressiva.",
    "game.lee_asocia_2":        "Leia e Associe 2",
    "game.lee_asocia_2_desc":   "Versão avançada com vocabulário complexo e análise profunda.",

    // ── JOGOS VISUAL ──────────────────────────────────────────────────
    "game.memory":              "Jogo de Memória",
    "game.memory_desc":         "Repita a sequência de cores",
    "game.memoriza":            "Memorize e Encontre",
    "game.memoriza_desc":       "Observe a imagem e encontre-a entre as opções",
    "game.detective":           "Detetive de Erros",
    "game.detective_desc":      "Forme sentenças corretas detectando erros",
    "game.completa_escena":     "Complete a Cena",
    "game.completa_escena_desc": "Complete sentenças selecionando a imagem correta",
    "game.ordena_historia":     "Ordene a História",
    "game.ordena_desc":         "Ordene as imagens em sequência lógica",
    "game.explora_profesiones": "Explore Profissões",
    "game.explora_desc":        "Aprenda sobre diferentes trabalhos",
    "game.asocia_imagen":       "Associe a Imagem Correta",
    "game.asocia_desc":         "Associe palavras com as imagens corretas",
    "game.clasificacion":       "Classificação de Grupos",
    "game.clasificacion_desc":  "Agrupe elementos por categorias",
    "game.patterns":            "Jogo de Padrões",
    "game.patterns_desc":       "Complete os padrões sequenciais",
    "game.ordena_historia_desc": "Ordene as imagens em sequência lógica",

    // ── QUIZ CRIANÇAS ─────────────────────────────────────────────────
    "quiz.verify":          "VERIFICAR RESPOSTA",
    "quiz.excellent":       "Excelente Trabalho! 🎉",
    "quiz.completed_all":   "Você completou todas as perguntas",
    "quiz.questions":       "Perguntas",
    "quiz.correct":         "Corretas",
    "quiz.time":            "Tempo",
    "quiz.analysis_title":  "📊 Análise de Aprendizagem",
    "quiz.restart":         "Começar de Novo",
    "quiz.go_app":          "Ir para o App",
    "quiz.next":            "PRÓXIMA PERGUNTA",
    "quiz.finish":          "TERMINAR QUIZ",
    "quiz.correct_ans":     "Correto!",
    "quiz.incorrect_ans":   "Incorreto",
    "quiz.well_seen":       "Bem observado",
    "quiz.review_image":    "Revise a imagem novamente",
    "quiz.great":           "Muito bem! ✨",
    "quiz.recorded":        "Resposta registrada 📝",
    "quiz.keep_going":      "Excelente trabalho, vamos continuar",
    "quiz.continue_next":   "Continuamos com a próxima pergunta",
    "quiz.is_correct":      "Está correto?",
    "quiz.yes":             "SIM",
    "quiz.no":              "NÃO",
    "quiz.dominant_style":  "Estilo de aprendizagem predominante",
    "quiz.suggested_level": "Nível sugerido",
    "quiz.breakdown":       "Detalhamento por estilo",
    "quiz.personalized_recs": "Recomendações personalizadas",
    "quiz.not_detected":    "Não detectado",
    "quiz.welcome_back":    "Bem-vindo de volta! Continuando da pergunta",
    "quiz.fallback_mode":   "Modo fallback: análise local",

    // ── QUIZ PAIS ─────────────────────────────────────────────────────
    "quiz_p.subtitle":      "Inventário de Base Adaptativa - Avaliação para Pais",
    "quiz_p.of":            "de",
    "quiz_p.questions":     "perguntas",
    "quiz_p.prev":          "Anterior",
    "quiz_p.next":          "Próximo",
    "quiz_p.see_results":   "Ver Resultados",
    "quiz_p.question":      "Pergunta",
    "quiz_p.completed_title": "Avaliação Concluída!",
    "quiz_p.completed_sub": "Obrigado por completar o inventário BlueMinds",
    "quiz_p.answers_label": "📊 Respostas",
    "quiz_p.completed_questions": "Perguntas respondidas",
    "quiz_p.learning_style_label": "👂 Estilo de Aprendizagem",
    "quiz_p.predominant":   "Predominante",
    "quiz_p.comm_profile_label": "🎯 Perfil de Comunicação",
    "quiz_p.identified_level": "Nível identificado",
    "quiz_p.detailed_analysis": "Análise Detalhada",
    "quiz_p.download":      "Baixar Resultados",
    "quiz_p.go_main":       "Ir para o App Principal",
    "quiz_p.new_eval":      "Iniciar Nova Avaliação",
    "quiz_p.not_detected":  "Não detectado",
    "quiz_p.not_calculated":"Não calculado",
    "quiz_p.eval_of":       "Avaliação de",
    "quiz_p.dominant_style":"Estilo Predominante",
    "quiz_p.comm_profile":  "Perfil de Comunicação",
    "quiz_p.recs":          "Recomendações",
    "quiz_p.style_dist":    "Distribuição de estilos de aprendizagem",
    "quiz_p.alert_completed": "Sua última avaliação está completa. Você pode ver os resultados ou iniciar uma nova.",
    "quiz_p.alert_continue": "Bem-vindo de volta! Continuando da pergunta",
    "quiz_p.alert_load_error": "Não foi possível carregar seus resultados anteriores.",
    "quiz_p.alert_server_error": "Houve um problema ao processar os resultados. Tente novamente.",
    "quiz_p.alert_new_error": "Não foi possível iniciar uma nova avaliação. Tente novamente.",
    "quiz_p.confirm_new":   "Tem certeza que deseja reiniciar o inventário? Você perderá o progresso atual.",


    "lang.es": "Español",
    "lang.en": "English",
    "lang.pt": "Português",
  }
};

// ════════════════════════════════════════════════════════════════════
//  CORE ENGINE
// ════════════════════════════════════════════════════════════════════

const I18n = (() => {
  const STORAGE_KEY = 'blueminds_lang';
  let current = localStorage.getItem(STORAGE_KEY) || 'es';

  /** Devuelve el texto para la clave dada en el idioma activo */
  function t(key) {
    return (BLUEMINDS_TRANSLATIONS[current] || BLUEMINDS_TRANSLATIONS.es)[key] || key;
  }

  /** Aplica todas las traducciones a los elementos con data-i18n */
  function apply() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      const text = t(key);

      // Botones con icono: preservar el <i> y solo cambiar el texto
      const icon = el.querySelector('i');
      if (icon) {
        // Eliminar nodos de texto y reemplazar
        Array.from(el.childNodes).forEach(n => {
          if (n.nodeType === Node.TEXT_NODE) n.remove();
        });
        el.appendChild(document.createTextNode(' ' + text));
      } else if (el.tagName === 'INPUT' && el.placeholder !== undefined) {
        el.placeholder = text;
      } else {
        el.textContent = text;
      }
    });

    // Atributo data-i18n-title para tooltips
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      el.title = t(el.getAttribute('data-i18n-title'));
    });

    // Atributo data-i18n-placeholder
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      el.placeholder = t(el.getAttribute('data-i18n-placeholder'));
    });

    document.documentElement.lang = current;
    updatePickerUI();
  }

  /** Cambia el idioma, lo guarda y aplica */
  function setLang(lang) {
    if (!BLUEMINDS_TRANSLATIONS[lang]) return;
    current = lang;
    localStorage.setItem(STORAGE_KEY, lang);
    apply();
    // Cerrar dropdown si está abierto
    const dd = document.getElementById('lang-dropdown');
    if (dd) dd.classList.remove('open');
  }

  function getLang() { return current; }

  /** Marca el idioma activo en el picker */
  function updatePickerUI() {
    document.querySelectorAll('.bm-lang-option').forEach(btn => {
      btn.classList.toggle('active', btn.dataset.lang === current);
    });
    const label = document.getElementById('lang-current-label');
    if (label) label.textContent = current.toUpperCase();
  }

  return { t, apply, setLang, getLang };
})();

// ════════════════════════════════════════════════════════════════════
//  LANGUAGE PICKER  –  se inyecta en cualquier .user-menu o .header-content
// ════════════════════════════════════════════════════════════════════

function injectLangPicker() {
  // Evitar duplicados
  if (document.getElementById('bm-lang-picker')) return;

  const picker = document.createElement('div');
  picker.id = 'bm-lang-picker';
  picker.innerHTML = `
    <button class="bm-lang-btn" id="lang-toggle" aria-label="Select language" onclick="toggleLangDropdown(event)">
      🌐 <span id="lang-current-label">${I18n.getLang().toUpperCase()}</span> ▾
    </button>
    <div class="bm-lang-dropdown" id="lang-dropdown">
      <button class="bm-lang-option" data-lang="es" onclick="I18n.setLang('es')">🇲🇽 Español</button>
      <button class="bm-lang-option" data-lang="en" onclick="I18n.setLang('en')">🇺🇸 English</button>
      <button class="bm-lang-option" data-lang="pt" onclick="I18n.setLang('pt')">🇧🇷 Português</button>
    </div>
  `;

  // Intentar insertarlo dentro del .user-menu o .header-content
  const target = document.querySelector('.user-menu') || document.querySelector('.header-content');
  if (target) {
    // Insertar ANTES del primer botón de logout (o al principio)
    const logoutBtn = target.querySelector('.logout-btn, .btn-login');
    if (logoutBtn) {
      target.insertBefore(picker, logoutBtn);
    } else {
      target.appendChild(picker);
    }
  } else {
    // Fallback: esquina superior derecha fija
    picker.style.position = 'fixed';
    picker.style.top = '15px';
    picker.style.right = '20px';
    picker.style.zIndex = '9999';
    document.body.appendChild(picker);
  }
}

function toggleLangDropdown(e) {
  e.stopPropagation();
  const dd = document.getElementById('lang-dropdown');
  if (dd) dd.classList.toggle('open');
}

// Cerrar al click fuera
document.addEventListener('click', () => {
  const dd = document.getElementById('lang-dropdown');
  if (dd) dd.classList.remove('open');
});

// ════════════════════════════════════════════════════════════════════
//  CSS DEL PICKER  –  se inyecta dinámicamente para no crear otro archivo
// ════════════════════════════════════════════════════════════════════

(function injectPickerStyles() {
  const style = document.createElement('style');
  style.textContent = `
    #bm-lang-picker {
      position: relative;
      display: inline-flex;
      align-items: center;
    }

    .bm-lang-btn {
      display: flex;
      align-items: center;
      gap: 5px;
      background: none;
      border: 1.5px solid rgba(0,102,204,0.35);
      border-radius: 8px;
      padding: 6px 10px;
      font-family: 'Nunito', sans-serif;
      font-size: 13px;
      font-weight: 700;
      color: #0066CC;
      cursor: pointer;
      transition: all 0.25s ease;
      white-space: nowrap;
    }

    .bm-lang-btn:hover {
      background: #F0F8FF;
      border-color: #0066CC;
    }

    .bm-lang-dropdown {
      display: none;
      position: absolute;
      top: calc(100% + 6px);
      right: 0;
      background: white;
      border-radius: 10px;
      box-shadow: 0 8px 25px rgba(0,0,0,0.15);
      border: 1px solid #e5e7eb;
      overflow: hidden;
      z-index: 9999;
      min-width: 140px;
      animation: langFadeIn 0.15s ease;
    }

    .bm-lang-dropdown.open {
      display: block;
    }

    @keyframes langFadeIn {
      from { opacity: 0; transform: translateY(-5px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    .bm-lang-option {
      display: flex;
      align-items: center;
      gap: 8px;
      width: 100%;
      padding: 10px 15px;
      background: none;
      border: none;
      font-family: 'Nunito', sans-serif;
      font-size: 14px;
      font-weight: 600;
      color: #3c3c3c;
      cursor: pointer;
      transition: background 0.2s ease;
      text-align: left;
    }

    .bm-lang-option:hover {
      background: #F0F8FF;
      color: #0066CC;
    }

    .bm-lang-option.active {
      background: linear-gradient(135deg, #0066CC, #00B4D8);
      color: white;
    }
  `;
  document.head.appendChild(style);
})();

// ════════════════════════════════════════════════════════════════════
//  AUTO-INIT  –  corre cuando el DOM esté listo
// ════════════════════════════════════════════════════════════════════
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    injectLangPicker();
    I18n.apply();
  });
} else {
  injectLangPicker();
  I18n.apply();
}