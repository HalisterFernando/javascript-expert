import fsPromises from 'fs/promises';
import fs from 'fs';
import templates from './templates/index.js';
import Util from './util.js';

const defaultDependencies = (layer, conponentName) => {
    const dependencies = {
        repository: [],
        service: [
            `${conponentName}Repository`
        ],
        factory: [
            `${conponentName}Repository`,
            `${conponentName}Service`
        ]
    }

    return dependencies[layer].map(Util.lowerCaseFirstLetter)
}

async function executeWrites(pendingFilestoWrite) {
  
   return Promise.all(pendingFilestoWrite.map(
        ({ fileName, txtFile }) => fsPromises.writeFile(fileName, txtFile)
    ))
}

export async function createFiles({mainPath, defaultMainFolder, layers, componentName}) {
   const keys = Object.keys(templates)
   const pendingFilesToWrite = []; 
   
   for(const layer of layers) {
    const chosenTemplate = keys.find(key => key.includes(layer))
    if (!chosenTemplate) return { error: 'the chosen layer have a template' }

    const template = templates[chosenTemplate]
    const targetFolder = `${mainPath}/${defaultMainFolder}/${layer}`;
    const dependencies = defaultDependencies(layer, componentName);
    const {fileName: className, template: txtFile} = template(componentName, ...dependencies)
    const fileName = `${targetFolder}/${Util.lowerCaseFirstLetter(className)}.js`;
    pendingFilesToWrite.push({fileName, txtFile})
   }

   await executeWrites(pendingFilesToWrite)

   return { success: true }
}