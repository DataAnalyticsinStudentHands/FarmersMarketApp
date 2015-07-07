var gmaps = {
    
    // map object
    map: null,
    
    //direction services object
    directionsService: null,
 
    //direction services object
    directionsDisplay: null,
    
    //direction services object
    stepDisplay: null,
    
    markerArray: []
}

Template.map.helpers({
    mapOptions: function() {
        if (GoogleMaps.loaded()) {
            
            if (!Geolocation.error()) {                
                //pos = Geolocation.latLng();
                pos = Geolocation.currentLocation();
            } else {
                pos.coords.latitude = -25.2743;
                pos.coords.longitude = 133.7751;
            }
            return {
                //center: new google.maps.LatLng(-25.2743, 133.7751),
                center: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
                zoom: 12,
                scaleControl: false,                
                zoomControl: false,
                mapTypeControl: false,
                panControl: false,
                rotateControl: true,
                overviewMapControl: false, 
                streetViewControl: false,
               
                
            };
        }
    }
    
     
    
    
});

Template.map.onCreated(function() {
    GoogleMaps.ready('map', function(map) {
        
       
        
        var bikeLayer = new google.maps.BicyclingLayer();
        bikeLayer.setMap(map.instance);
    
        
        
        var marker1 = new google.maps.Marker({
            position: new google.maps.LatLng(29.71739, -95.40183),
            map: map.instance,
            title: 'Rice U Farmers Market'            
        });        
        var infowindow1 = new google.maps.InfoWindow({
              content: ''
          });

        google.maps.event.addListener(marker1, 'click', function() {
            infowindow1.setContent( '<p>Farmers Market at Rice U </p>' +'<button onclick="Meteor.myFunctions.calcRoute()">Directions from my Location</button>');
            infowindow1.open(map.instance, marker1);
        });
        
        var marker2 = new google.maps.Marker({
            position: new google.maps.LatLng(29.81063, -95.37999),
            map: map.instance,
            title: 'Canino\'s Produce'            
        });
        var infowindow2 = new google.maps.InfoWindow({
              content: 'Canino\'s Produce'
          });

        google.maps.event.addListener(marker2, 'click', function() {
            infowindow2.open(map.instance, marker2);
        });
        
        var image = '/img/app/flag1.png'
        var marker3 = new google.maps.Marker({
            position: new google.maps.LatLng(pos.lat, pos.lng),
            map: map.instance,
            title: 'You are here',
            icon: image
        });
        
        var rendererOptions = {
            map: map.instance
        }
        
        this.directionsService = new google.maps.DirectionsService();
        
        directionsDisplay = new                                                         google.maps.DirectionsRenderer(rendererOptions);
  
        // global flag saying we intialized already
        Session.set('map', true);
    })
        
        
});