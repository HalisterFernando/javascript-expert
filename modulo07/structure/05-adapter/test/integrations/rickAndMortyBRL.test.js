import { expect, describe, test, jest, beforeEach } from '@jest/globals';
import fs from 'fs/promises';
import Character from '../../src/entities/character';
import RickAndMortyBRL from '../../src/business/integration/rickAndMortyBRL';
import axios from 'axios';

describe('#Rick and Morty BRL', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })
    test('#getCharactersFromJSON should return a list of Character Entity', async () => {
        const response = JSON.parse(await fs.readFile('./test/mocks/characters.json'));
        const expected = response.results.map((char) => new Character(char));
        jest.spyOn(axios, "get").mockResolvedValue({data: response})
        const result = await RickAndMortyBRL.getCharactersFromJSON()

        expect(result).toStrictEqual(expected)
    });
    test('#getCharactersFromJSON should return an empty list if the API returns nothing', async () => {
        const response = JSON.parse(await fs.readFile('./test/mocks/characters-empty.json'));
        const expected = response.results
        jest.spyOn(axios, "get").mockResolvedValue({data: response})
        
        const result = await RickAndMortyBRL.getCharactersFromJSON();
        expect(result).toStrictEqual(expected)
    });
})