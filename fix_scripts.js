const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        let dirPath = path.join(dir, f);
        let isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

walkDir('a-wisho/games', function(filePath) {
    if (filePath.endsWith('script.js')) {
        let content = fs.readFileSync(filePath, 'utf8');
        let modified = false;

        // Replace utterance.lang
        if (content.match(/utterance\.lang\s*=\s*['"]es-[A-Z]+['"]/g) || content.match(/utterance\.lang\s*=\s*['"]es['"]/g)) {
            content = content.replace(/utterance\.lang\s*=\s*['"](es-[A-Z]+|es)['"]/g,
                "const currentLang = localStorage.getItem('blueminds_lang') || 'es';\n    utterance.lang = currentLang === 'en' ? 'en-US' : currentLang === 'pt' ? 'pt-BR' : 'es-MX'");
            modified = true;
        }

        // Replace recognition.lang
        if (content.match(/recognition\.lang\s*=\s*['"]es-[A-Z]+['"]/g) || content.match(/recognition\.lang\s*=\s*['"]es['"]/g)) {
            content = content.replace(/recognition\.lang\s*=\s*['"](es-[A-Z]+|es)['"]/g,
                "const currentLangRecog = localStorage.getItem('blueminds_lang') || 'es';\n    recognition.lang = currentLangRecog === 'en' ? 'en-US' : currentLangRecog === 'pt' ? 'pt-BR' : 'es-MX'");
            modified = true;
        }

        // Find literal arrays or strings that represent content and wrap in tg() if they aren't already
        // This is complex to do with pure regex. We'll do a quick check on some common arrays.
        // e.g. text: "El pájaro está en el", missingWord: "cielo"
        // name: "Bombero" etc.
        const replacements = [
            // Escribe palabra and similar
            { regex: /(text:\s*)(['"].*?['"])/g, replace: '$1tg($2)' },
            { regex: /(missingWord:\s*)(['"].*?['"])/g, replace: '$1tg($2)' },
            { regex: /(name:\s*)(['"].*?['"])/g, replace: '$1tg($2)' },
            { regex: /(word:\s*)(['"].*?['"])/g, replace: '$1tg($2)' },
            { regex: /(phrase:\s*)(['"].*?['"])/g, replace: '$1tg($2)' },
            { regex: /(targetWord:\s*)(['"].*?['"])/g, replace: '$1tg($2)' },
            { regex: /(options:\s*\[(.*?)\])/g, replace: (match, p1, p2) => {
                let options = p2.split(',').map(s => {
                    let s_trim = s.trim();
                    if (s_trim.startsWith('"') || s_trim.startsWith("'")) {
                        if (!s_trim.startsWith("tg(")) {
                            return `tg(${s_trim})`;
                        }
                    }
                    return s_trim;
                }).join(', ');
                return `options: [${options}]`;
            }},
            { regex: /(words:\s*\[(.*?)\])/g, replace: (match, p1, p2) => {
                if (p2.includes('{')) return match; // array of objects
                let words = p2.split(',').map(s => {
                    let s_trim = s.trim();
                    if (s_trim.startsWith('"') || s_trim.startsWith("'")) {
                        if (!s_trim.startsWith("tg(")) {
                            return `tg(${s_trim})`;
                        }
                    }
                    return s_trim;
                }).join(', ');
                return `words: [${words}]`;
            }}
        ];

        replacements.forEach(({regex, replace}) => {
            if (content.match(regex)) {
                let newContent = content.replace(regex, replace);
                if (newContent !== content) {
                    // Prevent double tg(tg(...))
                    newContent = newContent.replace(/tg\(tg\((.*?)\)\)/g, 'tg($1)');
                    content = newContent;
                    modified = true;
                }
            }
        });

        if (modified) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated ${filePath}`);
        }
    }
});
