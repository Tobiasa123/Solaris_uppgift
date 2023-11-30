
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
    infoCircumference.innerHTML =  `OMKRETS <br/>${newCircumference}`;
    infoDistanceSun.innerHTML = `KM FRÅN SOLEN <br/>${newCircumference}`;
    infoMaxTemp.innerHTML = `MAX TEMPERATUR <br/>${newMaxTemp}`;
    infoMinTemp.innerHTML = `MIN TEMPERATUR <br/>${newMinTemp}`;

    infoMoon.innerHTML = `MOONS<br/>`;
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
                    newPlanet.classList.add("merkurius","merkuriusColor")
                    break;
                case 2:
                    newPlanet.classList.add("venus","venusColor")
                    break;
                case 3:
                    newPlanet.classList.add("jorden","jordenColor")
                    break;
                case 4:
                    newPlanet.classList.add("mars","marsColor")
                    break;
                case 5:
                    newPlanet.classList.add("jupiter","jupiterColor")
                    break;
                case 6:
                    newPlanet.classList.add("saturnus","saturnusColor")
                    let newRing = document.createElement("div");
                    newRing.classList.add("saturnusRing");
                    newPlanet.appendChild(newRing);
                    break;
                case 7:
                    newPlanet.classList.add("uranus","uranusColor")
                    break;
                case 8:
                    newPlanet.classList.add("neptunus","neptunusColor")
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
                if(element.name == "Merkurius"){
                    largePlanet.classList.add('merkuriusColor')
                } 
                else if (element.name == "Venus"){
                    largePlanet.classList.add('venusColor')
                } 
                else if (element.name == "Jorden"){
                    largePlanet.classList.add('jordenColor')
                } 
                else if (element.name == "Mars"){
                    largePlanet.classList.add('marsColor')
                } 
                else if (element.name == "Jupiter"){
                    largePlanet.classList.add('jupiterColor')
                } 
                else if (element.name == "Saturnus"){
                    largePlanet.classList.add('saturnusColor')
                } 
                else if (element.name == "Uranus"){
                    largePlanet.classList.add('uranusColor')
                } 
                else if (element.name == "Neptunus"){
                    largePlanet.classList.add('neptunusColor')
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

        planetInfoWrapper.style.display = "flex"
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
    largePlanet.classList.remove('merkuriusColor','venusColor','jordenColor','marsColor','jupiterColor','saturnusColor','uranusColor','neptunusColor')
    largePlanet.classList.add('sunColor')
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
            newPlanet.classList.add('sunColor')
            largePlanetWrapper.appendChild(newPlanet)
            largePlanet = newPlanet;

            newPlanet.addEventListener('click', () => {
                hideAllPlanets();
                changeInfoText(element.name, element.latinName, element.desc, element.circumference, element.distance, element.temp.day, element.temp.night, element.moons);
                if(element.name == "Solen"){
                    newPlanet.classList.add('sunColor')
                }
                
            });
        }
        

    }); 
}
createLargePlanet()