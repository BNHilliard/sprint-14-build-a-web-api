// add middlewares here related to projects
const Projects = require('./projects-model')

function logger(req, res, next) {
    console.log(req.method, req.originalUrl, req.timestamp)
    next();
    }

function validateProjectId(req, res, next) {
    Projects.get(req.params.id)
    .then(resp => {
        if (!resp) {
            res.status(404).json('Project ID could not be found')
        } else { next(); }
    }).catch(() => {
        res.status(500).json('Internal Server Error')
    })
}

function validateProject(req, res, next) {
    const {name, description, completed} = req.body
    if (!name || !description || !completed) {
        res.status(400).json("Name, description, and completed status are required.")
    } else {
        next();
    }
}


module.exports = {validateProjectId, validateProject}