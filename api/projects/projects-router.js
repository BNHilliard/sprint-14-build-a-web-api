// Write your "actions" router here!
const express = require('express')

const Actions = require('../actions/actions-model')
const Projects = require('./projects-model')

const {validateProjectId, validateProject} = require('./projects-middleware')

const router = express.Router();

router.get('/', (req, res) => {
    Projects.get()
    .then(resp => {
        res.status(200).json(resp)
    }).catch(err => {
        res.status(500).json('Internal Server Error')
    })
})

router.get('/:id', validateProjectId, (req, res) => {
    Projects.get(req.params.id)
    .then(resp => {
        res.status(200).json(resp) 
    })
})

router.post('/', validateProject, (req, res) => {
    Projects.insert(req.body)
    .then(result => 
        res.status(200).json(result))
    .catch(err => 
        res.status(500).json({message: err.message, stack: err.stack}))
    });



router.put('/:id', validateProjectId, validateProject, (req, res) => {
    Projects.update(req.params.id, req.body)
    .then(resp =>  res.status(200).json(resp))
    .catch(err => { res.status(500).json({message: err.message, stack: err.stack})
    })
})


router.delete('/:id', validateProjectId, (req, res) => {
    Projects.remove(req.params.id)
    .then(result => {
        Projects.get()
        .then(resp => {
            res.status(200).json(resp)
          })
    })
    .catch(err => 
        res.status(500).json({message: message.error}))
})



router.get('/:id/actions', validateProjectId, (req, res) => {
    Projects.get(req.params.id)
    .then(resp => {
        res.status(200).json(resp.actions)
    })
})

module.exports = router