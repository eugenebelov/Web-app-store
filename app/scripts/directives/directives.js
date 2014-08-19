'use strict';

angular.module('directives.product', [])

.directive('product', function() {    
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
    link: function (scope, elem, attr) {
      
    },
    
    templateUrl: './views/shop/template/productView.html'
  };
})

.directive('number', function() {    
  return {
    require: '?ngModel',
    restrict: 'A',
    link: function(scope, element, attrs, ngModelCtrl) {
      if(!ngModelCtrl) {
        return; 
      }

      ngModelCtrl.$parsers.push(function(val) {
        var clean = val.replace( /[^0-9]+/g, '');
        if (val !== clean) {
          ngModelCtrl.$setViewValue(clean);
          ngModelCtrl.$render();
        }
        return clean;
      });
    }
  };
})