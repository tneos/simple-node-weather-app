const path = require("path");

const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

//Define paths for Express config
const publicDirPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

const app = express();
const port = process.env.PORT || 3000;

// Setup handlebars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to serve
app.use(express.static(publicDirPath));

app.get("/", (req, res) => {
  res.render("index", {
    title: "Weather Application",
    name: "Thomas Neos",
  });
});

app.get("/about", (req, res) => [
  res.render("about", {
    title: "About us page",
    name: "Thomas Neos",
  }),
]);

app.get("/help", (req, res) => [
  res.render("help", {
    message: "Here is all the help that you need.",
    title: "Help page",
    name: "Thomas Neos",
  }),
]);

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "You must provide an address",
    });
  }
  geocode(req.query.address, (err, { latitude, longitude, location } = {}) => {
    if (err) {
      return res.send({
        error: err,
      });
    }

    forecast(latitude, longitude, (err, data, icon) => {
      if (err) {
        return res.send({
          error: err,
        });
      }

      res.send({
        forecast: data,
        location,
        icon,
        address: req.query.address,
      });
      console.log(icon);
    });
  });
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }

  console.log(req.query.search);
  res.send({
    products: [],
  });
});

// Customized errors
app.get("/help/*", (req, res) => {
  res.render("error", {
    title: "404",
    message: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("error", {
    title: "404",
    message: "Page not found",
  });
});

app.listen(port, () => {
  console.log(`Server is up on port ${port}`);
});
