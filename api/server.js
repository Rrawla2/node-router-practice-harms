const express = require("express");
const cors = require("cors");
const quotesRouter = require("../quotes/quotes-router");

const server = express();

server.use(cors());
server.use(express.json());

server.use('/quotes', quotesRouter);
server.get('/', (req, res) => {
    res.send('We are receiving data from request api');
})


module.exports = server;