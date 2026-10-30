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