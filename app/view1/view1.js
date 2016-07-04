'use strict';

angular.module('myApp.view1', ['ngRoute'])

.config(['$routeProvider', function($routeProvider) {
  $routeProvider.when('/view1', {
    templateUrl: 'view1/view1.html',
    controller: 'View1Ctrl'
  });
}])

.controller('View1Ctrl', ['$scope', function($scope) {

}])
.directive('longNumber', [function () {
    return {
      restrict: 'A',
      require: 'ngModel',

      link: function (scope, element, attrs, ngModelController) {
        //$formatters model->view --->pipeline runs array in reverse
        //$parsers view->model --->pipeline runs array in order
        var lastKeyPress=undefined;
        ngModelController.$validators.text = function (modelValue, viewValue) {
          return /^\d*([\.,]\d+)?$/.test(modelValue);
        }

        ngModelController.$parsers.unshift( function (text) {
        	var transformedInput = text.replace(",",".");
        	var transformedInput = text.replace(/[^\d\.,]/g,'')
        	if (transformedInput !== text) {
        		ngModelController.$setViewValue(transformedInput);
        		ngModelController.$render();
        	}
        	return transformedInput;
        });

        element.bind("keydown keypress", function (event) {
          lastKeyPress = event;
          console.log("keydown keypress :" + JSON.stringify(event));
        });
        }
    };
}]);