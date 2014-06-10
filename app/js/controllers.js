'use strict';

/* Controllers */

var farmersMarketControllers = angular.module('farmersMarketControllers', []);


farmersMarketControllers.controller('FarmersListCtrl', ['$scope', '$http',
  function($scope, $http) {
 $http.get('farmers/farmers.json').success(function(data) {
      $scope.farmers = data;
    });
	  
  }]);


farmersMarketControllers.controller('FarmersDetailCtrl', ['$scope', '$routeParams',
  function($scope, $routeParams) {
    $scope.farmersID = $routeParams.farmersId;
  }]);
