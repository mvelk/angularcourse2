(function() {
  'use strict';
  angular.module("MenuApp")
  .component("categoriesList", {
    templateUrl: 'src/menu/templates/categoriesList.template.html',
    bindings: {
      categories: '<'
    }
  });
}());
