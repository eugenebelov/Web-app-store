'use strict';

angular.module('directives.product', [])

.directive('productView', function() {    
  return {
    restrict: 'E',
    scope: {
    	itemData: '=',
    	moveToCart: '&'
    },
    controller: function($scope, $element, $attrs) {
    	$scope.buyProduct = function (id) {
    		$scope.moveToCart(id);
    	}
    },
    link: function (scope, iElement, iAttrs) {

    },
    template:
      '<a><span class="onsale" ng-show={{itemData.sale.isSale}}>{{itemData.sale.quantity}}</span>'+
      '<img src="{{itemData.thumb}}" alt="" width="150" height="150">'+
      '<h4>{{itemData.label}}</h4>'+
      '</a>'+
      '<div class="descr">{{itemData.description}}</div>'+
      '<span class="price">{{itemData.price}}</span>'+
      '<a id="buy{{itemData.id}}" class="btn btn-danger pull-right" ng-click="buyProduct(itemData.id)">Купить</a>'
  };
})

.directive('shoppingCartView', function() {    
  return {
    restrict: 'E',
    controller: function($scope, $element, $attrs) {
    	$scope.buyProduct = function (id) {
    		$scope.moveToCart(id);
    	}
    },
    link: function (scope, iElement, iAttrs) {

    },
    template:
      '<div>cart item view</div>'
  };
});