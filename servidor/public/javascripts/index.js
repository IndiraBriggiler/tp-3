var inputSearch = $('.inputSearch').val();

$.ajax('/api/users').done(function(data){
  for (let i = 0; i < data.length; i++) {
    $('.fillTable').append(`
      <tr
      id="user-${data[i].id}">
      <td>${data[i].name}</td>
      <td>${data[i].surname}</td>
      <td>${data[i].email}</td>
      <td>${data[i].phone}</td>
      <td><button class="btnEdit btn" id="edit"><a href="/users/edit?id=${data[i].id}"><i class="fas fa-pencil-alt"></i></a></button></td>
      <td><button class="btnDelete btn" id="delete"><i class="fas fa-trash-alt"></i></button></td>
      </tr>    
  `)
  }
})

$('.btnNewUser').on('click', function () {
  location.href = '/users/new'; 
})


$(document).on('click', '.btnDelete', function () {
  const theId = $(this).parent().attr('id');
  const container = $(this).parent();

  //CONFIRMACION DE LA ELIMINACION:
  $('.areYouShure').show();

  $('.btnCancelDelete').on('click', function () {
    $('.areYouShure').hide();
  })

  $('.btnDeleteUser').on('click', function () {
    
    $('.areYouShure').hide();
    
    $.ajax(`/api/users/${theId}`, {
    method: 'DELETE',
    success: function () {
      container.parent().remove();
    }

  });


  })

  

});



$('.btnSearch').on('click', function () {
  $('.fillTable').remove()
  console.log('eliminadas celdas')
  $.ajax('/api/users?search').done(function(data){ 

    for (var i = 0; i < data.length; i++){
    $('.fillTable').append(`
      <tr
      id="user-${data[i].id}">
      <td>${data[i].name}</td>
      <td>${data[i].surname}</td>
      <td>${data[i].email}</td>
      <td>${data[i].phone}</td>
      <td><button class="btnEdit btn" id="edit"><a href="/users/edit?id=${data[i].id}"><i class="fas fa-pencil-alt"></i></a></button></td>
      <td><button onclick="remove(${data[i].id})" class="btnDelete btn" id="delete"><i class="fas fa-trash-alt"></i></button></td>
      </tr>    
      `)
    }

  //   for (let i = 0; i < data.length; i++){
  //     if (inputSearch != data[i].name &&
  //       inputSearch != data[i].surname &&
  //       inputSearch != data[i].email &&
  //       inputSearch != data[i].phone ) {
  //         $(data[i].id).addClass('hidden');
  //     }
  //   }
  console.log('dentro del ajax')
  })
})

