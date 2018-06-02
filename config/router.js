const express       = require('express');
const router        = express.Router();
const users         = require('../controllers/users');
const sessions      = require('../controllers/sessions');
const classes      = require('../controllers/classes');

// Listeners
router.route('/')
  .get('classes.index');

//user register
router.route('/register')
  .get(users.new)
  .post(users.create);

router.route('/user/:id')
  .get(users.edit);

//user login
router.route('/login')
  .get(sessions.new)
  .post(sessions.create);

router.route('/classes')
  .get(classes.index)
  .post(classes.create);

router.route('/classes/new')
  .get(classes.new);
router.route('/classes/:id')
  .get(classes.show)
  .put(classes.update)
  .delete(classes.delete);
router.route('classes/:id/edit')
  .get(classes.edit);


//Owner register
//Owner Login

//Controllers


//Login



//Routes



module.exports = router;
