'use strict'

angular.module('directives.product', [])

.directive('productView', function() {    
  return {
    restrict: 'A',
    scope: {
    	itemData: '='
    },    
    controller: function($scope) {
    	 
    },
    link: function(scope, element, attrs, controller) {
      
    },
    template:
      '<a><span class="onsale" ng-show={{itemData.sale.isSale}}>{{itemData.sale.quantity}}</span>'+
      '<img src="{{itemData.thumb}}" alt="" width="150" height="150">'+
      '<h4>{{itemData.label}}</h4>'+
      '</a>'+
      '<div class="descr">{{itemData.description}}</div>'+
      '<span class="price">{{itemData.price}}</span>'+
      '<a href="" class="btn btn-danger">Купить</a>'
  };
});