import { useState } from "react";
import axios from 'axios';
import { CiSearch } from "react-icons/ci";
import Header from "./Header";
const API_KEY = import.meta.env.VITE_API_KEY;

const Weather = () => {
    const [weatherData, setWeatherData] = useState(null);
    const [city, setCity] = useState(""); // Default city set to empty string

    const handleCity = (e) => {
        setCity(e.target.value);
    };

    const fetchWeatherData = async (city) => {
        if (!city) return; // Prevent empty searches
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
            );
            setWeatherData(response.data);
            console.log(response.data); // Log the fetched data
        } catch (err) {
            console.log({ message: err.message });
            setWeatherData(null); // Reset data on error
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchWeatherData(city);
    };

    return (
        <div className="flex flex-col items-center justify-between p-4 bg-gradient-to-br from-blue-400 to-blue-600 min-h-screen ">
            <form onSubmit={handleSearch} className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 mt-10">
                <input
                    className="w-full border-2 border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200"
                    type="text"
                    placeholder="Search City"
                    value={city}
                    onChange={handleCity}
                />
                <button
                    type="submit"
                    className="mt-4 w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-200 flex items-center justify-center"
                >
                    <CiSearch className="mr-2" />
                    Search
                </button>
            </form>

            {weatherData ? (
                <div className=" bg-white shadow-lg rounded-lg p-6 w-[90vw] md:w-[full] text-center absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <h1 className="text-3xl font-bold text-blue-600">{`${weatherData.name}`}</h1>
                    <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} alt="weather icon" className="mt-2 w-20 h-20 mx-auto" />
                    <p className="mt-2 text-xl font-semibold">{`${weatherData.main.temp} °C`}</p>
                    <p className="mt-1 text-lg">Humidity: {weatherData.main.humidity} %</p>
                    <p className="mt-1 text-lg">Wind Speed: {weatherData.wind.speed} m/s</p>
                </div>

            ) : (
                <p className="mt-6 text-gray-700">No weather data available. Please check the city name.</p>
            )}

            <div className="absolute bottom-0 left-0 right-0">
                <Header />
            </div>
        </div>
    );
};

export default Weather;
