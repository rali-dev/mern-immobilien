import express from 'express';
import { createListing } from '../controllers/properties.controller.js';
import { requireAuth } from '@clerk/express';


const router = express.Router();

router.post('/properties', requireAuth(), createListing);

export default router;