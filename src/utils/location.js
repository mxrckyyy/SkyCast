const CEBU_BOUNDS = {
    minLatitude: 9.3,
    maxLatitude: 11.4,
    mainLongitude: 123.2,
    maxLongitude: 124.1,
};

export function getCurrentCoordinates() {
    return new Promise((resolve, reject) => {
        if (!navigator.geolocation) {
            reject(new Error('Geolocation is not supoported by your browser.'));
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;

                resolve({ latitude, longitude });
            },
            () => {
                reject(new Error('Unable to get your location. Please allow location access.'));

            },
            {
                enableHighAccuracy: true,
                timeout: 10000,
                maximumAge: 0,
            }
        );
    });
}

export function isInsideCebu(latitude, longitude) {
    return (
        latitude >= CEBU_BOUNDS.minLatitude &&
        latitude <= CEBU_BOUNDS.maxLatitude &&
        longitude >= CEBU_BOUNDS.mainLongitude &&
        longitude <= CEBU_BOUNDS.maxLongitude
    );
}

export async function reverseGeocodeCebuLocation(latitude, longitude, locations) {
    const url = new URL(
        'https://api.bigdatacloud.net/data/reverse-geocode-client'
    );

    url.searchParams.set('latitude', latitude);
    url.searchParams.set('longitude', longitude);
    url.searchParams.set('localityLanguage', 'en');

    const response = await fetch(url);

    if (!response.ok) {
        throw new Error('Unable to identify your current location.');
    }

    const data = await response.json();

    //make sure the detected location is in tha philippines.
    if (data.countryCode !== 'PH') {
        throw new Error('Your location is outside Cebu.');
    }

    //get possible city or municipality names.
    const possibleNames = [
        data.city,
        data.locality,
        data.localityInfo?.administrative?.[0]?.name,
    ]

        .filter(Boolean)
        .map((name) => name.toLowerCase().trim());

    //match the detected name against our cebu locations.
    if (!Array.isArray(locations)) {
        throw new Error('Cebu locations data is not a valid array.');
    }

    const matchedLocation = locations.find((location) => {
        const locationName = location.name.toLowerCase().trim();

        return possibleNames.some((name) => {
            return name === locationName || name.replace(/\s+city$/, '') ===
                locationName.replace(/\s+city$/, '');
        });
    });

    if (!matchedLocation) {
        throw new Error(
            'We could not identify a supported Cebu City or municipality.'
        );
    }

    return matchedLocation;
}