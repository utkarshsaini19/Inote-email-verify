import React, { useState } from 'react'
import NoteContext from './noteContext'


const NoteState = (props) => {

  // const host = "http://localhost:5000"

  const notesInitial = [];


  const [notes, setNotes] = useState(notesInitial)

  // Get all Note
  const getNotes = async () => {
    //TODO : API CALL
    console.log("getNotes");
    const response = await fetch(`/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
    });
    const json = await response.json();
    setNotes(json)
  }


  // Add a note
  const addNote = async(title, description, tag) => {
    //TODO : API CALL
    const response = await fetch(`/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag})
    });
    const json = await response.json();
    

    

  
    setNotes(notes.concat(json))
  }

  // Delete a note
  const deleteNote = async (id) => {
    // API Call
    const response = await fetch(`/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      
    });
    const json = await response.json();
    console.log(json);

    console.log("Deleting note with id " + id);
    const newNotes = notes.filter((note) => {
      return note._id !== id;
    })
    setNotes(newNotes);



  }


  // Edit a note
  const editNote = async (id, title, description, tag) => {
    // API Call

    const response = await fetch(`/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag})
    });
    const json = response.json();
    console.log(json);
  
    let newNotes = JSON.parse(JSON.stringify(notes))

  //Logic to edit in Client
  for (let index = 0; index < newNotes.length; index++) {
    const element = newNotes[index];

    if (element._id === id) {
      newNotes[index].title = title;
      newNotes[index].description = description;
      newNotes[index].tag = tag;
      break;
    }


  }
  setNotes(newNotes);

}

return (
  <NoteContext.Provider value={{ notes, setNotes, addNote, deleteNote, editNote ,getNotes }}>
    {props.children}
  </NoteContext.Provider>
)
}

export default NoteState