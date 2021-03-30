import React from 'react'

function GoogleMap() {
  return (
    <div>
      <div id="root"></div>
      <div id='map'></div>
      <script>
      function initMap(){
        var location = {lat: 41.639420, lng:-87.480873};
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 4,
            center: location
        });
        var marker = new google.map.Marker({
          position: location,
          map: map
        })
      }
      </script>
      <script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyC_6E8DK05Pld0jbbPYVvX1SIATom7GR6Q"
    </div>
  )
}

export default GoogleMap
