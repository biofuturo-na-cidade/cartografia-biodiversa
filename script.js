
var map = L.map('map').setView([-22.01, -47.89], 14);
map.on('popupopen', ChangeMargin)

//
var CartoDB_Voyager = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png',{
attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
subdomains: 'abcd',
maxZoom: 20
});
CartoDB_Voyager.addTo(map);

//marker icon
var myIcon = L.icon({
    iconUrl: './rsrc/markericon.png',
    iconSize: [30,30],
    iconAnchor: [15,26],
    popupAnchor: [0,-30]
});

//set max height (scrollbar margin fix)
const MAX_HEIGHT = 300

//create layers
var markers = L.markerClusterGroup.layerSupport();

var drawings =  L.layerGroup();
var haiku =  L.layerGroup();
var layers = {
  "Desenhos": drawings,
  "Haicais": haiku
};

// make popup from json
async function getPostsJson(){
    let res = await fetch("./posts.json")
    let json = await res.json()
    return json
}

(async function (){
    let posts = await getPostsJson()
    posts["data"].map((p) =>{
    var allPosts = PopupContent(p["title"],p["author"],p["content"],p["image"])
    MarkerMaker(allPosts,[p["coordinates"][0], p["coordinates"][1]],markers, p["id"])
    })
})()
map.addLayer(markers);
L.control.layers(null,layers).addTo(map);

function MarkerMaker(content, coordinates, markers, id){
  var customPopup = content
  var customOptions = {
      'maxHeight': MAX_HEIGHT,
      'minWidth': 300,
      'maxWidth': 400,
      'closeButton': false,
      'className' : 'popupCustom'
  }
  var marker = L.marker(coordinates, {icon: myIcon});
  marker.bindPopup(customPopup,customOptions);
  markers.addLayer(marker);
  switch (id) {
    case 1:
      marker.addTo(drawings)
      break
    case 2:
      marker.addTo(haiku)
      break
    }
}

function PopupContent(title,author,content,image){
    return`
    <img class="popup" src="${image}">
    <p class="outfit-title">${title}</p>
    <p class="outfit-author">${author}</p>
    <p class="outfit-text">${content}</p>
    `
}

// fix popup margin (scrollbar)
function ChangeMargin() {
    var popup = document.querySelectorAll('.leaflet-popup-content')[0]
    var height = popup.clientHeight

    if (height < MAX_HEIGHT) { 
        popup.style.margin = "13px 13px 9px 13px"
    }

}

// polygon
var geojson = {
    "type": "FeatureCollection",
    "features": [
      {
        "type": "Feature",
        "properties": {
          "name": "Cambui",
          "stroke": "#008000",
          "stroke-width": 2,
          "stroke-opacity": 0.7,
          "fill": "#008000",
          "fill-opacity": 0.3
        },
        "geometry": {
          "coordinates": [
            [
              [
                -47.90661778377225,
                -21.991133350494565
              ],
              [
                -47.90662656214769,
                -21.991367694670785
              ],
              [
                -47.906415005167446,
                -21.991876119221004
              ],
              [
                -47.9058019216732,
                -21.991836085857415
              ],
              [
                -47.90444191251461,
                -21.99271681723623
              ],
              [
                -47.904410975262266,
                -21.99280579662839
              ],
              [
                -47.90473910445559,
                -21.99327418306838
              ],
              [
                -47.903763351853144,
                -21.993958745081812
              ],
              [
                -47.90369797930802,
                -21.99408776865515
              ],
              [
                -47.90408223586351,
                -21.99446407584864
              ],
              [
                -47.903818869010536,
                -21.994688258383533
              ],
              [
                -47.90354254968992,
                -21.99448409216103
              ],
              [
                -47.90335689764564,
                -21.994844385295963
              ],
              [
                -47.9027567666198,
                -21.99440402689578
              ],
              [
                -47.90288197325367,
                -21.993954356751516
              ],
              [
                -47.90320578495823,
                -21.992613252586466
              ],
              [
                -47.90354686662059,
                -21.99181659067655
              ],
              [
                -47.90414267997946,
                -21.99093985766416
              ],
              [
                -47.904220394788865,
                -21.99045144664008
              ],
              [
                -47.90400883780791,
                -21.99037938585515
              ],
              [
                -47.9040947383931,
                -21.990118608490945
              ],
              [
                -47.903999753626636,
                -21.989430024542813
              ],
              [
                -47.90434515277775,
                -21.989197826876193
              ],
              [
                -47.90433651779955,
                -21.988613327620683
              ],
              [
                -47.90411632584039,
                -21.987876694993275
              ],
              [
                -47.90407315266057,
                -21.987424307120392
              ],
              [
                -47.90427175717247,
                -21.987360251723487
              ],
              [
                -47.904219947299794,
                -21.98671969617301
              ],
              [
                -47.90433651951355,
                -21.986347371930435
              ],
              [
                -47.90433651951355,
                -21.98614719720254
              ],
              [
                -47.90451785406762,
                -21.985626741588277
              ],
              [
                -47.905001412879784,
                -21.985474608048904
              ],
              [
                -47.905048905263016,
                -21.985282439132476
              ],
              [
                -47.90569221118267,
                -21.985110287592022
              ],
              [
                -47.905135255051334,
                -21.98676373446034
              ],
              [
                -47.9052655245313,
                -21.987993844084357
              ],
              [
                -47.90536806194248,
                -21.990832775535694
              ],
              [
                -47.90661778377225,
                -21.991133350494565
              ]
            ]
          ],
          "type": "Polygon"
        },
        "id": 0
      },
    ]
  }
  var polygonData = L.geoJSON(geojson, {
    style: {
        fillColor: 'green',
        fillOpacity: 0.1,
        color: 'green',
        weight: 2
    }
}).addTo(map);
