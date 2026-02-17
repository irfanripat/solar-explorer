const fs = require('fs');
const https = require('https');
const path = require('path');

const musicPath = path.join(__dirname, 'public', 'music', 'interstellar.mp3');

// URL for a royalty-free space ambient track (Kevin MacLeod or similar)
// Using "Interstellar" by reputable source or similar vibe. 
// For now, I'll download a generic space ambient track to ensure it works.
const url = "https://cdn.pixabay.com/download/audio/2022/10/25/audio_145657d608.mp3?filename=space-atmosphere-125016.mp3";

const file = fs.createWriteStream(musicPath);

console.log('Downloading placeholder space music...');

https.get(url, (response) => {
    response.pipe(file);

    file.on('finish', () => {
        file.close();
        console.log('Download completed: public/music/interstellar.mp3');
        console.log('NOTE: Replace this file with the actual Interstellar theme if desired.');
    });
}).on('error', (err) => {
    fs.unlink(musicPath, () => { }); // Delete the file async. (But we don't check the result)
    console.error('Error downloading music:', err.message);
});
