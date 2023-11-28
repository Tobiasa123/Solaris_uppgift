
//variabler och element 
let smallPlanetWrapper = document.querySelector('.smallPlanetWrapper')



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
//getplanetinfo hämtar planternas attributer
async function getPlanetInfo(){
    const data =  await getData()
    //logga min data
    data.bodies.forEach(element => {
        console.log(element)
    });
}
getPlanetInfo()


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
            newPlanet.innerText = element.name
            smallPlanetWrapper.appendChild(newPlanet)
        }
    });
}
createSmallPlanets()



