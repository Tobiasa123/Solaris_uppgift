
//variabler och element 
let smallPlanetWrapper = document.querySelector('.smallPlanetWrapper')

let largePlanetWrapper = document.querySelector('.largePlanetWrapper')

let planetWrapper = document.querySelector('.planetWrapper')

let planetInfoWrapper = document.querySelector('.planetInfoWrapper')

let infoName =  document.querySelector('.info-h1')
let infoLatinName =  document.querySelector('.info-h2')
let infoPara =  document.querySelector('.info-p')
let infoCircumference =  document.querySelector('#info-circumference')
let infoDistanceSun =  document.querySelector('#info-distanceSun')
let infoMaxTemp =  document.querySelector('#info-maxTemp')
let infoMinTemp =  document.querySelector('#info-minTemp')
let infoMoon =  document.querySelector('#info-moon')


//få key med post
async function getKey(){
    const response = await fetch('https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/keys', {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
    })
    const data = await response.json();
    //logga min key
    //console.log(`min key: ${data.key}`);
    //returera min key för att använda i getdata
    return(data.key)
}
//få data med get
async function getData(){
    const response =  await fetch("https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/bodies", {
        method: 'GET',
        headers: {'x-zocom': await getKey()}
    })
    const data = await response.json()

    //returnera datan för att minska requests
    return data;
}
//getplanetinfo loggar planternas attributer
async function getPlanetInfo(){
    const data =  await getData()
    //logga min data
    data.bodies.forEach(element => {
        console.log(element)
    });
}
getPlanetInfo()

//funktion för att ändra texten, används i createsmallplanets
function changeInfoText(newName, newLatinName, newParagraph, newCircumference, newDistanceSun, newMaxTemp, newMinTemp, newMoon) {
    infoName.innerText = newName;
    infoLatinName.innerText = newLatinName;
    infoPara.innerText = newParagraph;
    infoCircumference.innerText =  `OMKRETS  ${newCircumference}`;
    infoDistanceSun.innerText = `KM FRÅN SOLEN ${newCircumference}`;
    infoMaxTemp.innerText = `MAX TEMPERATUR ${newMaxTemp}`;
    infoMinTemp.innerText = `MIN TEMPERATUR ${newMinTemp}`;

    infoMoon.innerText = "MOONS:";
    newMoon.forEach((moon) => {
    infoMoon.innerText += `"${moon}" `; 
});
}


//funtion för att skapa alla små planeterna som man sen stylar i css
async function createSmallPlanets(){
    const data =  await getData()
    //logga min data
    data.bodies.forEach(element => {
        let newPlanet = document.createElement('div')
        if(element.id!=0){
            newPlanet.classList.add("smallPlanet")
            switch (element.id) {
                case 1:
                    newPlanet.classList.add("merkurius")
                    break;
                case 2:
                    newPlanet.classList.add("venus")
                    break;
                case 3:
                    newPlanet.classList.add("jorden")
                    break;
                case 4:
                    newPlanet.classList.add("mars")
                    break;
                case 5:
                    newPlanet.classList.add("jupiter")
                    break;
                case 6:
                    newPlanet.classList.add("saturnus")
                    break;
                case 7:
                    newPlanet.classList.add("uranus")
                    break;
                case 8:
                    newPlanet.classList.add("neptunus")
                    break;
                default:
                    console.log("whoops")
                    break;
            }

            //lägg till eventlisteners för hide och show
            //när vi klickar vill vi att all infotext ändras till texten om planeten vi valt
            newPlanet.addEventListener('click', () => {
                hideAllPlanets();
                changeInfoText(element.name, element.latinName, element.desc, element.circumference, element.distance, element.temp.day, element.temp.night, element.moons);
                if(element.name == "Jorden"){
                    largePlanet.style.backgroundColor = 'darkblue';
                }

            });

            planetInfoWrapper.addEventListener('click', showAllPlanets);

            //lägg till elementt i wrappern
            newPlanet.innerText = element.name; // Lägg till 'planetText' här
            smallPlanetWrapper.appendChild(newPlanet)
        }
    });
}
createSmallPlanets()

function hideAllPlanets() {

        //console.log(event.target)

        planetInfoWrapper.style.display = "block"
        let allSmallPlanets = document.querySelectorAll('.smallPlanet');

        allSmallPlanets.forEach(planet => {
        planet.classList.add('hidden');
        });
}

function showAllPlanets() {
    planetInfoWrapper.style.display = "none"
    let allSmallPlanets = document.querySelectorAll('.smallPlanet');
    allSmallPlanets.forEach(planet => {
        planet.classList.remove('hidden');
    });
    largePlanet.style.backgroundColor = 'yellow';
}

//skapa global variabel för largeplanet så vi kan ändra färgen till klickade små planterna
let largePlanet;

//skapa den stora planeten 
async function createLargePlanet(){
    const data =  await getData()

    data.bodies.forEach(element => {

        if(element.id == 0){
            let newPlanet = document.createElement('div')
            newPlanet.classList.add("largePlanet")
            newPlanet.innerText = element.name
            largePlanetWrapper.appendChild(newPlanet)
            largePlanet = newPlanet;

            newPlanet.addEventListener('click', () => {
                hideAllPlanets();
                changeInfoText(element.name, element.latinName, element.desc, element.circumference, element.distance, element.temp.day, element.temp.night, element.moons);
                if(element.name == "Solen"){
                    newPlanet.style.backgroundColor = "yellow"
                }
                
            });
        }
        

    }); 
}
createLargePlanet()