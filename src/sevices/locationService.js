const GEOCODING_API_KEY = 'https://geocoding-api.open-meteo.com/v1/search';

export async function getLocationCoordinates(locationName) {
    const params = new URLSearchParams({
        name: locationName,
        count: '10',
        language: 'en',
        format: 'json',
        countryCode: 'PH',
    });

    const response = await fetch(
        `${GEOCODING_API_URL}?${params}`
    );


    if (!response.ok) {
        throw new Error('Unable to retrieve location coordinates.');
    }

    const data = await response.json();

    if (!data.results || data.results.length === 0) {
        throw new Error('Location not found.');
    }

    const normalizeName = (name) => name.toLowerCase().replace(/\s+city$/, '').trim();

    const matchedLocation = data.results.find((result) => {
        const isPhilippines = result.country_code === 'PH';
        const isCebu = result.admin2?.toLowerCase().includes('cebu') ||
            result.admin1?.toLowerCase().includes('central visayas');

        const isMatchingName =
            normalizeName(result.name) === normalizeName(locationName);

        return isPhilippines && isCebu && isMatchingName;

    });

    if (!matchedLocation) {
        throw new Error('Unable to verfiy this location in Cebu.');

    }

    return {
        name: matchedLocation.name,
        latitude: matchedLocation.latitude,
        longitude: matchedLocation.longitude,
    };
}