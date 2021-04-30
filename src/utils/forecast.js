const request = require("postman-request");

const forecast = (lat, long, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=e90230c01045a37d52295f46bb432697&query=${lat},${long}`;
  request({ url, json: true }, (err, { body }) => {
    if (err) {
      callback("Unable to connect to weather service..");
    } else if (body.error) {
      callback("Unable to find location..");
    } else {
      callback(
        undefined,
        `${body.current.weather_descriptions[0]} in ${body.location.name}. It is currently ${body.current.temperature} degrees out.It feels like ${body.current.feelslike} degrees out`
      );
    }
  });
};

module.exports = forecast;
