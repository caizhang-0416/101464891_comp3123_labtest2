import React, { useState, useEffect } from 'react';
import { WeatherService } from './WeatherService';
import SearchBar from './components/SearchBar';
import WeatherDisplay from './components/WeatherDisplay';


const App = () => {
    // const location = useGeolocation(); // Fetch user's geolocation
    const [weatherData, setWeatherData] = useState(null)
    const [weatherForecast, setWeatherForecast] = useState(null);
    const [error, setError] = useState(null);

    // Fetch weather by coordinates when location changes
    // useEffect(() => {
    //     const fetchWeatherByCoordinates = async (latitude, longitude) => {
    //         try {
    //             // Using getWeatherByCity function to fetch weather for coordinates
    //             const data = await WeatherService.getWeather(`${latitude},${longitude}`);
    //             setWeatherData(data);
    //             setError(null);
    //         } catch (err) {
    //             setWeatherData(null);
    //             setError("Unable to fetch weather for your location");
    //         }
    //     };
    //
    //     if (location) {
    //         fetchWeatherByCoordinates(location.latitude, location.longitude).then();
    //     }
    // }, [location]); // Dependency on location to trigger the effect

    // Handle city search
    const handleSearch = async (city) => {
        try {
            // Fetch weather data for the city
            const data = await WeatherService.getWeather(city);
            setWeatherData(data);
            const latLon = await WeatherService.getLatLonByCity(city);
            const forecast = await WeatherService.get5DayForecast(latLon);
            console.log(forecast)
            setWeatherForecast(forecast);
            setError(null);
        } catch (err) {
            setWeatherData(null);
            setError("City not found or API error");
        }
    };

    return (
        <div className="app-container">
            <h1 className="title">Weather App</h1>
            <SearchBar onSearch={handleSearch} />
            {error && <p className="error">{error}</p>}
            {weatherData && (
                <div className="weather-info">
                    <WeatherDisplay weatherData={weatherData} weatherForecast={weatherForecast} />
                </div>
            )}
        </div>
    );
};

export default App;
