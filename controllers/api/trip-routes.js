const router = require("express").Router();
const express = require("express");
const path = require("path");
const axios = require("axios");
const app = express();
const { User, Trip } = require("../../models");

router.post("/", async (req, res) => {
  try {

    let tripData;
    var location = req.body.location;
    var destination = req.body.destination;
    var startDate = req.body.startDate;
    var endDate = req.body.endDate;
    var method = req.body.method;
    console.log(location, destination, startDate, endDate, method);  //DELETE BEFORE SUBMIT
    var dummuri;

    const urihotel = "https://priceline-com-provider.p.rapidapi.com/v1/hotels/locations";
    const uriairport = "https://priceline-com-provider.p.rapidapi.com/v1/flights/locations";
    const uricars = "https://priceline-com-provider.p.rapidapi.com/v1/cars-rentals/locations";

    if (method === "HOTEL") { dummuri = urihotel};
    if (method === "AIRPORT") {dummuri = uriairport};
    if (method === "CAR") {dummuri = uricars};
    if (method === "HOTEL") {
      var options = {
        method: "GET",
        url: dummuri,
        params: { name: location, search_type: "HOTEL" },
        headers: {
          "X-RapidAPI-Key":
            '9dac82d08fmshd5fd50a1ce5d728p1d63dajsn47ccb1ccda9b',
          "X-RapidAPI-Host": "priceline-com-provider.p.rapidapi.com",
        },
      };
    } else {
      var options = {
        method: "GET",
        url: dummuri,
        params: { name: location },
        headers: {
          "X-RapidAPI-Key":
            '9dac82d08fmshd5fd50a1ce5d728p1d63dajsn47ccb1ccda9b',
          "X-RapidAPI-Host": "priceline-com-provider.p.rapidapi.com",
        },
      };
    }

    let startvar = await axios.request(options).then(function (response) {
        return response.data
      }).catch(function (error) {
        console.error("Could not find location data.");
      });

    if (method === "HOTEL") {dummuri = urihotel};
    if (method === "AIRPORT") {dummuri = uriairport};
    if (method === "CAR") {dummuri = uricars};

    var hoptions = {
      method: "GET",
      url: urihotel,
      params: { name: destination, search_type: "HOTEL" },
      headers: {
        "X-RapidAPI-Key": '9dac82d08fmshd5fd50a1ce5d728p1d63dajsn47ccb1ccda9b',
        "X-RapidAPI-Host": "priceline-com-provider.p.rapidapi.com",
      },
    };

    var options2 = {
      method: "GET",
      url: dummuri,
      params: { name: destination },
      headers: {
        "X-RapidAPI-Key": '9dac82d08fmshd5fd50a1ce5d728p1d63dajsn47ccb1ccda9b',
        "X-RapidAPI-Host": "priceline-com-provider.p.rapidapi.com",
      },
    };

    let destvar = await axios.request(options2).then(function (response) {
        return response.data;
      }).catch(function (error) {
        console.error("Could not find destination data");
      });

    let hotelvar = await axios.request(hoptions).then(function (response) {
        return response.data;
      }).catch(function (error) {
        console.error("Could not find hotel data");
      });

    console.log(startDate + "," + endDate);
    console.log(startvar[0].id + "," + destvar[0].id);
    console.log(destvar[0].id + "," + startvar[0].id);

    if (method == "AIRPORT") {
      var options = {
        method: "GET",
        url: "https://priceline-com-provider.p.rapidapi.com/v2/flight/roundTrip",
        params: {
          departure_date: startDate + "," + endDate,
          adults: "1",
          sid: "iSiX639",
          destination_airport_code: startvar[0].id + "," + destvar[0].id,
          origin_airport_code: destvar[0].id + "," + startvar[0].id,
        },
        headers: {
          "X-RapidAPI-Key":
            '9dac82d08fmshd5fd50a1ce5d728p1d63dajsn47ccb1ccda9b',
          "X-RapidAPI-Host": "priceline-com-provider.p.rapidapi.com",
        },
      };

      finalData = await axios.request(options).then(function (response) {
          return response.data.getAirFlightRoundTrip.results.air_search_rsp.total_trip_summary;
        }).catch(function (error) {
          console.error("Could not find flight data.")
        });
    }

    var options = {
      method: "GET",
      url: "https://priceline-com-provider.p.rapidapi.com/v1/hotels/search",
      params: {
        sort_order: "HDR",
        location_id: hotelvar[0].cityID,
        date_checkout: endDate,
        date_checkin: startDate,
        star_rating_ids: "3.0,3.5,4.0,4.5,5.0",
        rooms_number: "1",
        amenities_ids: "FINTRNT,FBRKFST",
      },
      headers: {
        "X-RapidAPI-Key": '9dac82d08fmshd5fd50a1ce5d728p1d63dajsn47ccb1ccda9b',
        "X-RapidAPI-Host": "priceline-com-provider.p.rapidapi.com",
      },
    };

    let tripDataH = await axios.request(options).then(function (response) {
        hold2data = response.data;
        return hold2data;
      }).catch(function (error) {
        console.error("Could not find hotels final data");
      });

    if (method == "CAR") {
      var options = {
        method: "GET",
        url: "https://priceline-com-provider.p.rapidapi.com/v1/cars-rentals/search",
        params: {
          location_pickup: destvar[0].cityID,
          date_time_return: endDate + " 13:00:00",
          date_time_pickup: startDate + " 13:00:00",
          location_return: destvar[0].cityID,
        },
        headers: {
          "X-RapidAPI-Key":
            '9dac82d08fmshd5fd50a1ce5d728p1d63dajsn47ccb1ccda9b',
          "X-RapidAPI-Host": "priceline-com-provider.p.rapidapi.com",
        },
      };

      finalData = await axios.request(options).then(function (response) {
          return response.data;
        }).catch(function (error) {
          console.log("Could not find the data.")
        });
    }

    console.log(tripDataH.hotels[0].ratesSummary.minPrice);
    hotelstr = JSON.stringify(tripDataH.hotels);

    if (method === "AIRPORT") {
      var min = tripData.minTotalFare + parseInt(tripDataH.hotels[0].ratesSummary.minPrice);
      var max = tripData.maxTotalFare + parseInt(tripDataH.hotels[0].ratesSummary.minPrice);
      var pricerange = min + "-" + max;
    };
    
    if (method === "CAR") {
      console.log(tripData.vehicleRates[0].id);
    };
    var object = {
      price: pricerange,
      location: location,
      destination: destination,
      method: method,
      startDate: startDate,
      endDate: endDate,
    };

    const Tripdata = await Trip.create(object);
    console.log(Tripdata);
    res.status(200).json(Tripdata);
  } catch (err) {
    res.status(400).json(err);
  }
});

