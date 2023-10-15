import * as fs from 'fs';

const directoryPath = 'public/assets/parts/';

const staticFiles = {};

const dirs = fs.readdirSync(directoryPath);

dirs.forEach((dir) => {
  const files = fs.readdirSync(directoryPath + dir);
  staticFiles[dir] = files;
});

const json = JSON.stringify(staticFiles);

fs.writeFile('src/character-parts.json', json, 'utf8', (err) => {
  if (err) {
    console.log('Error writing JSON file.');
  } else {
    console.log('JSON file has been saved.');
  }
});
