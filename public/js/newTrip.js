// import * as Utils from './utils.js';

var swapButton = document.getElementById("swap");
var dropButton = document.getElementById("dropBtn");
var allBtns = document.getElementsByName("userBtn");
var userInput = {};

document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll(".datepicker");
  var instances = M.Datepicker.init(elems, {
    format: "yyyy-mm-dd",
    minDate: new Date(),
    firstDay: 0,
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll(".dropdown-trigger");
  var instances = M.Dropdown.init(elems, {});
});

for (var i = 0; i < 2; i++) {
  let iteration = "a" + i;
  var listEl = document.getElementById(iteration);

  listEl.addEventListener("click", function () {
    const location = document.getElementById("location").value;
    const destination = document.getElementById("destination").value;
    const startDate = document.getElementById("startDate").value;
    const endDate = document.getElementById("endDate").value;

    if (location === undefined || destination === undefined || startDate === undefined || endDate === undefined) {
      prompt("Please do not leave any forms blank!");
      return;
    }
    dropButton.textContent = this.lastChild.lastChild.textContent;
    allBtns.forEach((allBtns) => (allBtns.disabled = true));
    newTripFormhandler(event);
  });
}

swapButton.addEventListener("click", function () {
  var depart = document.getElementById("location");
  var destination = document.getElementById("destination");
  var input1 = document.getElementById("location").value;
  var input2 = document.getElementById("destination").value;

  depart.value = input2;
  destination.value = input1;
});
const newTripFormhandler = async (event) => {
  if (event.target.textContent !== "Let's go!") {
    console.log(event.target.textContent);

    allBtns.forEach((allBtns) => (allBtns.disabled = true));
    const userInputs = {
      price: 1,
      location: document.getElementById("location").value,
      destination: document.getElementById("destination").value,
      startDate: document.getElementById("startDate").value,
      endDate: document.getElementById("endDate").value,
      method: event.target.textContent,
      user_id: 1,
    };
    
    console.log(userInputs);
    if (
      (userInputs.location,
      userInputs.destination,
      userInputs.startDate,
      userInputs.endDate,
      userInputs.method)
    ) {
      const response = await fetch("/api/trips", { //this is where it is breaking
        method: "POST",
        body: JSON.stringify(userInputs),
        headers: { "Content-Type": "application/json" },
      });
      if (response.ok) {
        document.location.replace("/myTrip");
      } else {
        alert(response.statusText);
      }
    }
  }
};

dropButton.addEventListener("click", newTripFormhandler);
// window.initMap = initMap;
