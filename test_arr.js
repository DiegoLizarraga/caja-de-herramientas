const fs = require('fs');

function fixAllScripts() {
    const { execSync } = require('child_process');
    const files = execSync('find a-wisho/games -name "script.js"').toString().trim().split('\n');
    let totalChanges = 0;

    files.forEach(filePath => {
        let content = fs.readFileSync(filePath, 'utf8');
        let initialContent = content;

        // Common dynamic content arrays/objects structures:

        // words: ["A", "B"] or options: ["A", "B"]
        // name: "A", word: "A", text: "A", etc.
        // Needs proper parsing to avoid breaking JS. Let's use simpler regex on known files.
        // Alternatively, since we can't easily parse arbitrary JS, we can dynamically rewrite specific arrays based on patterns.

        // 1. Array of words/phrases typically inside an array or object.
        // Because regex is tricky on JS, we will focus on translating known structures.

        let modifications = 0;

        // words: ['Sol', 'Luna', 'Estrella']
        content = content.replace(/(words\s*:\s*\[)([^\]]+)(\])/g, (match, p1, p2, p3) => {
            if (p2.includes('{') || p2.includes('function') || p2.includes('tg(')) return match;
            let items = p2.split(',').map(s => {
                let trimmed = s.trim();
                if ((trimmed.startsWith("'") && trimmed.endsWith("'")) ||
                    (trimmed.startsWith('"') && trimmed.endsWith('"'))) {
                    return `tg(${trimmed})`;
                }
                return s;
            });
            modifications++;
            return p1 + items.join(', ') + p3;
        });

        // options: ['A', 'B', 'C']
        content = content.replace(/(options\s*:\s*\[)([^\]]+)(\])/g, (match, p1, p2, p3) => {
            if (p2.includes('{') || p2.includes('function') || p2.includes('tg(')) return match;
            let items = p2.split(',').map(s => {
                let trimmed = s.trim();
                if ((trimmed.startsWith("'") && trimmed.endsWith("'")) ||
                    (trimmed.startsWith('"') && trimmed.endsWith('"'))) {
                    return `tg(${trimmed})`;
                }
                return s;
            });
            modifications++;
            return p1 + items.join(', ') + p3;
        });

        // phrase: "...", text: "...", word: "..."
        // be careful not to match document.getElementById or variables.
        const stringProps = ['phrase', 'text', 'word', 'name', 'missingWord', 'targetWord', 'emotion'];
        stringProps.forEach(prop => {
            let regex = new RegExp(`(${prop}\\s*:\\s*)(['"][^'"]+['"])`, 'g');
            content = content.replace(regex, (match, p1, p2) => {
                // If it's an image path or css class, don't translate
                if (p2.includes('.png') || p2.includes('.jpg') || p2.includes('.svg') ||
                    p2.includes('fas fa-') || p2.includes('.mp3') || p2.includes('.gif') ||
                    p2.includes('/') || p2 === '""' || p2 === "''") {
                    return match;
                }
                modifications++;
                return `${p1}tg(${p2})`;
            });
        });

        // categories keys (like in asocia-imagen)
        // category: "Animales"
        content = content.replace(/(category\s*:\s*)(['"][^'"]+['"])/g, (match, p1, p2) => {
            if (p2.includes('.png')) return match;
            modifications++;
            return `${p1}tg(${p2})`;
        });

        if (content !== initialContent) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Translated dynamic data in ${filePath}`);
            totalChanges++;
        }
    });
    console.log(`Total files modified: ${totalChanges}`);
}

fixAllScripts();
