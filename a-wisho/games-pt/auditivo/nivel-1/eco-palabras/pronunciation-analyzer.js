// ========================
// ANÁLISIS DE PRONUNCIACIÓN GRATUITO
// ========================

// Base de datos de fonemas españoles
const SPANISH_PHONEMES = {
  'a': { ipa: 'a', esperado: /a/ },
  'e': { ipa: 'e', esperado: /e/ },
  'i': { ipa: 'i', esperado: /i/ },
  'o': { ipa: 'o', esperado: /o/ },
  'u': { ipa: 'u', esperado: /u/ },
  's': { ipa: 's', esperado: /s/ },
  'l': { ipa: 'l', esperado: /l/ },
  'n': { ipa: 'n', esperado: /n/ },
  'r': { ipa: 'ɾ', esperado: /r/ }, // vibrante simple
  'rr': { ipa: 'r', esperado: /rr/ }, // vibrante múltiple
  't': { ipa: 't', esperado: /t/ },
  'b': { ipa: 'b', esperado: /b/ },
  'd': { ipa: 'd', esperado: /d/ },
  'g': { ipa: 'g', esperado: /g/ },
  'p': { ipa: 'p', esperado: /p/ },
  'c': { ipa: 'k', esperado: /c|k/ },
  'z': { ipa: 'θ', esperado: /z/ },
  'j': { ipa: 'x', esperado: /j/ },
  'y': { ipa: 'ʝ', esperado: /y/ },
  'v': { ipa: 'b', esperado: /v/ },
  'm': { ipa: 'm', esperado: /m/ },
  'f': { ipa: 'f', esperado: /f/ },
  'h': { ipa: '∅', esperado: /h/ }, // mudo en español
  'ch': { ipa: 'ʧ', esperado: /ch/ },
  'll': { ipa: 'ʝ', esperado: /ll|y/ }
};

// Diccionario de palabras con fonemas
const WORD_PHONEME_DATABASE = {
  'sol': {
    phonemes: ['s', 'o', 'l'],
    difficulty: 'easy',
    commonErrors: ['z en lugar de s', 'falta la l']
  },
  'luna': {
    phonemes: ['l', 'u', 'n', 'a'],
    difficulty: 'easy',
    commonErrors: ['confundir ll con y', 'omitir la n']
  },
  'estrella': {
    phonemes: ['e', 's', 't', 'r', 'e', 'y', 'a'],
    difficulty: 'medium',
    commonErrors: ['dificultad con r vibrante', 'confundir ll con y']
  },
  'nube': {
    phonemes: ['n', 'u', 'b', 'e'],
    difficulty: 'easy',
    commonErrors: ['omitir la b']
  },
  'lluvia': {
    phonemes: ['y', 'u', 'v', 'i', 'a'],
    difficulty: 'hard',
    commonErrors: ['confundir ll con y', 'v con b']
  },
  'árbol': {
    phonemes: ['a', 'r', 'b', 'o', 'l'],
    difficulty: 'medium',
    commonErrors: ['dificultad con r vibrante', 'omitir acentuación']
  },
  'dinosaurio': { phonemes: ['d', 'i', 'n', 'o', 's', 'a', 'u', 'r', 'i', 'o'], difficulty: 'hard' },
'mariposa': { phonemes: ['m', 'a', 'r', 'i', 'p', 'o', 's', 'a'], difficulty: 'hard' },
'computadora': { phonemes: ['c', 'o', 'm', 'p', 'u', 't', 'a', 'd', 'o', 'r', 'a'], difficulty: 'hard' }
};

// ========================
// CLASE DE ANÁLISIS DE PRONUNCIACIÓN
// ========================

class PronunciationAnalyzer {
  constructor() {
    this.userHistory = {
      successfulPhonemes: [],
      failedPhonemes: [],
      attempts: [],
      sessionStats: {
        totalAttempts: 0,
        totalScore: 0,
        averageScore: 0
      }
    };
  }

