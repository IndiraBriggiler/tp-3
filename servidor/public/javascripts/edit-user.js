const urlParams = new URLSearchParams(window.location.search);
const theId = urlParams.get('id');

$.ajax('/api/users/' + theId, {
  method: 'GET',
  success: function (data) {
      $('.editUser').append(`
      <form>
      <div class="form-group">
        <label for="formGroupExampleInput">Nombre</label>
        <input type="text" class="form-control" id="" name="name" value=" ${data.name}">
      </div> 
      <div class="form-group">
        <label for="formGroupExampleInput">Apellido</label>
        <input type="text" class="form-control" id="" name="name" value=" ${data.surname}">
      </div> 
      <div class="form-group">
        <label for="formGroupExampleInput">Email</label>
        <input type="text" class="form-control" id="" name="name" value=" ${data.emanil}">
      </div> 
      <div class="form-group">
        <label for="formGroupExampleInput">Teléfono</label>
        <input type="text" class="form-control" id="" name="name" value=" ${data.phone}">
      </div> 
      <div>
      <button type="button" class="btn btn-primary saveChanges">Guardar Cambios</button>
      </div>
      </form>   
      `)
  }
})
 

$('body').on('click', '.saveChanges', function () {
  //CREO VARIABLES PARA LO QUE VOY A REEMPLAZAR EN DATA PARA PODER VALIDAR
  let name = $('input[name="name"]').val();
  let surname = $('input[name="surname"]').val();
  let email = $('input[name="email"]').val();
  let phone = $('input[name="phone"]').val();

  if( (name && name.trim()!=='')
  && (surname && surname.trim()!=='')
  && (email && email.trim()!=='')
  && (phone && phone.trim()!=='') ) {
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
  
  $.ajax('/api/users/' + id, {
    method: 'PUT',
    data : {
      name: name,
      surname: surname,
      email: email,
      phone: phone
    },
    success: function () {
      $('.editUserModal').modal({show:true});
      $('.btnCloseEdit').on('click', function () {
        location.href = '/users';
      })
    }
  })
})



