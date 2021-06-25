const express = require("express");
const cart = express.Router();

const cartItems = [
    {id: 1, product: "Shirt", price: 20.99, quantity: 12},
    {id: 2, product: "Shorts", price: 24.79, quantity: 9},
    {id: 3, product: "Socks", price: 3.50, quantity: 35},
    {id: 4, product: "Shoes", price: 37.00, quantity: 15},
    {id: 5, product: "Hat", price: 15.99, quantity: 7},
    {id: 6, product: "Fancy Hat", price: 18.99, quantity: 14},
    {id: 7, product: "Fanny Pack", price: 12.00, quantity: 2},
    {id: 8, product: "Backpack", price: 35.00, quantity: 27},
]  

let nextID = 9;

cart.get('/', (req, res) => {
    let price = parseFloat(req.query.maxPrice);
    let product = req.query.prefix;
    let pageSize = req.query.pageSize;
    let returnCart = cartItems;
    if(price){
        returnCart = returnCart.filter((item)=>item.price <= price);
    }
    if(product){
        returnCart = returnCart.filter((item)=>item.product.toLowerCase().startsWith(product.toLowerCase()));
    }
    if(pageSize){
        returnCart = returnCart.slice(0, pageSize);
    }
    res.status(200).json(returnCart);
});

cart.get("/:id", (req, res) => {
    let id = parseFloat(req.params.id);
    let returnCart = cartItems.find((item)=>item.id === id);
    if(returnCart){
        res.status(200).json(returnCart);
    } else {
        res.status(404).send("ID Not Found")
    }
});

cart.post("/", (req, res) => {
    let newItem = {id: nextID, product:req.body.product, price: req.body.price, quantity: req.body.quantity}
    cartItems.push(newItem);
    nextID++;
    res.status(201).json(newItem);
});

cart.put("/:id", (req, res) => {
    let updatedItem = req.body;
    let index = cartItems.findIndex((item)=>item.id === req.params.id);
    cartItems[index] = {...cartItems[index], ...updatedItem};
    res.status(200).json(cartItems[index]);
});

cart.delete("/:id", (req, res) => {
    let index = cartItems.findIndex((item)=>item.id == req.params.id);
    cartItems.splice(index, 1);
    res.status(204).send();
});

module.exports = cart;