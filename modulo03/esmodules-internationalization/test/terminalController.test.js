import mocha from 'mocha';
const { describe, it } = mocha;
import chai from 'chai';
const { expect } = chai;
import chalk from 'chalk';
import TerminalController from '../src/terminalController.js';
import databaseMock from './mocks/valid-database.json' assert {
    type: 'json'
}

const DEFAULT_LANG = 'pt-BR';

describe('TerminalController', () => {
    it('should create data from database', () => {
        const terminal = new TerminalController();
        const data = terminal.getData(databaseMock, DEFAULT_LANG)
        const expected = [
            {
              id: 1,
              vehicles: 'Motocicleta, Carro e Caminhão',
              kmTraveled: '10.000 km',
              from: '01 de janeiro de 2009',
              to: '26 de novembro de 2020'
            },
            {
              id: 2,
              vehicles: 'Bike',
              kmTraveled: '2.000 km',
              from: '01 de janeiro de 2021',
              to: '01 de janeiro de 2022'
            }
          ]

          expect(data).to.be.deep.equal(expected)
    })
    it('should create a table', () => {
        const terminal = new TerminalController();
        const table = terminal.createTable(databaseMock, DEFAULT_LANG);        
        expect(table).to.be.a.string
    })
    it('should generate table options', () => {
        const terminal = new TerminalController();
        const options = terminal.getTableOptions();

        const expected = {
            leftPad: 2,
            columns: [
                { field: "id", name: chalk.redBright("ID") },
                { field: "vehicles", name: chalk.redBright("Vehicles") },
                { field: "kmTraveled", name: chalk.redBright("Km Traveled") },
                { field: "from", name: chalk.redBright("From") },
                { field: "to", name: chalk.redBright("To") }
            ]            
        }
        
        const getKeys = (obj) => Object.keys(obj);
        expect(getKeys(options)).to.be.deep.equal(getKeys(expected))
        expect(options.leftPad).to.be.equal(expected.leftPad)
        expect(options.columns).to.be.deep.equal(expected.columns)
    })
})