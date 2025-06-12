const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const IGNORED_FILES = ['.DS_Store', 'meta.json'];

const walkDir = async (dir, fileList = []) => {
    const files = await promisify(fs.readdir)(dir);

    for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = await promisify(fs.stat)(filePath);

        if (stat.isDirectory()) {
            await walkDir(filePath, fileList);
        } else if (!IGNORED_FILES.includes(file)) {
            fileList.push(filePath);
        }
    }

    return fileList;
};

const getRelativeRemotePath = (filePath, baseFolder) => {
    return path.relative(baseFolder, filePath).replace(/\\/g, '/');
};

const getFolder = (cdnData) => {
    if (cdnData.folder) {
        return cdnData.folder + '/';
    }

    return '';
};

const clearBunnyCDN = async (cdnData) => {
    console.log('🚀 Clearing old CDN files...');

    const listResponse = await fetch(
        `https://storage.bunnycdn.com/${cdnData.zone}/${getFolder(cdnData)}`,
        {
            method: 'GET',
            headers: { AccessKey: cdnData.accessKey },
        }
    );

    if (!listResponse.ok) {
        throw new Error(
            `Failed to fetch CDN files: ${listResponse.statusText}`
        );
    }

    const files = await listResponse.json();

    for (const file of files) {
        if (file.ObjectName.startsWith('_')) {
            console.log(`⏭️ Skipped (starts with _): ${file.ObjectName}`);
            continue;
        }

        const filePath = getFolder(cdnData) + file.ObjectName;

        if (file.IsDirectory) {
            console.log(`📂 Entering folder: ${file.ObjectName}`);

            const subResponse = await fetch(
                `https://storage.bunnycdn.com/${cdnData.zone}/${filePath}/`,
                {
                    method: 'GET',
                    headers: { AccessKey: cdnData.accessKey },
                }
            );

            if (!subResponse.ok) {
                throw new Error(
                    `Failed to fetch subfolder: ${subResponse.statusText}`
                );
            }

            const subFiles = await subResponse.json();
            for (const subFile of subFiles) {
                const subFilePath = `${filePath}/${subFile.ObjectName}`;

                if (subFile.ObjectName.startsWith('_')) {
                    console.log(
                        `⏭️ Skipped (starts with _): ${subFile.ObjectName}`
                    );
                    continue;
                }

                await deleteCDNFile(cdnData, subFilePath);
            }
        } else {
            await deleteCDNFile(cdnData, filePath);
        }
    }

    console.log('✅ All old files cleared (except _-prefixed).');
};

const deleteCDNFile = async (cdnData, filePath) => {
    const response = await fetch(
        `https://storage.bunnycdn.com/${cdnData.zone}/${filePath}`,
        {
            method: 'DELETE',
            headers: { AccessKey: cdnData.accessKey },
        }
    );

    if (response.ok) {
        console.log(`🗑️ Deleted: ${filePath}`);
    } else {
        throw new Error(`Failed to delete ${filePath}: ${response.statusText}`);
    }
};

const uploadFile = async (cdnData, localPath, remotePath) => {
    const fileBuffer = fs.readFileSync(localPath);

    const response = await fetch(
        `https://storage.bunnycdn.com/${cdnData.zone}/${getFolder(cdnData) + remotePath}`,
        {
            method: 'PUT',
            headers: {
                AccessKey: cdnData.accessKey,
                'Content-Type': 'application/octet-stream',
            },
            body: fileBuffer,
        }
    );

    if (response.ok) {
        console.log(`📤 Uploaded: ${remotePath}`);
    } else {
        throw new Error(
            `Failed to upload ${remotePath}: ${response.statusText}`
        );
    }
};

module.exports = async (cdnData) => {
    const distFolder = path.join(process.cwd(), 'dist');

    try {
        console.log('🚀 Starting CDN deployment...');

        await clearBunnyCDN(cdnData);

        const allFiles = await walkDir(distFolder);

        for (const file of allFiles) {
            const remotePath = getRelativeRemotePath(file, distFolder);
            await uploadFile(cdnData, file, remotePath);
        }

        console.log('🎉 CDN deployment completed successfully!');
    } catch (err) {
        console.error('💥 Deployment failed:', err.message);
        process.exit(1);
    }
};
