const request = require("postman-request");

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoidG5lb3MiLCJhIjoiY2trM3hvNGZwMWZzczJucXNqcG1hZ3lhOSJ9.zgr_lrOv6QDuk6iwwMixYQ&limit=1`;

  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback("Unable to connect to location services..");
    } else if (body.features.length === 0) {
      callback("Unable to find location. Try another search..");
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
