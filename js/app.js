$(document).ready(function() {

/*************************************************
*
*              ON DOCUMENT READY
*
**************************************************/
    var again;

    do {
      var d = new Date();
      if (d.getMinutes() <= 9) {
        var minutes = "0" + d.getMinutes();
      } else {
        var minutes = d.getMinutes();
      };
      if (d.getHours() <= 9) {
        var hours = "0" + d.getHours();
      } else {
        var hours = d.getHours();
      };
      var monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
      var time = monthArray[d.getMonth()] + " " + d.getDate() + " " + hours + ":" + minutes;
      var newItem = `<li class="item">
          <div class="first-line">

            <div class="item-content">
              <div class="tick-box">
                <i class="glyphicon glyphicon-ok"></i>
              </div>

              <div class="item-name">
                <span class="item-title">Welcome, Kate!</span>
                <input id="renameField" type="text">
              </div>
            </div>

            <div class="item-ctrl">
              <i class="glyphicon glyphicon-pencil"></i>
              <i class="glyphicon glyphicon-remove"></i>
            </div>

          </div>

          <div class="meta">
            <p id="date">Created on ${time}</p>
          </div>

      </li>`;
      $('.list').append(newItem);
      again = false;
    } while (again == true);


    /*************************************************
    *
    *                 SIGN-IN FORM
    *
    **************************************************/

    $('.sign-in-modal').on('click', '.sign-in-btn', function() {
      var login = $('.login').find('.field').val();
      var password = $('.password').find('.field').val();
      if (
          login == 'elina' && password == '12345' ||
          login == 'nikita' && password == '123' ||
          login == 'vlad' && password == '1234' ||
          login == 'kate' && password == '12345'
        ) {
        $(this).closest('.sign-in-modal').delay(800).hide({queue:true, duration: 1});
        $(this).closest('body').find('.overlay').delay(800).hide({queue:true, duration: 1});

      } else {
        $('.alert').addClass('visible-alert');
        $('.login').find('.field').val('');
        $('.password').find('.field').val('');
      };
    });

    $('.password .field').keypress(function (e) {
       var key = e.which;
       if(key == 13) {
          $('.sign-in-btn').trigger('click');
          $(this).blur();
        }
     });

     $('.login .field').keypress(function (e) {
        var key = e.which;
        if(key == 13) {
           $('.sign-in-btn').trigger('click');
           $(this).blur();
         }
      });

    /*************************************************
    *
    *                 LOCAL STORAGE
    *
    **************************************************/

        /*************************************************
        *
        *                     SAVE
        *
        **************************************************/

        $(document).on('click', function() {
            var list = $('.list').html();
            //var signIn = $('.sign-in-modal').html();
            //var overlay = $('.overlay').html();
            simpleStorage.set('tasks', $.trim(list));
            //simpleStorage.set('signed', $.trim(signIn));
            //simpleStorage.set('overlayed', $.trim(overlay));

        })



        /*************************************************
        *
        *                     LOAD
        *
        **************************************************/
        //var signIn = simpleStorage.get('signed');
        //var overlay = simpleStorage.get('overlayed');
        var items = simpleStorage.get('tasks');
        //$('.sign-in-modal').html(signIn);
        //$('.overlay').html(overlay);
        $('.list').html(items);




    /*************************************************
    *
    *                 ADD LIST ITEM
    *
    **************************************************/


    /*

    */


    $('#addItem').on('click', function() {
      var input = $(this).closest('.newItemBlock').find('input'); //gets the input element
      var d = new Date();
      if (d.getMinutes() <= 9) {
        var minutes = "0" + d.getMinutes();
      } else {
        var minutes = d.getMinutes();
      };
      if (d.getHours() <= 9) {
        var hours = "0" + d.getHours();
      } else {
        var hours = d.getHours();
      };
      var monthArray = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "July", "Aug", "Sep", "Oct", "Nov", "Dec"];
      var time = monthArray[d.getMonth()] + " " + d.getDate() + " " + hours + ":" + minutes;
      var item = `<li class="item">
          <div class="first-line">

            <div class="item-content">
              <div class="tick-box">
                <i class="glyphicon glyphicon-ok"></i>
              </div>

              <div class="item-name">
                <span class="item-title">${input.val()}</span>
                <input id="renameField" type="text">
              </div>
            </div>

            <div class="item-ctrl">
              <i class="glyphicon glyphicon-pencil"></i>
              <i class="glyphicon glyphicon-remove"></i>
            </div>

          </div>

          <div class="meta">
            <p id="date">Created on ${time}</p>
          </div>

      </li>`;

      if (input.val() != '' ) {
        $('.list').append(item);
        input.val('');
      } else {
        alert('Choose a name for your task!');
      }
    });

    // click addItem button when enter is pressed
    $('#newItem').keypress(function (e) {
       var key = e.which;
       if(key == 13) {
          $('#addItem').trigger('click');
          return false;
        }
     });

    /*************************************************
    *
    *                 CHECK LIST ITEM
    *
    **************************************************/

    // check item when button is clicked
    $('.list').on('click', '.tick-box', function() {
      $(this).closest('.first-line').find('.item-title').toggleClass('checked');
      $(this).find('.glyphicon-ok').toggleClass('visible');
      if ($(this).closest('.item').find('.item-title').hasClass('checked')) {
        var snd = new Audio("sound/paper.mp3");
        snd.play();
      }

    });


    /*************************************************
    *
    *                 RENAME LIST ITEM
    *
    **************************************************/

      $('.list').on('click', '.glyphicon-pencil', function() {
        $(this).closest('.first-line').find('#renameField').toggleClass('visible');
        $(this).closest('.item').toggleClass('hovered');
        var oldTitle = $(this).closest('.first-line').find('.item-title').text();
        var inputField = $(this).closest('.first-line').find('#renameField');
        var firstLineWidth = $(this).closest('.first-line').width();
        var ctrlWidth = $(this).closest('.item-ctrl').width();

        inputField.width(firstLineWidth - 2 * ctrlWidth);
        inputField.val(oldTitle);
        inputField.focus();




       });

         $('.list').on('keydown', '.item #renameField', function (e) {
             var key = e.which;
             if(key == 13) {
                var newTitle = $(this).val();
                if (newTitle != '') {
                  $(this).trigger('close');
                  $(this).removeClass('visible');
                  $(this).closest('.item').removeClass('hovered');
                  $(this).closest('.first-line').find('.item-title').text(newTitle);
                  $(document).trigger('click');
                } else {
                  $(this).removeClass('visible');
                  $(this).closest('.item').removeClass('hovered');

                };

              }
          });


          $(".list").on('blur', '#renameField', function() {
            var newTitle = $(this).val();
            if (newTitle != '') {
              $(this).removeClass('visible');
              $(this).closest('.item').removeClass('hovered');
              $(this).closest('.first-line').find('.item-title').text(newTitle);
              $(document).trigger('click');
            } else {
              $(this).removeClass('visible');
              $(this).closest('.item').removeClass('hovered');

            };
          });








    /*************************************************
    *
    *                 REMOVE LIST ITEM
    *
    **************************************************/

    $('.list').on('click', '.glyphicon-remove', function() {
      $(this).closest('.item').remove();

    });

    /*************************************************
    *
    *                   SORTABLE
    *
    **************************************************/


    $( ".list" ).sortable({
      axis: "y",
      containment: ".list-box",
      distance: 5
    });


});
