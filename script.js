`use strict`;

window.addEventListener(`load`, () => {
    let long;
    let lat;
    let locationTimezone = document.querySelector(`.location-timezone`);
    let temperatureDegree = document.querySelector(`.temperature-degree`);
    let temperatureDescription = document.querySelector(`.temperature-description`);
    const temperatureDiv = document.querySelector(`.temperature`);
    let temperatureKind = document.querySelector(`.temperature span`);

    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const proxy = `https://cors-anywhere.herokuapp.com/`
            const weatherApi = `${proxy}https://api.darksky.net/forecast/dd294ab06f407d7583d852afd45bb9c7/${lat},${long}`;

            fetch(weatherApi)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    console.log(data);
                    const {temperature, summary, icon} = data.currently;
                    let celsius = (temperature - 32) * (5 / 9);

                    temperatureDegree.textContent = Math.trunc(celsius * 10) / 10;
                    temperatureDescription.innerHTML = `<b>${summary}</b>`;
                    locationTimezone.textContent = data.timezone;

                    setIcons( icon, document.querySelector(`.icon`) );

                    temperatureDiv.addEventListener(`click`, () => {
                        if (temperatureKind.textContent === `\u00B0F`) {
                            temperatureKind.textContent = `
                            \u00B0C`;
                            temperatureDegree.textContent = Math.trunc(celsius * 10) / 10;
                        } else {
                            temperatureKind.textContent = `\u00B0F`;
                            temperatureDegree.textContent = temperature;
                        }
                    });
                });
        });

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
    };
});




