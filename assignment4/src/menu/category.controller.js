(function() {
  'use strict';
  angular.module("MenuApp")
  .controller("CategoryController", CategoryController);

  CategoryController.$inject = ['MenuDataService', 'items'];
  function CategoryController (MenuDataService, items) {
    var category = this;
    category.items = items;
  };
}());
