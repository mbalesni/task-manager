(function(){
  var app = angular.module('task-manager', []);


  app.controller('GlobalController', function() {

    this.lists =
    [
      {
        name: "Main", active: true
      },
      {
        name: "University", active: false
      },
      {
        name: "Products", active: false
      }
    ];

    this.listName = this.lists[0].name;

    this.getName = function(list) {
      var index = this.lists.indexOf(list);
      var listName = this.lists[index].name;
      this.listName = listName;
      console.log(listName);
    };

    this.tasks =
    [
      {
        name: "Wash the clothes", done: false, createdOn: Date.now()
      }
    ];

    this.addTask = function(){
      this.tasks.push({name:this.taskInput, done: false, createdOn: Date.now()});
      this.taskInput = '';
    };

    this.removeTask = function(task) {
      var index = this.tasks.indexOf(task);
      this.tasks.splice(index, 1);
    };

  });


})();
