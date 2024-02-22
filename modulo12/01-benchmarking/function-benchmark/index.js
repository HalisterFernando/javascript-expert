import Benchmark from "benchmark";
// import CartNew from "./cart-id-new.js";
// import CartOld from './cart-id-old.js';
import CartRmPropOld from './cart-rm-prop-old.js';
import CartRmPropNew from './cart-rm-prop-new.js';
import database from './../database.js';
import CartPriceOld from './cart-price-old.js';
import CartPriceNew from './cart-price-new.js';

const suite = new Benchmark.Suite;

// suite
//     .add('Cart#cartIdUUID', function() {
//         new CartOld()
//     })
//     .add('Cart#cartIdCrypto', function() {
//         new CartNew()
//     })
//     .on('crycle', (event) => console.log(event.target))
//     .on('complete', function() {
//         console.log(`Fastest is ${this.filter('fastest').map('name')}`)
//     })
//     .run()

const data = {
    products: [
        {
            id: 'ae',
            n: undefined,
            abc: undefined,
            a: null,
            b: 123
        },
        {
            id: 'ae',
            n: undefined,
            abc: undefined,
            a: null,
            b: 123
        }
    ]
}

    // suite
    // .add('Cart#EmptyPropsMapReduce', function() {
    //     new CartRmPropOld(data)
    // })
    // .add('Cart#EmptyPropsLoop', function() {
    //     new CartRmPropNew(data)
    // })
    // .on('cycle', (event) => console.log(String(event.target)))
    // .on('complete', function() {
    //     console.log(`Fastest is ${this.filter('fastest').map('name')}`)
    // })
    // .run({async: true})

    suite
    .add('Cart#PriceReduce', function() {
        new CartPriceOld(database)
    })
    .add('Cart#PriceLoop', function() {
        new CartPriceNew(database)
    })
    .on('cycle', (event) => console.log(String(event.target)))
    .on('complete', function() {
        console.log(`Fastest is ${this.filter('fastest').map('name')}`)
    })
    .run({async: true})