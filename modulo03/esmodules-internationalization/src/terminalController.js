import readLine from 'readline';
import chalk from 'chalk';
import Person from './person.js';
import draftlog from 'draftlog';
import chalkTalble from 'chalk-table';

export default class TerminalController {
    constructor() {
        this.print = {}
        this.data = {}
    }

    initializeTerminal(database, language) {
        draftlog(console).addLineListener(process.stdin)
        this.terminal = readLine.createInterface({
            input: process.stdin,
            output: process.stdout
        })

        this.initializeTable(database, language)
    }

    updateTable(item) {
        this.data.push(item)
        this.print(chalkTalble(this.getTableOptions(), this.data))
    }

    getData(database, language) {
        const data = database.map((item) => new Person(item).formatted(language));     
        this.data = data   
        return data
    }

    createTable(database, language) {
        const table = chalkTalble(this.getTableOptions(), this.getData(database, language));
        return table
    }

    initializeTable(table) {
        const print = console.draft(table);        
        this.print = print
    }

    getTableOptions() {
        return {
            leftPad: 2,
            columns: [
                { field: "id", name: chalk.redBright("ID") },
                { field: "vehicles", name: chalk.redBright("Vehicles") },
                { field: "kmTraveled", name: chalk.redBright("Km Traveled") },
                { field: "from", name: chalk.redBright("From") },
                { field: "to", name: chalk.redBright("To") }
            ]
        };
    }

    closeTerminal() {
        this.terminal.close()
    }

    question(msg = '') {
        return new Promise((resolve) => this.terminal.question(msg, resolve));        
    }
}