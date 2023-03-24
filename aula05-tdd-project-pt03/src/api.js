const express = require('express')
const CarService = require('./service/carService')
const { join } = require('path')
const carsDb = join(__dirname, '../database', "cars.json")
const app = express()

const PORT = 3000 

app.use(express.json())

const carService = new CarService({cars: carsDb})

app.get('/rent', async (req, res) => {
    const { customer, carCategory, numberOfDays } = req.body
    const result = await carService.rent(customer, carCategory, Number(numberOfDays))
    return res.status(200).json(result)
})

app.listen(PORT, () => {
    console.log(`Rodando na porta ${PORT}`)
})




module.exports = app;