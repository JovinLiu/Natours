/*eslint-disable*/
export const displayMap = (locations) => {
  mapboxgl.accessToken =
    'pk.eyJ1IjoiZ2hvc3Rqb3ZpbiIsImEiOiJjaXF4ZHVjNXYwMWlnZmttZ3ExZnZxcWFvIn0.ASJ7fbrCXlGsYMUNUW2cPA';

  const map = new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/ghostjovin/ciqxdvhdk0008ckndkfdeqh1l', // style URL
    scrollZoom: false,
    // center: locations[0].coordinates, // starting position [lng, lat]
    // zoom: 12, // starting zoom
    // interactive: false,
  });

  const bounds = new mapboxgl.LngLatBounds();

  locations.forEach((loc) => {
    //create marker
    const el = document.createElement('div');
    el.className = 'marker';
    //Add marker
    new mapboxgl.Marker({
      element: el,
      anchor: 'bottom',
    })
      .setLngLat(loc.coordinates)
      .addTo(map);
    //add popup
    new mapboxgl.Popup({
      offset: 30,
    })
      .setLngLat(loc.coordinates)
      .setHTML(`<p>Day ${loc.day}: ${loc.description}</p>`)
      .addTo(map);

    //extend map bounds to include current location
    bounds.extend(loc.coordinates);
  });

  map.fitBounds(bounds, {
    padding: {
      top: 200,
      bottom: 150,
      left: 100,
      right: 100,
    },
  });
};
