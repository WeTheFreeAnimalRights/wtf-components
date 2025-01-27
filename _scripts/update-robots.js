const fs = require('fs');
const path = require('path');

module.exports = () => {
    // Path to the robots.txt file
    const robotsPath = path.join(process.cwd(), 'build', 'robots.txt');

    // Function to update robots.txt
    function updateRobotsTxt(shouldIndex) {
        try {
            let content;

            if (shouldIndex) {
                // Allow indexing
                content = `User-agent: *
Allow: /`;
                console.log('Updating robots.txt to allow indexing.');
            } else {
                // Disallow indexing
                content = `User-agent: *
Disallow: /`;
                console.log('Updating robots.txt to disallow indexing.');
            }

            // Write the content to robots.txt
            fs.writeFileSync(robotsPath, content, 'utf8');
            console.log('robots.txt updated successfully!');
        } catch (error) {
            console.error('Error updating robots.txt:', error.message);
        }
    }

    // Read the parameter (true for indexing, false for no-indexing)
    const shouldIndex = process.argv[2] === 'true';

    // Run the script
    updateRobotsTxt(shouldIndex);
};
