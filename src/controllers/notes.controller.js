const notesCtrl = {};

const Note = require('../models/Note');

notesCtrl.renderNoteForm = (req, res) => {
    res.render('notes/new-note');
};

notesCtrl.createNewNote = async (req, res) => {
    const { servicio, descripcion } = req.body;
    const newNote = new Note({ servicio, descripcion });

    try {
        await newNote.save();
        req.flash('success_msg', 'Cita Agendada');
        res.redirect('/notes');
    } catch (error) {
        res.status(500).send('Error al crear la nota: ' + error.message);
    }
};

notesCtrl.renderNote = async (req, res) => {
    try {
        const notes = await Note.find();
        res.render('notes/all-notes', { notes });
    } catch (error) {
        console.log('Error al obtener las notas:', error);
        res.status(500).send('Error al obtener las notas');
    }
};

notesCtrl.renderEditForm = async (req, res) => {
    try {
        const note = await Note.findById(req.params.id);

        if (!note) {
            return res.status(404).send("Nota no encontrada");
        }

        res.render('notes/edit-note', { note });
    } catch (error) {
        console.error('Error al obtener la nota:', error);
        res.status(500).send('Algo salió mal!');
    }
};


notesCtrl.updateNote = async (req, res) => {
    const { servicio, descripcion } = req.body;

    try {
        const updatedNote = await Note.findByIdAndUpdate(
            req.params.id, 
            { servicio, descripcion }, 
            { new: true }
        );

        if (!updatedNote) {
            return res.status(404).send('Nota no encontrada');
        }
        req.flash('success_msg','Cita Actualizada');
        res.redirect('/notes');
    } catch (error) {
        console.error('Error al actualizar la nota:', error);
        res.status(500).send('Error al actualizar la nota');
    }
};

notesCtrl.deleteNote = async (req, res) => {
    try {
        await Note.findByIdAndDelete(req.params.id);
        req.flash('success_msg','Cita Eliminada');
        res.redirect('/notes');
    } catch (error) {
        console.error('Error al eliminar la nota:', error);
        res.status(500).send('Error al eliminar la nota');
    }
};

module.exports = notesCtrl;
