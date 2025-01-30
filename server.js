const express = require('express');
const app = express();
const port = 3000;
var cors = require('cors');

app.use(express.json());

app.use(cors());

app.listen(port, () => {
    console.log(`Application exemple à l'écoute sur le port ${port}`);
});

const products = [
    { id: 1, name: 'RTX 5090', description: 'The best GPU ever', price: 2349.99, releaseDate: new Date('2025-01-30'), imageUrl: '/img/asus-rtx5090-rog-astral-boite.webp', class: '90' },
    { id: 2, name: 'RTX 5080', description: 'The new standard in GPUs for gaming', price: 1179.99, isFavorite: true, releaseDate: new Date('2025-01-30'), imageUrl: '/img/asus-rtx-5080-prime-oc.webp', class: '80', evolution: 1 },
    { id: 3, name: 'RTX 5070 TI', description: 'Mid-range GPU with great performance', price: 884.99, releaseDate: new Date('2025-02-15'), imageUrl: '/img/asus-rtx-5070-ti-tuf.webp', class: '70 ti', evolution: 2 },
    { id: 4, name: 'RTX 5070', description: 'Great performance at a great price', price: 649.99, releaseDate: new Date('2025-02-15'), imageUrl: '/img/5070.png', class: '70', evolution: 3 },
    { id: 5, name: 'RTX 5060', description: 'Entry-level GPU for gaming', price: 399.99, releaseDate: new Date('2025-03-01'), imageUrl: '/img/5060-removebg-preview.png', class: '60', evolution: 4 },
    { id: 6, name: 'RTX 4090', description: 'The best GPU ever', price: 1599.99, releaseDate: new Date('2022-10-30'), imageUrl: '/img/4090.webp', class: '90' },
    { id: 7, name: 'RTX 4080', description: 'The new standard in GPUs for gaming', price: 799.99, isFavorite: true, releaseDate: new Date('2022-10-30'), imageUrl: '/img/4080.png', class: '80', evolution: 6 },
    { id: 8, name: 'RTX 4070 TI', description: 'Mid-range GPU with great performance', price: 599.99, releaseDate: new Date('2022-11-15'), imageUrl: '/img/4070TI.webp', class: '70 ti', evolution: 7 },
    { id: 9, name: 'RTX 4070', description: 'Great performance at a great price', price: 449.99, releaseDate: new Date('2022-11-15'), imageUrl: '/img/4070.png', class: '70', evolution: 8 },
    { id: 10, name: 'RTX 4060', description: 'Entry-level GPU for gaming', price: 279.99, releaseDate: new Date('2022-12-01'), imageUrl: '/img/406.webp', class: '60', evolution: 9 }
];

app.get('/products', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    res.json(products);
});

app.get('/products/:id', (req, res) => {
    res.set('Access-Control-Allow-Origin', '*');
    const id = parseInt(req.params.id);
    const product = products.find(p => p.id === id);
    if (product) {
        res.json(product);
    } else {
        res.status(404).send('Product not found');
    }
});
