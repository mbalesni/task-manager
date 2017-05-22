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

    /*************************************************
    *
    *              GET CURRENT TIME
    *
    **************************************************/

    var getDateTime = function() {
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
      return time;
    };

    /*************************************************
    *
    *              WELCOMING TASK
    *
    **************************************************/
    var again;
      do {
        var time = getDateTime();
        var welcomeTask = `<li class="task">
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
                <i class="glyphicon glyphicon-menu-hamburger"></i>
                <i class="glyphicon glyphicon-remove"></i>
              </div>
            </div>
            <div class="meta">
              <p id="date">Created on ${time}</p>
            </div>
        </li>`;
        $('.tasks-list').append(welcomeTask);
        again = false;
      } while (again == true);

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
            simpleStorage.set('tasks', $.trim(tasksList));
        })

        /*************************************************
        *
        *                     AUTOLOAD
        *
        **************************************************/

        var tasks = simpleStorage.get('tasks');
        var name = simpleStorage.get('login');
        //$('.tasks-list').html(tasks);

    /*************************************************
    *
    *                   ADD A TASK
    *
    **************************************************/

    $('#addTask').on('click', function() {
      var input = $(this).closest('.newTaskBlock').find('input'); //gets the input element
      var time = getDateTime();
      var newTask = `<li class="task">
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
              <i class="glyphicon glyphicon-menu-hamburger"></i>
              <i class="glyphicon glyphicon-remove"></i>
            </div>
          </div>
          <div class="meta">
            <p id="date">Created on ${time}</p>
          </div>
      </li>`;
      if (input.val() != '' ) {
        $('.tasks-list').append(newTaske);
        input.val('');
      } else {
        alert('Choose a name for your task!');
      }
      $('.task').find('#task-title').trigger('new');

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
    *
    *     I want the following functionality:
    *
    *     – on creating a new task, set #task-title width to fit its content
    *     - on clicking on #task-title, set it width to 100%
    *     - on #task-title blur, set its width to fit its content
    *
    *
    *
    *
    *
    **************************************************/

         $('.tasks-list').on('keydown', '#task-title', function (e) {
             var key = e.which;
             if(key == 13) {
                var newTitle = $(this).val();
                if (newTitle != '') {
                  $(this).blur();
                } else {
                  alert("Enter a name");

                };

              }
          });

    /*************************************************
    *
    *                 REMOVE TASK
    *
    **************************************************/

    $('.tasks-list').on('click', '.glyphicon-remove', function() {
      $(this).closest('.task').fadeOut(400).remove();
      var removeSnd = new Audio("sound/paper.mp3");
      removeSnd.play();
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
