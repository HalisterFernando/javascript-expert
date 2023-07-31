//import FluentSQLBuilder from "../fluentsql-jest-tdd-yt/index.js";
import FluentSQLBuilder from "@halisterfernando/fluentsql";
import database from './database/data.json' assert { type: 'json' };

const result = FluentSQLBuilder.for(database)
.where({ registered: /^(2020|2019)/})
.select(['name'])
.limit(3)
.countyBy('name')
.build()

console.log({ result })