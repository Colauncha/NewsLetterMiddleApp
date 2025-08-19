import express from 'express';
import clientHandler from '../controllers/client.controller.js';
import ECSVHandler from '../controllers/export-csv.controller.js';
import RenewTokenHandler from '../controllers/renew-token.controller.js';
import SubscriberHandler from '../controllers/subscribers.controller.js';
import CreateSubscriberHandler from '../controllers/create-subscribers.controller.js';
import {
  VisitorsCount,
  UniqueVisitors,
  UniqueVisitorsCount,
  AddVisitor,
} from '../controllers/tracking.controller.js';

const router = express.Router();

// Define the route for the handlers
// GET routes
router.get('/client', clientHandler);
router.get('/export-csv', ECSVHandler);
router.get('/subscribers', SubscriberHandler);
router.get('/tracking/visitors/count', VisitorsCount);
router.get('/tracking/visitors/unique', UniqueVisitors);
router.get('/tracking/visitors/unique/count', UniqueVisitorsCount);

// POST routes
router.post('/tracking/visitors', AddVisitor);
router.post('/renew-token', RenewTokenHandler);
router.post('/subscribers', CreateSubscriberHandler);

// Export the router
export default router;
