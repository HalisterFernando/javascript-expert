import database from "../database.js";
import Cart from "./entities/carts.js";

const cart = new Cart(database);

console.log(cart);