  /**
   * Analizar pronunciación
   * @param {string} targetWord - Palabra esperada
   * @param {string} recordedText - Lo que grabó el usuario
   * @returns {Object} Análisis completo
   */
  analyze(targetWord, recordedText) {
    const targetPhonemes = WORD_PHONEME_DATABASE[targetWord].phonemes;
    const recordedPhonemes = this.extractPhonemes(recordedText);

    // Comparar fonemas
    const phonemeComparison = this.comparePhonemes(targetPhonemes, recordedPhonemes);

    // Calcular similitud
    const similarity = this.calculateSimilarity(targetWord, recordedText);

    // Análisis detallado por fonema
    const detailedAnalysis = this.analyzeByPhoneme(targetWord, recordedText);

    // Detectar errores específicos
    const errors = this.detectSpecificErrors(targetWord, recordedText);

    // Generar score
    const score = this.generateScore(phonemeComparison, similarity, errors);

    // Registrar intento
    const attempt = {
      timestamp: new Date(),
      targetWord,
      recordedText,
      score,
      similarity,
      phonemeComparison,
      errors,
      detailedAnalysis
    };

    this.userHistory.attempts.push(attempt);
    this.updateHistoricalData(attempt);

    return {
      score,
      similarity,
      phonemeComparison,
      detailedAnalysis,
      errors,
      feedback: this.generateFeedback(score, errors),
      nextExercise: this.generateAdaptiveExercise()
    };
  }

  /**
   * Extraer fonemas del texto grabado
   */
  extractPhonemes(text) {
    const cleaned = text.toLowerCase().trim()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "");
    const phonemes = [];

    // Procesar texto carácter por carácter
    for (let i = 0; i < cleaned.length; i++) {
      const char = cleaned[i];
      const nextChar = cleaned[i + 1];

      // Detectar combinaciones (ch, ll, rr, etc.)
      if ((char === 'c' && nextChar === 'h') ||
          (char === 'l' && nextChar === 'l') ||
          (char === 'r' && nextChar === 'r') ||
          (char === 'z' && nextChar === 'z')) {
        phonemes.push(char + nextChar);
        i++; // Saltar siguiente carácter
      } else if (SPANISH_PHONEMES[char]) {
        phonemes.push(char);
      }
    }

