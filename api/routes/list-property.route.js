import express from 'express';
import { createListing } from '../controllers/list-property.controller.js';
import { requireAuth } from '@clerk/express';


const router = express.Router();

router.post('/list-property', requireAuth(), createListing);

export default router;