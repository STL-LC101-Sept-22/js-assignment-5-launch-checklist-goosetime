// Write your helper functions here!
require('isomorphic-fetch');

function addDestinationInfo(document, name, diameter, star, distance, moons, imageUrl) {
    let destinationText = document.getElementById('missionTarget');

    destinationText.innerHTML = `
                <h2>Mission Destination</h2>
                <ol>
                    <li>Name: ${name}</li>
                    <li>Diameter: ${diameter}</li>
                    <li>Star: ${star}</li>
                    <li>Distance from Earth: ${distance}</li>
                    <li>Number of Moons: ${moons}</li>
                </ol>
                <img src="${imageUrl}">`;
};

function validateInput(testInput) {
   if (testInput === "") {
    return "Empty";
   } else if (isNaN(Number(testInput))) {
    return "Not a Number";
   } else if (typeof Number(testInput) === "number") {
    return "Is a Number";
   }
};

function formSubmission(document, list, pilot, copilot, fuelLevel, cargoLevel) {
    
    let pilotStatus = document.getElementById('pilotStatus');
    let copilotStatus = document.getElementById('copilotStatus');
    let fuelStatus = document.getElementById('fuelStatus');
    let cargoStatus = document.getElementById('cargoStatus');

    //check if submission has all items and that all items are valid

    if (validateInput(pilot) === "Empty" || validateInput(copilot) === "Empty" || validateInput(fuelLevel) === "Empty" || validateInput(cargoLevel) === "Empty") {
       
        alert("All items are required for form submission");

    } else if (validateInput(pilot) === "Is a Number" ||validateInput(copilot) === "Is a Number") {
       
        alert("Pilot and Copilot names must be text.");

    } else if (validateInput(fuelLevel) === "Not a Number" ||validateInput(cargoLevel) === "Not a Number") {
        
        alert("Cargo Mass and Fuel Level must be numbers.");

    } else if (validateInput(pilot) === "Not a Number" && validateInput(copilot) === "Not a Number" && validateInput(fuelLevel) === "Is a Number" && validateInput(cargoLevel) === "Is a Number") {
       
        pilotStatus.innerHTML = `Pilot ${pilot} is ready for launch`;
        copilotStatus.innerHTML = `Co-pilot ${copilot} is ready for launch`;

        list.style.visibility = 'visible';
    }

    let launchOutput = document.getElementById('launchStatus');

    //check fuel level, if below 10,000 change list to visable and h2 message to red

   if (fuelLevel < 10000) {

    launchOutput.innerHTML = 'Shuttle not ready for launch';
    launchOutput.style.color = 'red';
    fuelStatus.innerHTML = `Fuel level too low for launch`;

   }

    //check cargo, if above 10,000 change list to visable and h2 message to red
   
  if (cargoLevel > 10000) {

    launchOutput.innerHTML = 'Shuttle not ready for launch';
    launchOutput.style.color = 'red';
    cargoStatus.innerHTML = `Cargo mass too heavy for launch`;
    
   }

    //if all good change h2 to green and status
   
    if (fuelLevel >= 10000 && cargoLevel <= 10000) {
        launchOutput.style.color = 'green';
        launchOutput.innerHTML = 'Shuttle is ready for launch'; 
        fuelStatus.innerHTML = `Fuel level high enough for launch`;
        cargoStatus.innerHTML = `Cargo mass low enough for launch`;

    }

};

async function myFetch() {
    let planetsReturned;

    planetsReturned = await fetch("https://handlers.education.launchcode.org/static/planets.json").then( function(response) {
        newResponse = response.json().then( function(json) {
            //console.log(json); //checking!
            return json;
        });

        return newResponse;

    });

    return planetsReturned;

};

function pickPlanet(planets) {
    let pickedIndex = Math.floor(Math.random() * 6);
    return planets[pickedIndex];
};

module.exports.addDestinationInfo = addDestinationInfo;
module.exports.validateInput = validateInput;
module.exports.formSubmission = formSubmission;
module.exports.pickPlanet = pickPlanet; 
module.exports.myFetch = myFetch;
