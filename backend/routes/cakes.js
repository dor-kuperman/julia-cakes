const router = require('express').Router();
let Cake = require('../models/cake.model');

router.route('/').get((req, res) => {
    Cake.find()
        .then(cakes => res.json(cakes))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
    console.log('cake to add:', req.body);
    const username = req.body.username;
    // const description = req.body.description;
    const duration = Number(req.body.duration);
    const imgURL = req.body.imgURL;

    const newCake = new Cake({
        username,
        // description,
        duration,
        imgURL
    });

    newCake.save()
        .then(() => res.json(console.log('Cake added!', newCake)))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
    Cake.findById(req.params.id)
        .then(cake => res.json(cake))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').delete((req, res) => {
    Cake.findByIdAndDelete(req.params.id)
        .then(() => res.json('Cake deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
    Cake.findById(req.params.id)
        .then(cake => {
            cake.username = req.body.username;
            // cake.description = req.body.description;
            cake.duration = Number(req.body.duration);

            cake.save()
                .then(() => res.json('Cake updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router;