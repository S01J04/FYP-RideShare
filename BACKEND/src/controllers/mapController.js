
import { asyncHandler } from '../utils/asyncHandler.js';
import {validationResult} from 'express-validator'
import { getAddressCoordinate, getDistanceTime, getAutoCompleteSuggestions } from '../utils/mapservices.js';


export const getCoordinates = asyncHandler( async (req, res, next) => {
    console.log('getCoordinates')
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { location } = req.query;
    try {
        console.log(location)
        const coordinates = await getAddressCoordinate(location);
        res.status(200).json(coordinates);
    } catch (error) {
        res.status(404).json({ message: 'Coordinates not found' });
    }
}
)
export const getRoutes=asyncHandler(async (req, res) => {
    try {
        const { from, to } = req.query;
        console.log(from,to)

        if (!from || !to) {
            return res.status(400).json({ error: "Source and destination are required." });
        }

        const apiKey = process.env.GOOGLE_MAPS_API; // Ensure API key is in .env
        const url = `https://maps.googleapis.com/maps/api/directions/json?origin=${encodeURIComponent(
            from
        )}&destination=${encodeURIComponent(to)}&alternatives=true&key=${apiKey}`;

        const response = await axios.get(url);

        if (response.status !== "OK") {
            return res.status(400).json({ error: "Failed to fetch routes" });
        }

        // Extract routes from response
        const routes = response.routes.map((route, index) => ({
            id: index + 1,
            distance: route.legs[0].distance.text,
            duration: route.legs[0].duration.text,
            polyline: route.overview_polyline.points, // Encoded polyline for the route
        }));

        res.json({ routes });
    } catch (error) {
        console.error("Error fetching routes:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});
export const getDistanceTimes = asyncHandler( async (req, res, next) => {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { origin, destination } = req.query;

        const distanceTime = await getDistanceTime(origin, destination);

        res.status(200).json(distanceTime);

    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
})

export const getAutoCompleteSuggestion = asyncHandler( async (req, res, next) => {

    try {

        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { input } = req.query;

        const suggestions = await getAutoCompleteSuggestions(input);

        res.status(200).json(suggestions);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal server error' });
    }
})