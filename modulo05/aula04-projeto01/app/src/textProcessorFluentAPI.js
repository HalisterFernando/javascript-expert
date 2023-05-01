// O objetivo do Fluent API é executar tarefas
// como um pipline, passo a passo
// e no fim, chama o build, MUITO similar ao padrão builder
// a diferença que aqui é sobre processos, o Builder sobre construção
// de objetos 

const { evaluateRegex } = require('./utils');
const Person = require('./person');

class TextProcessorFluentAPI {
    // propriedade privada!
    #content
    constructor(content) {
        this.#content = content
    }

    extractPeolpeData() {
        // ?<= fala que extrair os dados que virao depois desse grupo
        // [contratante|contratada] ou um ou outro, (flag -1 para case insensitive)
        // :\s{1} vai procurar o caracter literal do dois pontos seguindo de um espaço
        // tudo acima fica dentro de um parenteses para falar, vamos pegar daí pra frente
        
        // (?!s) negative look around, vai ignorar os contratantes do fim do documento (que só tem espaço a frente deles)
        // .*\n pega qualquer coisa até o primeiro \n
        // .*? non greety, esse ? faz com que ele pare na primeira recorrencia, assim ele evita ficar em loop

        //$ informa que a pesquisa acaba no fim da linha
        // g - global
        // m - multiline
        // i - insensitive
        const matchPerson = evaluateRegex(/(?<=[contratante|contratada]:\s{1})(?!\s)(.*\n.*?)$/gmi)
        const onlyPerson = this.#content.match(matchPerson)
       
        this.#content = onlyPerson
        return this
    }

    divideTextInColumns() {
        const splitRegex = evaluateRegex(/,/)
        this.#content = this.#content.map((line) => line.split(splitRegex))
        return this
    }

    removeEmptyCharacters() {
        const trimSpaces = evaluateRegex(/^\s+|\s+$|\n/g)
        this.#content = this.#content.map((line) => line.map((item) => item.replace(trimSpaces, "")))
        return this
    }

    mapPerson() {
        this.#content = this.#content.map((line) => new Person(line))
        return this
    }

    build() {
        return this.#content
    }
}

module.exports = TextProcessorFluentAPI