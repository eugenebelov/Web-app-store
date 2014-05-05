'use strict';

var shopApp = angular.module('shopApp', ['directives.product', 'ngRoute', 'ui.bootstrap']);

shopApp.config(['$routeProvider', '$locationProvider',
	function($routes, $location) {

		$location.hashPrefix('!');

		$routes
			.when('/', {
			templateUrl: '/views/main/',
			pageindex: 0
		})
			.when('/about/', {
				templateUrl: '/views/about/',
				pageindex: 1
			})
		.when('/shop/', {
			templateUrl: '/views/shop/',
			controller: 'ShopController',
			pageindex: 2
		})
		.when('/contact/', {
			templateUrl: '/views/contacts/',
			pageindex: 3
		})
		.when('/view-cart/', {
			templateUrl: '/views/shopping-cart/',
			controller: 'ShopController',
			pageindex: 3
		})
		.otherwise({
			redirectTo: '/!#'
		});
}]);

shopApp.controller('ApplicationController', ['$scope', '$http', '$route', 
	function ($scope, $http, $route) 
	{
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

		$http.get('scripts/data/products-in-cart.json').success(function(data) 
		{
			$scope.cart = data.inCart;
		});

		$scope.changeHistoryTitle = function(label) 
		{
			$scope.historyTitle = label;
		}

		$scope.addToCart = function(id)
		{
			$scope.cart.push($scope.products[id]);
		}
}]);

shopApp.controller('ShopController', ['$scope', '$http', '$modal', 
	function ($scope, $http, $modal) 
	{
		$scope.items = ['item1', 'item2', 'item3'];

		$scope.sendOrder = function() 
		{
			console.log("open modal dialog");

			var modalInstance = $modal.open({
	      templateUrl: 'views/modals/finishCheckoutPopup.html',
	      controller: 'ModalInstanceCtrl',
	      size: '',
	      resolve: {
	        items: function () {
	          return $scope.items;
	        }
	      }
	    });

	    modalInstance.result.then(function (selectedItem) {
	      $scope.selected = selectedItem;
	    }, function () {
	      
	    });
		}

		$scope.deleteItemFromCart = function(id)
		{
			angular.forEach($scope.cart, function(value, key) {
				removeItem(value, key, id);
			});
		}

		function removeItem(value, index, removedId) {
			if(value.id == removedId) {
				$scope.cart.splice(index, 1);
			}
		}
}]);

shopApp.controller('ModalInstanceCtrl',
	function ($scope, $modalInstance, items) 
	{
	  $scope.items = items;
	  $scope.selected = {
	    item: $scope.items[0]
	  };

	  $scope.ok = function () {
	    $modalInstance.close($scope.selected.item);
	  };

	  $scope.cancel = function () {
	    $modalInstance.dismiss('cancel');
	  };
});

