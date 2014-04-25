'use strict';

var shopApp = angular.module('shopApp', ["directives.product"]);

shopApp.controller('shopController', function ($scope, $http) {
	$scope.totalItems = 64;
  	$scope.currentPage = 4;
  	$scope.cart = [];

	$http.get('scripts/data/menus.json').success(function(data) 
	{
		$scope.topMenu = data.topMenu;
		$scope.mainMenu = data.mainMenu;

		$scope.historyTitle = data.mainMenu[0].label;
	});

	$http.get('scripts/data/products.json').success(function(data) 
	{
		$scope.products = data.products;
	});

	$scope.changeHistoryTitle = function(label) 
	{
		$scope.historyTitle = label;
	}

	$scope.addToCart = function(id)
	{
		$scope.cart.push($scope.products[id]);
	}

	$scope.showShoppingCart = function(id)
	{
		console.log("showShoppingCart");
	}
});