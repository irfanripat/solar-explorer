const fs = require('fs');
const https = require('https');
const path = require('path');

const textures = [
    { name: 'sun.jpg', url: 'https://www.solarsystemscope.com/textures/download/2k_sun.jpg' },
    { name: 'mercury.jpg', url: 'https://www.solarsystemscope.com/textures/download/2k_mercury.jpg' },
    { name: 'venus.jpg', url: 'https://www.solarsystemscope.com/textures/download/2k_venus_surface.jpg' },
    { name: 'earth.jpg', url: 'https://www.solarsystemscope.com/textures/download/2k_earth_daymap.jpg' },
    { name: 'mars.jpg', url: 'https://www.solarsystemscope.com/textures/download/2k_mars.jpg' },
    { name: 'jupiter.jpg', url: 'https://www.solarsystemscope.com/textures/download/2k_jupiter.jpg' },
    { name: 'saturn.jpg', url: 'https://www.solarsystemscope.com/textures/download/2k_saturn.jpg' },
    { name: 'uranus.jpg', url: 'https://www.solarsystemscope.com/textures/download/2k_uranus.jpg' },
    { name: 'neptune.jpg', url: 'https://www.solarsystemscope.com/textures/download/2k_neptune.jpg' },
    { name: 'moon.jpg', url: 'https://www.solarsystemscope.com/textures/download/2k_moon.jpg' }
];

const download = (url, dest) => {
    return new Promise((resolve, reject) => {
        const file = fs.createWriteStream(dest);
        https.get(url, (response) => {
            if (response.statusCode !== 200) {
                reject(new Error(`Failed to download ${url}: ${response.statusCode}`));
                return;
            }
            response.pipe(file);
            file.on('finish', () => {
                file.close(() => resolve());
            });
        }).on('error', (err) => {
            fs.unlink(dest, () => { });
            reject(err);
        });
    });
};

const main = async () => {
    const dir = path.join(__dirname, 'public', 'textures');
    if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
    }

    console.log('Downloading textures...');
    for (const tex of textures) {
        const dest = path.join(dir, tex.name);
        try {
            await download(tex.url, dest);
            console.log(`Downloaded ${tex.name}`);
        } catch (err) {
            console.error(`Error downloading ${tex.name}:`, err.message);
        }
    }
    console.log('Texture download complete!');
};

main();
