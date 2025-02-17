const fs = require('fs');
const path = require('path');

const clearBunnyCDN = async (cdnData) => {
    try {
        console.log('🚀 Clearing old CDN files...');

        const listResponse = await fetch(
            `https://storage.bunnycdn.com/${cdnData.zone}/${cdnData.folder}/`,
            {
                method: 'GET',
                headers: { AccessKey: cdnData.accessKey },
            }
        );

        if (!listResponse.ok)
            throw new Error(
                `Failed to fetch CDN files: ${listResponse.statusText}`
            );

        const files = await listResponse.json();

        if (files.length === 0) {
            console.log('✅ No files found to delete. CDN is already clean.');
            return;
        }

        for (const file of files) {
            const filePath = `${cdnData.folder}/${file.ObjectName}`;

            if (file.IsDirectory) {
                console.log(`📂 Entering folder: ${file.ObjectName}`);

                // Fetch the folder's contents
                const subFilesResponse = await fetch(
                    `https://storage.bunnycdn.com/${cdnData.zone}/${filePath}/`,
                    {
                        method: 'GET',
                        headers: { AccessKey: cdnData.accessKey },
                    }
                );

                if (!subFilesResponse.ok)
                    throw new Error(
                        `Failed to fetch folder contents: ${subFilesResponse.statusText}`
                    );

                const subFiles = await subFilesResponse.json();

                for (const subFile of subFiles) {
                    const subFilePath = `${filePath}/${subFile.ObjectName}`;

                    const deleteSubFileResponse = await fetch(
                        `https://storage.bunnycdn.com/${cdnData.zone}/${subFilePath}`,
                        {
                            method: 'DELETE',
                            headers: { AccessKey: cdnData.accessKey },
                        }
                    );

                    if (!deleteSubFileResponse.ok)
                        throw new Error(
                            `Failed to delete ${subFilePath}: ${deleteSubFileResponse.statusText}`
                        );

                    console.log(`🗑️ Deleted file: ${subFilePath}`);
                }

                console.log(`✅ Emptied folder: ${file.ObjectName}`);
            } else {
                // Delete the file directly if it's not a folder
                const deleteResponse = await fetch(
                    `https://storage.bunnycdn.com/${cdnData.zone}/${filePath}`,
                    {
                        method: 'DELETE',
                        headers: { AccessKey: cdnData.accessKey },
                    }
                );

                if (!deleteResponse.ok)
                    throw new Error(
                        `Failed to delete ${filePath}: ${deleteResponse.statusText}`
                    );

                console.log(`🗑️ Deleted file: ${filePath}`);
            }
        }

        console.log('✅ All old files and folders cleared successfully.');
    } catch (error) {
        console.error('❌ Error clearing Bunny CDN:', error.message);
        throw new Error('Stopping execution due to CDN clearing failure.');
    }
};

const uploadFile = async (cdnData, filePath, remotePath) => {
    try {
        console.log(`Uploading ${filePath}`);
        const fileBuffer = fs.readFileSync(filePath);

        const response = await fetch(
            `https://storage.bunnycdn.com/${cdnData.zone}/${cdnData.folder}/${remotePath}`,
            {
                method: 'PUT',
                headers: {
                    AccessKey: cdnData.accessKey,
                    'Content-Type': 'application/octet-stream',
                },
                body: fileBuffer,
            }
        );

        if (!response.ok)
            throw new Error(
                `Failed to upload ${remotePath}: ${response.statusText}`
            );

        console.log(`Uploaded: ${remotePath}`);
    } catch (error) {
        console.error(`Error uploading ${remotePath}:`, error.message);
        throw new Error('Stopping execution due to file upload failure.');
    }
};

const uploadAndClean = async (cdnData) => {
    try {
        console.log('Uploading files to CDN...');
        const directories = ['css', 'js'];
        const staticFolder = path.join(process.cwd(), 'build', 'static');

        for (const dir of directories) {
            const dirPath = path.join(staticFolder, dir);

            if (fs.existsSync(dirPath)) {
                const files = fs.readdirSync(dirPath);
                for (const file of files) {
                    await uploadFile(
                        cdnData,
                        path.join(dirPath, file),
                        `${dir}/${file}`
                    );
                }

                // Remove uploaded folder
                fs.rmSync(dirPath, { recursive: true, force: true });
                console.log(`Deleted local folder: ${dirPath}`);
            }
        }

        // Check if `static/` is empty, then delete it
        if (
            fs.existsSync(staticFolder) &&
            fs.readdirSync(staticFolder).length === 0
        ) {
            fs.rmSync(staticFolder, { recursive: true, force: true });
            console.log(`Deleted empty folder: ${staticFolder}`);
        }

        console.log('Files uploaded successfully.');
    } catch (error) {
        console.error('Error during file upload:', error.message);
        throw new Error('Stopping execution due to upload failure.');
    }
};

const updateIndexHtml = (cdnData) => {
    try {
        console.log('Updating index.html...');
        const indexPath = path.join(process.cwd(), 'build', 'index.html');

        if (!fs.existsSync(indexPath)) {
            throw new Error('index.html not found, skipping update.');
        }

        let indexContent = fs.readFileSync(indexPath, 'utf8');

        const buildStaticPath = '/static/';
        const cdnStaticPath = `${cdnData.url}/`;

        if (indexContent.includes(buildStaticPath)) {
            indexContent = indexContent.replace(
                new RegExp(`(src=|href=)"${buildStaticPath}`, 'g'),
                `$1"${cdnStaticPath}`
            );
            console.log('✅ Updated index.html to reference CDN assets.');
        } else {
            console.warn(
                '⚠️ No /static/ paths found in index.html – nothing to update.'
            );
        }

        fs.writeFileSync(indexPath, indexContent, 'utf8');
    } catch (error) {
        console.error('❌ Error updating index.html:', error.message);
        throw new Error('Stopping execution due to index.html update failure.');
    }
};

module.exports = async (cdnData) => {
    console.log('🚀 Starting CDN Deployment...');

    try {
        // Step 1: Clear the CDN
        await clearBunnyCDN(cdnData);

        // Step 2: Upload files and clean up
        await uploadAndClean(cdnData);

        // Step 3: Update index.html
        updateIndexHtml(cdnData);

        console.log('✅ CDN Deployment Completed Successfully.');
    } catch (error) {
        console.error('❌ Deployment failed:', error.message);
        process.exit(1); // Stop the script execution
    }
};
