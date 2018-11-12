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

server.get('/veggies/:id', (req,res) => {
    db('veggies')
    .where({ id: req.params.id })
    .first()
    .then(veggies => {
        console.log(veggies)
        res.status(200).json(veggies);
    })
    .catch(err => {
        res.status(500).json(err)
      });
})

server.post('/veggies', (req, res) => {
    const name = req.body;
    db.insert(name)
    .into('veggies')
    .then(veggie => {
        res.status(200).json({ message: "Successfully added",})
    })
    .catch(err => res.status(500).json(err));
});

server.put('/veggies/:id', (req, res) => {
    const veggie = req.body;
    db('veggies')
    .where({ id: req.params.id})
    .update(veggie)
    .then(veggie => {
        if (veggie) {
            res.status(200).json({ message: "Veggie updated!" });
        } else {
            res.status(404).json({ message: "No Veggie associated with this ID" });
        }
    })
    .catch(err => {
        res.status(500).json({ message: "Sorry, we could not update this veggie." });
      });
})

const port = 8888;
server.listen(port, function() {
    console.log(`\n Planting at port ${port} \n`);
})