import { Sun, Cloud, CloudRain, CloudSun } from 'lucide-react';

function FiveDayForecast() {
    const forecast = [
        { day: 'Friday', condition: 'Sunny', temperature: '30°', icon: Sun },
        { day: 'Saturday', condition: 'Cloudy', temperature: '28°', icon: Cloud },
        { day: 'Sunday', condition: 'Rainy', temperature: '26°', icon: CloudRain },
        { day: 'Monday', condition: 'Partly Cloudy', temperature: '29°', icon: CloudSun },
        { day: 'Tuesday', condition: 'Sunny', temperature: '31°', icon: Sun },
    ];

    return (
        <section className="mt-8">
            <h2 className="mb-4 text-xl font-semibold">
                5-Day Forecast
            </h2>


            <div className="grid grid-cols-1 gap-3 sm:grid-cols-5">
                {forecast.map((item) => {
                    const Icon = item.icon;

                    return (
                        <article key={item.day}
                            className="flex items-center justify-between rounded-2xl border border-white/20 bg-white/15 p-4 backdrop-blur-md sm:flex-col sm:gap-3">

                            <p className="font-medium">
                                {item.day}
                            </p>

                            <icon size={32}
                                strokeWidth={1.5}
                                className="text-yellow-300">

                            </icon>

                            <div className="text-right sm:text-center">
                                <p className="text=xl font-semibold">
                                    {item.temperature}
                                </p>

                                <p className="text-xs text-white/7-">
                                    {item.condition}
                                </p>
                            </div>
                        </article>
                    );
                })}
            </div>

        </section>
    );
}


export default FiveDayForecast;