'use strict';

var shopApp = angular.module('shopApp', ['directives.product', 'ngRoute', 
	'ui.bootstrap']);

shopApp.config(['$routeProvider', '$locationProvider',
	function($routes, $location) {

		$location.hashPrefix('!');

		$routes
			.when('/', {
			templateUrl: 'views/main/',
			pageindex: 0
		})
		.when('/about/', {
				templateUrl: 'views/about/',
				pageindex: 1
		})
		.when('/shop/', {
			templateUrl: 'views/shop/',
			controller: 'ShopController',
			pageindex: 2
		})
		.when('/shop/page/:pageid', {
			templateUrl: 'views/shop/',
			controller: 'ShopController',
			pageindex: 3
		})
		.when('/contact/', {
			templateUrl: 'views/contacts/',
			pageindex: 4
		})
		.when('/view-cart/', {
			templateUrl: 'views/shopping-cart/',
			controller: 'ShopController',
			pageindex: 5
		})
		.otherwise({
			redirectTo: '/'
		});
}]);

shopApp.controller('ApplicationController', ['$scope', '$http', '$route', 
	function ($scope, $http, $route) 
	{
		$scope.cart = [];
		$scope.productsModel = [];

		$http.get('scripts/data/menus.json').success(function(data) 
		{
			$scope.topMenu = data.topMenu;
			$scope.mainMenu = data.mainMenu;
			$scope.historyTitle = data.mainMenu[0].label;
		});

		$http.get('scripts/data/products.json').success(function(data) 
		{
			$scope.productsModel = data.products;
		});

		$http.get('scripts/data/products-in-cart.json').success(function(data) 
		{
			$scope.cart = data.inCart;
		});

		$scope.changeHistoryTitle = function(label) 
		{
			$scope.historyTitle = label;
		}
}]);

shopApp.controller('ShopController', ['$scope', '$http', '$modal', '$route', '$location',
	function ($scope, $http, $modal, $route, $location) {
		$scope.totalItems = 12;
		$scope.itemsPerPage = 4;
  	$scope.currentPage = 1;
  	$scope.products = [];

  	$scope.$on('$routeChangeSuccess', function(event) {
  		$scope.currentPage = $route.current.params.pageid;

  		if($scope.currentPage == undefined) {
  			$scope.products = $scope.productsModel.slice(0, $scope.itemsPerPage);
  		} else {
  			$scope.products = $scope.productsModel.slice(($scope.currentPage - 1) * $scope.itemsPerPage, (($scope.currentPage - 1) * $scope.itemsPerPage) + $scope.itemsPerPage);
  		}
  	});

  	$scope.pageChanged = function() {
	    $location.url("/shop/page/" + $scope.currentPage);
	  };

		$scope.getProductFromCartById = function(id_product) {
			var _products = null;
			for (var j = 0; j < $scope.cart.length; j++) {
				if($scope.cart[j].id === id_product) {
					_products = $scope.cart[j];
					break; 
				}
			}

			return _products;
		}

		$scope.totalCost = function() {
			var totalPrice = 0;
			for (var i = 0; i < $scope.cart.length; i++) {
				totalPrice += $scope.cart[i].quantity * $scope.cart[i].price;
			};

			return totalPrice;
		}

		$scope.changeQuantityEvent = function(prodId) {
			var _product = $scope.getProductFromCartById(prodId);
			_product.quantity = this.product.quantity;
		}

		$scope.addToCart = function(id) {
			for (var i = 0; i < $scope.products.length; i++) {
				if($scope.products[i].id === id) {
					var hasItemInCart = false;
					var cartItem = null;
					for (var j = 0; j < $scope.cart.length; j++) {
						if($scope.cart[j].id === id) {
							hasItemInCart = true;
							cartItem = $scope.cart[j];
							break;
						} else {
							hasItemInCart = false;
						}
					};

					if(hasItemInCart) {
						 cartItem.quantity++
					} 
					else {
						$scope.products[i].quantity = 1;
						$scope.cart.push($scope.products[i]);
					}
				}
			};
		}

		$scope.sendOrder = function() {
			var modalInstance = $modal.open({
		      	templateUrl: 'views/modals/finish-checkout-popup.html',
		      	controller: 'ModalInstanceCtrl',
		      	size: '',
		      	resolve: {
		        items: function () {
		          // return $scope.items;
		        }
		      }
		    });

		    modalInstance.result.then(function (selectedItem) {
		      $scope.selected = selectedItem;
		  	});
		}

		$scope.deleteItemFromCart = function(id) {
			$scope.cart.splice(id, 1);
		}

}]);

shopApp.controller('ModalInstanceCtrl',
	function ($scope, $modalInstance, items) 
	{
	  // $scope.items = items;
	  $scope.selected = {
	    // item: $scope.items[0]
	  };

	  $scope.ok = function () {
	    $modalInstance.close(); //$scope.selected.item
	  };

	  $scope.cancel = function () {
	    $modalInstance.dismiss('cancel');
	  };
});

