const Venue = require('../models/venue');
const Class = require('../models/class');

function venuesIndex(req, res) {
  Venue
    .find()
    .then(venues =>{
      res.render('venues/index',{venues});
    });
}

function venuesShow(req, res, next) {
  Venue
    .findById(req.params.id)
    .populate('comments.user')
    .then(venue => {
      if(!venue){
        return res.render('pages/404');
      }
      return venue;
    })
    .then(venue => {
      Class.find({'venue': venue.name})
        .then(klasses => {
          console.log(venue.comments);
          res.render('venues/show', { venue: venue , klasses: klasses});
        });
    })
    .catch(next);
}

function venuesNew(req, res) {
  if(!res.locals.isLoggedIn) return res.redirect('/');
  res.render('venues/new');
}

function venuesCreate(req, res, next) {
  Venue
    .create(req.body)
    .then(() => res.redirect('venues'))
    .catch(next);
}

function venuesEdit(req, res) {
  Venue
    .findById(req.params.id)
    .then(venue => res.render('venues/edit', { venue }));
}

function venuesUpdate(req, res) {
  Venue
    .findById(req.params.id)
    .then(venue => Object.assign(venue, req.body))
    .then(venue => venue.save())
    .then(() => res.redirect(`/venues/${req.params.id}`));
}

function venuesDelete(req, res) {
  Venue
    .findById(req.params.id)
    .then(venue => venue.remove())
    .then(() => res.redirect('/venues'));
}

function venuesCreateComment(req, res, next) {
  req.body.user = req.currentUser;
  Venue
    .findById(req.params.id)
    .then(venue => {
      venue.comments.push(req.body);
      return venue.save();
    })
    .then(venue => res.redirect(`/venues/${venue._id}`))
    .catch(next);
}

function venuesDeleteComment(req, res, next) {
  Venue
    .findById(req.params.id)
    .then(venue => {
      const comment = venue.comments.id(req.params.commentId);
      comment.remove();
      return venue.save();
    })
    .then(venue => res.redirect(`/venues/${venue._id}`))
    .catch(next);
}

module.exports = {
  index: venuesIndex,
  show: venuesShow,
  new: venuesNew,
  create: venuesCreate,
  edit: venuesEdit,
  update: venuesUpdate,
  delete: venuesDelete,
  createComment: venuesCreateComment,
  deleteComment: venuesDeleteComment
};
