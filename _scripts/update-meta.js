const fs = require('fs');
const path = require('path');
require('dotenv').config(); // Load environment variables from .env

module.exports = () => {
    // Load the base URL from the .env file
    const baseURL = process.env.WEBSITE;
    if (!baseURL) {
        console.error('Error: WEBSITE environment variable is not set in .env file.');
        process.exit(1);
    }

    // API Endpoint to fetch data
    const API_URL = `${process.env.REACT_APP_PUBLIC_API_BASE}/contents?filter[platform]=${process.env.REACT_APP_API_PLATFORM}`;

    // Path to the built index.html file
    const indexPath = path.join(process.cwd(), 'build', 'index.html');

    // List of meta tag IDs to check for updates
    const metaTagsToUpdate = ['meta-description', 'og-title', 'og-description'];

    // Function to fetch data from the API using native fetch
    let metaData = {};
    async function fetchMetaData() {
        try {
            const response = await fetch(API_URL, {
                method: 'GET',
                headers: {
                    Accept: 'application/json', // Explicitly request JSON
                },
            });
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const apiResponse = await response.json(); // Parse JSON response
            metaData = apiResponse.data.reduce(
                (prev, current) => ({
                    ...prev,
                    [current.key]: current.value,
                }),
                {}
            );
        } catch (error) {
            console.error('Error fetching meta data:', error.message);
            process.exit(1);
        }
    }

    // Function to update specified meta tags based on API data
    function updateMetaTags() {
        try {
            // Read the index.html file
            let htmlContent = fs.readFileSync(indexPath, 'utf8');

            metaTagsToUpdate.forEach((tagId) => {
                const regex = new RegExp(`<meta ([^>]*id="${tagId}"[^>]*)content="([^"]*)"(.*?)/?>`, 'i');
                const match = htmlContent.match(regex);

                if (match) {
                    const currentContent = match[2]; // Extract the current content value
                    const newValue = metaData[currentContent]; // Look up the key in the API response

                    if (newValue !== undefined) {
                        // Replace the content value while preserving other attributes
                        htmlContent = htmlContent.replace(
                            regex,
                            `<meta ${match[1]}content="${newValue}"${match[3] ? ` ${match[3]}` : ''}/>`
                        );
                        console.log(`Updated meta tag '${tagId}': '${currentContent}' -> '${newValue}'`);
                    } else {
                        console.log(
                            `No matching key in API response for content value '${currentContent}' in meta tag '${tagId}'.`
                        );
                    }
                } else {
                    console.log(`Meta tag with ID '${tagId}' not found in index.html.`);
                }
            });

            // Write the updated content back to the index.html file
            fs.writeFileSync(indexPath, htmlContent, 'utf8');
            console.log('Meta tags updated successfully!');
        } catch (error) {
            console.error('Error updating meta tags:', error.message);
        }
    }

    // Function to update og-url and prepend the provided URL to og-image
    function updateOgTags() {
        try {
            // Read the index.html file
            let htmlContent = fs.readFileSync(indexPath, 'utf8');

            // Update og-url
            const ogUrlRegex = /<meta ([^>]*id="og-url"[^>]*)content="([^"]*)"(.*?)\/?>/i;
            const ogUrlMatch = htmlContent.match(ogUrlRegex);

            if (ogUrlMatch) {
                const currentOgUrl = ogUrlMatch[2]; // Extract current content value
                htmlContent = htmlContent.replace(
                    ogUrlRegex,
                    `<meta ${ogUrlMatch[1]}content="${baseURL}"${ogUrlMatch[3] ? ` ${ogUrlMatch[3]}` : ''}/>`
                );
                console.log(`Updated og-url: '${currentOgUrl}' -> '${baseURL}'`);
            } else {
                console.log(`Meta tag with ID 'og-url' not found in index.html.`);
            }

            // Update og-image
            const ogImageRegex = /<meta ([^>]*id="og-image"[^>]*)content="([^"]*)"(.*?)\/?>/i;
            const ogImageMatch = htmlContent.match(ogImageRegex);

            if (ogImageMatch) {
                const currentOgImage = ogImageMatch[2]; // Extract current content value
                const newOgImage = `${baseURL}${currentOgImage}`;
                htmlContent = htmlContent.replace(
                    ogImageRegex,
                    `<meta ${ogImageMatch[1]}content="${newOgImage}"${ogImageMatch[3] ? ` ${ogImageMatch[3]}` : ''}/>`
                );
                console.log(`Updated og-image: '${currentOgImage}' -> '${newOgImage}'`);
            } else {
                console.log(`Meta tag with ID 'og-image' not found in index.html.`);
            }

            // Write the updated content back to the index.html file
            fs.writeFileSync(indexPath, htmlContent, 'utf8');
            console.log('og-url and og-image updated successfully!');
        } catch (error) {
            console.error('Error updating og-url and og-image:', error.message);
        }
    }

    function updateTitleTag() {
        try {
            // Read the index.html file
            let htmlContent = fs.readFileSync(indexPath, 'utf8');

            // Regex to match the <title> tag
            const titleRegex = /<title>([^<]*)<\/title>/i;
            const titleMatch = htmlContent.match(titleRegex);

            if (titleMatch) {
                const currentTitle = titleMatch[1]; // Extract current title content
                const newTitle = metaData[currentTitle]; // Look up the key in the API response

                if (newTitle !== undefined) {
                    // Replace the title tag content with the new value
                    htmlContent = htmlContent.replace(
                        titleRegex,
                        `<title>${newTitle}</title>`
                    );
                    console.log(
                        `Updated <title>: '${currentTitle}' -> '${newTitle}'`
                    );
                } else {
                    console.log(
                        `No matching key in API response for <title> content: '${currentTitle}'.`
                    );
                }
            } else {
                console.log('<title> tag not found in index.html.');
            }

            // Write the updated content back to the index.html file
            fs.writeFileSync(indexPath, htmlContent, 'utf8');
            console.log('<title> tag updated successfully!');
        } catch (error) {
            console.error('Error updating <title> tag:', error.message);
        }
    }

    // Run the script
    (async () => {
        await fetchMetaData();
        updateMetaTags();
        updateOgTags();
        updateTitleTag();
    })();
};
