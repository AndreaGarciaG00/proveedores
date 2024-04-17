// index.js

import app from "./app.js";
import { createAdminUser } from "./libs/createUser.js";
import "./database.js";
import proveedorRoutes from "./routes/proveedor.routes.js"; // Importa las rutas de proveedores

async function main() {
  await createAdminUser();
  
  // Monta las rutas de proveedores en la aplicación
  app.use('/api', proveedorRoutes);
  
  // Inicia el servidor
  app.listen(app.get("port"));
  console.log("Server on port", app.get("port"));
  console.log("Environment:", process.env.NODE_ENV);
}

main();
