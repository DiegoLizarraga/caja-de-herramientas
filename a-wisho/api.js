/**
 * BlueMindsAPI Service Provider
 * Comprehensive handler for Authentication, Therapy Sessions, and Game Analytics.
 * @author Neuro-BlueMinds Team
 * @version 2.2.0
 */

const KOYEB_URL = 'https://crude-sailfish-blueminds-65b642e8.koyeb.app/api'; 
const LOCAL_URL = 'http://localhost:8000/api';

class BlueMindsAPI {
  constructor() {
    /** @type {string} Dynamic Base URL selection */
    //this.baseURL = window.location.hostname.includes('github.io') ? KOYEB_URL : LOCAL_URL;
    this.baseURL = KOYEB_URL ;
    /** @type {Object|null} Session User Data */
    this.currentUser = this._loadUser();
    
    /** @type {string|null} JWT Security Token */
    this.token = localStorage.getItem('blueminds_token');
  }

  /**
   * Internal helper to generate authorized headers.
   * @private
   */
  _getHeaders() {
    const headers = { 'Content-Type': 'application/json' };
    if (this.token) {
      headers['Authorization'] = `Bearer ${this.token}`;
    }
    return headers;
  }
  async saveGameResults(gameData) {
    console.log("save game results of ", gameData);
      const response = await fetch(`${this.baseURL}/games/save-results`, {
          method: 'POST',
          headers: this._getHeaders(), // Aquí ya incluyes el token automáticamente
          body: JSON.stringify(gameData)
      });
      
      if (!response.ok) throw new Error('Error al guardar resultados del juego');
      return await response.json();
  }
  async getBestScore(gameId) {
    const response = await fetch(`${this.baseURL}/games/best-score/${gameId}`, {
        headers: this._getHeaders()
    });
    if (!response.ok) return 0;
    const data = await response.json();
    return data.bestScore; // Suponiendo que creamos este endpoint
}
  // ========================================================================
  // AUTHENTICATION MODULE
  // ========================================================================

