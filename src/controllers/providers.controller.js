import Provider from "../models/Provider.js";

export const createProvider = async (req, res) => {
  try {
    const { name, id, company, phone, email, status } = req.body;
    const newStatus = status === 'true';
    const existingProvider = await Provider.findOne({ id });

    if (existingProvider) {
      return res.status(400).json({ success: false, message: "El proveedor ya existe" });
    }

    const newProvider = new Provider({ name, id, company, phone, email, status: newStatus });
    await newProvider.save();
    res.redirect("/about");
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error al crear el proveedor", error: error.message });
  }
};

export const checkProviderId = async (req, res) => {
  try {
    const { id } = req.params;
    const existingProvider = await Provider.findOne({ id });
    res.json({ exists: !!existingProvider });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "No se puede verificar el proveedor", error: error.message });
  }
};

export const getProviders = async (req, res) => {
  try {
    const providers = await Provider.find();
    res.render("about", { providers });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: "Error al obtener los proveedores", error: error.message });
  }
};
