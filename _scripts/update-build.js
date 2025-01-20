const fs = require('fs');
const path = require('path');

module.exports = () => {
    const packageJsonPath = path.join(process.cwd(), 'package.json');
    const packageJson = JSON.parse(fs.readFileSync(packageJsonPath).toString());
    packageJson.buildDate = new Date().getTime();

    fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));

    const jsonData = {
        buildDate: packageJson.buildDate,
    };

    const jsonContent = JSON.stringify(jsonData);

    const filePath = path.join(process.cwd(), 'public', 'meta.json');

    fs.writeFile(filePath, jsonContent, 'utf8', function (error) {
        if (error) {
            console.log(
                'An error occured while saving build date and time to meta.json'
            );
            return console.log(error);
        }

        console.log('Latest build date and time updated in meta.json file');
    });
};
