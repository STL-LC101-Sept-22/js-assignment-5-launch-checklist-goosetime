// Write your JavaScript code here!

/*The studio keeps trying to add these guys, so we'll leave them up here commented out! 

const { pickPlanet, addDestinationInfo } = require("./scriptHelper");
const { myFetch } = require("./scriptHelper");
import {myFetch} from 'scriptHelper.js'; */



window.addEventListener("load", function() {

   let listedPlanets;
   // Set listedPlanetsResponse equal to the value returned by calling myFetch()
   let listedPlanetsResponse = myFetch();
   listedPlanetsResponse.then(function (result) {
       listedPlanets = result;
       console.log(listedPlanets);

   }).then(function () {

       console.log(listedPlanets);
       // Below this comment call the appropriate helper functions to pick a planet fom the list of planets and add that information to your destination.

       let destinationChoice = pickPlanet(listedPlanets);
    
       addDestinationInfo(document, destinationChoice.name, destinationChoice.diameter, destinationChoice.star, destinationChoice.distance, destinationChoice.moons, destinationChoice.image);
   });
   
    const form = document.querySelector("form");

    form.addEventListener("submit", function(event) {
    
        event.preventDefault();

        let pilotResponse = document.querySelector("input[name = pilotName]");
        let copilotResponse = document.querySelector("input[name = copilotName]");
        let fuelResponse = document.querySelector("input[name = fuelLevel]");
        let cargoResponse = document.querySelector("input[name = cargoMass]");
        
        let list = document.getElementById("faultyItems");
        
        let pilot = pilotResponse.value;
        let copilot = copilotResponse.value;
        let fuelLevel = fuelResponse.value;
        let cargoLevel = cargoResponse.value;
    
        formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel);

    });

});


