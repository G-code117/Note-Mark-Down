const express = require('express');
const app = express();
const PORT = process.env.PORT || 3202;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const storage = require('./db/storage')
app.get(`/api/notes`,(req,res) =>{
    storage.retrieveNotes().then((notes) => {
        return res.status(200).json(notes)
    }).catch((error) => res.status(500).json(error))
});
app.post('/api/notes',(req,res) => {
    storage.appendNote(req.body).then((notes) => {
        return res.status(200).json(notes)
    }).catch((error) => res.status(500).json(error));
})

app.delete('/api/notes/:id',(req, res) => {
    storage.deleteNote(req.params.id).then(() => {
        return res.status(200).json({delete: true, id: req.params.id})})
        .catch((error) => res.status(500).json(error))
})
app.listen(PORT, ()=> {
    console.log(`Server is running on http://localhost:${PORT}`);
} );