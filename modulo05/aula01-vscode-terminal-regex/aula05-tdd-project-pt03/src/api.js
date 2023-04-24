const express = require('express')
const CarService = require('./service/carService')
const { join } = require('path')
const carsDb = join(__dirname, '../database', "cars.json")

const PORT = 3000;

const defaultFactory = () => ({
    carService: new CarService({cars: carsDb})
})

class Api {
    
    constructor(dependencies = defaultFactory()) {
        this.app = express()
        this.routes()
        this.PORT = 3000
        this.carService = dependencies.carService
    }

    routes() {
        this.app.use(express.json());

        this.app.get('/car', async (req, res) => {
            const { carCategory } = req.body

            const result = await this.carService.getAvailableCar(carCategory)            
            return res.status(200).json(result)
        });

        this.app.post('/price', async (req, res) => {
            const { customer, carCategory, numberOfDays } = req.body
           
            const result = await this.carService.calculateFinalPrice(
                customer, carCategory, numberOfDays
            )           
            return res.status(200).json(result)
        });

        this.app.post('/rent', async (req, res) => {            
            const { customer, carCategory, numberOfDays } = req.body;
            
            const result = await this.carService.rent(customer, carCategory, numberOfDays)
            return res.status(200).json(result)       
        });        
    }

    start(port) { 
        this.app.listen(port, () => {
            console.log(`Rodando na porta ${port}`)
        })
    }
}

const api = new Api()
api.start(PORT)



module.exports = (dependencies) => new Api(dependencies);