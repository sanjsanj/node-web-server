const express = require("express");
const hbs = require("hbs");
const fs = require("fs");

const port = process.env.PORT || 3000;
const app = express();

hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");

app.use((req, res, next) => {
  const now = new Date().toString();
  const log = `${now}: ${req.method} ${req.path}`;
  fs.appendFileSync("server.log", `${log}\n`)
  console.log(log);
  next();
})

// app.use((req, res, next) => {
//   res.render("maintenance.hbs")
// })

app.use(express.static(__dirname + "/public"));

hbs.registerHelper("getCurrentYear", () => new Date().getFullYear());
hbs.registerHelper("screamIt", text => text.toUpperCase());

app.get("/", (req, res) => {
  res.render("home.hbs", {
    welcomeMessage: "Welcome to the site",
    pageTitle: "Home Page"
  });
});

app.get("/about", (req, res) => {
  res.render("about.hbs", {
    pageTitle: "About Page"
  });
});

app.get("/bad", (req, res) => {
  res.send({
    errorMessage: "Error"
  });
});

app.get("/projects", (req, res) => {
  res.render("projects.hbs", {
    pageTitle: "Projects Page"
  });
});

app.listen(port, () => {
  console.log(`Server running on ${port}`);
});
