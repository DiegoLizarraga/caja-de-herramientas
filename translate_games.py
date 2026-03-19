import os
import re

translations_en = {
    r'"sol"': '"sun"', r'"luna"': '"moon"', r'"estrella"': '"star"', r'"nube"': '"cloud"',
    r'"árbol"': '"tree"', r'"arbol"': '"tree"', r'"flor"': '"flower"', r'"casa"': '"house"',
    r'"perro"': '"dog"', r'"gato"': '"cat"', r'"pájaro"': '"bird"', r'"lluvia"': '"rain"',
    r'"dinosaurio"': '"dinosaur"', r'"mariposa"': '"butterfly"', r'"computadora"': '"computer"',
    r'"El gato duerme"': '"The cat sleeps"', r'"El perro ladra"': '"The dog barks"',
    r'"El pájaro vuela"': '"The bird flies"', r'"El sol brilla"': '"The sun shines"',
    r'"La luna sale"': '"The moon rises"', r'"El eco de las palabras"': '"The echo of words"',
    r'"Ronda"': '"Round"', r'"Puntaje"': '"Score"',
    r'"Escucha atentamente la palabra y trata de repetirla lo más parecido posible."': '"Listen closely to the word and try to repeat it as accurately as possible."',
    r'"Escuchar palabra"': '"Listen to word"', r'"Grabar mi voz"': '"Record my voice"',
    r'"¡Correcto!"': '"Correct!"', r'"Inténtalo de nuevo"': '"Try again"',
    r'"Juego terminado"': '"Game over"', r'"Jugar de nuevo"': '"Play again"',
    r'"Siguiente ronda"': '"Next round"', r'"Puntos"': '"Points"', r'"Nivel"': '"Level"',
    r'"Fácil"': '"Easy"', r'"Medio"': '"Medium"', r'"Difícil"': '"Hard"',
    r"'es-ES'": "'en-US'", r"'es'": "'en'", r'"es-ES"': '"en-US"', r'"es"': '"en"'
}

translations_pt = {
    r'"sol"': '"sol"', r'"luna"': '"lua"', r'"estrella"': '"estrela"', r'"nube"': '"nuvem"',
    r'"árbol"': '"árvore"', r'"arbol"': '"árvore"', r'"flor"': '"flor"', r'"casa"': '"casa"',
    r'"perro"': '"cachorro"', r'"gato"': '"gato"', r'"pájaro"': '"pássaro"', r'"lluvia"': '"chuva"',
    r'"dinosaurio"': '"dinossauro"', r'"mariposa"': '"borboleta"', r'"computadora"': '"computador"',
    r'"El gato duerme"': '"O gato dorme"', r'"El perro ladra"': '"O cachorro late"',
    r'"El pájaro vuela"': '"O pássaro voa"', r'"El sol brilla"': '"O sol brilha"',
    r'"La luna sale"': '"A lua nasce"', r'"El eco de las palabras"': '"O eco das palavras"',
    r'"Ronda"': '"Rodada"', r'"Puntaje"': '"Pontuação"',
    r'"Escucha atentamente la palabra y trata de repetirla lo más parecido posible."': '"Ouça atentamente a palavra e tente repeti-la com a maior precisão possível."',
    r'"Escuchar palabra"': '"Ouvir palavra"', r'"Grabar mi voz"': '"Gravar minha voz"',
    r'"¡Correcto!"': '"Correto!"', r'"Inténtalo de nuevo"': '"Tente novamente"',
    r'"Juego terminado"': '"Fim de jogo"', r'"Jugar de nuevo"': '"Jogar novamente"',
    r'"Siguiente ronda"': '"Próxima rodada"', r'"Puntos"': '"Pontos"', r'"Nivel"': '"Nível"',
    r'"Fácil"': '"Fácil"', r'"Medio"': '"Médio"', r'"Difícil"': '"Difícil"',
    r"'es-ES'": "'pt-BR'", r"'es'": "'pt'", r'"es-ES"': '"pt-BR"', r'"es"': '"pt"'
}

def translate_file(filepath, translations):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    original_content = content
    for old, new in translations.items():
        content = re.sub(old, new, content)

        # UI texts (without quotes)
        if '"' in old and '"' in new:
            old_nq = old.replace('"', '')
            new_nq = new.replace('"', '')
            content = content.replace(f">{old_nq}<", f">{new_nq}<")
            content = content.replace(f"'{old_nq}'", f"'{new_nq}'")

    if content != original_content:
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(content)
        print(f"Translated: {filepath}")

def translate_directory(directory, translations):
    for root, _, files in os.walk(directory):
        for file in files:
            if file.endswith('.js') or file.endswith('.html'):
                translate_file(os.path.join(root, file), translations)

if __name__ == "__main__":
    translate_directory("a-wisho/games-en", translations_en)
    translate_directory("a-wisho/games-pt", translations_pt)
    print("Translation process complete.")

translations_en.update({
    r'"El Eco de las Palabras"': '"The Echo of Words"',
    r'"El eco de las palabras"': '"The echo of words"',
    r'"puntos"': '"points"',
    r'"Grabar mi voz"': '"Record my voice"',
    r'"Tip: Escucha atentamente la palabra y trata de repetirla lo más parecido posible."': '"Tip: Listen carefully to the word and try to repeat it as accurately as possible."'
})

translations_pt.update({
    r'"El Eco de las Palabras"': '"O Eco das Palavras"',
    r'"El eco de las palabras"': '"O eco das palavras"',
    r'"puntos"': '"pontos"',
    r'"Grabar mi voz"': '"Gravar minha voz"',
    r'"Tip: Escucha atentamente la palabra y trata de repetirla lo más parecido posible."': '"Dica: Ouça com atenção a palavra e tente repeti-la com a maior precisão possível."'
})

translate_directory("a-wisho/games-en", translations_en)
translate_directory("a-wisho/games-pt", translations_pt)
print("Second translation pass complete.")
