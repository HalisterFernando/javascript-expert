import {describe, it, expect, test, jest, beforeEach} from '@jest/globals';
import BaseBusiness from '../src/business/base/baseBusiness.js';
import { NotImplementedException } from '../src/util/exceptions';
import Order from '../src/entities/order.js';
import OrderBusiness from '../src/business/orderBusiness.js';

describe('Test suite for template method pattern', () => {
    beforeEach(() => {
        jest.restoreAllMocks()
    }); 
    describe('#OrderBusiness', () => { 
        test('execution Order Business without Template mehod', () => {
            const order = new Order({
                customerId: 1,
                amount: 100.000,
                products: [{description: 'ferrari'}]
            })

            const orderBusiness = new OrderBusiness()
            // todos os devs devem obrigatoriamente lembrar de seguir a risca esse fluxo de execução
            // se alguem esquecer de chamar a função de validação, pode quebrar todo o sistema
            const isValid = orderBusiness._validateRequiredFields(order);

            expect(isValid).toBeTruthy()

            const result = orderBusiness._create(order)
            expect(result).toBeTruthy()

        })
        test('execution Order Business with Template mehod', () => {
            const order = new Order({
                customerId: 1,
                amount: 100.000,
                products: [{description: 'ferrari'}]
            })

            const orderBusiness = new OrderBusiness();
            const calledValidationFn = jest.spyOn(
                orderBusiness,
                orderBusiness._validateRequiredFields.name
            )

            const calledCreationFn = jest.spyOn(
                orderBusiness,
                orderBusiness._create.name
            )


            // com template methos, a sequencia de passos é sempre esecutada
            // evita a replicação de lógica

            const result = orderBusiness.create(order)
            expect(result).toBeTruthy()
            expect(calledCreationFn).toBeTruthy()
            expect(calledValidationFn).toBeTruthy()
        })
     })
});