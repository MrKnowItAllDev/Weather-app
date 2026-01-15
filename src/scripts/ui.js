import { format } from "date-fns";

export class UIGrabber {
    static #cityName = () => document.querySelector(".display-info > section:first-child");
    static #cityDate = () => document.querySelector(".display-info > section:nth-child(2)");
    static #cityTemp = () => document.querySelector(".display-info > section:nth-child(3)");
    static #cityWeather = () => document.querySelector(".display-info > section:last-child");
    static searchBar = () => document.querySelector("#search");
    static submitBtn = () => document.querySelector(".submit-btn");
    static #weatherIcon = () => document.querySelector(".display-icon");
    static #hourlyForecast = () => Array.from(document.querySelectorAll(".hourly-forecast > section"));
    static #forecastCards = () => Array.from(document.querySelectorAll(".forecast-card"));

    static populateHourlyForecast(wData, gData) {
        this.#hourlyForecast().forEach((card, i) => {
            card.innerHTML = ``;
            const header = document.createElement('section');
            const icon = document.createElement("section");
            const temp = document.createElement("section");

            const h3 = document.createElement("h3");
            const img = document.createElement("img");
            const h2 = document.createElement("h2");
            const p = document.createElement("p");

            let hour = parseInt(wData.hours[i].datetime.split(":")[0]) === 0 ?
                12 : parseInt(wData.hours[i].datetime.split(":")[0]);

            h3.textContent = `${hour > 12 ? `${hour} AM` : `${hour} PM`}`;
            h2.innerHTML = `${wData.hours[i].temp}` + `&deg;C`;
            p.textContent = `Windspeed ${wData.hours[i].windspeed}`;

            img.src = gData.data.images.original.url;
            img.alt = `weather-icon`;
            img.style.width = `90px`;
            img.style.height = `120px`;
            img.style.padding = `12px 0`;

            header.appendChild(h3);
            icon.appendChild(img);
            temp.appendChild(h2);
            temp.appendChild(p);

            card.appendChild(header);
            card.appendChild(icon);
            card.appendChild(temp);
        });
    }

    static #populateGifDisplay(data) {
        this.#weatherIcon().innerHTML = ``;
        const img = document.createElement('img');
        img.src = data.data.images.original.url;
        img.alt = `weather-icon`;
        this.#weatherIcon().appendChild(img);
    }

    static populateMainDisplay(wData, gData) {
        const cityName = this.#cityName();
        const cityDate = this.#cityDate();
        const cityTemp = this.#cityTemp();
        const cityWeather = this.#cityWeather();
        const weatherIcon = this.#weatherIcon();

        [cityName, cityDate, cityTemp, cityWeather].forEach((section) =>{
            section.style.width = `100%`;
            section.style.color = `#ffffff`;
        });

        cityName.querySelector('h2').textContent = wData.cityName;
        cityDate.querySelector('.city-date').textContent = new Date(wData.datetimeEpoch * 1000).toDateString();
        cityTemp.querySelector('.celcius').innerHTML = `${wData.temp}&deg;C`;
        cityWeather.querySelector('.weather-type:nth-child(1)').textContent = wData.icon;
        cityWeather.querySelector('.weather-type:nth-child(2)').innerHTML = `L - ${wData.tempmin}&deg;`;
        cityWeather.querySelector('.weather-type:nth-child(3)').innerHTML = `H - ${wData.tempmax}&deg;`;

        this.#populateGifDisplay(gData);
    }

    // Pass in api data to populate fields
    static populateDailyDisplayInfo(wData, gData) {
        this.#forecastCards().forEach((card, i) => {
            card.innerHTML = ``;
            const header = document.createElement('section');
            const icon = document.createElement("section");
            const temp = document.createElement("section");

            const h2 = document.createElement("h2");
            const img = document.createElement("img");
            const header2 = document.createElement("h2");
            const p = document.createElement("p");

            icon.style.overflow = `hidden`;
            img.style.width = `90%`;

            h2.textContent = `${new Date(wData[i].datetime).toDateString().split(' ')[0]}`;
            img.src = `${gData.data.images.original.url}`;
            img.alt = `weather-icon`;
            header2.innerHTML = `${wData[i].temp}&deg;`;
            header2.style.textDecoration = `1px solid #ffffff`;
            p.innerHTML = `H - ${wData[i].tempmax}&deg; L - ${wData[i].tempmin}&deg;`;

            header.appendChild(h2);
            icon.appendChild(img);
            temp.appendChild(header2);
            temp.appendChild(p);

            card.appendChild(header);
            card.appendChild(icon);
            card.appendChild(temp);
        });
    }
}

