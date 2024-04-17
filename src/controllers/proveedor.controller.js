// controllers/proveedor.controller.js

import Proveedor from '../models/proveedor.model.js';

// Función para crear un nuevo proveedor
export async function createProveedor(req, res) {
  try {
    const proveedor = await Proveedor.create(req.body);
    res.status(201).json(proveedor);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el proveedor' });
  }
}

// Otras funciones para manejar las operaciones CRUD, como obtener todos los proveedores, obtener un proveedor por su ID, actualizar un proveedor, eliminar un proveedor, etc.
