import { useState } from 'react';
import { Search, MapPin, Navigation } from 'lucide-react';
import { cebuLocations } from '../data/cebuLocation';


function LocationSelector() {
    const [search, setSearch] = useState('');
    const [selectedLocation, setSelectedLocation] = useState('Cebu City');

    const filteredLocations = cebuLocations.filter((location) => location.name.toLowerCase().includes(search.toLowerCase()));

    return (
        <section className="mt-6 rounded-2xl border border-white/20 bg-white/15 p-5 backdrop-blur-md">

        </section>
    )
}