const { describe, it, before, beforeEach, afterEach } = require('mocha')
const CarService = require('../../src/service/carService')
const sinon = require('sinon')
const { join } = require('path')
const assert = require('assert')
const { expect } = require('chai')

const carsDatabase = join(__dirname, '../../database', "cars.json")
const mocks = {
    validCar: require('./../mocks/valid-car.json'),
    validCategory: require('./../mocks/valid-category.json'),
    validCustomer: require('./../mocks/valid-customer.json'),
}

describe('CarService Suite tests', () => {
    let carService = {}
    let sandbox = {}
    
    before(() => {
        carService = new CarService({cars: carsDatabase})
    })

    beforeEach(() => {
        sandbox = sinon.createSandbox()
    })
    afterEach(() => {
        sandbox.restore()
    })
    it('shoult retrieve a random position from an array', () => {
        const data = [0, 1, 2, 3, 4]
        const result = carService.getRandomPositionFromArray(data)
        expect(result).to.be.lte(data.length).and.be.gte(0)
    })
    it('should choose the first id from carIds in carCategory', () => {
        const carCategory = mocks.validCategory
        const carIndex = 0

        sandbox.stub(
            carService,
            carService.getRandomPositionFromArray.name
        ).returns(carIndex)
        

        const result = carService.chooseRandomCar(carCategory)
        const expected = carCategory.carIds[carIndex]
        
        expect(carService.getRandomPositionFromArray.calledOnce).to.be.ok
        expect(result).to.be.equal(expected)
    })
    it('given a carCategory it should return an available car', async () => {
        const car = mocks.validCar
        const category = Object.create(mocks.validCategory)
        category.carIds = [car.id]

        sandbox.stub(
            carService.carRespository,
            carService.carRespository.find.name
        ).resolves(car)

        sandbox.spy(
            carService,
            carService.chooseRandomCar.name
        )

        
        const result = await carService.getAvailableCar(category);
        const expected = car

        expect(carService.chooseRandomCar.calledOnce).to.be.ok
        expect(carService.carRespository.find.calledWithExactly(car.id)).to.be.ok
        expect(result).to.be.deep.equal(expected)

        
    })
})