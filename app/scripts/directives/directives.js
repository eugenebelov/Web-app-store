angular.module('directives.product', [])

.directive('productView', function() {    
  return {
    restrict: 'A',
    replace: false,
    scope: {
    	label: '='
    },    
    controller: function() {
    	
    },
    link: function(scope, element, attrs, controller) {
    	console.log(scope);
    },
    template:
      '<a><span class="onsale" ng-show={{isSale}}>{{quantity}}</span>'+
      '<img src="" alt="" width="150" height="150">'+
      '<h4>{{label}}</h4>'+
      '</a>'+
      '<div class="descr">{{description}}</div>'+
      '<span class="price">{{price}}</span>'+
      '<a href="" class="btn btn-danger">Купить</a>'
  };
});