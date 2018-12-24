var express = require('express');
var path = require('path');
var fs = require('fs');

const usersRoute = 'allUsers.json';
var readUsers = fs.readFileSync(usersRoute);
readUsers = JSON.parse(readUsers);
var users = readUsers;

var router = express.Router();
module.exports = router;


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/users', function (req, res) {
  res.sendFile( path.join(__dirname, '..', 'public', 'index.html'))
})

router.get('/users/new', function (req, res) {
  res.sendFile( path.join(__dirname, '..', 'public', 'new-user.html'))
})

router.get('/users/edit', function (req, res) {
  res.sendFile( path.join(__dirname, '..', 'public', 'edit-user.html'))
})

router.get('/api/users', function (req, res) {
  res.json(users);
})


router.post('/api/users', function (req, res) {
  const user = req.body;
  let lastId = users.length === 0 ? (0) : users[users.length-1].id;
  user.id = lastId + 1;

  if( (users.name && users.name.trim()!=='')
  && (users.surname && users.surname.trim()!=='')
  && (users.email && users.email.trim()!=='')
  && (users.phone && users.phone.trim()!=='') ) {
    if( validateEmail(users.email) ){
      if (users.name.length > 30) {
        return res.status(400).end('Nombre incorrecto');
      } 
      if (users.surname.length > 30) {
        return res.status(400).end('Apellido incorrecto');
      } 
      if (validatePhone(users.phone) == false) {
        return res.status(400).end('Telefono incorrecto');
      }
    } else {
      return res.status(400).end('Mail incorrecto');
    }
  }
  
  users.push(user);
  fs.writeFileSync(usersRoute, JSON.stringify(users));
  res.json(users);
})

function validateEmail (email) {
  var emailValidation = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailValidation.test(email.toLowerCase());
}

function validatePhone (phone) {
  var phoneValidation = /^(\()?[2-9]{1}\d{2}.(\))?(-|\s)?\d{3}(-|\s)\d{4}$/;
  return phoneValidation.test(phone.join(""));
}





//DELETE USER
router.delete('/api/users/:id', function(req, res, next) {
  const theId = req.params.id 
 
  for (let i = 0; i < users.length; i++) {
    if(users[i].id == theId){
      users.splice(i, 1);
      fs.writeFileSync(usersRoute, JSON.stringify(users));
    }
  }
  res.status(200).end('ok');
});


//FIND ONE PARTICULAR USER

router.get('/api/users/:id', function(req, res, next) {
  const theId = req.params.id 
 
  for (let i = 0; i < users.length; i++) {
    if(users[i].id == theId){
      return res.json(users[i]);
    }
  }
});


//EDIT USER

router.put('api/users/:id', function (req, res) {
  const theId = req.params.id;
  const editUser = req.body;

  if( (users.name && users.name.trim()!=='')
  && (users.surname && users.surname.trim()!=='')
  && (users.email && users.email.trim()!=='')
  && (users.phone && users.phone.trim()!=='') ) {
    if( validateEmail(users.email) ){
      if (users.name.length > 30) {
        return res.status(400).end('Nombre incorrecto');
      } 
      if (users.surname.length > 30) {
        return res.status(400).end('Apellido incorrecto');
      } 
      if (validatePhone(users.phone) == false) {
        return res.status(400).end('Telefono incorrecto');
      }
    } else {
      return res.status(400).end('Mail incorrecto');
    }
  }

  for (let i = 0; i < users.length; i++) {

    if(users[i].id == theId){
      users[i].name = editUser.name;
      users[i].seurname = editUser.surname;
      users[i].email = editUser.email;
      users[i].phone = editUser.phone;
    }
  }

  fs.writeFileSync(usersRoute, JSON.stringify(users));
  res.status(200);

})



//EDITAR USUARIOSDE JUANI

// router.put('/api/users/:id', function(req, res){
//   const theId = req.params.id;
//   const body = req.body;
//   const bodyKeys = Object.keys(body);
  
//   for (var i = 0; i < users.length; i++) {
//     const currentUser = users[i];
//     if (currentUser.id == theId) {
//       const userKeys = Object.keys(currentUser);
//       for (let x = 0; x < bodyKeys.length; x++) {
//         const currentBodyKey = bodyKeys[x]
//         if (userKeys.indexOf(currentBodyKey) > -1) {
//           currentUser[currentBodyKey] = body[currentBodyKey]
//         }else{
//           console.log(`${currentBodyKey} no es una clave valida`);
//         }
//       }
//       return res.json(currentUser)
//     }
//   }
// });
 

router.get('/ping', function (req, res) {;
  res.send('pong!');
})


//logica de filtrado con FILTER

router.get('/api/users?search', function (req, res) {
  let search = req.query.search;
  
  if (search && search.length > 0) {
  
    let userFilter = users.filter( function (dataUser) {  
      return dataUser.nombre.toLowCase().indexOf(search.toLowCase()) >= 0 ||
        dataUser.apellido.toLowCase().indexOf(search.toLowCase()) >= 0 ||
        dataUser.telefono.toLowCase().indexOf(search.toLowCase()) >= 0 ||
        dataUser.email.toLowCase().indexOf(search.toLowCase()) >= 0
    });

    usersFilter.push(users[i]);
    
  res.json(userFilter);
  return;
  } else {
    //HACER UN MODAL DE QUE NO HAY COICIDENCIAS
  }

  res.jason(users);
})




//logica filtrado con for


// router.get('/api/users', function (req, res) {
//   let search = req.query.search;
  
//   if (search && search.length > 0) {

//     let usersFilter = [];

//     for (let i = 0; i < users.length ; i++) {

//       if (users[i].name.indexOf(search) >= 0 
//       || users[i].surname.indexOf(search) >= 0
//       || users[i].email.indexOf(search) >= 0
//       || users[i].phone.indexOf(search) >= 0 ) {

//         usersFilter.push(users[i]);
//       }
//     }

//     res.json(usersFilter);
//     return;
//   } else {
//     //HACER UN MODAL DE QUE NO HAY COICIDENCIAS
//   }
  
//   res.jason(users)
// });
