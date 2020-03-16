const Quotes = require('../quotes/quotes-model');
const express = require("express");
const router = express.Router();

router.get('/', (req, res) => {
    Quotes.getAll()
        .then(quotes => {
            res.status(200).json(quotes)
        })
        .catch(err => {
            res.status(500).json({ message: 'Server Error' })
        })
})

router.post('/', (req, res) => {
    console.log(req.body)
    Quotes.insert(req.body)
        .then(quote => {
            res.status(201).json(quote)
        })
        .catch(err => {
            res.status(500).json({ message: 'Server Error on POST' })
        })
})

router.delete('/:id', (req, res) => {
    const { id } = req.params
    Quotes.remove(id)
        .then(deleted => {
            if (deleted) {
                res.status(200).json({ message: `Quote ${id} was deleted`, deleted })
            } else {
                res.status(404).json({ message: `The post with the specified id does not exist.` })
            }
        })
        .catch(err => {
            res.status(500).json({ message: "Delete Server Error" })
        })
})

router.put('/:id', (req, res) => {
    const { id } = req.params
    const changes = req.body
    
    Quotes.update(changes, id)
        .then(updated => {
            if (updated) {
                res.status(200).json({ message: "Quote was successfully updated", changes })
            } else {
                res.status(404).json({ message: "Quote with the specified id does not exist" })
            }
        })
        .catch(err => {
            res.status(500).json({ message: "Quote Info could not be modified" })
        })
})

router.get('/:id', (req, res) => {
    const { id } = req.params
    Quotes.findById(id)
        .then(quote => {
            res.status(200).json(quote)
        })
        .catch(err => {
            res.status(500).json({ message: "Quote does not exist"})
        })
})

module.exports = router