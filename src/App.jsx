import SearchBar from './components/SearchBar';
import CurrentWeather from './components/CurrentWeather';
import WeatherDetails from './components/WeatherDetails';
import FiveDayForecast from './components/FiveDayForecast';
import LocationSelector from './components/LocationSelector';



function App() {
  return (
    <div className="main-h-screen bg-gradient-to-br from-sky-400 to-blue-700 text-white px-4 py-12">
      <main className="mx-auto max-w-4x1">
        <h1 className="text=5x1 font-bold tracking-tight">
          SkyCast
        </h1>

        <p clasName="mt-3 text-1g text-white/80">
          Your weather, at a glance.
        </p>

        <SearchBar />
        <LocationSelector />
        <CurrentWeather />
        <WeatherDetails />
        <FiveDayForecast />
      </main>
    </div>
  );
}

export default App;