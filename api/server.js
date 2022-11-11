const express = require('express');
const server = express();
server.use(express.json())
const actionsRouter = require('./actions/actions-router')
const projectsRouter = require ('./projects/projects-router')
const actions = require('./actions/actions-model')

server.use('/api/actions', actionsRouter)

server.use('/api/projects', projectsRouter)

server.get('/', (req, res) => {
    res.send(`Let's do this!`)
})


module.exports = server;
