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
    Actions.insert({description: req.body.description, notes: req.body.notes, project_id: 5, completed: false})
    .then(result => 
        res.send(result))
    .catch(err => 
        res.send({message: err.message, stack: err.stack}))
})


// router.put('/:id', (req, res) => {

// });

router.delete('/:id', (req, res) => {
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