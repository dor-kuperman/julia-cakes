
const router = require('express').Router();
let User = require('../models/user.model');

router.route('/').get((req, res) => {
    User.find().select('-password -_id -createdAt -updatedAt -__v')
        .then(users => res.json(users))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/').post((req, res) => {
    User.exists({ username: req.body.username, password: req.body.password }, function (err, result) {

        if (!result) {
            const username = req.body.username;
            const password = req.body.password;

            const newUser = new User({ username, password });

            newUser.save()
                .then(() => res.json(newUser.username))
                .catch(err => res.status(400).json(err));
        } else {
            User.find({ username: req.body.username, password: req.body.password }).select('-password -_id -createdAt -updatedAt -__v')
                .then(user => res.json(user))
                .catch(err => res.status(400).json(err));
        }
    });
});

router.route('/add').post((req, res) => {
    const username = req.body.username;
    const password = req.body.password;

    const newUser = new User({ username, password });

    newUser.save()
        .then(() => res.json('User added!'))
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;