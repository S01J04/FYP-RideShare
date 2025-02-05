import React, { useState, useEffect, useRef, useCallback } from "react";
import { useLoadScript, GoogleMap, DirectionsRenderer } from "@react-google-maps/api";

const containerStyle = {
    width: "100%",
    height: "90vh",
};

const defaultCenter = { lat: 33.6844, lng: 73.0479 };

const libraries = ["places"]; // Static to prevent re-renders

export const Routes = ({ toLocation, fromLocation, nextStep, setSelectedRoute }) => {
    const { isLoaded } = useLoadScript({
        googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
        libraries,
    });

    const [routeOptions, setRouteOptions] = useState([]);
    const [selectedRouteIndex, setSelectedRouteIndex] = useState(0); // Default to first route
    const [directions, setDirections] = useState(null);
    const [selectedDirections, setSelectedDirections] = useState(null); // 🔴 Holds only the selected route
    const mapRef = useRef(null);

    useEffect(() => {
        if (!isLoaded || !fromLocation || !toLocation) return; // Ensure locations are valid

        const directionsService = new window.google.maps.DirectionsService();
        directionsService.route(
            {
                origin: fromLocation,
                destination: toLocation,
                travelMode: "DRIVING",
                provideRouteAlternatives: true,
            },
            (result, status) => {
                if (status === "OK" && result.routes.length > 0) {
                    setRouteOptions(result.routes.map((route, index) => ({
                        index,
                        distance: route.legs[0].distance.text,
                        duration: route.legs[0].duration.text,
                    })));

                    setDirections(result);
                    setSelectedDirections({
                        ...result,
                        routes: [result.routes[0]],
                    });

                    // Store default selected route in parent state
                    setSelectedRoute(result.routes[0]);
                } else {
                    console.error("Directions request failed:", status);
                }
            }
        );
    }, [isLoaded, fromLocation, toLocation, setSelectedRoute]);

    const handleRouteSelection = useCallback(
        (index) => {
            setSelectedRouteIndex(index);
            if (directions) {
                setSelectedDirections({
                    ...directions,
                    routes: [directions.routes[index]],
                });

                // Update parent state with selected route details
                setSelectedRoute(directions.routes[index]);
            }
        },
        [directions, setSelectedRoute]
    );

    const onLoad = useCallback(
        (map) => {
            mapRef.current = map;
            if (selectedDirections) {
                const bounds = new window.google.maps.LatLngBounds();
                selectedDirections.routes[0].legs.forEach((leg) => {
                    leg.steps.forEach((step) => bounds.extend(step.start_location));
                });
                map.fitBounds(bounds);
            }
        },
        [selectedDirections]
    );

    return (
        <div className="min-h-screen w-full flex flex-col lg:flex-row items-stretch">
            {/* Left Panel - Route Selection */}
            <div className="flex-1 p-6">
                <h2 className="text-3xl text-center font-semibold mb-6">Select Your Route</h2>
                {routeOptions.length > 0 ? (
                    <div className="space-y-3">
                        {routeOptions.map((route, index) => (
                            <label
                                key={index}
                                className={`flex items-center px-3 py-2 rounded-lg cursor-pointer ${
                                    selectedRouteIndex === index ? "bg-blue-300" : "hover:bg-gray-200"
                                }`}
                                onClick={() => handleRouteSelection(index)}
                            >
                                <input
                                    type="radio"
                                    name="route"
                                    checked={selectedRouteIndex === index}
                                    onChange={() => handleRouteSelection(index)}
                                    className="mr-3"
                                />
                                Route {index + 1} - {route.distance} ({route.duration})
                            </label>
                        ))}
                    </div>
                ) : (
                    <p>Loading routes...</p>
                )}

                {/* ✅ "Next" button triggers next step */}
                <button
                    className="mt-6 px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
                    onClick={nextStep}
                    disabled={routeOptions.length === 0}
                >
                    Next Step
                </button>
            </div>

            {/* Right Panel - Map */}
            <div className="flex-1 h-[500px]">
                {isLoaded ? (
                    <GoogleMap
                        mapContainerStyle={containerStyle}
                        zoom={6}
                        center={defaultCenter}
                        options={{
                            disableDefaultUI: true,
                            zoomControl: true,
                            clickableIcons: false,
                        }}
                        onLoad={onLoad}
                    >
                        {/* ✅ Render only the selected route */}
                        {selectedDirections && (
                            <DirectionsRenderer
                                key={selectedRouteIndex}
                                directions={selectedDirections}
                                options={{
                                    polylineOptions: {
                                        strokeColor: "#FF0000", // 🔴 Selected route is red
                                        strokeOpacity: 0.8,
                                        strokeWeight: 5,
                                    },
                                    suppressMarkers: false,
                                }}
                            />
                        )}
                    </GoogleMap>
                ) : (
                    <p>Loading map...</p>
                )}
            </div>
        </div>
    );
};
