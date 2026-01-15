import {UIGrabber} from "./ui";
import { getGiphyData, getMainData, getWeekData } from "./api";

export class Controller {
    static #UI = UIGrabber;

    static getWeather() {
        let searchTerm;
        this.#UI.submitBtn().addEventListener('click', async (e) => {
            this.#UI.searchBar().setCustomValidity('');
            if (!this.#UI.searchBar().value) {
                this.#UI.searchBar().setCustomValidity('Please enter a search term');
                this.#UI.searchBar().reportValidity();
                return;
            }
            searchTerm = this.#UI.searchBar().value;
            try {
                if (!searchTerm) return;
                let weather = await getMainData(searchTerm);
                let weekly = await getWeekData(searchTerm);

                this.#UI.populateMainDisplay(weather);
                this.#UI.populateHourlyForecast(weather);
                this.#UI.populateDailyDisplayInfo(weekly);
            } catch(err) {
                throw new Error(err);
            }
        });
    }

    static async init() {
        let searchTerm = "Durban";
        let weather = await getMainData(searchTerm);
        let giphy = await getGiphyData(searchTerm);
        let weekly = await getWeekData(searchTerm);

        this.#UI.populateMainDisplay(weather, giphy);
        this.#UI.populateHourlyForecast(weather, giphy);
        this.#UI.populateDailyDisplayInfo(weekly, giphy);
        this.getWeather();
    }
}