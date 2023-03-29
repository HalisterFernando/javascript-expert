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

    initializeTable(database, language) {
        const data = database.map((item) => new Person(item).formatted(language));        
        const table = chalkTalble(this.getTableOptions(), data);
        const print = console.draft(table);
        this.data = data
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