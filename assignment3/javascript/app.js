(function(){
  "use strict";

  var app = angular.module("NarrowItDownApp", [])
    .controller("NarrowItDownController", NarrowItDownController)
    .service("MenuSearchService", MenuSearchService)
    .constant("ApiBasePath", "https://davids-restaurant.herokuapp.com")
    .directive("foundItems", FoundItemsDirective);



  MenuSearchService.$inject = ['$http', 'ApiBasePath'];
  function MenuSearchService($http, ApiBasePath) {
    var service = this;
    service.getMatchedMenuItems = function (searchTerm) {
      var promise = $http({
        method: "get",
        url: (ApiBasePath + "/menu_items.json")
      }).then(function(response){
          var menuItems = response.data.menu_items;
          if (searchTerm.length > 0) {
            return menuItems.filter(item => item.description.toLowerCase().indexOf(searchTerm) !== -1 || item.name.toLowerCase().indexOf(searchTerm) !== -1);
          } else {
            return menuItems;
          }
        })
        .catch(function(error){
          console.log(error);
        });
      return promise;
    };
  };

  NarrowItDownController.$inject = ['MenuSearchService']
  function NarrowItDownController(MenuSearchService) {
    var narrow = this;
    narrow.foundItems = [];
    narrow.searchTerm = "";
    narrow.lastRemoved = "";
    narrow.updateFilterItems = function(searchTerm){
      MenuSearchService.getMatchedMenuItems(searchTerm).then(function(result) {
        narrow.foundItems = result;
      });
      narrow.searchTerm = "";
    };

    narrow.removeItem = function(itemIdx){
      narrow.lastRemoved = narrow.foundItems[itemIdx].name;
      narrow.foundItems = [
        ...narrow.foundItems.slice(0, itemIdx),
        ...narrow.foundItems.slice(itemIdx + 1)
      ];
    };
  };

  function FoundItemsDirective() {
    var ddo = {
      templateUrl: "foundItems.html",
      scope: {
        found: '<myFound',
        onRemove: '&'
      }
    };
    return ddo;
  }

})();
