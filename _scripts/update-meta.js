const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');
require('dotenv').config();

module.exports = () => {
    const baseURL = process.env.WEBSITE;
    if (!baseURL) {
        console.error('Error: WEBSITE env var is not set.');
        process.exit(1);
    }
    const API_URL = `${process.env.VITE_PUBLIC_API_BASE}/contents?filter[platform]=${process.env.VITE_API_PLATFORM}`;
    const indexPath = path.join(process.cwd(), 'dist', 'index.html');

    let metaData = {};

    async function fetchMetaData() {
        const res = await fetch(API_URL, {
            headers: { Accept: 'application/json' },
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const json = await res.json();
        metaData = json.data.reduce((m, x) => ({ ...m, [x.key]: x.value }), {});
    }

    function updateBySelector($, selector, mapByCurrentContent = true) {
        const el = $(selector).first();
        if (!el.length) {
            console.log(`Selector not found: ${selector}`);
            return;
        }
        const current = el.attr('content') ?? '';
        const newVal = mapByCurrentContent ? metaData[current] : undefined;
        if (mapByCurrentContent) {
            if (newVal === undefined) {
                console.log(
                    `No metaData match for '${current}' on ${selector}`
                );
                return;
            }
            el.attr('content', newVal);
            console.log(`Updated ${selector}: '${current}' -> '${newVal}'`);
        }
    }

    function prependBase(url, base) {
        if (!url) return url;
        if (/^[a-z]+:\/\//i.test(url)) return url; // already absolute
        // ensure exactly one slash between base and path
        return `${base.replace(/\/+$/, '')}/${url.replace(/^\/+/, '')}`;
    }

    function runUpdates() {
        let html = fs.readFileSync(indexPath, 'utf8');
        const $ = cheerio.load(html);

        // Update <title> via metaData lookup by its current text
        const titleEl = $('head > title').first();
        if (titleEl.length) {
            const currTitle = titleEl.text();
            const newTitle = metaData[currTitle];
            if (newTitle !== undefined) {
                titleEl.text(newTitle);
                console.log(`Updated <title>: '${currTitle}' -> '${newTitle}'`);
            } else {
                console.log(`No metaData match for <title> '${currTitle}'`);
            }
        }

        // Update meta[name="description"]
        updateBySelector($, 'meta[name="description"]');

        // Update OG tags (lookup by current content)
        updateBySelector($, 'meta[property="og:title"]');
        updateBySelector($, 'meta[property="og:description"]');

        // Set og:url to baseURL (no lookup)
        const ogUrl = $('meta[property="og:url"]').first();
        if (ogUrl.length) {
            const prev = ogUrl.attr('content') ?? '';
            ogUrl.attr('content', baseURL);
            console.log(`Updated og:url: '${prev}' -> '${baseURL}'`);
        } else {
            console.log('og:url not found');
        }

        // Prepend base to og:image if it’s relative
        const ogImg = $('meta[property="og:image"]').first();
        if (ogImg.length) {
            const prev = ogImg.attr('content') ?? '';
            const next = prependBase(prev, baseURL);
            if (next !== prev) {
                ogImg.attr('content', next);
                console.log(`Updated og:image: '${prev}' -> '${next}'`);
            } else {
                console.log('og:image unchanged (already absolute).');
            }
        } else {
            console.log('og:image not found');
        }

        fs.writeFileSync(indexPath, $.html(), 'utf8');
        console.log('Meta + OG updates complete.');
    }

    (async () => {
        await fetchMetaData();
        runUpdates();
    })();
};
