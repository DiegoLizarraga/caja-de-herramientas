#include <fstream>
#include <iostream>
#include <string>
using namespace std;

// ─────────────────────────────────────────────
//  Estados del autómata
// ─────────────────────────────────────────────
enum State {
  S_START = 0, // estado inicial / entre tokens
  S_VAR   = 1, // leyendo una variable (solo letras minúsculas)
  S_INT   = 2, // leyendo un número entero
  S_FLOAT = 3, // leyendo un número flotante (dígitos después del '.')
  S_DOT   = 4, // se acaba de leer un '.' (se espera al menos un dígito)
  S_EMIT  = 5, // aceptación: emitir token del buffer, reprocesar carácter actual
  S_EMIT1 = 6, // aceptación: emitir token de un solo carácter y avanzar
  S_ERROR = 7  // carácter no reconocido – se omite
};

// ─────────────────────────────────────────────
//  Clases de caracteres (columnas de la tabla)
// ─────────────────────────────────────────────
enum CharClass {
  CC_LOWER = 0, // a-z
  CC_DIGIT = 1, // 0-9
  CC_DOT   = 2, // .
  CC_OP    = 3, // = + - * / ( )
  CC_SPACE = 4, // espacio, tabulador, salto de línea, \r
  CC_OTHER = 5  // cualquier otro carácter
};

// Devuelve la clase a la que pertenece el carácter recibido
CharClass getClass(char c) {
  if (c >= 'a' && c <= 'z')                                    return CC_LOWER;
  if (c >= '0' && c <= '9')                                    return CC_DIGIT;
  if (c == '.')                                                return CC_DOT;
  if (c=='='||c=='+'||c=='-'||c=='*'||c=='/'||c=='('||c==')') return CC_OP;
  if (c==' '||c=='\t'||c=='\n'||c=='\r')                      return CC_SPACE;
  return CC_OTHER;
}

// ─────────────────────────────────────────────
//  Tabla de transiciones  [estado_actual][clase_caracter]
//  → siguiente_estado
//
//  S_EMIT  = aceptar token acumulado, NO consumir el carácter actual
//  S_EMIT1 = aceptar el carácter actual como token de un símbolo, consumirlo
// ─────────────────────────────────────────────
//                         MIN      DIG       PTO      OP       ESP      OTR
State T[8][6] = {
  /*S_START*/ { S_VAR,   S_INT,   S_DOT,   S_EMIT1, S_START, S_ERROR },
  /*S_VAR  */ { S_VAR,   S_EMIT,  S_EMIT,  S_EMIT,  S_EMIT,  S_EMIT  },
  /*S_INT  */ { S_EMIT,  S_INT,   S_FLOAT, S_EMIT,  S_EMIT,  S_EMIT  },
  /*S_FLOAT*/ { S_EMIT,  S_FLOAT, S_EMIT,  S_EMIT,  S_EMIT,  S_EMIT  },
  /*S_DOT  */ { S_EMIT,  S_FLOAT, S_EMIT,  S_EMIT,  S_EMIT,  S_EMIT  },
  /*S_EMIT */ { S_START, S_START, S_START, S_START, S_START, S_START },
  /*S_EMIT1*/ { S_START, S_START, S_START, S_START, S_START, S_START },
  /*S_ERROR*/ { S_START, S_START, S_START, S_START, S_START, S_START }
};

// ─────────────────────────────────────────────
//  Imprime un token reconocido con su tipo
// ─────────────────────────────────────────────
void emitToken(const string &tok, State fromState) {
  if (tok.empty()) return;

  string type;
  if      (fromState == S_VAR)   type = "variable";
  else if (fromState == S_INT)   type = "integer";
  else if (fromState == S_FLOAT) type = "float";
  else if (fromState == S_DOT)   type = "float";   // punto solo: caso borde, se trata como float
  else if (tok == "=")           type = "assignment";
  else if (tok == "+")           type = "sum";
  else if (tok == "-")           type = "subtract";
  else if (tok == "*")           type = "product";
  else if (tok == "/")           type = "division";
  else if (tok == "(")           type = "left parenthesis";
  else if (tok == ")")           type = "right parenthesis";
  else                           type = "unknown";

  cout << tok << "\t" << type << "\n";
}

// ─────────────────────────────────────────────
//  Analizador léxico — guiado por la tabla de transiciones
// ─────────────────────────────────────────────
void lexer(string filepath) {
  ifstream file(filepath);
  if (!file.is_open()) {
    cerr << "Error: no se pudo abrir '" << filepath << "'\n";
    return;
  }

  cout << "Token\tType\n";

  State  state  = S_START;
  string buffer = "";  // acumula los caracteres del token actual
  char   c      = 0;
  bool   hasC   = false;  // indica si hay un carácter pendiente de reprocesar

  // Lee el siguiente carácter: del buffer de regreso o del archivo
  auto nextChar = [&]() -> bool {
    if (hasC) { hasC = false; return true; }
    return (bool)file.get(c);
  };

  while (nextChar()) {
    CharClass cc   = getClass(c);
    State     next = T[state][cc];

    if (next == S_EMIT) {
      // El buffer contiene un token completo; se emite y se regresa el carácter actual
      emitToken(buffer, state);
      buffer = "";
      state  = S_START;
      hasC   = true;  // reprocesar el carácter actual en la siguiente iteración
      continue;
    }

    if (next == S_EMIT1) {
      // Se vacía el buffer pendiente y luego se emite el operador/paréntesis actual
      if (!buffer.empty()) {
        emitToken(buffer, state);
        buffer = "";
      }
      emitToken(string(1, c), S_EMIT1);
      state = S_START;
      continue;
    }

    if (next == S_ERROR) {
      // Se vacía el buffer y se omite el carácter no reconocido
      if (!buffer.empty()) {
        emitToken(buffer, state);
        buffer = "";
      }
      state = S_START;
      continue;
    }

    // Acumulación normal (S_START con espacio simplemente espera)
    if (next != S_START) {
      buffer += c;
    }
    state = next;
  }

  // Fin de archivo: emitir lo que quede en el buffer
  if (!buffer.empty()) {
    emitToken(buffer, state);
  }

  file.close();
}

int main(int argc, char *argv[]) {
  // Si se pasa un argumento, se usa como ruta; si no, se usa "expressions.txt"
  string path = (argc > 1) ? argv[1] : "expressions.txt";
  lexer(path);
  return 0;
}