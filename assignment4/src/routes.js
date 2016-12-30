(function() {
  'use strict';
  angular.module("MenuApp")
  .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function RoutesConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider.state('home', {
      url: '/',
      templateUrl: 'src/menu/templates/home.template.html',
    });

    $stateProvider.state('categoriesList', {
      url: '/categories',
      templateUrl: 'src/menu/templates/categories.template.html',
      controller: 'MenuController as menuCtrl',
      resolve: {
        categories: ['MenuDataService', function(MenuDataService) {
          return MenuDataService.getAllCategories().then(function(response) {
            return response.data;
          });
        }]
      }
    });

    $stateProvider.state('categoriesList.itemsList', {
      url: '/:categoryShortName/items',
      templateUrl: 'src/menu/templates/items.template.html',
      controller: 'CategoryController as categoryCtrl',
      resolve: {
        items: ['MenuDataService', '$stateParams', function(MenuDataService, $stateParams) {
          return MenuDataService.getItemsForCategory($stateParams.categoryShortName).then(function(response) {
            return { menuItems: response.data.menu_items, category: response.data.category };
          });
        }]
      }
    })

  };
}());
