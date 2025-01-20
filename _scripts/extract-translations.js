const fs = require('fs');
const path = require('path');
const babelParser = require('@babel/parser');

const fullTranslations = require('./full-translations.json');
const mockTranslations = require('./mock-translations.json');
const editedTranslations = require('./edited-translations.json');
const existingTranslations = require('./existing-translations.json');

// Get directories from command-line arguments
const args = process.argv.slice(2);
const dirs = [];
for (let i = 0; i < args.length; i++) {
    if (args[i] === '--dir' || args[i] === '-d') {
        if (args[i + 1]) {
            dirs.push(path.resolve(process.cwd(), args[i + 1]));
            i++; // Skip the next argument since it was the directory path
        }
    }
}

const outputFile = path.resolve(__dirname, '../build/_translations.json');

// Helper function to recursively get all JavaScript files
const getJsFiles = (dir) => {
    let jsFiles = [];
    const files = fs.readdirSync(dir);

    files.forEach((file) => {
        const filePath = path.join(dir, file);
        const stats = fs.statSync(filePath);

        if (stats.isDirectory()) {
            jsFiles = jsFiles.concat(getJsFiles(filePath));
        } else if (file.endsWith('.js') || file.endsWith('.jsx')) {
            jsFiles.push(filePath);
        }
    });

    return jsFiles;
};

// Parse each file and extract translation strings
const extractTranslations = (filePath) => {
    const code = fs.readFileSync(filePath, 'utf-8');
    const ast = babelParser.parse(code, {
        sourceType: 'module',
        plugins: ['jsx'],
    });
    const translations = new Set();

    const findTranslationCalls = (node) => {
        if (node.type === 'CallExpression' && node.callee.name === 't' && node.arguments.length >= 1) {
            const [firstArg] = node.arguments;
            if (firstArg.type === 'StringLiteral') {
                const key = firstArg.value;
                const value =
                    editedTranslations[firstArg.value] ||
                    fullTranslations[firstArg.value] ||
                    mockTranslations[firstArg.value] ||
                    '';

                // Only add edited or new translations
                if (
                    typeof editedTranslations[firstArg.value] !== 'undefined' ||
                    typeof existingTranslations[firstArg.value] === 'undefined'
                ) {
                    translations.add({ key, value });
                }
            }
        }

        // Traverse child nodes
        for (const key in node) {
            if (node[key] && typeof node[key] === 'object') {
                findTranslationCalls(node[key]);
            }
        }
    };

    findTranslationCalls(ast);
    return Array.from(translations);
};

// Main script
const allTranslations = {};

dirs.forEach((dir) => {
    const files = getJsFiles(dir);
    const basePath = path.resolve(dir);
    files.forEach((file) => {
        const displayedFile = file.replace(basePath, '');
        console.log(`Inspecting "${displayedFile}"...`);
        const translations = extractTranslations(file);
        translations.forEach((obj) => {
            if (!allTranslations[obj.key]) {
                allTranslations[obj.key] = obj.value;
            }
        });
    });
});

// Write to JSON file
fs.writeFileSync(outputFile, JSON.stringify(allTranslations, null, 2), 'utf-8');
console.log(`Translation strings extracted to ${outputFile}`);
