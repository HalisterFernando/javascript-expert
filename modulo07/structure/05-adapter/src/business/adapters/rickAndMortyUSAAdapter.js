import RickAndMortyUSA from "../integration/rickAndMortyUSA.js";

export default class RickAndMortyBRLAdapter {
    static async getCharacters() {
        return RickAndMortyUSA.getCharactersFromXML()
    }
}