'use strict';

/* Controllers */

var farmersMarketControllers = angular.module('farmersMarketControllers', []);

farmersMarketControllers.controller('FarmersListCtrl', ['$scope', '$http',
  function($scope, $http) {
 $http.get('json/document.json').success(function(data) {
      $scope.farmers = data;
    });
  }										
]);

farmersMarketControllers.controller('FarmersMapCtrl', function($scope) {
  $scope.options = {
    map: {
      zoom: 10
    },
    notselected: {
      icon: 'https://maps.gstatic.com/mapfiles/ms2/micons/red-dot.png',
    },
    selected: {
      icon: 'https://maps.gstatic.com/mapfiles/ms2/micons/yellow-dot.png',
    }
  };
  $scope.farmers = [
    {
      id: 1,
      name: 'Grogans Mill Farmers Market',
      img: 'http://woodlandsevents.com/images/stories/villages/grogans-mill-farmers-market.png',
      location: {
        lat: 30.140042, 
        lng: -95.471075
      }
    },
    {
      id : 2,
      name : 'Rice University Farmers Market',
      img: 'www.sample.com/sample.jpg',
      location : {
          lat: 29.714945,
         lng: -95.409434
      } 
    }       
  ];
  $scope.getFarmerOpts = function(farmer) {
   return angular.extend(
     { title: farmer.name },
     farmer.selected ? $scope.options.selected :
        $scope.options.notselected
    );
  };
  $scope.triggerOpenInfoWindow = function(farmer) {
      
      if ($scope.farmer) { 
          $scope.farmer.selected = false;
      }
      $scope.farmer = farmer;
      $scope.farmer.selected = true;
      $scope.$broadcast('gmMarkersUpdate', 'farmers');
      
      $scope.markerEvents = [
          {
              event: 'openinfowindow',
              ids: [farmer.id]
          },
        ];
  };   
});

farmersMarketControllers.controller('FarmersMapDetailCtrl', ['$scope', '$stateParams', '$http',
  function($scope, $stateParams, $http) {
    $http.get('json/vendor' + $stateParams.id + '.json').success(function(data) {
      $scope.farmerInfo = data;
    });
  }]);

farmersMarketControllers.controller('FarmersSeasonCtrl', ['$scope', '$http',
  function($scope, $http) {
 $http.get('json/seasonal.json').success(function(data) {
      $scope.seasonal = data;
    });
  }										
]);

farmersMarketControllers.controller('EventsCtrl', ['$scope', '$http',
   function($scope, $http) { 
        $http.get('json/events.json').success(function(data) { 
            $scope.events = data;
        });
       //Used to grab the current date. Not needed at the moment. 
            $scope.date = new Date();
   }]);

farmersMarketControllers.controller('EventsDetailCtrl', ['$scope', '$stateParams', '$http',
  function($scope, $stateParams, $http) {
    $http.get('json/event' + $stateParams.id + '.json').success(function(data) {
      $scope.eventInfo = data;
    });
      
     
  }]);
            
farmersMarketControllers.controller('QRScannerCtrl', function($scope) { 

    <!-- qr code scanner -->
    
});

farmersMarketControllers.controller('TestCtrl', function($scope, $location) {

    
    /*geocodes an address to long/lat*/
          $scope.codeAddress = function (){
              var geocoder;
              geocoder = new google.maps.Geocoder();
              var address = document.getElementById("address").value;
              geocoder.geocode({ 'address': address}, function(results, status) {
                  if (status == google.maps.GeocoderStatus.OK) {
                      alert(results[0].geometry.location);
                  } else {
                    alert("Geocode was not successful for the following reason: " + status);
                  }
        });
};
    /*end geocoding*/
      
    
    
    /*gets current location in longlat format*/
        // default location
        $scope.center = {
            latitude: 29.7642544,
            longitude: -95.4087587
        };

        $scope.geolocationAvailable = navigator.geolocation ? true : false;

        $scope.latitude = null;
        $scope.longitude = null;

        $scope.findMe = function () {
           if ($scope.geolocationAvailable) {
                navigator.geolocation.getCurrentPosition(getLocation, displayError);
            }
          else{
              alert('geolocation is not supported, setting map to default coordinates.');
          }
        };
        function getLocation(position) {
            $scope.center = {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
            };
            $scope.$apply();
        };
        function displayError(error) {
    
    switch(error.code) {
        case error.PERMISSION_DENIED:
            alert('User denied the request for Geolocation.');
            break;
        case error.POSITION_UNAVAILABLE:
            alert('Location information is unavailable.');
            break;
        case error.TIMEOUT:
            alert('The request to get user location timed out.');
            break;
        case error.UNKNOWN_ERROR:
            alert('An unknown error occurred.');
            break;
    }
};
    /*end function*/
    
        
        
});