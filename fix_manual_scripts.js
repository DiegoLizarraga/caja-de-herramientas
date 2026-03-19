const fs = require('fs');

function fixFile(filePath) {
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');

        let modified = false;

        if (content.match(/utterance\.lang\s*=\s*['"]es-[A-Z]+['"]/g) || content.match(/utterance\.lang\s*=\s*['"]es['"]/g)) {
            content = content.replace(/utterance\.lang\s*=\s*['"](es-[A-Z]+|es)['"]/g,
                "const currentLang = localStorage.getItem('blueminds_lang') || 'es';\n    utterance.lang = currentLang === 'en' ? 'en-US' : currentLang === 'pt' ? 'pt-BR' : 'es-MX'");
            modified = true;
        }

        if (content.match(/recognition\.lang\s*=\s*['"]es-[A-Z]+['"]/g) || content.match(/recognition\.lang\s*=\s*['"]es['"]/g)) {
            content = content.replace(/recognition\.lang\s*=\s*['"](es-[A-Z]+|es)['"]/g,
                "const currentLangRecog = localStorage.getItem('blueminds_lang') || 'es';\n    recognition.lang = currentLangRecog === 'en' ? 'en-US' : currentLangRecog === 'pt' ? 'pt-BR' : 'es-MX'");
            modified = true;
        }

        if (modified) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated manual fixes on ${filePath}`);
        }
    }
}

// Find all script.js
const { execSync } = require('child_process');
const files = execSync('find a-wisho/games -name "script.js"').toString().trim().split('\n');

files.forEach(fixFile);
