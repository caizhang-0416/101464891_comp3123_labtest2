import axios from 'axios';

// const API_KEY = 'c66c563b30bda01666deb1dd951a4c66';
const API_KEY = '473c41b5362fa7b8dfe6d978e8bfe23d';
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const ICON_URL = 'https://openweathermap.org/img/wn';
const GOE_URL = 'https://api.openweathermap.org/geo/1.0';

export class WeatherService {
    static async getWeather(search) {
        try {
            const response = await
                axios.get(`${BASE_URL}/weather?q=${search}&appid=${API_KEY}&units=metric`);
            return response.data;
        } catch (error) {
            console.error('Error fetching weather data:', error);
            throw error;
        }
    }

    static async get5DayForecast(latLon) {
        try {
            const response = await
                axios.get(`${BASE_URL}/forecast?lat=${latLon.lat}&lon=${latLon.lon}&appid=${API_KEY}&units=metric`);
            return response.data;
        } catch (error) {
            console.error('Error fetching 7-day forecast:', error);
            throw error;
        }
    }
    static async getLatLonByCity(city) {
        try {
            const response = await
                axios.get(`${GOE_URL}/direct?q=${city}&appid=${API_KEY}`);
            const { lat, lon } = response.data[0];
            return { lat, lon };
        } catch (error) {
            console.error('Error fetching location:', error);
            throw error;
        }
    }
}
