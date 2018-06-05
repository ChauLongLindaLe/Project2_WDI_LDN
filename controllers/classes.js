const Class = require('../models/class');
const Venue = require('../models/venue');

function classesIndex(req,res){
  Class
    .find()
    .exec()
    .then(klasses =>{
      res.render('classes/index', {klasses});
    });
}

function classesShow(req,res,next){
  Class
    .findById(req.params.id)
    .populate('comments.creator')
    .exec()
    .then(klass => {
      if(!klass){
        return res.render('pages/404');
      }
      return klass;
    })
    .then(klass => {
      Venue.find({ 'lessons': klass.className})
        .then(venues => {
          res.render('/classes/show', {klass, venues });
        });
    })
    .catch(next);
}

function classesNew(req,res){
  if(!res.locals.isLoggedIn) return res.redirect('/');
  res.render('/classes/new');
}


function classesCreate(req,res,next){
  Class
    .create(req.body)
    .then(() => res.redirect('/classes'))
    .catch(next);
}

function classesEdit(req,res){
  Class
    .findById(req.params.id)
    .exec()
    .then(klass => res.render('/classes/edit', {klass}));
}


function classesUpdate(req,res){
  Class
    .findById(req.params.id)
    .exec()
    .then(klass => {
      klass = Object.assign(klass, req.body);
      return klass.save();
    })
    .then(klass =>  res.redirect(`/classes/${klass.id}`));
}


function classesDelete(req,res){
  Class
    .findById(req.params.id)
    .exec()
    .then(klass => {
      klass.remove();
      return res.redirect('/classes');
    });
}


function classesCreateComment(req, res, next) {
  req.body.user = req.currentUser;
  Class.findById(req.params.id)
    .then(klass => {
      klass.comments.push(req.body);
      return klass.save();
    })
    .then(klass => res.redirect(`/classes/${klass._id}`))
    .catch(next);
}

function classesDeleteComment(req, res, next) {
  Class.findById(req.params.id)
    .then(klass => {
      const comment = klass.comments.id(req.params.commentId);
      comment.remove();
      return klass.save();
    })
    .then(klass => res.redirect(`/classes/${klass._id}`))
    .catch(next);
}

module.exports = {
  index: classesIndex,
  show: classesShow,
  new: classesNew,
  create: classesCreate,
  edit: classesEdit,
  update: classesUpdate,
  delete: classesDelete,
  createComment: classesCreateComment,
  deleteComment: classesDeleteComment
};
