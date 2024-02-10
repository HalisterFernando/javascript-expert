import fsPromises from 'fs/promises';
import fs from 'fs';

export async function createLayersIfNotExists({mainPath, defaultMainFolder, layers}) {
    const defaultPath = `${mainPath}/${defaultMainFolder}`;
    const foldersToCreate = layers.filter(layers => !fs.existsSync(layers));

    const results = foldersToCreate
    .map(folder => fsPromises.mkdir(`${defaultPath}/${folder}`, {recursive: true}));   
    return Promise.all(results)
}