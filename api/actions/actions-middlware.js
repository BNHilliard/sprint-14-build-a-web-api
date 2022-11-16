const Actions = require('./actions-model')

function logger(req, res, next) {
    console.log(req.method, req.originalUrl, req.timestamp)
    next();
    }

function validateAction(req, res, next) {
    if (!req.body.notes || !req.body.description || !req.body.project_id || req.body.completed == undefined) {
        res.status(400).json('notes, description, completed, and project ID are required');
    } else {
        next();
    }
};

function validateActionId(req, res, next) {
    Actions.get(req.params.id)
    .then(resp => {
        if (!resp) {
            res.status(404).json('Project ID could not be found');
        } else { next(); }
    }).catch(() => {
        res.status(500).json('Internal Server Error');
    });
};




module.exports = {validateActionId, validateAction}