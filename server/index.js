const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const buyerRoute = require('./routes/buyerRoute');
const sellerRoute = require('./routes/sellerRoute');
const productRoute = require('./routes/productRoute');
const cartRoute = require('./routes/cartRoute');
const orderRoute = require('./routes/orderRoute');

const app = express();
const port = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URI)
    .then(res => console.log('Database connected successfully'))
    .catch(err => console.log(err));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/buyers', buyerRoute);
app.use('/api/sellers', sellerRoute);
app.use('/api/products', productRoute);
app.use('/api/cart', cartRoute);
app.use('/api/orders', orderRoute);

app.get('/', (req, res) => res.send('Hello world'));

app.listen(port , () => console.log(`Server is up and running on port: http://localhost:${port}`));