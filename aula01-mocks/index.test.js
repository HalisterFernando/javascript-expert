const { error } = require('./src/constants');
const File = require('./src/file');
const { rejects, deepStrictEqual } = require('assert').strict;


(
    async () => {
       {
            const filePath = './mocks/emptyFile-invalid.csv';
            const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
            const result = File.csvToJson(filePath);
            await rejects(result, rejection)
       }
       {
            const filePath = './mocks/fourItems-invalid.csv';
            const rejection = new Error(error.FILE_LENGTH_ERROR_MESSAGE);
            const result = File.csvToJson(filePath);
            await rejects(result, rejection)
       }
       {
           const filePath = './mocks/threeItems-valid.csv';
           const result = await File.csvToJson(filePath)
          
           const expected = [
            {
              "id": 123,
              "name": "Halister Fernando",
              "profession": "JavaScript Instructor",
              "birthDay": 1990
            },
            {
              "id": 321,
              "name": "Flavinho do Pneu",
              "profession": "JavaScript Specialist",
              "birthDay": 1943
            },
            {
              "id": 231,
              "name": "Claudio da Carriola",
              "profession": "Java Developer",
              "birthDay": 1973
            }
          ]

          deepStrictEqual(JSON.stringify(result), JSON.stringify(expected))
       }
    }
)();
