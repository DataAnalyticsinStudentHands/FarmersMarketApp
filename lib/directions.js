

Meteor.myFunctions = {
    
     findlocation: function() {
        if(navigator.geolocation) {
        navigator.geolocation.watchPosition(gmaps.showPosition, function() {
        handleNoGeolocation(true);
        });
        }   else {
        // Browser doesn't support Geolocation
        handleNoGeolocation(false);
        }
        },
        
        showPosition: function(position) {
        pos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        map.instance.setCenter(pos);
        map.instance.setZoom(14);
        var purpStar = {
            path: 'M 125,5 155,90 245,90 175,145 200,230 125,180 50,230 75,145 5,90 95,90 z',
            fillColor: 'lavender',
            fillOpacity: 0.8,
            scale: 0.1,
            strokeColor: 'plum',
            strokeWeight: 2
        };
       
        var marker = new google.maps.Marker({
            position: pos,
            map: map.instance,
            icon: purpStar
        });
    
        
        
        },
 calcRoute: function() {
    
            
        //clear markers before calculating function   
 //       gmaps.clearMarkers();    

        console.log(this.markerArray);
        // Retrieve the start and end locations and create
        // a DirectionsRequest using BICYCLING directions.
        
        
        var end = document.getElementById('marketName').value;
        var request = {
            origin: document.getElementById().value,
            destination: end,
            travelMode: google.maps.TravelMode.BICYCLING
        };
            
        // Route the directions and pass the response to a
        // function to create markers for each step.
        this.directionsService.route(request, function(response, status) {
            if (status == google.maps.DirectionsStatus.OK) {
            var warnings = document.getElementById('warnings_panel');
            warnings.innerHTML = '<b>' + response.routes[0].warnings + '</b>';
            this.directionsDisplay.setDirections(response);
            gmaps.showSteps(response);
            }
        });
        },
    
    showSteps: function(directionResult) {
        // For each step, place a marker, and add the text to the marker's
        // info window. Also attach the marker to an array so we
        // can keep track of it and remove it when calculating new
        // routes.
        var myRoute = directionResult.routes[0].legs[0];

        for (var i = 0; i < myRoute.steps.length; i++) {
            var marker = new google.maps.Marker({
                position: myRoute.steps[i].start_location,
                map: map.instance
            });
            gmaps.attachInstructionText(marker, myRoute.steps[i].instructions);
            this.markerArray[i] = marker;
        }
        },

         attachInstructionText: function(marker, text) {
             
        // Instantiate an info window to hold step text.
        var stepDisplay = new google.maps.InfoWindow();
            google.maps.event.addListener(marker, 'mouseover', function() {
            // Open an info window when the marker is clicked on,
            // containing the text of the step.
            stepDisplay.setContent(text);
            stepDisplay.open(map.instance, marker);
            
        })
            
            google.maps.event.addListener(marker, 'click', function() {
                map.instance.setZoom(14);
                map.instance.setCenter(marker.getPosition());
                stepDisplay.open(map.instance, marker);
            })
            
        },
    
        clearMarkers: function() {
            
              // First, remove any existing markers from the map.
        for (var i = 0; i < this.markerArray.length; i++) {
            
            this.markerArray[i].setMap(null);
        }

        // Now, clear the array itself.
        this.markerArray = [];
            
        }
}