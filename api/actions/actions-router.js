// Write your "actions" router here!
const express = require('express')

const Actions = require('./actions-model')
const Projects = require('../projects/projects-model')

const {validateActionId, validateAction} = require('./actions-middlware')

const router = express.Router();


router.get('/', (req, res) => {
    Actions.get()
    .then(result => {
        res.status(200).json(result)})
    .catch(err => res.send(err))
});

router.get('/:id', validateActionId, (req, res, next) => {
    Actions.get(req.params.id)
        .then(result => {
            console.log(result)
           if (!result) { 
            res.status(404).json('Not Found') 
        } else { res.status(200).json(result) 
        }}).catch(err => res.status(500).json({message: err.message, stack: err.stack}))
});

router.post('/', validateAction, (req, res) => {
    Actions.insert(req.body)
    .then(result => 
        res.status(200).json(result))
    .catch(err => 
        res.status(500).json({message: err.message, stack: err.stack}))
});

router.put('/:id', validateActionId, validateAction, (req, res) => {
    Actions.update(req.params.id, req.body)
    .then(resp => 
        res.status(200).json(resp))
    .catch(err => res.status(500).json({message: err.message, stack: err.stack}))
});

router.delete('/:id', validateActionId, (req, res) => {
    Actions.remove(req.params.id)
    .then(result => {
        Actions.get()
        .then(resp => {
            res.status(200).json(resp)
        })
    })
    .catch(err => 
        res.status(500).json({message: message.error}))
});


module.exports = router