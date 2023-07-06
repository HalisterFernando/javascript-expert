import { expect, describe, test, jest, beforeEach } from '@jest/globals';
import fs from 'fs/promises';
import Character from '../../src/entities/character';
import RickAndMortyUSA from '../../src/business/integration/rickAndMortyUSA.js';
import axios from 'axios';
import RickAndMortyUSAAdapter from '../../src/business/adapters/rickAndMortyUSAAdapter';

describe('#Rick and Morty BRL Adapter', () => {
    beforeEach(() => jest.clearAllMocks())
    test('#getCharacters should be and adapter for RickAndMortyBRL.getCharactersFromJSON', async () => {
        const brlIntegration = jest.spyOn(
            RickAndMortyUSA,
            RickAndMortyUSA.getCharactersFromXML.name
        ).mockResolvedValue([])

        const result = await RickAndMortyUSAAdapter.getCharacters();
        expect(result).toEqual([])
        expect(brlIntegration).toHaveBeenCalled()
    })
})