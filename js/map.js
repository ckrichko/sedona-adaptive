function initMap() {

  //Залаём координаты
  var coordinates = {lat: 35.08, lng: -111.7};
  // Настройки карты

  var options = {
    center: coordinates,
    zoom: 8,
    scrollwheel: false,
    mapTypeId: 'terrain'
  };

  // Новая карта
  var map = new google.maps.Map(document.getElementById('map'), options);


  google.maps.event.addListener(map, 'click', function (event) {

    // Добавить маркер
    addMarker({coords: event.latLng});
  });


  // Добавить маркер
  var marker = new google.maps.Marker({
    position: coordinates,
    map: map,
    icon: '../img/icon-map-marker.svg'
  });

  var infoWindow = new google.maps.InfoWindow({
    content: '<h3>Sedona - город вашей мечты!</h3>'
  });

  marker.addListener('click', function () {
    infoWindow.open(map, marker);
  });

  function addMarker(props) {
    var marker = new google.maps.Marker({
      position: props.coords,
      map: map,

    });

    if (props.iconImage) {

      marker.setIcon(props.iconImage);
    }

    if (props.content) {
      var infoWindow = new google.maps.InfoWindow({
        content: props.content
      });

      marker.addListener('click', function () {
        infoWindow.open(map, marker);
      });
    }
  }
}
