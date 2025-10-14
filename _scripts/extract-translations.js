const fs = require('fs');
const path = require('path');
const babelParser = require('@babel/parser');

// Parse CLI args
const args = process.argv.slice(2);
const isDev = args.includes('-D') || args.includes('--dev');
const dirs = [];
let paramPlatform = '';

for (let i = 0; i < args.length; i++) {
    if (args[i] === '-d' || args[i] === '--dir') {
        const next = args[i + 1];
        if (next && !next.startsWith('-')) {
            dirs.push(path.resolve(process.cwd(), next));
        }
    }

    if (args[i] === '-p' || args[i] === '--platform') {
        const next = args[i + 1];
        if (next && !next.startsWith('-')) {
            paramPlatform = next;
        }
    }
}

const baseUrl = isDev
    ? 'https://dev.api.mystats.wtf'
    : 'https://api.mystats.wtf';

module.exports = async (platform) => {
    const outputFile = path.resolve(process.cwd(), './_translations.json');
    const searchDirs = dirs.length ? dirs : [path.resolve(process.cwd(), './src')];

    const usedPlatform = paramPlatform || platform;

    console.log(`Downloading translations from ${baseUrl} for platform ${usedPlatform}...`);
    const response = await fetch(
        `${baseUrl}/api/public/v1/contents?filter[platform]=${usedPlatform}`,
        {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
                'Accept-Language': 'en',
            },
        }
    );

    const apiData = await response.json();
    const backendTranslations = apiData.data.reduce((acc, item) => {
        acc[item.key] = item.value;
        return acc;
    }, {});

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

    const parseFile = (filePath) => {
        const code = fs.readFileSync(filePath, 'utf-8');
        const ast = babelParser.parse(code, {
            sourceType: 'module',
            plugins: ['jsx'],
        });
        const translations = new Set();

        const findTranslationCalls = (node) => {
            if (
                node.type === 'CallExpression' &&
                node.callee.name === 't' &&
                node.arguments.length >= 1
            ) {
                const [firstArg] = node.arguments;
                if (firstArg.type === 'StringLiteral') {
                    const key = firstArg.value;
                    const value = backendTranslations[firstArg.value] || '';

                    if (!backendTranslations.hasOwnProperty(firstArg.value)) {
                        translations.add({ key, value });
                    }
                }
            }

            for (const key in node) {
                if (node[key] && typeof node[key] === 'object') {
                    findTranslationCalls(node[key]);
                }
            }
        };

        findTranslationCalls(ast);
        return Array.from(translations);
    };

    const allTranslations = {};

    for (const dir of searchDirs) {
        const files = getJsFiles(dir);
        for (const file of files) {
            console.log(`Inspecting "${file}"...`);
            const translations = parseFile(file);
            translations.forEach((obj) => {
                if (!allTranslations[obj.key]) {
                    allTranslations[obj.key] = obj.value;
                }
            });
        }
    }

    fs.writeFileSync(outputFile, JSON.stringify(allTranslations, null, 2), 'utf-8');
    console.log(`Translation strings extracted to ${outputFile}`);
};
