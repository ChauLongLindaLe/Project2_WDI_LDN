const User = require('../models/user.js');

function usersNew( req, res){
  res.render('/sessions/new');

}
function usersShow( req, res){
  User
    .findById(req.params.id)
    .populate()
    .exec()
    .then(user => res.render('users/show', {user}));
}

function usersCreate( req, res){
  User
    .create(req.body)
    .then(() => res.redirect('/'));
  //add error message

}
function usersEdit( req, res){
  User
    .findById(req.params.id)
    .exec()
    .then(user => res.render('users/edit', {user}));

}


function usersUpdate(req,res){
  User
    .findById(req.params.id)
    .update(req.body)
    .then(user => {
      return res.redirect(`/users/${user.id}`);
    });
}

function usersDelete(req,res){
  User
    .findById(req.params.id)
    .exec()
    .then(user => user.remove())
    .then(req.session.regenerate(() => res.redirect('/')));
}


module.exports = {
  new: usersNew,
  show: usersShow ,
  create: usersCreate,
  edit: usersEdit,
  update: usersUpdate,
  delete: usersDelete

};
