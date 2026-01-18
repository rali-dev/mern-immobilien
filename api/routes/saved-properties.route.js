import express from 'express';
import { getSavedProperties, saveProperty, removeSavedProperty } from '../controllers/saved-properties.controller.js';
import { requireAuth } from '@clerk/express';

const router = express.Router();

// Alle gespeicherten Properties des Users abrufen
router.get('/', requireAuth(), getSavedProperties);

// Ein Property speichern
router.post('/save', requireAuth(), saveProperty);

// Ein Property aus den gespeicherten entfernen
router.delete('/remove/:propertyId', requireAuth(), removeSavedProperty);

export default router;