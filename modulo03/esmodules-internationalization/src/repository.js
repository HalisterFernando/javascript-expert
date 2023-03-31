import { writeFile, readFile } from 'fs/promises';
import { fileURLToPath } from 'url';

export const save = async (data) => {      
      const databaseFile = fileURLToPath(new URL('../database.json', import.meta.url))
      const currentData = JSON.parse((await readFile(databaseFile)))
      
      currentData.push(data)

      await writeFile(databaseFile, JSON.stringify(currentData))
}