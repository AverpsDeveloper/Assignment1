async function main() {
    init();
 
    function init() {
        let map = initMap();
        const resultLayer = L.layerGroup();
        resultLayer.addTo(map);
        
        document.querySelector("#search-btn").addEventListener("click", async function(){

            resultLayer.clearLayers();

            const searchTerms = document.querySelector("#search-terms").value;
            const center = map.getBounds().getCenter();
            const ll = center.lat + "," + center.lng;
            const results = await loadData(searchTerms, ll, 2000);
            displaySearchResults(results.results, resultLayer,  map);
 
        });

        document.querySelector("#toggle-search-btn").addEventListener("click", function(){
           toggle_search();
        })
    }
}
async function loadGeojsonData() {
    let response = await axios.get("childcare.geojson");
    console.log(response.data)
    let childCareCentre = L.geoJson(response.data, {
      onEachFeature: function(feature, layer) {
        layer.bindPopup(feature.properties.Description);
      }
    }
    ).addTo(map);
  }
  let map = initMap();
  document.querySelector("#search-btn").addEventListener("click", function() {

    const searchTerms = document.querySelector("#search-terms").value;
    alert(searchTerms)
    //       const center = map.getBounds().getCenter();
    //       const ll = center.lat + "," + center.lng;
    //       const results = await loadData(searchTerms, ll, 2000);
  });
  loadGeojsonData();
  // loadFourSquareData();


main();
function getRandomLatLng(map) {
    // get the boundaries of the map
    let bounds = map.getBounds();
    let southWest = bounds.getSouthWest();
    let northEast = bounds.getNorthEast();
    let lngSpan = northEast.lng - southWest.lng;
    let latSpan = northEast.lat - southWest.lat;

    let randomLng = Math.random() * lngSpan + southWest.lng;
    let randomLat = Math.random() * latSpan + southWest.lat;

    return [ randomLat, randomLng,];
}
function getRandomLatLng(map) {
    // get the boundaries of the map
    let bounds = map.getBounds();
    let southWest = bounds.getSouthWest();
    let northEast = bounds.getNorthEast();
    let lngSpan = northEast.lng - southWest.lng;
    let latSpan = northEast.lat - southWest.lat;

    let randomLng = Math.random() * lngSpan + southWest.lng;
    let randomLat = Math.random() * latSpan + southWest.lat;

    return [ randomLat, randomLng,];
}

// create marker cluster
let markerClusterLayer = L.markerClusterGroup();

for (let i = 0; i < 1000; i++) {
    let pos = getRandomLatLng(map);
    L.marker(pos).addTo(markerClusterLayer);
}
markerClusterLayer.addTo(map);
