(function() {
  "use strict";
  var app = angular.module("ShoppingListCheckOff", [])
    .controller("ToBuyController", ToBuyController)
    .controller("AlreadyBoughtController", AlreadyBoughtController)
    .service("ShoppingListCheckOffService", ShoppingListCheckOffService);

  ToBuyController.$inject = ["ShoppingListCheckOffService"];
  function ToBuyController(ShoppingListCheckOffService) {
    var toBuy = this;

    toBuy.items = ShoppingListCheckOffService.getItemsToBuy();
    toBuy.buyItem = function(item) {
      ShoppingListCheckOffService.buyItem(item);
    };
  };

  AlreadyBoughtController.$inject = ["ShoppingListCheckOffService"];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var alreadyBought = this;
    alreadyBought.items = ShoppingListCheckOffService.getItemsAlreadyBought();

  };

  function ShoppingListCheckOffService() {
    var service = this;

    var itemsToBuy = ['Cookies', 'Orange Juice', 'Coffee', 'Perfect Bars'];
    var itemsAlreadyBought = [];

    service.buyItem = function(item) {
      var itemIndex = itemsToBuy.indexOf(item);
      if (itemIndex === -1) {
        throw new Error("Purchased item not on to-buy list!");
      } else {
        itemsAlreadyBought.push(item);
        itemsToBuy.splice(itemIndex, 1);
      }
    };

    service.getItemsToBuy = function() {
      return itemsToBuy;
    }

    service.getItemsAlreadyBought = function() {
      return itemsAlreadyBought;
    }

  };
})();
