const router = require('express').Router();
const express = require('express');
const path = require('path');
const axios = require("axios");
const app = express();
const { User, Trip } = require('../../models');

  
router.post('/', async (req, res) => {
  try {
    let finaldata
var sloc = req.body.location
var eloc = req.body.destination
var sdate = req.body.startDate
var edate = req.body.endDate
var method = req.body.method
console.log(sloc,eloc,method)
var dummuri;

  const urihotel = 'https://priceline-com-provider.p.rapidapi.com/v1/hotels/locations'
  const uriairport = 'https://priceline-com-provider.p.rapidapi.com/v1/flights/locations';
  const uricars = 'https://priceline-com-provider.p.rapidapi.com/v1/cars-rentals/locations';
    let origindata;
    let destindata;
    if(method==="HOTEL"){dummuri=urihotel}
    if(method==="AIRPORT"){dummuri=uriairport}
    if(method==="CAR"){dummuri=uricars}
  if(method === "HOTEL"){
  var options = {
  method: 'GET',
  url: urihotel,
  params: {name: sloc, search_type: "HOTEL"},
  headers: {
    'X-RapidAPI-Key': '9dac82d08fmshd5fd50a1ce5d728p1d63dajsn47ccb1ccda9b',
    'X-RapidAPI-Host': 'priceline-com-provider.p.rapidapi.com'
  }
  };
  }else{
  var options={
    method: 'GET',
    url: dummuri,
    params: {name: sloc},
    headers: {
      'X-RapidAPI-Key': '9dac82d08fmshd5fd50a1ce5d728p1d63dajsn47ccb1ccda9b',
      'X-RapidAPI-Host': 'priceline-com-provider.p.rapidapi.com'
    }
  }
  }
  let startvar = await axios.request(options).then(function (response) {
     return response.data
  }).catch(function (error) {
  console.error("error everywhere");
  });
  
  
  if(method==="HOTEL"){dummuri=urihotel}
      if(method==="AIRPORT"){dummuri=uriairport}
      if(method==="CAR"){dummuri=uricars}
 
  var hoptions = {
    method: 'GET',
    url: urihotel,
    params: {name: eloc, search_type: "HOTEL"},
    headers: {
      'X-RapidAPI-Key': '9dac82d08fmshd5fd50a1ce5d728p1d63dajsn47ccb1ccda9b',
      'X-RapidAPI-Host': 'priceline-com-provider.p.rapidapi.com'
    }
  };
 
    var options2={
      method: 'GET',
      url: dummuri,
      params: {name: eloc},
      headers: {
        'X-RapidAPI-Key': '9dac82d08fmshd5fd50a1ce5d728p1d63dajsn47ccb1ccda9b',
        'X-RapidAPI-Host': 'priceline-com-provider.p.rapidapi.com'
      }
  }
  
  let destvar = await axios.request(options2).then(function (response) {
    return response.data
  }).catch(function (error) {
    console.error("error there");
  });

  let hotelvar = await axios.request(hoptions).then(function (response) {
    return response.data
  }).catch(function (error) {
    console.error("error here ");
  });
  console.log(sdate+','+edate)
  console.log(startvar[0].id+","+destvar[0].id)
  console.log(destvar[0].id+","+startvar[0].id)
      if(method=="AIRPORT"){
      var options = {
          method: 'GET',
          url: 'https://priceline-com-provider.p.rapidapi.com/v2/flight/roundTrip',
          params: {
            departure_date: sdate+','+edate,
            adults: '1',
            sid: 'iSiX639',
            destination_airport_code: startvar[0].id+","+destvar[0].id,
            origin_airport_code: destvar[0].id+","+startvar[0].id,
           
          },
          headers: {
            'X-RapidAPI-Key': '9dac82d08fmshd5fd50a1ce5d728p1d63dajsn47ccb1ccda9b',
            'X-RapidAPI-Host': 'priceline-com-provider.p.rapidapi.com'
          }
        };
        
        finaldata = await axios.request(options).then(function (response) {
            return response.data.getAirFlightRoundTrip.results.air_search_rsp.total_trip_summary
        }).catch(function (error) {
            console.error("error caught");
        });
      }
     
          var options = {
              method: 'GET',
              url: 'https://priceline-com-provider.p.rapidapi.com/v1/hotels/search',
              params: {
                sort_order: 'HDR',
                location_id: hotelvar[0].cityID,
                date_checkout: edate,
                date_checkin: sdate,
                star_rating_ids: '3.0,3.5,4.0,4.5,5.0',
                rooms_number: '1',
                amenities_ids: 'FINTRNT,FBRKFST'
              },
              headers: {
                'X-RapidAPI-Key': '9da1ae7b41msh01fa9a23de84f6cp15b1cajsnf2cabb607a88',
                'X-RapidAPI-Host': 'priceline-com-provider.p.rapidapi.com'
              }
            };
            
            let finaldataH = await axios.request(options).then(function (response) {
               hold2data = response.data
                 return hold2data
            }).catch(function (error) {
                console.error("error caught");
            });
          
          if(method=="CAR"){
           var options = {
              method: 'GET',
              url: 'https://priceline-com-provider.p.rapidapi.com/v1/cars-rentals/search',
              params: {
                location_pickup: destvar[0].cityID,
                date_time_return: edate+ ' 13:00:00',
                date_time_pickup: sdate+ ' 13:00:00',
                location_return: destvar[0].cityID
              },
              headers: {
                'X-RapidAPI-Key': '9dac82d08fmshd5fd50a1ce5d728p1d63dajsn47ccb1ccda9b',
                'X-RapidAPI-Host': 'priceline-com-provider.p.rapidapi.com'
              }
            };
                
               finaldata= await axios.request(options).then(function (response) {
                  return response.data
                }).catch(function (error) {
                });
              }
             if(method==="AIRPORT"){
             var min =finaldata.minTotalFare + parseInt(finaldataH.hotels[0].ratesSummary.minPrice)
             var max = finaldata.maxTotalFare + parseInt(finaldataH.hotels[0].ratesSummary.minPrice)
             var pricerange = min+"-"+max;
            }
            if(method==="CAR"){
           
              pricerange = parseInt(finaldata.vehicleRates[Object.keys(finaldata.vehicleRates)[0]].rates.USD.basePrices.DAILY)
             }
             console.log(finaldataH.hotels[0].starRating)
             console.log(finaldataH.hotels[0].thumbnailUrl)
             console.log(finaldataH.hotels[0].name)
             console.log(finaldataH.hotels[0].ratesSummary.minPrice)
             var hotelobject= {
              rating:[finaldataH.hotels[0].starRating],
              images:[finaldataH.hotels[0].thumbnailUrl],
              names:[finaldataH.hotels[0].name],
              minprice:[finaldataH.hotels[0].ratesSummary.minPrice]
            }
            console.log(hotelobject)
           hotf=JSON.stringify(hotelobject)
           // console.log(hotelobject);
              var object= {
               price: pricerange,
               location: sloc,
               destination: eloc,
               transportation: method,
               startDate: sdate,
               endDate: edate,
               hotels: hotf,
               cars: "e",
               flights:"e"
              }
            
             
    const Tripdata = await Trip.create(object);
    console.log(Tripdata);
    res.status(200).json(Tripdata);
  } catch (err) {
    res.status(400).json(err);
  }
});
// GET all trips
router.get('/', async (req, res) => {
  try {
    const tripdata = await Trip.findAll();
    res.status(200).json(tripdata);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single trip
router.get('/:id', async (req, res) => {
  try {
    const tripdata = await Trip.findByPk(req.params.id, {
      where: {
        id: req.params.id,
      },
    });
    if (!tripdata) {
      res.status(404).json({ message: 'No trip found with that id!' });
      return;
    }
    res.status(200).json(tripdata);
  } catch (err) {
    res.status(500).json(err);
  }
});

// CREATE a trip


// DELETE a Trip
router.delete('/:id', async (req, res) => {
  try {
    const Tripdata = await Trip.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!Tripdata) {
      res.status(404).json({ message: 'No Trip found with that id!' });
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