// GET all trips
router.get("/", async (req, res) => {
  try {
    const tripdata = await Trip.findAll();
    res.status(200).json(tripdata);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single trip
router.get("/:id", async (req, res) => {
  try {
    const tripdata = await Trip.findByPk(req.params.id, {
      where: {
        id: req.params.id,
      },
    });
    if (!tripdata) {
      res.status(404).json({ message: "No trip found with that id!" });
      return;
    }
    res.status(200).json(tripdata);
  } catch (err) {
    res.status(500).json(err);
  }
});


// DELETE a Trip
router.delete("/:id", async (req, res) => {
  try {
    const Tripdata = await Trip.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!Tripdata) {
      res.status(404).json({ message: "No Trip found with that id!" });
      return;
    }

    res.status(200).json(Tripdata);
  } catch (err) {
    res.status(500).json(err);
  }
});
/* var hotelobject= {
              names:[finaldataH[0].name,finaldataH[1].name,finaldataH[2].name,finaldataH[3].name,finaldataH[4].name],
              images:[finaldataH[0].thumbnailUrl,finaldataH[1].thumbnailUrl,finaldataH[2].thumbnailUrl,finaldataH[3].thumbnailUrl,finaldataH[4].thumbnailUrl],
              rating:[finaldataH[0].starRating,finaldataH[1].starRating,finaldataH[2].starRating,finaldataH[3].starRating,finaldataH[4].starRating],
              minprice:[finaldataH[0].ratesSummary.minPrice,finaldataH[1].ratesSummary.minPrice,finaldataH[2].ratesSummary.minPrice,finaldataH[3].ratesSummary.minPrice,finaldataH[4].ratesSummary.minPrice]
            }*/

module.exports = router;
