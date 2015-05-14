Template.map.helpers({
    mapOptions: function() {
        if (GoogleMaps.loaded()) {
            return {
                center: new google.maps.LatLng(29.7199, -95.3422),
                zoom: 10
            };
        }
    }    
});

Template.map.onCreated(function() {
    GoogleMaps.ready('map', function(map) {
        var marker1 = new google.maps.Marker({
            position: new google.maps.LatLng(29.71739, -95.40183),
            map: map.instance,
            title: 'Rice U Farmers Market'            
        });        
        var infowindow1 = new google.maps.InfoWindow({
              content: 'Farmers Market at Rice U'
          });

        google.maps.event.addListener(marker1, 'click', function() {
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
        
    });
});