const router = require('express').Router();
const { User } = require('../../models');

//GET /api/users
router.get('/', (req, res) => {
    //Access our User model and run .findAll() method
    //.then assigns the data we get from findAll() to dbUserData
    User.findAll({
        attributes: {exclude: ['password']}
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err)
            res.status(500).json(err);
        });
});

//GET /api/users/1
router.get('/:id', (req, res) => {
    User.findOne({
        attributes: {exclude : ["password"]},
        where: {
            id: req.params.id
        }
    })
        .then(dbUserdata => {
            if (!dbUserdata) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserdata);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// POST /api/users
router.post('/', (req, res) => {
    //expects{username: 'Lernantino', email:'lernantino@gmail.com', password: 'password1234'}
    User.create({
    //this object with the colum names for the table and property values from the request body from form submitting data
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
        .then(dbUserData => res.json(dbUserData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// PUT /api/users/1 to update
router.put('/:id', (req, res) => {
    //expects {username:'lernantino', email: 'lernantino@gmail.com', password:'password1234'}

    //if req.body had exavt key/value pairs to match the model, you can just use the `req.body` instead
    User.update(req.body, {
        where: {
            id: req.params.id
        }
    })
        .then(dbUserData => {
            if (!dbUserData[0]) {
                res.status(404).json({ message: 'No user found with this id' });
                return;
            }
            res.json(dbUserData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

// DELETE /api/users/1
router.delete('/:id', (req, res) => {
    User.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => {
        console.log(err);
        res.status(500).json(err);
      });
  });
  

module.exports = router;