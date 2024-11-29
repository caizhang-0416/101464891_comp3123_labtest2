import { useState, useEffect } from "react";

const useGeolocation = () => {
    const [location, setLocation] = useState(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setLocation({ latitude, longitude });
                },
                (error) => {
                    console.error("Error fetching location:", error);
                }
            );
        }
    }, []);

    return location;
};

export default useGeolocation;
