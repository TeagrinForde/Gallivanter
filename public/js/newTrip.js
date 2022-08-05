

var swapButton = document.getElementById('swap');
var dropButton = document.getElementById('dropBtn');
var allBtns = document.getElementsByName('userBtn');

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.datepicker');
    var instances = M.Datepicker.init(elems, {
        format: 'mm-dd-yyyy',
        minDate: new Date(),
        firstDay: 0,
});
})

document.addEventListener('DOMContentLoaded', function() {
    var elems = document.querySelectorAll('.dropdown-trigger');
    var instances = M.Dropdown.init(elems, {});
});


// const card = document.getElementById("pac-card");
//   const input = document.getElementsByClassName("pac-input");
//   const biasInputElement = document.getElementById(
//     "use-location-bias"
//   );
//   const strictBoundsInputElement = document.getElementById(
//     "use-strict-bounds"
//   );
//   const options = {
//     fields: ["formatted_address", "geometry", "name"],
//     strictBounds: false,
//     types: ["establishment"],
//   };

//   map.controls[google.maps.ControlPosition.TOP_LEFT].push(card);

//   const autocomplete = new google.maps.places.Autocomplete(input, options);

//   autocomplete.bindTo("bounds", map);

//   const infowindow = new google.maps.InfoWindow();
//   const infowindowContent = document.getElementById("infowindow-content");
//   infowindow.setContent(infowindowContent);

//   const marker = new google.maps.Marker({
//     map,
//     anchorPoint: new google.maps.Point(0, -29),
//   });

//   autocomplete.addListener("place_changed", () => {
//     infowindow.close();
//     marker.setVisible(false);

//     const place = autocomplete.getPlace();

//     if (!place.geometry || !place.geometry.location) {
//       window.alert("No details available for input: '" + place.name + "'");
//       return;
//     }

//     if (place.geometry.viewport) {
//       map.fitBounds(place.geometry.viewport);
//     } else {
//       map.setCenter(place.geometry.location);
//       map.setZoom(17);
//     }

//     marker.setPosition(place.geometry.location);
//     marker.setVisible(true);

//     infowindowContent.children["place-name"].textContent = place.name;
//     infowindowContent.children["place-address"].textContent =
//       place.formatted_address;
//     infowindow.open(map, marker);
//   });

//   function setupClickListener(id, types) {
//     const radioButton = document.getElementById(id);

//     radioButton.addEventListener("click", () => {
//       autocomplete.setTypes(types);
//       input.value = "";
//     });
//   }

//   setupClickListener("changetype-all", []);
//   setupClickListener("changetype-address", ["address"]);
//   setupClickListener("changetype-establishment", ["establishment"]);
//   setupClickListener("changetype-geocode", ["geocode"]);
//   setupClickListener("changetype-cities", ["(cities)"]);
//   setupClickListener("changetype-regions", ["(regions)"]);

//   biasInputElement.addEventListener("change", () => {
//     if (biasInputElement.checked) {
//       autocomplete.bindTo("bounds", map);
//     } else {
//       autocomplete.unbind("bounds");
//       autocomplete.setBounds({ east: 180, west: -180, north: 90, south: -90 });
//       strictBoundsInputElement.checked = biasInputElement.checked;
//     }

//     input.value = "";
//   });

//   strictBoundsInputElement.addEventListener("change", () => {
//     autocomplete.setOptions({
//       strictBounds: strictBoundsInputElement.checked,
//     });

//     if (strictBoundsInputElement.checked) {
//       biasInputElement.checked = strictBoundsInputElement.checked;
//       autocomplete.bindTo("bounds", map);
//     }

//     input.value = "";
//   });

// export {};

for(var i = 0; i < 3; i++){
    let iteration = 'a'+i;
    var listEl = document.getElementById(iteration);
   
    listEl.addEventListener('click', function(){
        
        dropButton.textContent = this.lastChild.lastChild.textContent;
        allBtns.forEach(allBtns => allBtns.disabled=true);
        const userInput = {
            depart: document.getElementById('departForm').value,
            destination: document.getElementById('goingTo').value,
            departDate: document.getElementById('dateLeave').value,
            arriveDate: document.getElementById('dateReturn').value,
            travelType: dropButton.textContent


        }
        console.log(userInput.depart,userInput.destination,userInput.departDate,userInput.travelType)
        

    })

}

swapButton.addEventListener('click',function(){
 
    var depart = document.getElementById('departForm');
    var destination = document.getElementById('goingTo');
    var input1 = document.getElementById('departForm').value;
    var input2 = document.getElementById('goingTo').value;
    depart.value = input2;
    destination.value = input1;
    var departDate = document.getElementById('dateLeave').value;
    var arriveDate = document.getElementById('dateReturn').value;

})
const newTripFormhandler = async (event) => {
    allBtns.forEach(allBtns => allBtns.disabled=true);
    const invals = {
        depart: document.getElementById('departForm').value,
        destination: document.getElementById('goingTo').value,
        departDate: document.getElementById('dateLeave').value,
        arriveDate: document.getElementById('dateReturn').value,
        travelType: event.target.textContent
    }
    var cut = invales.departDate.split("-")
    console.log(cut);
    const userInputs = {
        price:1,
        location: document.getElementById('departForm').value,
        destination: document.getElementById('goingTo').value,
        startDate: "2022-11-16",
        endDate: '2022-11-15',
        transportation: "AIRPORT",
        user_id:1
    }
    console.log(userInputs.location,userInputs.destination,userInputs.startDate,userInputs.endDate,userInputs.price, userInputs.user_id)
    console.log(userInputs);
    if (1==2) {
        console.log("being read");
        const response = await fetch('/api/Trips', {
          method: 'POST',
          body: JSON.stringify(userInputs),
          headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
         console.log("YES")
        } else {
          alert(response.statusText);
        }
      }
    

}

            


  dropButton.addEventListener('click', newTripFormhandler);
// window.initMap = initMap;