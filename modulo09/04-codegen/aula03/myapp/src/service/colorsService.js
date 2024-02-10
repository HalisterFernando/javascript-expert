
export default class ColorsService {
    constructor({ repository: colorsRepository}) {
        this.productRepository = colorsRepository
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