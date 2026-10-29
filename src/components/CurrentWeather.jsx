import { Sun } from 'lucide-react';

function CurrentWeather() {
    return (
        <section className="mt-8 rounded-3x1 border boder-white/20 bg-white/15 p-6 shadow-x1 backdrop-blur-md-sm:p-8">

            <div className="text-center">
                <h2 className="text-2x1 font-semibold">
                    Cebu City
                </h2>

                <p className="mt-1 text-sm text-white/70">
                    Thursday, October 29
                </p>
            </div>

            <div className="mt-8 flex-col items-center">
                <Sun
                  size={80}
                  strokeWidth={1.5}
                  className="text-yellow-300">
                </Sun>

                <p className="mt-4 text-7x1 font-light tracking-tight">
                   28°
                </p>

                <p className="mt-2 text-x1 font-medium">
                    Sunny
                </p>

                <p className="mt-1 text-sm text-white/70">
                    Feels like 31°
                </p>
            </div>
        </section>

    );
}

export default CurrentWeather;