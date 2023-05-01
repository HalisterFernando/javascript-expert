const { evaluateRegex } = require('./utils');

class Person {
    // (\w+):\s.*
    // $1,
    constructor([
    nome,
    nacionalidade,
    estadoCivil,
    documento,
    rua,
    numero,
    bairro,
    estado,
    ]) {
        // (\w+),
        // this.$1 = $1

        // ^ começo da string
        // + um ou mais ocorrências
        // (\w{1}) pega só a primeira letra e deixa em um grupo
        // (a-zA-Z) encontra letras maiusculas ou minusculas, 
        // adicionamos o + para ele pegar todas as ocorrências até o caracter especial
        const firstLetterExp = evaluateRegex(/^(\w{1})([a-zA-Z]+$)/g)
        const formatFirstLetter = (prop) => {
            return prop.replace(firstLetterExp, (fullMatch, group1, group2, index) => {
                return `${group1.toUpperCase()}${group2.toLowerCase()}`
            })
        }
        this.nome = nome
        this.nacionalidade = formatFirstLetter(nacionalidade) 
        this.estadoCivil = formatFirstLetter(estadoCivil)
        this.documento = documento.replace(evaluateRegex(/\D/g), "")
        // começa a procurar depois do " a " e pega tudo que tem a frente
        // ?<= faz com que ignore o que estiver antes desse match
        // conhecido como positive look behind
        this.rua = rua.match(evaluateRegex(/(?<=\sa\s).*$/)).join()
        this.numero = numero
        this.bairro = bairro.match(evaluateRegex(/(?<=\s)\w.*$/)).join()
        this.estado = estado.replace(evaluateRegex(/\.$/), "")
    }
}
module.exports = Person