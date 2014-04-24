var shopApp = angular.module('ShopApp', ["ShopApp.directives"]);

shopApp.controller('ShopController', function ($scope, $http) {
  $http.get('scripts/data/menus.json').success(function(data) {
    $scope.topMenu = data.topMenu;
    $scope.mainMenu = data.mainMenu;

    $scope.historyTitle = data.mainMenu[0].label;
  });

  $http.get('scripts/data/products.json').success(function(data) {
    $scope.products = data.products;
  });

  $scope.changeHistoryTitle = function(label) {
  	$scope.historyTitle = label;
  }
});