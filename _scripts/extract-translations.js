const fs = require('fs');
const path = require('path');
const babelParser = require('@babel/parser');

module.exports = async (
    platform,
    searchDir = path.resolve(process.cwd(), './src')
) => {
    const outputFile = path.resolve(process.cwd(), './_translations.json');

    console.log(`Downloading translations for platform ${platform}...`);
    const response = await fetch(
        `https://api.mystats.wtf/api/public/v1/contents?filter[platform]=${platform}`,
        {
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
        }
    );
    const apiData = await response.json();

    // Transform API response into a key-value object
    const backendTranslations = apiData.data.reduce((acc, item) => {
        acc[item.key] = item.value;
        return acc;
    }, {});

    console.log('>>>backendTranslations', apiData);

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

                    // Only add new translations not in backendTranslations
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
    const files = getJsFiles(searchDir);

    files.forEach((file) => {
        console.log(`Inspecting "${file}"...`);
        const translations = parseFile(file);
        translations.forEach((obj) => {
            if (!allTranslations[obj.key]) {
                allTranslations[obj.key] = obj.value;
            }
        });
    });

    fs.writeFileSync(
        outputFile,
        JSON.stringify(allTranslations, null, 2),
        'utf-8'
    );
    console.log(`Translation strings extracted to ${outputFile}`);
};
