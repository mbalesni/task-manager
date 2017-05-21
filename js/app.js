/*************************************************
*
*              KEY NUMBERS
*
*
*     enter – 13
*     backspace – 8
*     command – 91
*     shift – 16
*     option – 18
*     control – 17
*
*
*
*
**************************************************/



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
      var newTask = `<li class="task">
          <div class="first-line">

            <div class="task-content">
              <div class="tick-box">
                <i class="glyphicon glyphicon-ok"></i>
              </div>

              <div class="task-title">
                <input id="task-title" type="text" value="Welcome to MyToDo!">
              </div>
            </div>

            <div class="task-ctrl">
              <i class="glyphicon glyphicon-remove"></i>
            </div>

          </div>

          <div class="meta">
            <p id="date">Created on ${time}</p>
          </div>

      </li>`;
      $('.tasks-list').append(newTask);
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
          login == 'kate' && password == '12345' ||
          login == 'a' && password == '' ||
          login == 'public' && password ==''
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
        *                     AUTOSAVE
        *
        **************************************************/

        $(document).on('click', function() {
            var tasksList = $('.tasks-list').html();
            //var signIn = $('.sign-in-modal').html();
            //var overlay = $('.overlay').html();
            simpleStorage.set('tasks', $.trim(tasksList));
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
        var tasks = simpleStorage.get('tasks');
        var name = simpleStorage.get('login');
        //$('.sign-in-modal').html(signIn);
        //$('.overlay').html(overlay);
        $('.tasks-list').html(tasks);




    /*************************************************
    *
    *                 ADD A TASK
    *
    **************************************************/


    $('#addTask').on('click', function() {
      var input = $(this).closest('.newTaskBlock').find('input'); //gets the input element
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
      var task = `<li class="task">
          <div class="first-line">

            <div class="task-content">
              <div class="tick-box">
                <i class="glyphicon glyphicon-ok"></i>
              </div>

              <div class="task-title">
                <input id="task-title" type="text" value="${input.val()}">
              </div>
            </div>

            <div class="task-ctrl">
              <i class="glyphicon glyphicon-remove"></i>
            </div>

          </div>

          <div class="meta">
            <p id="date">Created on ${time}</p>
          </div>

      </li>`;

      if (input.val() != '' ) {
        $('.tasks-list').append(task);
        input.val('');
      } else {
        alert('Choose a name for your task!');
      }
    });

    // click addTask button when enter is pressed
    $('#newTask').keypress(function (e) {
       var key = e.which;
       if(key == 13) {
          $('#addTask').trigger('click');
          return false;
        }
     });

    /*************************************************
    *
    *                 CHECK TASK
    *
    **************************************************/

    // check task when button is clicked
    $('.tasks-list').on('click', '.tick-box', function() {
      $(this).closest('.first-line').find('#task-title').toggleClass('checked');
      $(this).find('.glyphicon-ok').toggleClass('visible');
      if ($(this).closest('.task').find('#task-title').hasClass('checked')) {
        var crossSnd = new Audio("sound/crossed2.wav");
        crossSnd.play();
      }

    });


    /*************************************************
    *
    *                 RENAME TASK
    *
    **************************************************/

         $('.tasks-list').on('keydown', '#task-title', function (e) {
             var key = e.which;
             if(key == 13) {
                var newTitle = $(this).val();
                if (newTitle != '') {
                  $(this).blur();
                  $(document).trigger('click');
                } else {
                  alert("Enter a name");

                };

              }
          });

          /*************************************************
          *
          *                 DYNAMIC RESIZING
          *
          **************************************************/

          // make a fix for when it exceeds 600px

          $('.tasks-list').on('keydown', '#task-title', function() {
            var oldWidth = $(this).width();
            function resizeInput() {
              if ($(this).width() < 600) {
                $(this).attr('size', $(this).val().length);
              } else {
                $(this).width(599);
                $(this).attr('size', $(this).val().length);
              };
            };
            $(this).keyup(resizeInput).each(resizeInput);

          });










    /*************************************************
    *
    *                 REMOVE TASK
    *
    **************************************************/

    $('.tasks-list').on('click', '.glyphicon-remove', function() {
      $(this).closest('.task').fadeOut(400).remove();

    });

    /*************************************************
    *
    *                   SORTABLE
    *
    **************************************************/


    $( ".tasks-list" ).sortable({
      axis: "y",
      containment: ".tasks-box",
      distance: 5
    });


});
