import React, {useEffect, useState} from 'react';
import {Card, CardContent, Typography, Box} from '@mui/material';
import Grid from '@mui/material/Grid2';

const BASE_ICON_URL = 'https://openweathermap.org/img/wn';

const WeatherDisplay = (prop) => {

    const [weatherData, setWeatherData] = useState(prop.weatherData);
    const [weatherForecast, setWeatherForecast] = useState(prop.weatherForecast);

    useEffect(() => {
        setWeatherData(prop.weatherData);
        setWeatherForecast(prop.weatherForecast);
    }, [prop.weatherData, prop.weatherForecast]);

    if (!weatherData) {
        return (
            <Typography variant="h6" align="center">
                Loading weather data...
            </Typography>
        );
    }

    const {
        name,
        main: {temp, temp_min, temp_max, humidity},
        weather,
        wind: {speed},
    } = weatherData;

    // Convert temperatures from Kelvin to Celsius
    const tempCelsius = temp.toFixed(1);
    const tempMinCelsius = temp_min.toFixed(1);
    const tempMaxCelsius = temp_max.toFixed(1);

    return (
        <Card
            style={{
                maxWidth: 800,
                margin: '20px auto',
                backgroundColor: '#000',
                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                borderRadius: '10px',
                color: 'white',
                padding: '0',
                flexDirection: "row"
            }}
        >
            <CardContent style={{padding: 0}}>
                <Grid container spacing={2}>
                    <Grid size={4}>
                        <Card
                            style={{
                                maxWidth: 400,
                                margin: 0,
                                backgroundColor: '#323232',
                                boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
                                borderRadius: '10px',
                                color: 'white',
                            }}
                        >
                            <CardContent>
                                <Typography variant="h5" align="center" gutterBottom color={'white'}>
                                    Weather in {name}
                                </Typography>

                                <Grid container spacing={2} direction="row" justifyContent="center" alignItems="center">
                                    {/* Date */}
                                    <Grid item>
                                        <Box display="flex" justifyContent="center" mb={2}>

                                        </Box>
                                    </Grid>

                                    {/* Weather Icon */}
                                    <Grid item>
                                        <Box display="flex" justifyContent="center" mb={2}>
                                            <img src={`${BASE_ICON_URL}/${weather[0].icon}@2x.png`} alt={''}/>
                                        </Box>
                                    </Grid>

                                    {/* Weather Info */}
                                    <Grid item xs={12}>
                                        <Typography variant="h6" align="center">
                                            <strong>Temperature:</strong> {tempCelsius}°C
                                            <br/>
                                            <span style={{fontSize: '0.9rem', color: '#888'}}>
                                                (Min: {tempMinCelsius}°C, Max: {tempMaxCelsius}°C)
                                            </span>
                                        </Typography>
                                    </Grid>

                                    {/* Humidity */}
                                    <Grid item xs={12} sm={6}>
                                        <Typography variant="body1" align="center" mb={2}>
                                            <strong>Humidity:</strong> {humidity}%
                                        </Typography>
                                    </Grid>

                                    {/* Wind Speed */}
                                    <Grid item xs={12} sm={6}>
                                        <Typography variant="body1" align="center">
                                            <strong>Wind Speed:</strong> {speed} m/s
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid size={8} container>
                        {
                            weatherForecast && weatherForecast.list.map((item, index) => {
                                return index % 8 === 0 && <Grid size={2}>
                                    <img src={`${BASE_ICON_URL}/${item.weather[0].icon}@2x.png`} alt={''}/>
                                    {item.main.temp}°C
                                </Grid>
                            })
                        }
                    </Grid>
                </Grid>
            </CardContent>
        </Card>
    );
};

export default WeatherDisplay;
