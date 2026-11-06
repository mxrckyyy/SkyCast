import { useEffect, useState } from 'react';
import { getLocationCoordinates } from './services/locationService';
import { getWeatherData } from './services/weatherService';
import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import WeatherDetails from './components/WeatherDetails';
import FiveDayForecast from './components/FiveDayForecast';
import LocationSelector from './components/LocationSelector';

function App() {
  const [selectedLocation, setSelectedLocation] = useState('Cebu City');
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let ignore = false;

    async function fetchWeather() {
      setLoading(true);
      setError('');

      try {
        const coordinates = await getLocationCoordinates(selectedLocation);

        const weather = await getWeatherData(coordinates.latitude, coordinates.longitude);

        if (!ignore) {
          setWeatherData(weather);
        }
      } catch (error) {
        if (!ignore) {
          setError(error.message);
          setWeatherData(null);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }

    }

    fetchWeather();

    return () => {
      ignore = true;
    };
  }, [selectedLocation]);
  return (
    <div className="min-h-screen bg-gradient-to-br from-sky-400 to-blue-700 px-4 py-12 text-white">
      <main className="mx-auto max-w-4xl">

        {/* App Header */}
        <header className="mb-8 text-center">
          <h1 className="text-5xl font-bold tracking-tight">
            SkyCast
          </h1>

          <p className="mt-3 text-lg text-white/80">
            Your weather, at a glance.
          </p>
        </header>

        {/* Search */}
        <SearchBar />

        {/* Cebu Location Selector */}
        <LocationSelector
          selectedLocation={selectedLocation}
          onLocationSelect={setSelectedLocation}
        />

        {loading && (
          <p className="mt-4 text-center">
            Loading weather data...
          </p>
        )}

        {error && (
          <p className="mt-4 text-center text-yellow-200">
            {error}
          </p>
        )}

        {weatherData && !loading && (
          <div className="mt-4 rounded-xl bg-white/15 p-4">
            <p className="text-sm text-white/70">
              Live weather for {selectedLocation}
            </p>

            <p className="mt-2 text-3xl font-semibold">
              {weatherData.current.temperature_2m}°C
            </p>

            <p className="text-sm text-white/80">
              Humidity: {weatherData.current.relative_humidity_2m}%
            </p>

            <p className="text-sm text-white/80">
              Wind: {weatherData.current.wind_speed_10m} km/h
            </p>
          </div>
        )}

        {/* Current Weather */}
        <CurrentWeather />

        {/* Weather Details */}
        <WeatherDetails />

        {/* Five-Day Forecast */}
        <FiveDayForecast />

      </main>
    </div>
  );
}

export default App;
