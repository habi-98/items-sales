const express = require('express');
const mongoose = require('mongoose');
const config = require('./config');

const users = require('././app/users');

const app = express();

app.use(express.json());
app.use(express.static('public'));

const port = 8000;


mongoose.connect(config.dbuRL, config.mongoOptions).then(() => {
    app.use('/users', users)
    app.listen(port, () => {
        console.log(`Server starded on ${port}`)
    })
})



