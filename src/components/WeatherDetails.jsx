import { Droplets, Wind, Eye, Sun } from 'lucide-react';

function WeatherDetails() {
    const details = [
        {
            label: 'Humidity',
            value: '75%',
            icon: Droplets,
        },
        {
            label: 'Wind Speed',
            value: '12 km/h',
            icon: Wind,
        },
        {
            label: 'Visibility',
            value: '10 km',
            icon: Eye,
        },
        {
            label: 'UV Index',
            value: '6',
            icon: Sun,
        },
    ];

    return (
        <section className="mt-6">
            <h2 className="mb-4 text-x1 font-semibold">
                Weather Details
            </h2>

            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
                {details.map((detail) => {
                    const Icon = detail.icon;

                    return (
                        <article key={detail.label}
                            className="rounded-2x1 border border-white/20 bg-white/15
                            p-5 backdrop-blur-md">

                            <div className="flex items-center gap-2 text-white/70">
                                <Icon size={20} />
                                <span className="text-sm">
                                    {detail.label}
                                </span>
                            </div>

                            <p className="mt-4 text-2x1 font-semibold">
                                {detail.label}

                            </p>


                        </article>
                    );
                })}
            </div>
        </section>

    );
}

export default WeatherDetails;