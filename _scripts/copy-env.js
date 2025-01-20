const fs = require('fs');
const path = require('path');

module.exports = () => {
    const mode = process.argv[2]; // Get mode ('development' or 'production')
    const envSource = path.join(process.cwd(), `.env.${mode}`);
    const envDest = path.join(process.cwd(), '.env');

    if (!fs.existsSync(envSource)) {
        console.error(`Environment file .env.${mode} does not exist.`);
        process.exit(1);
    }

    fs.copyFileSync(envSource, envDest);
    console.log(`Copied .env.${mode} to .env`);
}
