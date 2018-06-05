const express       = require('express');
const router        = express.Router();
const users         = require('../controllers/users');
const sessions      = require('../controllers/sessions');
// const static        = require('../controllers/static');
const classes       = require('../controllers/classes');
const venues        =require('../controllers/venues');

//security

// handles requestss
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

router.route('/classes/:id/comments')
  .post(classes.createComment);

router.route('/classes/:id/comments/:commentId')
  .delete(classes.deleteComment);


router.route('/venues')
  .get(venues.index)
  .post(venues.create);

router.route('/venues/new')
  .get(venues.new);

router.route('/venues/:id')
  .get(venues.show)
  .put(venues.update)
  .delete(venues.delete);

router.route('/venues/:id/edit')
  .get(venues.edit);

router.route('/venues/:id/comments')
  .post(venues.commentsCreate);

router.route('/venues/:id/comments/:commentId')
  .delete(venues.commentsDelete);


//Owner register
//Owner Login


router.all('/*', (req, res) => res.render('pages/404'));

module.exports = router;
