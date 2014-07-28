'use strict';
/* App Module */
var farmersMarketApp = angular.module('farmersMarketApp', [
  'ngRoute',
  'farmersMarketControllers',
  'ngAnimate',
  'ui.router',
  'AngularGM'
]);

//URI whitelist implementation
farmersMarketApp.config(function($compileProvider){
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|comgooglemaps|geo|tel):/);
})

//state provider
farmersMarketApp.config(function($stateProvider, $urlRouterProvider){
      $urlRouterProvider.otherwise("/")
      $stateProvider
            .state('markets', {
            url: "/markets",
            templateUrl: "partials/markets.html",
			controller: 'FarmersMapCtrl'
        })
            .state('markets.info', {
              url: "/:id",
              templateUrl: "partials/markets.info.html",
              controller : "FarmersMapDetailCtrl"
          })
            .state('inSeason', {
              url: "/inSeason",
              templateUrl: "partials/inSeason.html",
              controller : 'FarmersSeasonCtrl'
          })
            .state('qrScanner', {
              url: "/qrScanner",
              templateUrl: "partials/qrScanner.html",
              controller : 'QRScannerCtrl'
          })
            .state('about', {
              url: "/about",
              templateUrl: "partials/about.html"
          })
            .state('events', {
              url: "/events",
              templateUrl : "partials/events.html",
              controller : 'EventsCtrl'
      })
            .state('events.info', {
              url:"/:id",
              templateUrl : "partials/events.info.html",
              controller : 'EventsDetailCtrl'   
      })
            .state('test', {
            url:"/test",
            templateUrl : "partials/test.html",
            controller : 'TestCtrl'    
      })
})