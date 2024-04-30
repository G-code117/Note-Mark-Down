const util = require("util");
const fs = require("fs");
const { v4: uuidv4 } = require("uuid");


const readFileAsync = util.promisify(fs.readFile);
const writeFileAsync = util.promisify(fs.writeFile);

class Store {
  read() {
    return readFileAsync("db/db.json", "utf8");
  }
  markDown(notes) {
    console.log(notes)
    return writeFileAsync("db/db.json", JSON.stringify(notes, null, 4));
  }
  retrieveNotes() {
    return this.read().then((notes) => {
      let parsedNotes;
      try {
        parsedNotes = [].concat(JSON.parse(notes));
      } catch (error) {
        parsedNotes = [];
      }
      return parsedNotes;
    });
  }
  appendNote(notes) {
    const { title, text } = notes;

    if (!title || !text) {
      throw new Error("needs title and notes");
    }
    const nextNote = { title, text, id: uuidv4() };
    //console.log(nextNote);
    return this.retrieveNotes()
      .then((currentNotes) => {
        const updateNotes =[...currentNotes, nextNote]
    //console.log('updatedNotes', updateNotes)
return updateNotes})
      .then((updateNotes) => {
          
        //  console.log('new markdown created')
         return this.markDown(updateNotes)

})
      .then(() => nextNote);
  }
  deleteNote(id) {
    return this.retrieveNotes()
      .then((notes) => notes.filter((note) => note.id !== id))
      .then((filteredNotes) => this.markDown(filteredNotes));
  }
}

//const a = new Store().retrieveNotes().then((notes) => console.log(notes));
//const a = new Store().retrieveNotes().then((data) => data.JSON()).then((notes) => console.log(notes))
module.exports = new Store();
