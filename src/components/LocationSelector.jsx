import { useState } from 'react';
import { Search, MapPin, Navigation } from 'lucide-react';
import { cebuLocations } from '../data/cebuLocation';
import { getCurrentCoordinates, isInsideCebu, reverseGeocodeCebuLocation } from '../utils/location';


function LocationSelector() {
    const [search, setSearch] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('Cebu City');

    const filteredLocations = cebuLocations.filter((location) => location.name.toLowerCase().includes(search.toLowerCase()));
    const [gpsLoading, setGpsLoading] = useState(false);
    const [gpsError, setGpsError] = useState('');

    async function handleCurrentLocations() {
        setGpsLoading(true);
        setGpsError('');

        try {
            const coordinates = await getCurrentCoordinates();
            const { latitude, longitude } = coordinates;

            if (!isInsideCebu(latitude, longitude)) {
                throw new Error('Your current location is outside Cebu.');
            }

            const location = await reverseGeocodeCebuLocation(
                latitude,
                longitude,
                cebuLocations
            );

            setSelectedLocation(location.name);
            setSearch('');

            setGpsError(`Location detected: ${location.name}`);

        } catch (error) {
            setGpsError(error.message);
        } finally {
            setGpsLoading(false);
        }
    }

    return (
        <section className="mt-6 rounded-2xl border border-white/20 bg-white/15 p-5 backdrop-blur-md">
            <div className="mb-4 flex items-center gap-2">
                <MapPin size={20} className="text-yellow-300" />
                <h2 className="text=xl font-semibold">
                    Explore Cebu Weather
                </h2>

            </div>

            <label className="mb-2 block text-sm text-white/70">
                Search a city or municipality
            </label>

            <div className="relative">
                <Search size={20} className="absolute left-3 top1/2 -transslate-y-1/2 text-white/60" />\

                <input type="text"
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search Cebu locations..."
                    className="w-full rounded-xl border border-white/20 bg-white/10 py-3 pl-10 pr-4 text-white outline-none placeholder:text-white/50 focus:border-white/50" />

            </div>

            <div className="mt-4 max-h-52 space-y-2 overflow-y-auto">
                {filteredLocations.map((location) => (
                    <button
                        key={location.name}
                        type="button"
                        onClick={() => {
                            setSelectedLocation(location.name);
                            setSearch('');
                        }}
                        className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left transition 
                        ${selectedLocation === location.name ? 'bg-white/25' :
                                'bg-white/5 hover:bg-white/15'
                            }`}
                    >
                        <span>
                            {location.name}
                        </span>
                        <span className="text-xs text-white/60 capitalize">
                            {location.type}
                        </span>
                    </button>
                ))}

                {filteredLocations.length === 0 && (
                    <p className="pu-4 text-center text-sm text-white/60">
                        No Cebu location found.
                    </p>
                )}
            </div>

            <div className="mt-4 rounded-xl bg-white/10 p-4">
                <p className="text-sm text-white/60">
                    Selected location
                </p>

                <p className="mt-1 text-lg font-semibold">
                    {selectedLocation}
                </p>
            </div>

            <button
                type="button"
                onClick={handleCurrentLocations}
                disabled={gpsLoading}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-white/20 px-4 py-3 font-medium transition hover:bg-white/30 disabled:cursor-not-allowed disabled:opacity-50"
            >
                <Navigation size={18} />
                {gpsLoading ? 'Detecting location...' : 'Use my current location'}
            </button>

            {gpsError && (
                <p className="mt-3 text-center text-sm text-white/80" role="status">
                    {gpsError}
                </p>
            )}
        </section>
    );
}

export default LocationSelector;