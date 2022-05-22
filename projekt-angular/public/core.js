var nodeTodo = angular.module("nodeTodo", []);

function mainController($scope, $http) {
  $scope.formData = {};
  $scope.error = "";
  $scope.todos = [];
  $scope.activeTab = "";

  // when landing on the page, get all todos and show them
  $http
    .get("/api/todos")
    .success(function (data) {
      $scope.todos = data;
    })
    .error(function (data) {
      console.log("Error: " + data);
    });

  $scope.changeTab = function (tab) {
    $scope.activeTab = tab;
  };

  $scope.getCorrectResponse = function (data) {
    switch ($scope.activeTab) {
      case "All":
        return data;
      case "Todo":
        return data.filter((todo) => todo.done === false);
      case "Done":
        return data.filter((todo) => todo.done === true);
      default:
        break;
    }
  };

  // when submitting the add form, send the text to the node API
  $scope.createTodos = function () {
    var text = $scope.formData;
    if (!angular.equals({}, text)) {
      $scope.error = "";
      $http
        .post("/api/todos", $scope.formData)
        .success(function (data) {
          document.getElementById("newTodo").value = "";
          $scope.todos = getCorrectResponse(data);
        })
        .error(function (data) {
          console.log("Error: " + data);
        });
    } else {
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

  $scope.updateDone = function (id, done) {
    $http({
      method: "PATCH",
      url: "/api/done/" + id,
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

  $scope.reset = function () {
    $scope.formData = {};
    $scope.formData.$setPristine();
  };

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

  $scope.deleteDone = function (id) {
    $http
      .delete("/api/done/" + id)
      .success(function (data) {
        $scope.todos = data;
      })
      .error(function (data) {
        console.log("Error: " + data);
      });
  };

  $scope.deleteTodo = function (id) {
    $http
      .delete("/api/todo/" + id)
      .success(function (data) {
        $scope.todos = data;
      })
      .error(function (data) {
        console.log("Error: " + data);
      });
  };
}
