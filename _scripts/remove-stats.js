const fs = require('fs');
const path = require('path');

module.exports = () => {
    const statsPath = path.join(process.cwd(), 'dist', 'stats.html');

    if (!fs.existsSync(statsPath)) {
        console.log('No stats.html file found in dist. Skipping deletion.');
        return;
    }

    try {
        fs.unlinkSync(statsPath);
        console.log('Deleted dist/stats.html');
    } catch (err) {
        console.error('Failed to delete dist/stats.html:', err);
        process.exit(1);
    }
};
