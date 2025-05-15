const fs = require('fs');
const { Client } = require('node-scp');
require('dotenv').config();

module.exports = () => {
    console.log(`Uploading the build to "${process.env.SCP_HOST}"...`);
    Client({
        host: process.env.SCP_HOST,
        port: process.env.SCP_PORT || 22,
        username: process.env.SCP_USERNAME,
        privateKey: fs.readFileSync(process.env.SCP_PRIVATE_KEY),
        passphrase: process.env.SCP_PASSPHRASE,
    })
        .then((client) => {
            client
                .uploadDir('./dist', process.env.SCP_SERVER_LOCATION)
                .then(() => {
                    client.close(); // remember to close connection after you finish
                    console.log('Successfully uploaded the build');
                })
                .catch((error) => {
                    console.error('1.error', error);
                });
        })
        .catch((e) => console.log(e));
};
