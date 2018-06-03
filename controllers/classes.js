const Class = require('../models/classes');

function classesIndex(req,res){
  Class
    .find()
    .exec()
    .then(classes => {
      res.render('home', {classes});
    });
}

//Index - lists of classes

function classesShow(req,res){
  Class
    .findById(req.params.id)
    .populate('comments.createdBy')
    .exec()
    .then(class => res.render('classes/show', {class}));
}

function classesNew(req,res){
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
  .then(class => res.render('classes/edit', {class}));
}


function classesUpdate(req,res){
  Class
  .findById(req.params.id)
  .exec()
  .then(class => {
    class = Object.assign(class, req.body);
    return class.save();
  })
  .then(class => res.redirect(`/class/${classes.id}`))
}


function classesDelete(req,res){
  Class
  .findById(req.params.id)
  .exec()
  .then(class => class.remove())
  .then(() => res.redirect('/'));
}


//function for comments
//Show - restaurant description
//Registration
//Create and Delete classes
// Add photos




module.exports = {
  index: classesIndex,
  show: classesShow,
  new: classesNew,
  create: classesCreate,
  edit: classesEdit,
  update: classesUpdate,
  delete: classesDelete
};
