//Mapa

var map, infoWindow;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 17
        });
        infoWindow = new google.maps.InfoWindow;

        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };

            infoWindow.setPosition(pos);
            infoWindow.setContent('Estás aquí');
            infoWindow.open(map);
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
      }

      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      }
//Fin del Mapa

//Angular
var app = angular.module('myApp', []);
    app.controller("destinosController", function($scope){

        $scope.destinos=[

          {lugar:"Cambrils", interes:"Restaurantes", link:"https://www.tripadvisor.es/Restaurants-g580328-Cambrils_Baix_Camp_Costa_Dorada_Province_of_Tarragona_Catalonia.html"},
          {lugar:"Salou", interes:"Playas", link:"https://www.tripadvisor.es/ShowUserReviews-g562814-d669984-r227149814-Llarga_Beach-Salou_Costa_Dorada_Province_of_Tarragona_Catalonia.html"},
          {lugar:"Tarragona", interes:"Museos", link:"https://www.tripadvisor.es/Attractions-g187503-Activities-c49-Tarragona_Costa_Dorada_Province_of_Tarragona_Catalonia.html"},
          {lugar:"Reus", interes:"Teatros", link:"https://www.tripadvisor.es/Attractions-g666512-Activities-c58-Reus_Baix_Camp_Costa_Dorada_Province_of_Tarragona_Catalonia.html"}];
    });


//Service Worker
if ('serviceWorker' in navigator) {
  console.log('Puedes usar los serviceWorker en tu navegador;')

  navigator.serviceWorker.register('./sw.js')
                         .then(res => console.log('serviceWorker cargado correctamente', res))
                         .catch(err => console.log('serviceWorker no se ha podido registrar', err));

}else{
  console.log('NO PUEDES usar los serviceWorker en tu navegador');
}
//Fin del Service Worker
