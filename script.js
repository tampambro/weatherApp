`use strict`;

window.addEventListener(`load`, async () => {
    let locationTimezone = document.querySelector(`.location-timezone`);
    let temperatureDegree = document.querySelector(`.temperature-degree`);
    let temperatureDescription = document.querySelector(`.temperature-description`);
    const temperatureDiv = document.querySelector(`.temperature`);
    let temperatureKind = document.querySelector(`.temperature span`);

    const proxy = `https://cors-anywhere.herokuapp.com/`

    const jsonRequestIP = await fetch(`${proxy}https://api.ipify.org?format=json`);
    const jsonIP = await jsonRequestIP.json();
    const userIP = await jsonIP.ip;

    const jsonRequestCoordinates = await fetch(`${proxy}https://api.sypexgeo.net/json/${userIP}`);
    const jsonCoordinates = await jsonRequestCoordinates.json();
    const latitude = await jsonCoordinates.city.lat;
    const longitude = await jsonCoordinates.city.lon;

    const weatherAPIRequest = await fetch(`${proxy}https://api.darksky.net/forecast/dd294ab06f407d7583d852afd45bb9c7/${latitude},${longitude}`);
    const weatherAPIJson = await weatherAPIRequest.json();


    const {temperature, summary, icon} = weatherAPIJson.currently;

    let celsius = (temperature - 32) * (5 / 9);
    temperatureDegree.textContent = Math.trunc(celsius * 10) / 10;
    temperatureDescription.innerHTML = `<b>${summary}</b>`;
    locationTimezone.textContent = weatherAPIJson.timezone;

    setIcons( icon, document.querySelector(`.icon`) );

    temperatureDiv.addEventListener( `click`, () => {
        if (temperatureKind.textContent === `\u00B0F`) {
            temperatureKind.textContent = `
            \u00B0C`;
            temperatureDegree.textContent = Math.trunc(celsius * 10) / 10;
        } else {
            temperatureKind.textContent = `\u00B0F`;
            temperatureDegree.textContent = temperature;
        }

    } );

    const preloader = document.getElementById(`page-preloader`);

    if ( !preloader.classList.contains(`done`) ) {
        preloader.classList.add(`done`);
    }

    let now = new Date();
    let hours = now.getHours();

    if (hours > 6 && hours < 19) {
        document.body.style.background = `linear-gradient(rgb(47, 150, 163), rgb(8, 67, 190))`
    } else {
        document.body.style.background = `linear-gradient(rgb(5, 26, 189), rgb(5, 5, 84))`
    };

    function setIcons(icon, iconID) {
        const skycons = new Skycons({color: `#ebebeb`});
        const currentIcon = icon.replace(/-/g, `_`).toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }

});

