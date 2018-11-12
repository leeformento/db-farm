const express = require('express');
const helmet = require('helmet');
const knex = require('knex');

const knexConfig = require('./knexfile')
const db = knex(knexConfig.development);

const server = express();

server.use(express.json());
server.use(helmet());

server.get('/', (req, res) => {
    res.json('Welcome to the farm.')
})

server.get('/veggies', (req, res) => {
    db('veggies')
    .then(veggie => {
        console.log(veggie)
        res.status(200).json(veggie);
    })
    .catch(err => {
        res.status(500).json(err)
      });
})

const port = 8888;
server.listen(port, function() {
    console.log(`\n Planting at port ${port} \n`);
})