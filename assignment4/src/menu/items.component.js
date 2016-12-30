(function() {
  'use strict';
  angular.module("MenuApp")
  .component("itemsList", {
    templateUrl: "src/menu/templates/itemsList.template.html",
    bindings: {
      items: "<"
    }
  });
}());
