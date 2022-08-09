const router = require("express").Router();
const {
  Trip,
  User,
} = require("../models");
const withAuth = require("../utils/auth");
const { get } = require("./api");
var handlebars =  require('express-handlebars');
var hhelper = handlebars.create({});

router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll();

          const users = userData.map((user) => user.get({ plain: true }));

        res.render('homepage',
           users
           )
    } catch (err) {
        res.status(500).json(err);
    }
});

hhelper.handlebars.registerHelper('JSONparse', function(hotels) {
  var htmlappend="<div> Hotels near your trip:"

  testvar= [JSON.parse(hotels)]
  testvar.forEach(element => {
    htmlappend+="<div>"+element.names+"<div>"
    htmlappend+="<div> It has an average star rating of "+element.rating+"<div>"
    htmlappend+="<div> Per day its average price comes out to be "+element.minprice+"<div>"
    htmlappend+="<img src="+element.images+">"
  });
htmlappend+="</div>"

return htmlappend
});
router.get('/myTrip', async (req, res) => {
  try {
      const TripData = await Trip.findAll();
      console.log("it is getting this")
        const Trips = TripData.map((Trip) => Trip.get({ plain: true }));
      res.render('myTrip',{Trips})
  } catch (err) {
      res.status(500).json(err);
  }
});

//Login route
router.get("/login", async (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }
  res.render("login");
});

//Create a Trip Route
router.get('/newTrip', async (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('newTrip');
});

router.get('/myTrip', async (req, res) => {
  if (req.session.loggedIn) {
      res.redirect('/');
      return;
  }
  res.render('myTrip');
});

module.exports = router;
