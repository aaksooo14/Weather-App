import { useEffect, useState } from "react";
import axios from 'axios';

import Header from "./Header";
const API_KEY = import.meta.env.VITE_API_KEY;

const Weather = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchWeatherData = async (latitude, longitude) => {
            try {
                const response = await axios.get(
                    `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
                );
                setWeatherData(response.data);
            } catch (err) {
                setError(err.message);
            }
        };

        const getCurrentLocation = () => {
            if (navigator.geolocation) {
                navigator.geolocation.getCurrentPosition(
                    (position) => {
                        const { latitude, longitude } = position.coords;
                        fetchWeatherData(latitude, longitude);
                    },
                    (err) => {
                        setError(err.message);
                    }
                );
            } else {
                setError("Geolocation is not supported by this browser.");
            }
        };

        getCurrentLocation();
    }, []);

    // Handle loading and error states
    if (error) {
        return <div className="text-red-500 text-center">{`Error: ${error}`}</div>;
    }

    if (!weatherData) {
        return <div className="text-center absolute top-[35vh] left-10 text-4xl ">Loading...</div>;
    }

    const { main, wind, name } = weatherData;

    return (
        <div className="flex flex-col justify-between h-screen bg-gradient-to-b from-blue-500 to-blue-200 p-4">
            <div className="flex flex-col items-center justify-center pt-20">
                <h1 className="pt-10 text-3xl font-bold text-white">{`${name}`}</h1>
                <div className="mt-5 pt-5">
                    <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="weatherImage" className="w-24 h-24" />
                </div>
                <p className="text-5xl font-semibold text-white pt-10">{`${main.temp} °C`}</p>
                <div className="flex justify-around w-full mt-5 pt-10">
                    <div className="border-2 border-white rounded-lg p-4 bg-blue-700 bg-opacity-70 shadow-md">
                        <p className="text-white">Humidity:</p>
                        <p className="text-xl text-white">{`${main.humidity} %`}</p>
                    </div>
                    <div className="border-2 border-white rounded-lg p-4 bg-blue-700 bg-opacity-70 shadow-md">
                        <p className="text-white">Wind Speed:</p>
                        <p className="text-xl text-white">{`${wind.speed} m/s`}</p>
                    </div>
                </div>
            </div>
            <div className="absolute bottom-0 left-0 right-0">
                <Header />
            </div>
        </div>
    );
};

export default Weather;
