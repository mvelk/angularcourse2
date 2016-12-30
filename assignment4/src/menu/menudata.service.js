(function() {
  'use strict';
  angular.module("data")
  .service("MenuDataService", MenuDataService)
  .constant("baseApiPath", "https://davids-restaurant.herokuapp.com");

  MenuDataService.$inject = ['$http', 'baseApiPath'];

  function MenuDataService($http, baseApiPath) {
    var menuData = this;
    menuData.getAllCategories = function() {
      var response = $http({
        method: "GET",
        url: `${baseApiPath}/categories.json`
      });
      return response;
    };

    menuData.getItemsForCategory = function(categoryShortName) {
      var response = $http({
        method: "GET",
        url: `${baseApiPath}/menu_items.json`,
        params: {
          category: categoryShortName
        }
      });
      return response;
    };
  };
}());
