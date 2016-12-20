(function(){
  var app = angular.module("Assignment1App", []);

  app.controller("AppController", ['$scope', function($scope){
    $scope.message = "";
    $scope.dishes = "";
    $scope.checkIfTooMuch = function(dishes){
      $scope.message = dishes.split(",").length > 3 ? "too much" : "just right!";
    };
  }]);

})();
