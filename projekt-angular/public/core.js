var nodeTodo = angular.module("nodeTodo", []);

function mainController($scope, $http) {
  $scope.formData = {};
  $scope.todos = [];

  // when landing on the page, get all todos and show them
  $http
    .get("/api/todos")
    .success(function (data) {
      $scope.todos = data;
    })
    .error(function (data) {
      console.log("Error: " + data);
    });

  // when submitting the add form, send the text to the node API
  $scope.createTodo = function () {
    $http
      .post("/api/todos", $scope.formData)
      .success(function (data) {
        document.getElementById("newTodo").value = "";
        $scope.todos = data;
      })
      .error(function (data) {
        console.log("Error: " + data);
      });
  };

  $scope.getAll = function () {
    $http
      .get("/api/todos")
      .success(function (data) {
        $scope.todos = data;
      })
      .error(function (data) {
        console.log("Error: " + data);
      });
  };

  $scope.getDone = function () {
    $http
      .get("/api/todos/done")
      .success(function (data) {
        $scope.todos = data;
      })
      .error(function (data) {
        console.log("Error: " + data);
      });
  };

  $scope.getTodo = function () {
    $http
      .get("/api/todos/todo")
      .success(function (data) {
        $scope.todos = data;
      })
      .error(function (data) {
        console.log("Error: " + data);
      });
  };

  // update a todo after checking it
  $scope.updateTodo = function (id) {
    $http
      .patch("/api/todos/" + id)
      .success(function (data) {
        $scope.todos = data;
      })
      .error(function (data) {
        console.log("Error: " + data);
      });
  };

  // delete a todo after checking it
  $scope.deleteTodo = function (id) {
    $http
      .delete("/api/todos/" + id)
      .success(function (data) {
        $scope.todos = data;
      })
      .error(function (data) {
        console.log("Error: " + data);
      });
  };
}
