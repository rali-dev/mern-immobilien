import express from 'express';
import { getMyProperties, createProperty, updateProperty, deleteProperty } from '../controllers/my-properties.controller.js';
import { requireAuth } from '@clerk/express';

const router = express.Router();

// Alle eigenen Properties abrufen
router.get('/', requireAuth(), getMyProperties);

// Neues Property anlegen
router.post('/create', requireAuth(), createProperty);

// Property aktualisieren
router.put('/:id', requireAuth(), updateProperty);

// Property löschen
router.delete('/:id', requireAuth(), deleteProperty);

export default router;