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
  m = (h - top) - 100;
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
   L.Icon.Default.imagePath = 'images';

    window.map = L.map('map', { doubleClickZoom: true } ).setView([43.229664, 5.444571], 10);

    L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
                     '<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>',
        maxZoom: 18
    }).addTo(map);


    var MapIcon = L.Icon.extend({
        options: {
            shadowUrl: 'images/marker-shadow.png'
        }
    });
    

	var icon = new MapIcon({iconUrl: 'images/marker-icon.png'});

  /*
    var circle = L.circle([43.229664, 5.444571], 500, {
        color: 'red',
        fillColor: '#f03',
        fillOpacity: 0.5
    }).addTo(map);
  */

	var markers = L.markerClusterGroup();

        
        var homeRedMarker = L.AwesomeMarkers.icon({
                icon: 'home',
                markerColor: 'red'
        });

        var homeGreenMarker = L.AwesomeMarkers.icon({
                icon: 'home',
                markerColor: 'green'
        });

        var homeBlueMarker = L.AwesomeMarkers.icon({
                icon: 'home',
                markerColor: 'blue'
        });

	var homeOrangeMarker = L.AwesomeMarkers.icon({
                icon: 'home',
                markerColor: 'orange'
        });

	
	var homePurpleMarker = L.AwesomeMarkers.icon({
                icon: 'home',
                markerColor: 'purple'
        });        

	var homeDarkPurpleMarker = L.AwesomeMarkers.icon({
                icon: 'home',
                markerColor: 'darkpurple'
        });

	var homeDarkGreenMarker = L.AwesomeMarkers.icon({
                icon: 'home',
                markerColor: 'darkgreen'
        });

	var homeDarkRedMarker = L.AwesomeMarkers.icon({
                icon: 'home',
                markerColor: 'darkred'
        });

	var homeCadetBlueMarker = L.AwesomeMarkers.icon({
                icon: 'home',
                markerColor: 'cadetblue'
        });

    map.addLayer(markers);




    query = Entreprise.find({});

  return query.observe({
    added: function(mark) {
      var marker;
	if ( _.indexOf(['2611Z','2612Z','2620Z','2640Z','2651B','3320C','3320D'], mark.code_naf_entreprise   ) !== -1 )
	{
      		marker = L.marker([mark.latitude,mark.longitude], {icon: homeRedMarker});
		console.log('RED - ' + mark.code_naf_entreprise + ' - ' + mark.denomination ); 
	}
	else if ( _.indexOf(['2630Z','4222Z','6110Z','6120Z','6130Z','6190Z'], mark.code_naf_entreprise  ) !== -1 )
	{
		marker = L.marker([mark.latitude,mark.longitude], {icon: homeBlueMarker});
                console.log('BLUE - ' + mark.code_naf_entreprise + ' - ' + mark.denomination );
	}
	else if ( _.indexOf(['2651A','5829A','5829B','5829C','6201Z','6202A','6202B','6203Z','6209Z','6311Z','6312Z'], mark.code_naf_entreprise  ) !==-1 )
	{
		marker = L.marker([mark.latitude,mark.longitude], {icon: homeGreenMarker});
                console.log('GREEN - ' + mark.code_naf_entreprise + ' - ' + mark.denomination );
	}
	else if ( _.indexOf(['1820Z','5811Z','5812Z','5813Z','5814Z','5819Z','5911A','5911B','5911C','5912Z','5913A','5913B','5914Z','5920Z','6010Z','6020A','6391Z','6399Z','7021Z','7311Z','7312Z','7420Z','5821Z','7410Z','9101Z'], mark.code_naf_entreprise  ) !== -1 )
	{
		marker = L.marker([mark.latitude,mark.longitude], {icon: homeOrangeMarker});
                console.log('ORANGE - ' + mark.code_naf_entreprise + ' - ' + mark.denomination );	
	}
	else if ( _.indexOf(['2660Z','2670Z','2680Z'], mark.code_naf_entreprise  ) !== -1 )
	{
		marker = L.marker([mark.latitude,mark.longitude], {icon: homeDarkRedMarker});
                console.log('DARK RED - ' + mark.code_naf_entreprise + ' - ' + mark.denomination );
	}
	else if ( _.indexOf(['4651Z','4666Z','4741Z','4791B','4799B','4652Z','4742Z','4743Z','4763Z','7739Z','8220Z'], mark.code_naf_entreprise  ) !== -1  )
        {
		marker = L.marker([mark.latitude,mark.longitude], {icon: homeDarkGreenMarker});
                console.log('DARK GREEN - ' + mark.code_naf_entreprise + ' - ' + mark.denomination );
        }
	else if ( _.indexOf(['9511Z','9512Z'], mark.code_naf_entreprise  ) !== -1  )
        {
		marker = L.marker([mark.latitude,mark.longitude], {icon: homeCadetBlueMarker});
                console.log('CADET BLUE - ' + mark.code_naf_entreprise + ' - ' + mark.denomination )
        }
	else if ( _.indexOf(['7219Z'], mark.code_naf_entreprise  ) !== -1 )
        {
		marker = L.marker([mark.latitude,mark.longitude], {icon: homeDarkPurpleMarker});
                console.log('DARK PURPLE - ' + mark.code_naf_entreprise + ' - ' + mark.denomination )
        }
	else
	{
		marker = L.marker([mark.latitude,mark.longitude], {icon: homePurpleMarker});
		console.log('PURPLE - ' + mark.code_naf_entreprise + ' - ' + mark.denomination );
	}	 

      marker.bindPopup('<strong>' + mark.denomination + '</strong><br/><br/><i>SIREN : ' + mark.siren + '</i><br/><i>NAF : ' + mark.code_naf_entreprise + '</i><br/><br/><i>' + mark.numero_voie + ' ' + mark.type_voie + ' ' + mark.libelle_voie + '</i><br/>' );
        //marker.addTo(window.map);
	markers.addLayer( marker );
	window.map.addLayer(markers);
      return marker;
      }
    });

}



