const TextProcessorAPI = require('./textProcessorFluentAPI');

class TextProcessorFacade {
    #textProcessorFluentAPI
    constructor(text) {
        this.#textProcessorFluentAPI = new TextProcessorAPI(text)
    }

    getPeopleFromPdf() {
        return this.#textProcessorFluentAPI
        .extractPeolpeData()
        .divideTextInColumns()
        .removeEmptyCharacters()
        .mapPerson()
        .build()
    }
}

module.exports = TextProcessorFacade