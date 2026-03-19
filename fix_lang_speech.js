const fs = require('fs');
const { execSync } = require('child_process');
const files = execSync('find a-wisho/games -name "script.js"').toString().trim().split('\n');

let changes = 0;
files.forEach(filePath => {
    let content = fs.readFileSync(filePath, 'utf8');
    let initialContent = content;

    // Replace utterance.lang completely
    let utteranceRegex = /utterance\.lang\s*=\s*(?:['"].*?['"]|[^;]+);/g;
    content = content.replace(utteranceRegex, (match) => {
        if (match.includes("currentLang")) return match; // Already fixed
        return "const currentLang = localStorage.getItem('blueminds_lang') || 'es';\n    utterance.lang = currentLang === 'en' ? 'en-US' : currentLang === 'pt' ? 'pt-BR' : 'es-MX';";
    });

    // Replace recognition.lang completely
    let recognitionRegex = /recognition\.lang\s*=\s*(?:['"].*?['"]|[^;]+);/g;
    content = content.replace(recognitionRegex, (match) => {
        if (match.includes("currentLangRecog")) return match; // Already fixed
        return "const currentLangRecog = localStorage.getItem('blueminds_lang') || 'es';\n    recognition.lang = currentLangRecog === 'en' ? 'en-US' : currentLangRecog === 'pt' ? 'pt-BR' : 'es-MX';";
    });

    if (content !== initialContent) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Updated speech lang in ${filePath}`);
        changes++;
    }
});
console.log(`Speech files modified: ${changes}`);
