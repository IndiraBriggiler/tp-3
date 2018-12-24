$('.btnSave').on('click', function () {
  
  var name = $('input[name="name"]').val();
  var surname = $('input[name="surname"]').val();
  var email = $('input[name="email"]').val();
  var phone = $('input[name="phone"]').val();

  var newUser = {
    name: name,
    surname: surname,
    email: email,
    phone: phone
  }

  createUser(newUser);

  $.ajax('/api/users', {
    method: 'POST',
    data: newUser,
    success: function () {
      $('.newUserModal').modal({show:true});

      $('.btnClose').on('click', function () {
        location.href = '/users';   
      })

      $('.btnFillNew').on('click', function () {
        location.href = '/users/new';   
      })
    }
  })
});


$('.btnCancel').on('click', function () {
  $('.cancelNewUserModal').modal({show:true});
  $('.btnDontSave').on('click', function () {
    location.href = '/users'; 
  })
})

function createUser(newUser) {

  let name = newUser.name;
  let surname = newUser.surname;
  let email = newUser.email;
  let phone = newUser.phone;
 
  if( (name && name.trim()!=='')
  && (surname && surname.trim()!=='')
  && (email && email.trim()!=='')
  && (phone && phone.trim()!=='') ) {

    console.log('todos los datos ingresados')
    if( validateEmail(email) ){
      if (name.length > 30) {
        $('.mwName').removeClass('hidden');
        setTimeout( function () {
          $('.mwName').addClass('hidden');
        }, 1200)
      } 
      if (surname.length > 30) {
        $('.mwSurame').removeClass('hidden');
        setTimeout( function () {
          $('.mwSurname').addClass('hidden');
        }, 1200)
      } 
       if (validatePhone(phone) == false) {
        $('.mwPhone').removeClass('hidden'); 
        setTimeout( function () {
          $('.mwPhone').addClass('hidden');
        }, 1200)
      }
    } else {
      $('.mwAll').removeClass('hidden');
      setTimeout( function () {
        $('.mwAll').addClass('hidden');
      }, 1200)
    }
  }
}
 
function validateEmail(email) {
  var emailValidation = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailValidation.test(email.toLowerCase());
}

function validatePhone (phone) {
  var phoneValidation = /^(\()?[2-9]{1}\d{2}.(\))?(-|\s)?\d{3}(-|\s)\d{4}$/;
  return phoneValidation.test(phone);
}




// function validatePhone (phone) {
//   var phoneValidation = /^(\()?[2-9]{1}\d{2}.(\))?(-|\s)?\d{3}(-|\s)\d{4}$/;
//   return isNaN(phone.join(""));
// }

// cambiar en la validacion false por true