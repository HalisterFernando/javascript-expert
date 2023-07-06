import { expect, describe, test, jest, beforeEach } from '@jest/globals';
import fs from 'fs/promises';
import Character from '../../src/entities/character';
import RickAndMortyBRL from '../../src/business/integration/rickAndMortyBRL';
import axios from 'axios';
import RickAndMortyBRLAdapter from '../../src/business/adapters/rickAndMortyBRLAdapter';

describe('#Rick and Morty BRL Adapter', () => {
    beforeEach(() => jest.clearAllMocks())
    test('#getCharacters should be and adapter for RickAndMortyBRL.getCharactersFromJSON', async () => {
        const brlIntegration = jest.spyOn(
            RickAndMortyBRL,
            RickAndMortyBRL.getCharactersFromJSON.name
        ).mockResolvedValue([])

        const result = await RickAndMortyBRLAdapter.getCharacters();
        expect(result).toEqual([])
        expect(brlIntegration).toHaveBeenCalled()
    })
})