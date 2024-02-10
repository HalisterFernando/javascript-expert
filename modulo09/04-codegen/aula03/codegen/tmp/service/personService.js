
export default class PersonService {
    constructor({ repository: personRepository}) {
        this.productRepository = personRepository
    }

    create(data) {
        return this.productRepository.create(data)
    }

    read(query) {
        return this.productRepository.read(query)
    }

    update(id, data) {
        return this.productRepository.update(id, data)
    }

    delete(id) {
        return this.productRepository.delete(id)
    }
 }