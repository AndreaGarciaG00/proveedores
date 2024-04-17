// src/routes/proveedor.routes.js

import express from 'express';
const router = express.Router();
import { createProveedor } from '../controllers/proveedor.controller.js'; // Importa la función createProveedor con llaves

// Ruta para procesar el formulario de agregar proveedor
router.post('/', createProveedor);

export default router;
