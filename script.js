
//variabler och element 
let smallPlanetWrapper = document.querySelector('.smallPlanetWrapper')

let planetInfoWrapper = document.querySelector('.planetInfoWrapper')

let largePlanetWrapper = document.querySelector('.largePlanetWrapper')


let planetWrapper = document.querySelector('.planetWrapper')

//ändrar backgrunds stylingen när man klickat på planeten
function changeBackgroundStyle(){
    planetWrapper.style.background = "linear-gradient(90deg, rgb(53, 109, 172) 0%, rgb(4, 4, 86) 100%)"
}
function defaultBackgroundStyle(){
}



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
    infoDistanceSun.innerHTML = `KM FRÅN SOLEN <br/>${newDistanceSun}`;
    infoMaxTemp.innerHTML = `MAX TEMPERATUR <br/>${newMaxTemp}`;
    infoMinTemp.innerHTML = `MIN TEMPERATUR <br/>${newMinTemp}`;

    infoMoon.innerHTML = `MOONS<br/>`;
    infoMoon.innerHTML += newMoon.join(", ");
}


//funtion för att skapa alla små planeterna som man sen stylar i css
async function createSmallPlanets(){
    const data =  await getData()

    //jag lägger till eventlisteners och skapar div element direkt i switch,
    //innan gjorde jag det utanför switch och det funkade men saturnus ringar förstörde det helt
    data.bodies.forEach(element => {
        
        if(element.id!=0){
            switch (element.id) {
                case 1:
                    let newMerkurius = document.createElement('div')
                    newMerkurius.classList.add("smallPlanet","merkurius","merkuriusColor")
                    smallPlanetWrapper.appendChild(newMerkurius)
                    newMerkurius.addEventListener('click', () => {
                        hideAllPlanets();
                        changeInfoText(element.name, element.latinName, element.desc, element.circumference, element.distance, element.temp.day, element.temp.night, element.moons);
                        largePlanet.classList.add('merkuriusColor')
                    });
                    break;
                case 2:
                    let newVenus = document.createElement('div')
                    newVenus.classList.add("smallPlanet","venus","venusColor")
                    smallPlanetWrapper.appendChild(newVenus)
                    newVenus.addEventListener('click', () => {
                        hideAllPlanets();
                        changeInfoText(element.name, element.latinName, element.desc, element.circumference, element.distance, element.temp.day, element.temp.night, element.moons);
                        largePlanet.classList.add('venusColor')
                    });
                    break;
                case 3:
                    let newJorden = document.createElement('div')
                    newJorden.classList.add("smallPlanet","jorden","jordenColor")
                    smallPlanetWrapper.appendChild(newJorden)
                    newJorden.addEventListener('click', () => {
                        hideAllPlanets();
                        changeInfoText(element.name, element.latinName, element.desc, element.circumference, element.distance, element.temp.day, element.temp.night, element.moons);
                        largePlanet.classList.add('jordenColor')
                    });
                    break;
                case 4:
                    let newMars = document.createElement('div')
                    newMars.classList.add("smallPlanet","mars","marsColor")
                    smallPlanetWrapper.appendChild(newMars)
                    newMars.addEventListener('click', () => {
                        hideAllPlanets();
                        changeInfoText(element.name, element.latinName, element.desc, element.circumference, element.distance, element.temp.day, element.temp.night, element.moons);
                        largePlanet.classList.add('marsColor')
                    });
                    break;
                case 5:
                    let newJupiter = document.createElement('div')
                    newJupiter.classList.add("smallPlanet","jupiter","jupiterColor")
                    smallPlanetWrapper.appendChild(newJupiter)
                    newJupiter.addEventListener('click', () => {
                        hideAllPlanets();
                        changeInfoText(element.name, element.latinName, element.desc, element.circumference, element.distance, element.temp.day, element.temp.night, element.moons);
                        largePlanet.classList.add('jupiterColor')
                        planetWrapper.style.background = planetWrapperStylingBackground
                    });
                    break;
                case 6:
                    //Valde att skapa nytt element inne i varje case istället för utanför, pga fick int saturnus ringar att fungera annars
                    let newSaturnusWrapper = document.createElement('div');
                    newSaturnusWrapper.classList.add('saturnusWrapper');
                    let newSaturnus = document.createElement('div');
                    newSaturnus.classList.add("smallPlanet", "saturnus","saturnusColor");
                    let newRing = document.createElement("div");
                    newRing.classList.add("saturnusRing");
                    newSaturnus.appendChild(newRing);  //Lägg till newRing som ett barn till newSaturnus
                    newSaturnusWrapper.appendChild(newSaturnus);
                    smallPlanetWrapper.appendChild(newSaturnusWrapper);
                    newSaturnus.addEventListener('click', () => {
                        hideAllPlanets();
                        changeInfoText(element.name, element.latinName, element.desc, element.circumference, element.distance, element.temp.day, element.temp.night, element.moons);
                        largePlanet.classList.add('saturnusColor')
                    });
                    break;
                case 7:
                    let newUranus = document.createElement('div')
                    newUranus.classList.add("smallPlanet","uranus","uranusColor")
                    smallPlanetWrapper.appendChild(newUranus)
                    newUranus.addEventListener('click', () => {
                        hideAllPlanets();
                        changeInfoText(element.name, element.latinName, element.desc, element.circumference, element.distance, element.temp.day, element.temp.night, element.moons);
                        largePlanet.classList.add('uranusColor')
                    });
                    break;
                case 8:
                    let newNeptunus = document.createElement('div')
                    newNeptunus.classList.add("smallPlanet","neptunus","neptunusColor")
                    smallPlanetWrapper.appendChild(newNeptunus)
                    newNeptunus.addEventListener('click', () => {
                        hideAllPlanets();
                        changeInfoText(element.name, element.latinName, element.desc, element.circumference, element.distance, element.temp.day, element.temp.night, element.moons);
                        largePlanet.classList.add('neptunusColor')
                    });
                    break;
                default:
                    console.log("whoops")
                    break;
            }
            //När man klickar på newplanetwrapper förvinner info sidan
            planetInfoWrapper.addEventListener('click', showAllPlanets);
            planetInfoWrapper.addEventListener('click', makeClickable);
        }
    });
}
createSmallPlanets()

//funktioner för att göra den stora planten ocklickbar eller klickbar när infosidan visas
function makeUnclickable(){
    largePlanet.style.pointerEvents = "none"

}
function makeClickable(){
    largePlanet.style.pointerEvents = "auto"
    
}
function hideAllPlanets() {

        //console.log(event.target)

        planetInfoWrapper.style.display = "flex"
        let allSmallPlanets = document.querySelectorAll('.smallPlanet');

        allSmallPlanets.forEach(planet => {
        planet.classList.add('hidden');
        });
        makeUnclickable()
        changeBackgroundStyle()
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