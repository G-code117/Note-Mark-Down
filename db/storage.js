const util = require('util');
const fs = require('fs');
const uuid = require('uuid');
const { parse } = require('path');

const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.watchFile);

class Store {
    read(){
        return readFileAsync('./db/db.json','utf8')
    }
    markDown(notes){
        return writeFileAsync('./db/db.json',JSON.stringify(notes))
    }
    retrieveNotes(){
        return this.read().then((notes) => {
            let parsedNotes;
            try {
                parsedNotes = [].concat(JSON.parse(notes))
            }
            catch (err) {
                parsedNotes =[]
            }
            return parsedNotes;
        })
    }
    appendNote(notes){
        const title = notes.title;
        const text = notes.text;

        if (!title || !text) {
            throw new Error ('needs title and notes')
        }
        const nextNote = { title, text, id: uuid()}
        return this.retrieveNotes().then((notes) => [
            ...notes, nextNote
        ]).then((updateNotes) => this.markDown(updateNotes))
        .then(()=> nextNote);
    }
    deleteNote(){

    }
};

const a = new Store().retrieveNotes().then((notes) => console.log(notes));
//const a = new Store().retrieveNotes().then((data) => data.JSON()).then((notes) => console.log(notes))
module.exports = new Store();