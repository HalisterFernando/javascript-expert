import draftlog from 'draftlog';
import chalk from 'chalk';
import chalkTalble from 'chalk-table';
import readLine from 'readline';
import Person from './person.js';
import database from '../database.json' assert {
    type: 'json'
};

draftlog(console).addLineListener(process.stdin);
const DEFAULT_LANG = "pt-BR"

const options = {
    leftPad: 2,
    columns: [
        { field: "id", name: chalk.redBright("ID") },
        { field: "vehicles", name: chalk.redBright("Vehicles") },
        { field: "kmTraveled", name: chalk.redBright("Km Traveled") },
        { field: "from", name: chalk.redBright("From") },
        { field: "to", name: chalk.redBright("To") }
    ]
}

const table = chalkTalble(options, database.map((item) => new Person(item).formatted(DEFAULT_LANG)));
const print = console.draft(table);

const terminal = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
})





