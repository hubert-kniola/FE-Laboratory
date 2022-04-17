var nodeTodo = angular.module("nodeTodo", []);

function mainController($scope, $http) {
  $scope.formData = {};
  $scope.error= "";
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
  $scope.createTodos = function () {
    var text = $scope.formData;
    if(!angular.equals({}, text))
    {
      $scope.error = "";
      $http
      .post("/api/todos", $scope.formData)
      .success(function (data) {
        document.getElementById("newTodo").value = "";
        $scope.todos = data;
      })
      .error(function (data) {
        console.log("Error: " + data);
      });
    }
    else{
      console.log("Error: " + "Text is empty!");
      $scope.error = "Text is empty!";
    }
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
      .get("/api/done")
      .success(function (data) {
        $scope.todos = data;
      })
      .error(function (data) {
        console.log("Error: " + data);
      });
  };

  $scope.getTodo = function () {
    $http
      .get("/api/todo")
      .success(function (data) {
        $scope.todos = data;
      })
      .error(function (data) {
        console.log("Error: " + data);
      });
  };

  // update a todo after checking it
  $scope.updateTodos = function (id, done) {
    $http({
      method: "PATCH",
      url: "/api/todos/" + id,
      headers: {
        "Content-Type": "application/json",
      },
      data: { done: done },
    })
      .success(function (data) {
        $scope.todos = data;
      })
      .error(function (data) {
        console.log("Error: " + data);
      });
  };

  $scope.updateTodo = function (id, done) {
    $http({
      method: "PATCH",
      url: "/api/todo/" + id,
      headers: {
        "Content-Type": "application/json",
      },
      data: { done: done },
    })
      .success(function (data) {
        $scope.todos = data;
      })
      .error(function (data) {
        console.log("Error: " + data);
      });
  };

  $scope.reset = function() {
    $scope.formData = {};
    $scope.formData.$setPristine();
  }

  // delete a todo after checking it
  $scope.deleteTodos = function (id) {
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