  async register(name, birth, email, country, password, confirmPassword) {
    const response = await fetch(`${this.baseURL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, birth, email, country, password, confirmPassword })
    });
    return this._handleAuthResponse(response);
}

  async login(email, password) {
    const response = await fetch(`${this.baseURL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return this._handleAuthResponse(response);
  }
  async getQuizProgress() {
      const response = await fetch(`${this.baseURL}/quiz/progress`, {
          headers: this._getHeaders()
      });
      if (!response.ok) throw new Error('Error al obtener progreso');
      const data = await response.json();
      return data.progress;
  }
  
async saveQuizResponse(data) {
    console.log("Token: ", this.token);
    
    // Desestructuramos para asegurar que enviamos los nombres que el backend espera
    const { 
        quiz_session_id, 
        question_index, 
        question_type, 
        learning_style, 
        nivel, 
        answer, 
        is_correct, 
        response_time_ms 
    } = data;

    const response = await fetch(`${this.baseURL}/quiz/response`, {
        method: 'POST',
        headers: this._getHeaders(),
        body: JSON.stringify({
            quiz_session_id,
            question_index, // <-- IMPORTANTE: Antes era questionIndex
            question_type,
            learning_style,
            nivel,
            answer, // No hace falta stringify aquí si el backend ya lo maneja o si es JSONB directo
            is_correct,
            response_time_ms
        })
    });

    // Nota: No puedes llamar a .text() y luego a .json() sobre la misma respuesta
    if (!response.ok) {
        const errData = await response.json().catch(() => ({ error: 'Error desconocido' }));
        throw new Error(errData.error || 'Error al guardar respuesta del quiz');
    }

    return await response.json();
}

  async saveQuizCompletion(score, totalTimeSeconds, learningStyle, suggestedLevel) {
    const response = await fetch(`${this.baseURL}/quiz/complete`, {
      method: 'POST',
      headers: this._getHeaders(),
      body: JSON.stringify({
        score,
        totalTimeSeconds,
        learningStyle,
        suggestedLevel
      })
    });

    if (!response.ok) {
      const errData = await response.json();
      throw new Error(errData.error || 'Error al completar quiz');
    }

    return await response.json();
  }

// Quiz Padres

  // QUIZ PADRES
async saveParentQuizResponse(questionIndex, section, answer) {
    const response = await fetch(`${this.baseURL}/parent-quiz/response`, {
        method: 'POST',
        headers: this._getHeaders(),
        body: JSON.stringify({ questionIndex, section, answer })
    });
    if (!response.ok) throw new Error('Error al guardar respuesta del quiz de padres');
    return await response.json();
}

async getParentQuizProgress() {
    const response = await fetch(`${this.baseURL}/parent-quiz/progress`, {
        headers: this._getHeaders()
    });
    if (!response.ok) throw new Error('Error al obtener progreso del quiz de padres');
    const data = await response.json();
    return data.progress;
}

async completeParentQuiz(communicationScore, learningStyle) {
    const response = await fetch(`${this.baseURL}/parent-quiz/complete`, {
        method: 'POST',
        headers: this._getHeaders(),
        body: JSON.stringify({ communicationScore, learningStyle })
    });
    if (!response.ok) throw new Error('Error al completar quiz de padres');
    return await response.json();
}

async needsOnboardingCheck() {
    try {
        const user = this.getCurrentUser();
        if (!user) return false;

        // Si ya sabemos que faltan datos del storage
        if (!user.birth || !user.country) return true;

        // Opcional: consulta al backend para datos frescos (más seguro)
        const response = await fetch(`${this.baseURL}/user/profile`, {
            headers: this._getHeaders()
        });

        if (!response.ok) throw new Error('Error al verificar perfil');

        const profile = await response.json();
        return !profile.birth || !profile.country;
    } catch (error) {
        console.error('Error checking onboarding:', error);
        return false; // Si falla, deja pasar (mejor no bloquear)
    }
}

  async loginWithGoogle(googleCredential) {
    const response = await fetch(`${this.baseURL}/auth/google`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: googleCredential })
    });
    return this._handleAuthResponse(response);
  }

  /**
   * Core logic to process authentication responses and persist session.
   * @private
   */
  async _handleAuthResponse(response) {
    const data = await response.json();
    
    // Improved error handling: capture backend error messages precisely
    if (!response.ok) {
      const errorMsg = data.error || `Error ${response.status}: Authentication Failed`;
      throw new Error(errorMsg);
    }

    this.currentUser = data.user;
    this.token = data.token;
    
    // Persist session to LocalStorage
    localStorage.setItem('blueminds_current_user', JSON.stringify(data.user));
    localStorage.setItem('blueminds_token', data.token);
    
    return data;
  }

  logout() {
    this.currentUser = null;
    this.token = null;
    localStorage.clear();
    window.location.href = '/login.html';
  }

  // ========================================================================
  // GAME PROGRESS MODULE
  // ========================================================================

  async getGameProgress(userId) {
    try {
      const response = await fetch(`${this.baseURL}/progress/${userId}`, {
        headers: this._getHeaders()
      });
      if (!response.ok) throw new Error('Failed to fetch progress');
      return await response.json();
    } catch (error) {
      console.error('[API Error]:', error);
      return [];
    }
  }

  async getGameProgressById(userId, gameId) {
    try {
      const response = await fetch(`${this.baseURL}/progress/${userId}/${gameId}`, {
        headers: this._getHeaders()
      });
      if (!response.ok) throw new Error('Failed to fetch specific game progress');
      return await response.json();
    } catch (error) {
      console.error('[API Error]:', error);
      return null;
    }
  }

  async updateGameProgress(userId, gameId, gameTitle, score, level, maxLevel, completionPercentage, timePlayed = 0) {
    const response = await fetch(`${this.baseURL}/progress/update`, {
      method: 'POST',
      headers: this._getHeaders(),
      body: JSON.stringify({
        userId, gameId, gameTitle,
        score: parseInt(score),
        level: parseInt(level),
        maxLevel: parseInt(maxLevel),
        completionPercentage: parseFloat(completionPercentage),
        timePlayed: parseInt(timePlayed)
      })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to update progress');
    return data;
  }

  // ========================================================================
  // THERAPY SESSIONS MODULE
  // ========================================================================

  async saveTherapySession(userId, gameId, duration, performance, notes = '') {
    const response = await fetch(`${this.baseURL}/therapy-session`, {
      method: 'POST',
      headers: this._getHeaders(),
      body: JSON.stringify({
        userId, gameId,
        duration: parseInt(duration),
        performance, notes
      })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || 'Failed to save therapy session');
    return data;
  }

  async getTherapySessions(userId) {
    try {
      const response = await fetch(`${this.baseURL}/therapy-sessions/${userId}`, {
        headers: this._getHeaders()
      });
      if (!response.ok) throw new Error('Failed to fetch therapy sessions');
      return await response.json();
    } catch (error) {
      console.error('[API Error]:', error);
      return [];
    }
  }

  async completeProfile(birth, country) {
    const response = await fetch(`${this.baseURL}/user/complete-profile`, {
        method: 'POST',
        headers: this._getHeaders(),
        body: JSON.stringify({ birth, country })
    });
    return this._handleAuthResponse(response);  // Reutilizamos la misma función
  }

  // ========================================================================
  // ANALYTICS & SYSTEM
  // ========================================================================

  async getUserStats(userId) {
    try {
      const response = await fetch(`${this.baseURL}/stats/${userId}`, {
        headers: this._getHeaders()
      });
      if (!response.ok) throw new Error('Failed to fetch statistics');
      return await response.json();
    } catch (error) {
      console.error('[API Error]:', error);
      return { totalGamesStarted: 0, totalGamesSessions: 0, totalTimeSpent: 0, averageCompletion: 0, maxCompletion: 0 };
    }
  }

  async checkHealth() {
    try {
      const response = await fetch(`${this.baseURL}/health`);
      return response.ok;
    } catch { return false; }
  }

  getCurrentUser() { return this.currentUser; }

  _loadUser() {
    const stored = localStorage.getItem('blueminds_current_user');
    return stored ? JSON.parse(stored) : null;
  }
}

const api = new BlueMindsAPI();
