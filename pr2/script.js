const express = require('express');
const app = express();
const port = 3000;

let items = [
    {id: 1, name: "Notebook", price: 11000},
    {id: 2, name: "Tablet", price: 10000},
    {id: 3, name: "Xiaomi Redmi", price: 9000}
]

app.use(express.json())
app.use((req, res, next) => {
    console.log(`${new Date().toISOString()} ${req.method} ${req.url}`);
    next();
});
app.get('/'
, (req, res) => {
res.send('Главная страница');
});

//CRUD
//Create
app.post('/items', (req, res) => {
    const {name, price} = req.body
    const newItem = {
        id: Date.now(),
        name,
        price
    }
    items.push(newItem)
    res.status(201).json(newItem)
})

//Read
app.get('/items', (req, res) => {
    res.send(JSON.stringify(items))
})

// Update
app.patch('/items/:id', (req, res) => {
    const item = items.find(u => u.id == req.params.id);
    const {name, price} = req.body;

    if (name) item.name = name;
    if (price) item.price = price;

    res.json(item)
})

//Delete
app.delete('/items/:id', (res, req) => {
    const itemIndex = items.findIndex(u => u.id == req.params.id);
    items.splice(itemIndex, 1);
    res.json({message: "Item deleted"})
})
app.listen(port, () => {
    console.log(`Сервер запущен на http://localhost:${port}`);
});