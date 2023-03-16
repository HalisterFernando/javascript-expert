const { createSandbox } = require('sinon');
const Fibonacci = require('./fibonacci')
const sinon = createSandbox();
const assert = require('assert');


(
    async () => {
        {   
            const fibonacci = new Fibonacci();
            const spy = sinon.spy(
                fibonacci,
                fibonacci.execute.name
            );
            for(const sequencia of fibonacci.execute(5)) {  };
            const expedCallCount = 6;
            assert.strictEqual(spy.callCount, expedCallCount);
            const { args } = spy.getCall(2);
            const expectedParams = [3, 1, 2];
            assert.deepStrictEqual(args, expectedParams, 'os arrays não são iguais!!')
        }

        {   
            const fibonacci = new Fibonacci();
            const spy = sinon.spy(
                fibonacci,
                fibonacci.execute.name
            );
            const results = [...fibonacci.execute(4)];
            const expedCallCount = 5;
            assert.strictEqual(spy.callCount, expedCallCount);   
            const expectedResults = [0, 1, 1, 21]        
            assert.deepStrictEqual(results, expectedResults, 'os arrays não são iguais') 
        }
    }
)()