const router = require('express').Router();
const {
  renderNoteForm,
  createNewNote,
  renderNote,
  renderEditForm,
  updateNote,
  deleteNote,
} = require('../controllers/notes.controller');

// Nueva nota
router.get('/notes/add', renderNoteForm);

// Crear nueva nota
router.post('/notes/new-note', createNewNote);

// Obtener todas las notas
router.get('/notes', renderNote);

// Editar una nota
router.get('/notes/edit/:id', renderEditForm);

// Actualizar una nota
router.put('/notes/edit/:id', updateNote);

// Eliminar una nota
router.delete('/notes/delete/:id', deleteNote);

module.exports = router;


