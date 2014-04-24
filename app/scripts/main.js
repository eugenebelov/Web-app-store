var shopApp = angular.module('shopApp', ["directives.product"]);

shopApp.controller('shopController', function ($scope, $http) {
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