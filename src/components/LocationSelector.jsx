import { useState } from 'react';
import { Search, MapPin, Navigation } from 'lucide-react';
import { cebuLocations } from '../data/cebuLocation';


function LocationSelector() {
    const [search, setSearch] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('Cebu City');

    const filteredLocations = cebuLocations.filter((location) => location.name.toLowerCase().includes(search.toLowerCase()));

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
        </section>
    )
}