
//variabler och element 
let infoName =  document.querySelector('.info-h1')
let infoLatinName =  document.querySelector('.info-h2')
let infoPara =  document.querySelector('.info-p')
let infoCircumference =  document.querySelector('#info-circumference')
let infoDistanceSun =  document.querySelector('#info-distanceSun')
let infoMaxTemp =  document.querySelector('#info-maxTemp')
let infoMinTemp =  document.querySelector('#info-minTemp')
let infoMoon =  document.querySelector('#info-moon')
let smallPlanetWrapper = document.querySelector('.smallPlanetWrapper')
let planetInfoWrapper = document.querySelector('.planetInfoWrapper')
let largePlanetWrapper = document.querySelector('.largePlanetWrapper')
let planetWrapper = document.querySelector('.planetWrapper')

//få key med post
async function getKey(){
    try {
        const response = await fetch('https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/keys', {
            method: 'POST',
            headers: {'Content-Type':'application/json'},
        })
        const data = await response.json();

        //om response inte är ok logga något
        if(!response.ok){
            console.log("Något gick fel..")
            return;
        }

        //returera min key för att använda i getdata
        return(data.key)

    } catch (error) {
        console.log(error)
    }
}
//få data med get
async function getData(){
    try {
        const response =  await fetch("https://n5n3eiyjb0.execute-api.eu-north-1.amazonaws.com/bodies", {
            method: 'GET',
            headers: {'x-zocom': await getKey()} //getKey funktionen som är vår key i headers
        })
        const data = await response.json()

        //om response inte är ok logga något
        if(!response.ok){
            console.log("Något gick fel..")
            return;
        }
        //returnera api data
        return data;

    } catch (error) {
        console.log(error)
    }
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

    //formattera och ta bort decimal med floor
    //circumference
    let formattedCircumference = Math.floor(newCircumference).toLocaleString('sv-SE');
    infoCircumference.innerHTML =  `<h3 class="infoSectionHeader">OMKRETS</h3> <p class="infoSectionPara">${formattedCircumference} km</p>`;
    //distance to sun
    let formattedDistanceSun = Math.floor(newDistanceSun).toLocaleString('sv-SE');
    infoDistanceSun.innerHTML = `<h3 class="infoSectionHeader">KM FRÅN SOLEN</h3> <p class="infoSectionPara">${formattedDistanceSun} km</p>`;
    //maxtemp
    let formattedMaxTemp = Math.floor(newMaxTemp).toLocaleString('sv-SE');
    infoMaxTemp.innerHTML = `<h3 class="infoSectionHeader">MAX TEMPERATUR</h3> <p class="infoSectionPara">${formattedMaxTemp}C</p>`;
    //mintemp
    let formattedMinTemp = Math.floor(newMinTemp).toLocaleString('sv-SE');
    infoMinTemp.innerHTML = `<h3 class="infoSectionHeader">MIN TEMPERATUR </h3> <p class="infoSectionPara">${formattedMinTemp}C</p>`;

    //moons
    infoMoon.innerHTML = `<h3 class="infoSectionHeader">MÅNAR</h3>`;
    infoMoon.innerHTML += `<p class="infoSectionPara">${newMoon.join(", ")}</p>`;
}


//funktion för att skapa alla små planeterna som man sen stylar i css, här lägger jag i bla evenlisteners för elementen
async function createSmallPlanets(){
    const data =  await getData()

    //jag lägger till eventlisteners och skapar div element direkt i switch
    //innan gjorde jag det utanför switch för alla element men ändrade det i senare skede
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
                        largePlanet.classList.add('merkuriusLayer')
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
                        largePlanet.classList.add('venusLayer')
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
                        largePlanet.classList.add('jordenOzoneLayer');
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
                        largePlanet.classList.add('marsLayer')
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
                        largePlanet.classList.add('jupiterLayer')
                    });
                    break;
                case 6:
                    //Valde att skapa nytt element inne i varje case istället för utanför switch, pga fick int saturnus ringar att fungera annars
                    let newSaturnusWrapper = document.createElement('div');
                    newSaturnusWrapper.classList.add('saturnusWrapper');
                    let newSaturnus = document.createElement('div');
                    newSaturnus.classList.add("smallPlanet", "saturnus","saturnusColor");
                    let newRing = document.createElement("div");
                    newRing.classList.add("saturnusRing");
                    newSaturnus.appendChild(newRing);
                    newSaturnusWrapper.appendChild(newSaturnus);
                    smallPlanetWrapper.appendChild(newSaturnusWrapper);
                    newSaturnus.addEventListener('click', () => {
                        hideAllPlanets();
                        changeInfoText(element.name, element.latinName, element.desc, element.circumference, element.distance, element.temp.day, element.temp.night, element.moons);
                        largePlanet.classList.add('saturnusColor')
                        largePlanet.classList.add('saturnusRingLayer')
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
                        largePlanet.classList.add('uranusLayer')
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
                        largePlanet.classList.add('neptunusLayer')
                    });
                    break;
                default:
                    console.log("whoops")
                    break;
            }
            //När man klickar på newplanetwrapper förvinner info sidan och bakgrunden med hjälp av andra funktioner jag skapat
            planetInfoWrapper.addEventListener('click', showAllPlanets);
            planetInfoWrapper.addEventListener('click', makeClickable);
            planetInfoWrapper.addEventListener('click', defaultBackgroundStyle);

            //ta bort ozonlager och ringar från largeplanet när man på info skärmen
            planetInfoWrapper.addEventListener('click', () => {
                largePlanet.classList.remove('jordenOzoneLayer','saturnusRingLayer','marsLayer','jupiterLayer','merkuriusLayer','venusLayer','uranusLayer','neptunusLayer');
            });
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

