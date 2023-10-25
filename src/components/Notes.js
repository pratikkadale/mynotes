import React, { useContext, useRef, useEffect,useState } from 'react';
import NoteContext from "../context/notes/NoteContext";
import { Noteitem } from './Noteitem';
import { AddNote } from './AddNote';
import { useNavigate } from 'react-router-dom';
export const Notes = (props) => {

  let navigate = useNavigate();
  const showAlert=props.showAlert;
  const context = useContext(NoteContext);
  const { notes, getNote ,editnote} = context;
  // const revnotes=notes.reverse;
  // console.log(notes);
 // console.log("here i am");
 // console.log(notes);
  useEffect(() => {

  if(localStorage.getItem('token')){
    getNote()
  }
  else
  {
    navigate('/login');
  }
    // eslint-disable-next-line
  }, [])


  const ref = useRef(null)
  const refclose = useRef(null)

  const [note, setnote] = useState({ id:"",etitle: "", econtent: "", tags: "" })
  const updateNote = (currentNote) => {
    ref.current.click();
    setnote({id:currentNote._id, etitle:currentNote.title, econtent:currentNote.content})

  }

  //------copied from addnotes.js
  const handelOnclick = (e) => {
    //prevent default se reload nai hota
    refclose.current.click();
    editnote(note.id,note.etitle,note.econtent);
    console.log("updating the notes,,...", note);
    props.showAlert("Note succesfully edited","success");

    e.preventDefault();

  }
  const onChange = (e) => {
    //using spread operator (...,threedots) to update the note value with the e.target.name
    //jo bhi change ho raha hai uska name uski value ki barabar ho
    setnote({ ...note, [e.target.name]: e.target.value })
  }

  return (
    <>
      <AddNote showAlert={props.showAlert}/>

      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>

      <div className="modal fade" id="exampleModal" htmltabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">

              <form>
                {/* <legend>Disabled fieldset example</legend> */}
                <div className="mb-3 my-3">

                  <input type="text my-3" id="etitle" name="etitle" value={note.etitle} className="form-control" placeholder="Title.." onChange={onChange}  minLength={5} required/>
                </div>

                <div className="mb-3 my-3">

                  <input type="text my-3" id="econtent" name="econtent" value={note.econtent} className="form-control" placeholder="Description...." onChange={onChange} minLength={5} required/>
                </div>

                {/* <button type="submit" className="btn btn-primary" onClick={handelOnclick}>Submit</button> */}
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refclose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" className="btn btn-primary" onClick={handelOnclick} >Update Note</button>
            </div>
          </div>
        </div>
      </div>

      <div className='row my-3'>
        <h2>Your Notes</h2>
        <div className='container mx-1'>
      {/* we give && when we domnt want to specify the else condition */}
        {notes.length ===0 && "No notes to display"}
        </div>

        {notes.map((note) => {
        
          return <Noteitem key={note._id} updateNote={updateNote} note={note} showAlert={showAlert} />
        })}
      </div>
    </>
  )
}
