const Class = require('../models/class.js');

function classesIndex(req,res){
  Class
    .find()
    .exec()
    .then(classes => {
      res.render('home', {classes});
    });
}


function classesShow(req,res){
  Class
    .findById(req.params.id)
    // .populate comments
    .exec()
    .then(classes => {
      res.render('classes/show', {classes});
    });
}

function classesNew(req,res){
  if(!res.locals.isLoggedIn) return res.redirect('/');
  res.render('classes/new');
}


function classesCreate(req,res){
  Class
    .create(req.body)
    .then(() => res.redirect('/'));
}

function classesEdit(req,res){
  Class
    .findById(req.params.id)
    .exec()
    .then(classes => {
      res.render('classes/edit', {classes});
    });
}


function classesUpdate(req,res){
  Class
    .findById(req.params.id)
    .exec()
    .then(classes => {
      classes = Object.assign(classes, req.body);
      return classes.save();
    })
    .then(classes =>  res.redirect(`/class/${classes.id}`));
}


function classesDelete(req,res){
  Class
    .findById(req.params.id)
    .exec()
    .then(classes => {
      classes.remove();
      return res.redirect('/classes');
    });
}


//function for comments





module.exports = {
  index: classesIndex,
  show: classesShow,
  new: classesNew,
  create: classesCreate,
  edit: classesEdit,
  update: classesUpdate,
  delete: classesDelete
};
