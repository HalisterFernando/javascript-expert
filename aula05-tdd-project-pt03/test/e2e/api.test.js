const { describe, it, before } = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { join } = require('path');
const carsDb = join(__dirname, '../../database', 'cars.json');
const { expect } = require('chai');
const CarService = require('../../src/service/carService');


chai.use(chaiHttp);

const mocks = {
    validCustomer: require('../mocks/valid-customer.json'),
    validCarCategory: require('../mocks/valid-category.json'),    
    validCar: require('../mocks/valid-car.json')
};

describe('API suite test', () => {
    let app = {};    
    let sandbox = {};
    let service = {};

    beforeEach(() => {
        sandbox = sinon.createSandbox();      
    });
    afterEach(() => {
        sandbox.restore();
    });

    before(() => {
        const api = require('../../src/api');
        const carService = new CarService({cars: carsDb});
        service = carService;
        const instance = api({carService});
        app = instance.app;
    });

    describe('/getAvailableCar:get', () => {
        it('should return an available car', async () => {
            const carCategory = mocks.validCarCategory;
            const car = mocks.validCar;
            carCategory.carIds = [car.id];
            
            const response = await chai.request(app)
            .get('/car')
            .send({carCategory})
            
            expect(response).to.have.status(200);
            expect(response.body).to.be.deep.equal(car);
        })
    });
    describe('/calculateFinalPrice:post', () => {
        it('should return the final price in BRL currency', async () => {
            const carCategory = mocks.validCarCategory;
            const customer = mocks.validCustomer;            
            const numberOfDays = 5;

            const expected = service.currencyFormat.format(128.315);
            
            const response = await chai.request(app)
            .post('/price')
            .send({customer, carCategory, numberOfDays})

            expect(response).to.have.status(200);
            expect(response.body).to.be.equal(expected);       
        })
    });
    describe('/rent:post', () => {           
        it('should return a transaction receipt', async () => {            
            const customer = mocks.validCustomer;
            const carCategory = mocks.validCarCategory;
            const car = mocks.validCar;
            const numberOfDays = 5;

            const expected = {
                customer,
                car,
                amount: 0,
                dueDate: new Date()
            };
            
            const response = await chai.request(app)
            .post('/rent')
            .send({customer, carCategory, numberOfDays})

            const getKeys = (obj) => Object.keys(obj);
          
            expect(response).to.have.status(200);
            expect(getKeys(response.body)).to.be.deep.equal(getKeys(expected));
            expect(response.body.customer).to.be.deep.equal(customer);
            expect(response.body.car).to.be.deep.equal(car);
            expect(response.body.amount).to.not.be.empty;
            expect(response.body.dueDate).to.not.be.empty;                         
        })
    });
});

