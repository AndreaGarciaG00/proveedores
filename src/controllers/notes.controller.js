import Note from "../models/Note.js";

export const renderNoteForm = (req, res) => res.render("notes/new-note");

export const createNewNote = async (req, res) => {
  const { title, description, proveedor, tipoProducto } = req.body;
  const errors = [];
  if (!title) {
    errors.push({ text: "Ingresa un título" });
  }
  if (!description) {
    errors.push({ text: "Ingresa una descripción" });
  }
  if (!proveedor) {
    errors.push({ text: "Ingresa un proveedor" });
  }
  if (!tipoProducto) {
    errors.push({ text: "Ingresa un tipo de producto" });
  }
  if (errors.length > 0)
    return res.render("notes/new-note", {
      errors,
      title,
      description,
      proveedor,
      tipoProducto,
    });

  const newNote = new Note({ title, description, proveedor, tipoProducto });
  newNote.user = req.user.id;
  await newNote.save();
  req.flash("success_msg", "Se agregó un producto");
  res.redirect("/notes");
};

export const renderNotes = async (req, res) => {
  const notes = await Note.find({ user: req.user.id })
    .sort({ date: "desc" })
    .lean();
  res.render("notes/all-notes", { notes });
};

export const renderEditForm = async (req, res) => {
  const note = await Note.findById(req.params.id).lean();
  if (note.user != req.user.id) {
    req.flash("error_msg", "No autorizado");
    return res.redirect("/notes");
  }
  res.render("notes/edit-note", { note });
};

export const updateNote = async (req, res) => {
  const { title, description,proveedor, tipoProducto } = req.body;
  await Note.findByIdAndUpdate(req.params.id, {title, description, proveedor, tipoProducto });
  req.flash("success_msg", "Producto actualizado");
  res.redirect("/notes");
};

export const deleteNote = async (req, res) => {
  await Note.findByIdAndDelete(req.params.id);
  req.flash("success_msg", "Producto eliminado");
  res.redirect("/notes");
};
