
async function getWeatherData(search) {
    const weather_url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/`;
    const unitGroup = `metric`;
    const weather_api_key = "LA7LWY8MNS7M74TVGHLGVB4UZ";

    try {
        const weatherFetchApi = await fetch(`${weather_url}${search}?unitGroup=${unitGroup}&key=${weather_api_key}&contentType=json`);
        const weatherData = await weatherFetchApi.json();
        if (weatherFetchApi.ok) return weatherData;
    } catch(err) {
        if (err instanceof TypeError) throw new TypeError("Network error or Invalid URL");
        else throw new Error(err);
    }
}

export async function getGiphyData(search) {
    const giphy_url = `https://api.giphy.com/v1/stickers/translate`;
    const giphy_key = "OC5FbHb4kVsbyr3FHQw0n34cpI8f7Aar";
    let icon = await getWeatherData(search);
    icon = icon.days[0].icon;

    try {
        const getGiphy = await fetch(`${giphy_url}?api_key=${giphy_key}&s=${icon}&weirdness=0`);
        const giphyData = await getGiphy.json();
        return giphyData;
    } catch(err) {
        if (err instanceof TypeError) throw new TypeError("Network error or Invalid URL");
        else throw new Error(err);
    }
}

export async function getWeekData(search) {
    const weekData = await getWeatherData(search);
    const giphyData = await getGiphyData(search);
    const data = weekData.days.slice(0, 7);
    return data;
}


export async function getMainData(search) {
    const data = await getWeatherData(search);
    const cityName = data.address;
    const dataToday =  data.days[0];

    return {
        cityName,
        ...dataToday
    };
}

