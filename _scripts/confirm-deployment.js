const readline = require('readline');

// Create an interface for reading input
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

// Function to ask confirmation
const askConfirmation = (question) => {
    return new Promise((resolve) => {
        rl.question(`${question} (yes/no): `, (answer) => {
            resolve(answer.trim().toLowerCase());
        });
    });
};

// Main function with confirmation
module.exports = async () => {
    const where = process.argv[2] || 'production';

    const confirmation = await askConfirmation(
        'Are you sure you want to deploy to ' + where + '?'
    );

    if (confirmation === 'yes' || confirmation === 'y') {
        console.log('Deploying...');
        process.exit(0); // Success exit code
    } else {
        console.log('Deployment CANCELED');
        process.exit(1); // Failure exit code, stops the chain
    }

    rl.close();
};
