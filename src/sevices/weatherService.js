const WEATHER_API_KEY = 'https://api.open-meteo.com/v1/forecast';

export async function getWeatherData(latitude, longitude) {
    const params = new URLSearchParams({
        latitude: latitude,
        longitude: longitude,

        current: [
            'temperature_2m',
            'relative_humidity_2m',
            'apparent_temperature',
            'is_day',
            'precipitation',
            'weather_code',
            'wind_speed_10m',
        ].join(','),

        hourly: [
            'temperature_2m',
            'relative_humidity_2m',
            'precipitation_probability',
            'weather_code',
        ].join(','),

        daily: [
            'weather_code',
            'temperature_2m_max',
            'temperature_2m_min',
            'precipitation_probability_max',
            'uv_index_max',
            'wind_speed_10m_max',
        ].join(','),

        temperature_unit: 'celsius',
        wind_speed_unit: 'kmh',
        timezone: 'Asia/Manila',
        forecast_days: '5',
    });

    const response = await fetch(`${WEATHER_API_URL}?${params}`);

    if (!response.ok) {
        throw new Error('Unable to retrieve weather data.');
    }

    const data = await response.json();

    if (!data.current || !data.hourly || !data.daily) {
        throw new Error('The weather API returned incomplete data.');
    }

    return data;
}