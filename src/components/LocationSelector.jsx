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
        </section>
    )
}