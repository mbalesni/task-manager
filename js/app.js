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

    /*************************************************************************
    *
    *              WELCOMING TASK
    *
    **************************************************************************/
    var again;
      do {
        var time = getDateTime();
        var welcomeTask = `<li class="task Main">
            <div class="first-line">
              <div class="task-content">
                <div class="tick-box">
                  <img class="icon-checked" src="images/icon-checked.png">
                </div>
                <div class="task-title">
                  <input id="task-title" type="text" value="Welcome to MyToDo!">
                </div>
              </div>
              <div class="task-ctrl">
                <img class="icon-hamburger" src="images/icon-hamburger.png">
                <i class="fa fa-trash-o"></i>
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
            var listsCollection = $('.lists-collection').html();
            var currentListName = $('.current-list').find('#list-title').text();
            var tasksList = $('.tasks-list').html();
            simpleStorage.set('tasks', $.trim(tasksList));
            simpleStorage.set('currentList', currentListName);
            simpleStorage.set('lists', $.trim(listsCollection));
        });

        /*************************************************
        *
        *                     AUTOLOAD
        *
        **************************************************/
        var lists = simpleStorage.get('lists')
        var tasks = simpleStorage.get('tasks');
        var currentListName = simpleStorage.get('currentList');
        //$('.tasks-list').html(tasks);
        $('.listHeader').find('h1').text(currentListName);
        $('.lists-collection').html(lists);

    /*************************************************
    *
    *                  CHOOSE LIST
    *
    **************************************************/

    // CHANGE HEADER NAME TO CURRENT LIST'S NAME AND ADD HOVER STATE
    $('.lists-collection').on('click', '.list', function() {
      var listName = $(this).find('#list-title').text();
      $('.list').removeClass('current-list');
      $(this).addClass('current-list');
      $('.listHeader').find('h1').text(listName);
      console.log(`Current list's name is ${listName}`);
      $('.tasks-list').find('.task').addClass('invisible');
      $('.tasks-list').find(`.${listName}`).removeClass('invisible');
    });






    /*************************************************
    *
    *                   ADD A TASK
    *
    **************************************************/

    $('#addTask').on('click', function() {
      var input = $(this).closest('.newTaskBlock').find('input'); //gets the input element
      var time = getDateTime();
      var currentList = simpleStorage.get('currentList');
      var newTask = `<li class="task ${currentList}">
          <div class="first-line">
            <div class="task-content">
            <div class="tick-box">
              <img class="icon-checked" src="images/icon-checked.png">
            </div>
              <div class="task-title">
                <input id="task-title" type="text" value="${input.val()}">
              </div>
            </div>
            <div class="task-ctrl">
              <img class="icon-hamburger" src="images/icon-hamburger.png">
              <i class="fa fa-trash-o"></i>
            </div>
          </div>
          <div class="meta">
            <p id="date">Created on ${time}</p>
          </div>
      </li>`;
      if (input.val() != '' ) {
        $('.tasks-list').append(newTask);
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
      $(this).find('.icon-checked').toggleClass('visible');
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

    $('.tasks-list').on('click', '.fa-trash-o', function() {
      $(this).closest('.task').fadeOut(400, function(){ $(this).remove(); });
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
      distance: 5,
      update: function( event, ui ) {
        var tasks = $('.tasks-list').html();
        simpleStorage.set('tasks', $.trim(tasks));

      }
    });
    $('.lists-collection').sortable({
      axis: "y",
      containment: ".lists-box",
      distance: 5,
      update: function( event, ui ) {
        var listsCollection = $('.lists-collection').html();
        simpleStorage.set('lists', $.trim(listsCollection));
      }
    });
});
