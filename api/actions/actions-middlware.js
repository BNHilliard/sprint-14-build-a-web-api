const Actions = require('./actions-model')

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

function validateAction(req, res, next) {
    if (!req.body.notes || !req.body.description || !req.body.project_id) {
        res.status(400).json('notes, description, completed, and project ID are required');
    } else {
        next();
    }
};


module.exports = {validateActionId, validateAction}