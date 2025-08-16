import express from 'express';
import clientHandler from '../controllers/client.controller.js';
import ECSVHandler from '../controllers/export-csv.controller.js';
import RenewTokenHandler from '../controllers/renew-token.controller.js';
import SubscriberHandler from '../controllers/subscribers.controller.js';

const router = express.Router();

// Define the route for the handlers
router.get('/client', clientHandler);
router.get('/export-csv', ECSVHandler);
router.get('/subscribers', SubscriberHandler);
router.post('/renew-token', RenewTokenHandler);

// Export the router
export default router;
