import { Router } from 'express';
import { getDistanceTimes,getCoordinates,getAutoCompleteSuggestion, getRoutes } from '../controllers/mapController.js';
import { query } from 'express-validator';



const router = Router();

router.get('/get-coordinates',
    query('location').isString().isLength({ min: 3 }),
    getCoordinates
);
router.get('/get-routes',
    // query('from').isString().isLength({ min: 3 }),
    // query('to').isString().isLength({ min: 3 }),
    getRoutes
);

router.get('/get-distance-time',
    query('origin').isString().isLength({ min: 3 }),
    query('destination').isString().isLength({ min: 3 }),
    getDistanceTimes
)

router.get('/get-suggestions',
    query('input').isString().isLength({ min: 3 }),
    getAutoCompleteSuggestion
)



export default  router