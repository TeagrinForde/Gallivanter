const router = require('express').Router();
const gMaps = require('./gmaps');

//fetching first 5 results from the Yelp API using a given lat/long
/*need to:  use dotenv to hide yelp API key
            change name of pikachu/data variables
            add input from gmaps.js to grab lat/long from search results
            export results to handlebars landing page*/

fetch("https://api.yelp.com/v3/businesses/search?latitude="+ gMaps.lat + "&longitude=" + gMaps.long + "&limit=5", {  headers: {
    Accept: "application/json",
    Bearer: "uQWRDgNppQ4f5q6Xb3wtZtl0R3wnLMZLE3MNOYiHfUN9c7QBCLxJJTdRtbffhMIlbzLlWR-L3HWqgkbLNIH6RbqZ5Z4p9Q2Rk0cjLQiFiddNt6i-Y1xjNmtAS4_oYnYx"
  }
})
.then(function (response) {
    return response.json();
  })
  .then(function (data) {
    console.log(data);
    var pikachu = data.filter(function(data){
      return data.includes(input.toUpperCase())
    })

  topFive(pikachu)
  });

module.exports = router;