//gömmer planeterna
function hideAllPlanets() {

        //även header elementet gömmer vi här
        let headingElement = document.querySelector('.headingTitle')
        headingElement.classList.add('hidden')

        planetInfoWrapper.style.display = "flex"
        let allSmallPlanets = document.querySelectorAll('.smallPlanet');

        allSmallPlanets.forEach(planet => {
        planet.classList.add('hidden');
        });
        largePlanet.style.boxShadow = "none"
        makeUnclickable()
        changeBackgroundStyle()
}

//visar planterna
function showAllPlanets() {
    planetInfoWrapper.style.display = "none"
    let allSmallPlanets = document.querySelectorAll('.smallPlanet');
    allSmallPlanets.forEach(planet => {
        planet.classList.remove('hidden');
    });

    //heading elementet
    let headingElement = document.querySelector('.headingTitle')
    headingElement.classList.remove('hidden')
    largePlanet.style.boxShadow = "0px 0px 250px 0px rgba(255, 208, 41, 0.2)"

    largePlanet.classList.remove('merkuriusColor','venusColor','jordenColor','marsColor','jupiterColor','saturnusColor','uranusColor','neptunusColor')
    largePlanet.classList.add('sunColor')
}

//skapa global variabel för largeplanet så vi kan ändra färgen när infosidan visas
let largePlanet;

//skapa den stora planeten som man snare ändrar färg och styling på
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
            largePlanet.style.boxShadow = "0px 0px 250px 0px rgba(255, 208, 41, 0.2)"

            newPlanet.addEventListener('click', () => {
                hideAllPlanets();
                changeInfoText(element.name, element.latinName, element.desc, element.circumference, element.distance, element.temp.day, element.temp.night, element.moons);
                if(element.name == "Solen"){
                    newPlanet.classList.add('sunColor')
                    newPlanet.style.boxShadow = "0px 0px 250px 0px rgba(255, 208, 41, 0.2)"
                }         
            });
        }
    }); 
}
createLargePlanet()

//ändrar backgrunds stylingen när man klickat på planeten
function changeBackgroundStyle(){
    planetWrapper.style.background = "linear-gradient(90deg, rgba(12, 22, 77, 1) 0%, rgba(25, 11, 34, 1) 100%)"
    createRandomDots();
}
//ändrar tillbaks till min orginala styling, försökte först med getComputedStyle() men det var lättare såhär när det var såpass lite styling
function defaultBackgroundStyle(){
    planetWrapper.style.background = "linear-gradient(90deg, rgba(12, 22, 77, 1) 0%, rgba(25, 11, 34, 1) 100%)"
    clearRandomDots();
}

//funktion för att skapa dots på infosidan
function createRandomDots() {
    //här väljer jag hur många dots jag vill ha
    for (let i = 0; i < 50; i++) {
        let dot = document.createElement('div');
        dot.className = 'dot';

        //här positionerar man dot på en random plats med window height och width
        let x = Math.random() * window.innerWidth;
        let y = Math.random() * window.innerHeight;
        //horisontell positionering (startar från vänster)
        dot.style.left = x + 'px';
        //vertikal positionering (startar från top)
        dot.style.top = y + 'px';

        dot.classList.add("dot")

        planetWrapper.appendChild(dot);
    }
}
//här tar jag bort dots från skärmen igen
function clearRandomDots() {
    let dots = document.querySelectorAll('.dot')
    dots.forEach(element => {
        element.remove()
    });
}