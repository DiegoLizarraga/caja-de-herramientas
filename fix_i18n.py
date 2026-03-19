import re

with open('a-wisho/js/i18n.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Replace any explicit games/ route mapping in i18n? No, i18n.js doesn't dictate routing.