    return phonemes;
  }

  /**
   * Comparar fonemas esperados vs grabados
   */
  comparePhonemes(expected, recorded) {
    const results = [];
    const maxLen = Math.max(expected.length, recorded.length);

    for (let i = 0; i < maxLen; i++) {
      const exp = expected[i] || null;
      const rec = recorded[i] || null;

      let status = 'correct';
      let errorType = null;

      if (!exp && rec) {
        status = 'extra';
        errorType = 'Extra phoneme';
      } else if (exp && !rec) {
        status = 'missing';
        errorType = 'Omitted phoneme';
      } else if (exp !== rec) {
        status = 'incorrect';
        errorType = 'Substitution';
      }

      results.push({
        position: i,
        expected: exp,
        recorded: rec,
        status,
        errorType,
        accuracy: this.calculatePhonemeAccuracy(exp, rec)
      });
    }

    return results;
  }

  /**
   * Calcular similitud de cadenas (Levenshtein)
   */
  calculateSimilarity(target, recorded) {
    const targetLower = target.toLowerCase();
    const recordedLower = recorded.toLowerCase();

    const maxLen = Math.max(targetLower.length, recordedLower.length);
    let matches = 0;

    for (let i = 0; i < Math.min(targetLower.length, recordedLower.length); i++) {
      if (targetLower[i] === recordedLower[i]) {
        matches++;
      }
    }

    // Bonus si contiene la palabra
    if (recordedLower.includes(targetLower) || targetLower.includes(recordedLower)) {
      matches = Math.min(maxLen, matches + 15);
    }

    return Math.round((matches / maxLen) * 100);
  }

  /**
   * Precisión de un fonema individual
   */
  calculatePhonemeAccuracy(expected, recorded) {
    if (!expected || !recorded) return 0;
    if (expected === recorded) return 100;

    // Comprobar similaridad acústica (substituciones comunes)
    const similarPairs = [
      ['b', 'v'], // b y v suenan igual en español
      ['y', 'll'], // yeísmo común
      ['z', 's'], // seseo común
      ['c', 'z'],
      ['d', 't'],
      ['g', 'k']
    ];

    for (const [a, b] of similarPairs) {
      if ((expected === a && recorded === b) || (expected === b && recorded === a)) {
        return 75; // Parcialmente correcto
      }
    }

    return 40; // Incorrecto
  }

  /**
   * Análisis detallado por fonema
   */
  analyzeByPhoneme(targetWord, recordedText) {
    const targetData = WORD_PHONEME_DATABASE[targetWord];
    const targetPhonemes = targetData.phonemes;
    const recordedPhonemes = this.extractPhonemes(recordedText);

    const analysis = {};

    targetPhonemes.forEach((phoneme, index) => {
      const recordedPhoneme = recordedPhonemes[index];
      const accuracy = this.calculatePhonemeAccuracy(phoneme, recordedPhoneme);

      analysis[phoneme] = {
        expected: phoneme,
        recorded: recordedPhoneme || 'omitted',
        accuracy,
        isCorrect: accuracy >= 80,
        commonError: accuracy < 80 ? this.identifyCommonError(phoneme, recordedPhoneme) : null
      };
    });

    return analysis;
  }

  /**
   * Identificar errores comunes
   */
  identifyCommonError(expected, recorded) {
    const commonErrors = {
      's': 'Confunde "s" con "z" (seseo)',
      'z': 'Dice "s" en lugar de "z" (seseo)',
      'r': 'Dificultad con "r" vibrante (rotacismo)',
      'rr': 'Confunde "r" con "rr"',
      'y': 'Confunde "y" con "ll" (yeísmo)',
      'll': 'Confunde "ll" con "y" (yeísmo)',
      'b': 'Omite o confunde "b" con "v"',
      'v': 'Confunde "v" con "b"',
      'd': 'Omite o sustituye "d"',
      'g': 'Dificultad con "g" vibrante',
      'j': 'Dificultad con "j" fricativa'
    };

    return commonErrors[expected] || 'Error de pronunciación';
  }

  /**
   * Detectar errores específicos
   */
  detectSpecificErrors(targetWord, recordedText) {
    const targetLower = targetWord.toLowerCase();
    const recordedLower = recordedText.toLowerCase();

    const errors = [];

    // Error tipo: Omisión
    if (recordedLower.length < targetLower.length) {
      errors.push({
        type: 'Omission',
        description: 'Omitió sonidos de la palabra'
      });
    }

    // Error tipo: Sustitución (z por s)
    if (targetLower.includes('z') && !recordedLower.includes('z')) {
      errors.push({
        type: 'Substitution',
        phoneme: 'z/s',
        description: 'Dijo "s" en lugar de "z"'
      });
    }

    // Error tipo: Sustitución (s por z)
    if (targetLower.includes('s') && !recordedLower.includes('s')) {
      errors.push({
        type: 'Substitution',
        phoneme: 's/z',
        description: 'Dijo "z" en lugar de "s"'
      });
    }

    // Error tipo: Rotacismo (r)
    if ((targetLower.includes('r') || targetLower.includes('rr')) &&
        !recordedLower.match(/r/)) {
      errors.push({
        type: 'Rhotic',
        description: 'Dificultad con sonido "r"'
      });
    }

    // Error tipo: Yeísmo (ll/y)
    if (targetLower.includes('ll') && recordedLower.includes('y')) {
      errors.push({
        type: 'Yeism',
        description: 'Dijo "y" en lugar de "ll"'
      });
    }

    return errors;
  }

  /**
   * Generar score final ponderado
   */
  generateScore(phonemeComparison, similarity, errors) {
    const correctPhonemes = phonemeComparison.filter(p => p.status === 'correct').length;
    const totalPhonemes = phonemeComparison.length;
    const phonemeAccuracy = (correctPhonemes / totalPhonemes) * 100;

    // Score ponderado
    const score = Math.round(
      (similarity * 0.4) +        // 40% similitud general
      (phonemeAccuracy * 0.4) +   // 40% precisión fonética
      ((100 - (errors.length * 20)) * 0.2)  // 20% ausencia de errores
    );

    return Math.max(0, Math.min(100, score)); // Limitar 0-100
  }

  /**
   * Generar feedback personalizado
   */
  generateFeedback(score, errors) {
    let feedback = {};
    let emoji = '';
    let messages = [];

    if (score >= 90) {
      emoji = '🎉';
      feedback.level = 'excellent';
      messages.push('¡Excelente pronunciación!');
    } else if (score >= 75) {
      emoji = '👍';
      feedback.level = 'good';
      messages.push('Muy bien, necesitas pequeñas mejoras');
    } else if (score >= 50) {
      emoji = '🔄';
      feedback.level = 'okay';
      messages.push('Intenta de nuevo, más lentamente');
    } else {
      emoji = '💪';
      feedback.level = 'needswork';
      messages.push('Necesitas practicar este sonido más');
    }

    // Feedback específico por error
    errors.forEach(error => {
      if (error.type === 'Omission') {
        messages.push('✋ No pronunciaste toda la palabra');
      } else if (error.type === 'Substitution') {
        messages.push(`⚠️ Cambiaste "${error.phoneme}"`);
      } else if (error.type === 'Rhotic') {
        messages.push('🔄 Trabaja la "r" vibrante');
      } else if (error.type === 'Yeism') {
        messages.push('🔄 Recuerda: "ll" != "y"');
      }
    });

    return {
      emoji,
      level: feedback.level,
      score: score,
      messages,
      advice: this.getAdviceByScore(score)
    };
  }

  /**
   * Consejos según score
   */
  getAdviceByScore(score) {
    if (score >= 90) {
      return '¡Pasemos a un sonido más difícil!';
    } else if (score >= 70) {
      return 'Repite una vez más, con más cuidado';
    } else if (score >= 50) {
      return 'Escucha bien la palabra y hazlo más lento';
    } else {
      return 'Pide ayuda a tu maestro/a o terapeuta';
    }
  }

  /**
   * Generar ejercicio adaptativo
   */
  generateAdaptiveExercise() {
    const failedPhonemes = this.userHistory.failedPhonemes;

    // Si hay fonemas problemáticos, enfocarse en esos
    if (failedPhonemes.length > 0) {
      const targetPhoneme = failedPhonemes[0];

      // Buscar palabra fácil con ese fonema
      const matchingWords = Object.entries(WORD_PHONEME_DATABASE)
        .filter(([word, data]) =>
          data.phonemes.includes(targetPhoneme) && data.difficulty === 'easy'
        );

      if (matchingWords.length > 0) {
        return {
          type: 'phoneme_focus',
          targetPhoneme,
          word: matchingWords[0][0],
          difficulty: 'easy',
          instruction: `Enfócate en el sonido "${targetPhoneme}"`
        };
      }
    }

    // Si va bien, aumentar dificultad
    return {
      type: 'difficulty_increase',
      instruction: 'Pasamos a una palabra más difícil'
    };
  }

  /**
   * Actualizar historial del usuario
   */

  updateHistoricalData(attempt) {
    this.userHistory.sessionStats.totalAttempts++;
    this.userHistory.sessionStats.totalScore += attempt.score;
    this.userHistory.sessionStats.averageScore =
      Math.round(this.userHistory.sessionStats.totalScore / this.userHistory.sessionStats.totalAttempts);

    // CORRECCIÓN AQUÍ: Convertimos el objeto en un array de valores para poder usar forEach
    Object.values(attempt.detailedAnalysis).forEach((phoneme) => {
      if (phoneme.accuracy >= 80) {
        if (!this.userHistory.successfulPhonemes.includes(phoneme.expected)) {
          this.userHistory.successfulPhonemes.push(phoneme.expected);
        }
      } else {
        if (!this.userHistory.failedPhonemes.includes(phoneme.expected)) {
          if (!this.userHistory.failedPhonemes.includes(phoneme.expected)) {
            this.userHistory.failedPhonemes.push(phoneme.expected);
          }
        }
      }
    });
}

  /**
   * Obtener reporte del progreso
   */
  getProgressReport() {
    return {
      totalAttempts: this.userHistory.sessionStats.totalAttempts,
      averageScore: this.userHistory.sessionStats.averageScore,
      strongPhonemes: this.userHistory.successfulPhonemes,
      weakPhonemes: this.userHistory.failedPhonemes,
      recommendedFocus: this.userHistory.failedPhonemes.slice(0, 3)
    };
  }
}


// ========================
// EXPORTAR PARA USO
// ========================
// En el HTML:
// <script src="pronunciation-analyzer.js"></script>
