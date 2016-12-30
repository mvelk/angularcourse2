(function() {
  'use strict';
  angular.module("MenuApp")
  .controller("MenuController", MenuController);

  MenuController.$inject = ['MenuDataService', 'categories'];
  function MenuController (MenuDataService, categories) {
    var menu = this;
    menu.categories = categories;
  };
}());
