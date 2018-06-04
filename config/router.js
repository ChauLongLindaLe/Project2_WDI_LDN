const express       = require('express');
const router        = express.Router();
const users         = require('../controllers/users');
const sessions      = require('../controllers/sessions');
// const static        = require('../controllers/static');
const classes       = require('../controllers/classes');

//security

// Listeners
router.route('/')
  .get(classes.index);

//user register
router.route('/register')
  .get(users.new)
  .post(users.create);

//user edit update and delete details
router.route('/user/:id')
  .get(users.edit)
  .put(users.update)
  .delete(users.delete);

// Write comments here
//router.route('/user/:id/comments')

//user login
router.route('/login')
  .get(sessions.new)
  .post(sessions.create);

//logout
router.route('/logout')
  .get(sessions.delete);

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




module.exports = router;
