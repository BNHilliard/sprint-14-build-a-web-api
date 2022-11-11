// Write your "actions" router here!
const express = require('express')

const Actions = require('./actions-model')
const Projects = require('../projects/projects-model')

const router = express.Router();

router.get('/', (req, res) => {
    Actions.get()
    .then(result => {
        res.status(200).json(result)})
    .catch(err => res.send(err))
});

router.get('/:id', (req, res, next) => {
    Actions.get(req.params.id)
        .then(result => {
           if (!result) { 
            res.status(404).json('Not Found') 
        } else { res.status(200).json(result) 
        }}).catch(err => res.send(err))
});

router.post('/', (req, res) => {
    Actions.insert({description: req.body.description})
    .then(result => 
        res.send(result))
    .catch(err => 
        res.send({message: err.message, stack: err.stack}))
})


router.put('/:id', (req, res) => {

});

router.delete('/:id', (req, res) => {

});

router.get('/:id/actions', (req, res) => {

});



module.exports = router