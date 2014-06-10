'use strict';

/* App Module */

var farmersMarketApp = angular.module('farmersMarketApp', [
  'ngRoute',
  'farmersMarketControllers'
]);


farmersMarketApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/farmers', {
        templateUrl: 'partials/farmersMain.html',
        controller: 'FarmersListCtrl'
      }).
      when('/farmersDirectory', {
        templateUrl:'partials/farmersDirectory.html',
        controller: 'FarmersDetailCtrl'
      }).
	  when('/farmersFavorites', {
        templateUrl:'partials/farmersFavorites.html',
        controller: 'FarmersDetailCtrl'
      }).
	  when('/farmersMore', {
        		templateUrl:'partials/farmersMore.html',
        controller: 'FarmersDetailCtrl'
      }).
	
      otherwise({
        redirectTo: '/farmers'
      });
  }]);

function farmersMarketControllers($scope){
	$scope.visible=true;
	
}