import NoteContext from "./NoteContext";
import { useState } from "react";


const NoteState = (props) => {
  const host = "http://localhost:5000"
  const noteInitial = []

  //get all notes
  const getNote = async () => {
    //TODO:API CALL
    const response = await fetch(`${host}/api/notes/getallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      
    });

    const json = await response.json()
    setnotes(json)
  }

  //add note
  const addNote = async (title, content, tags) => {
    //TODO:API CALL  >>>> fetch with headers using fetch web api
     const response=await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, content, tags })
    });
    //  const json = response.json();
    
    //logic
    const note = response.json();
    setnotes(notes.concat(note))
  }

  //delete note
  const deleteNote = async(id) => {
    //API call
    await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },

    });
    //delete note logic
    const newNotes = notes.filter((note) => { return note._id !== id })
    setnotes(newNotes)
  }

  //edit a note
  const editnote = async (id, title, content, tags) => {
    //TODO:API CALL
     await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'auth-token': localStorage.getItem('token')
      },
      body: JSON.stringify({ title, content, tags })
    });
    //  const json = response.json();

    let newnotes = JSON.parse(JSON.stringify(notes))
    //note-edit logic
    for (let index = 0; index < newnotes.length; index++) {
      const element = newnotes[index];
      if (element._id === id) {
        newnotes[index].title = title;
        newnotes[index].content = content;
        newnotes[index].tags = tags;
        break;
      }
    }
    console.log(notes)
    setnotes(newnotes)

 
  }

  const [notes, setnotes] = useState(noteInitial)
  

  return (
    <NoteContext.Provider value={{ notes, getNote, setnotes, addNote, deleteNote, editnote}}>
      {props.children}
    </NoteContext.Provider>
  )
}
export default NoteState;