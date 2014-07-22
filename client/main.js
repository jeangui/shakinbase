	 Meteor.subscribe('entreprise');

	Template.entreprises_tpl.entreprises_hlp = function () {
                 var nbr = Entreprise.find().count();
                 console.log('client starting - nbr : ' + nbr );
                 return nbr;
        };



window.resize = function(t) {
  var c, h, m, top, w;
  w = window.innerWidth;
  h = window.innerHeight;
  top = t.find('#map').offsetTop;
  c = w - 40;
  m = (h - top) - 65;
  t.find('#container').style.width = "" + c + "px";
  return t.find('#map').style.height = "" + m + "px";
};


  Template.entreprises_tpl.rendered = function () {

    console.log( " rendered " );

    var query,_this = this;
    window.resize(this);
    $(window).resize(function()
    {
      return window.resize(_this);
    });
    L.Icon.Default.imagePath = 'packages/leaflet/images';

    window.map = L.map('map', { doubleClickZoom: true } ).setView([43.229664, 5.444571], 12);

    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
                     '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
        maxZoom: 18
    }).addTo(map);


    var MapIcon = L.Icon.extend({
        options: {
            shadowUrl: 'img/map/marker-shadow.png'
        }
    });

	var icon = new MapIcon({iconUrl: 'img/map/marker-icon.png'});

/*    var circle = L.circle([43.229664, 5.444571], 500, {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5
    }).addTo(map);
*/

	 var markers = L.markerClusterGroup();

                // add a marker in the given location, attach some popup content to it and open the popup
                var redMarker = L.AwesomeMarkers.icon({
                        icon: 'home',
                        markerColor: 'red'
                });
                markers.addLayer( L.marker([ 52.37687671 , 13.28765573 ], {icon: redMarker}) );

                // add a marker in the given location, attach some popup content to it and open the popup
                var greenMarker = L.AwesomeMarkers.icon({
                        icon: 'flag',
                        markerColor: 'green'
                });
                markers.addLayer( L.marker([ 52.321473897 , 13.213548654 ], {icon: greenMarker}) );


                map.addLayer(markers);




    query = Entreprise.find({});

  return query.observe({
    added: function(mark) {
      var marker;
      marker = L.marker([mark.latitude,mark.longitude]);
      marker.bindPopup('<strong>' + mark.denomination + '</strong><br/><br/><i>SIREN : ' + mark.siren + '</i><br/><i>NAF : ' + mark.code_naf_entreprise + '</i><br/><br/><i>' + mark.numero_voie + ' ' + mark.type_voie + ' ' + mark.libelle_voie + '</i><br/>' );
        //marker.addTo(window.map);
	markers.addLayer( marker );
	window.map.addLayer(markers);
      return marker;
      }
    });

}



