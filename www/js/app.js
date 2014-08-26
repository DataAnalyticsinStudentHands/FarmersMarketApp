'use strict';
/* App Module */
var farmersMarketApp = angular.module('farmersMarketApp', [
  'farmersMarketControllers',
  //'ngAnimate',
  'ui.router',
  'AngularGM',
  'restangular'
]);

//URI whitelist implementation
farmersMarketApp.config(function($compileProvider){
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|file|comgooglemaps|geo|tel):/);
})

//state provider
farmersMarketApp.config(function($stateProvider, $urlRouterProvider){
      $urlRouterProvider.otherwise("/homePage")
      $stateProvider
      
        .state('homePage', {
            url : "/homePage",
            views : { 
                "app" : { templateUrl : "partials/homePage.html" }
            },
            onEnter: function(){
              console.log("entering homepage");
            }
        })  
      
        .state('state2', {
            abstract : true,
            views : {
                "menuBar" : {templateUrl : "partials/menuBar.html", controller : "TopBarCtrl"},
                "app" : {templateUrl : "partials/mainBody.html"},
                "bottomMenu" : {templateUrl : "partials/bottomMenu.html"},
            },
            onEnter: function(){
              console.log("enter state2");
            }
        })
      
        .state('state2.markets', {
            url: "/markets",
            views: { 
                "app" : {templateUrl: "partials/markets.html", controller: "FarmersMapCtrl"}
            },
            onEnter: function(){
              console.log("enter state2.markets");
            }
        })
      
        .state('state2.markets.info', {
              url: "/:id",
              templateUrl: "partials/markets.info.html",
              controller : "FarmersMapDetailCtrl"
          })
      
        .state('state2.inSeason', {
              url: "/inSeason",
              views : { 
                  "app" : { templateUrl: "partials/inSeason.html" }
          },
            onEnter: function(){
              console.log("enter state2.inseason");
            }})
      
/*        .state('qrScanner', {
              url: "/qrScanner",
              templateUrl: "partials/qrScanner.html",
              controller : 'QRScannerCtrl'
          })
      */
        .state('state2.profile', {
              url: "/profile",
              views : { 
                  "app" : { templateUrl: "partials/profile.html"}
              },
                onEnter : function() { 
                    console.log("entering state2.profile");
            }})
      
      
        .state('state2.profile.friends', {
                url: "/friends",
                views : {
                    "profileBody" : { templateUrl : "partials/profile.friends.html" }
                },
                onEnter : function() {
                    console.log("entering profile.friends");
                }})
      
        .state('state2.profile.favorites', {
                url: "/favorites",
                views : {
                    "profileBody" : { templateUrl : "partials/profile.favorites.html" }
                },
                onEnter : function() {
                    console.log("entering profile.favorites");
                }})
      
        .state('state2.profile.badges', {
                url: "/badges",
                views : {
                    "profileBody" : { templateUrl : "partials/profile.badges.html" }
                },
                onEnter : function() {
                    console.log("entering profile.badges");
                }})
      
        .state('state2.profile.photos', {
                url: "/photos",
                views : {
                    "profileBody" : { templateUrl : "partials/profile.photos.html" }
                },
                onEnter : function() {
                    console.log("entering profile.photos");
                }})
      
      
        .state('state2.events', {
              url: "/events",
              views : { 
                  "app" : {templateUrl : "partials/events.html", 
                           controller : "EventsCtrl"}
              },
            onEnter: function(){
              console.log("enter state2.events");
            }
      })
      
        .state('state2.events.info', {
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






farmersMarketApp.run(['Restangular', '$rootScope', function(Restangular, $rootScope) {
    Restangular.setBaseUrl("http://localhost:8080/RESTFUL-WS/services/");
    $rootScope.Restangular = function() {
        return Restangular;
    }


}]);