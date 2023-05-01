const { describe, it } = require('mocha');
const { expect } = require('chai');
const { InvalidRegexError, evaluateRegex } = require('../src/utils');

describe('Util', () => {
    it('#evaluateRegex should throw an error using an unsafe regex', () => {
        const unsafeRegex = /^([a-z|A-Z|0-9]+\s?)+$/;
        /* 
        fica rodando em loop
        catastrophic backtracking
        time \ 
        node --eval "/^([a-z|A-Z|0-9]+\s?)+$/.test('como vai você ?') && console.log('legalzin')"         
        */
        expect(() => evaluateRegex(unsafeRegex)).to.throw(InvalidRegexError, `This ${unsafeRegex} is unsafe dude!`)
    });
    it('#evaluateRegex should not throw an error using a safe regex', () => {
        const safeRefex = /^([a-z])$/
        expect(() => evaluateRegex(safeRefex)).to.not.throw()
        expect(evaluateRegex(safeRefex)).to.be.ok
    }) 
})