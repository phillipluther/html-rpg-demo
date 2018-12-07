const fs = require('fs-extra');

const PROD = process.env.NODE_ENV === 'production';


async function buildHtml() {
    await fs.ensureDir('demo');

    let stylesheet = PROD ? '<link rel="stylesheet" href="styles.css">' : '';
    let markup =
        '<!doctype html><html>' +
        `<head><meta charset="utf-8"><title>Canvas 2D RPG Play</title>${stylesheet}</head>` +
        '<body><script src="bundle.js"></script></body>' +
        '</html>';

    await fs.writeFile('demo/index.html', markup);
}

buildHtml();
