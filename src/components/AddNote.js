import React,{useContext,useState,useEffect} from 'react'
import NoteContext from '../context/notes/NoteContext';

export const AddNote = (props) => {
    const context = useContext(NoteContext);
    const {addNote,getNote}=context;

    //why use effect is used and what are the stages of lifecycle of componenets
    useEffect(() => {
      getNote()
      // eslint-disable-next-line
    }, [])
    

    const handelOnclick=(e)=>{
        //prevent default se reload nai hota
        e.preventDefault();
        addNote(note.title,note.content,note.tags);
        getNote()
        setnote({title:"", content:""})
        props.showAlert("Note succesfully added","success");
        
    }
    const [note, setnote] = useState({title:"", content:"", tags:""})
    const onChange=(e)=>{
        //using spread operator (...,threedots) to update the note value with the e.target.name
        //jo bhi change ho raha hai uska name uski value ki barabar ho
        setnote({...note, [e.target.name]:  e.target.value})
//        console.log(note)
        

    }

  return (
    <div className='container my-3'>
      <h2>Add a Note</h2>
        <form>
            {/* <legend>Disabled fieldset example</legend> */}
            <div className="mb-3 my-3">

              <input type="text my-3" rows="2" id="title" name="title" value={note.title} className="form-control" placeholder="Title.." onChange={onChange} />
                      </div>

            <div className="mb-3 my-3">

            <textarea className="form-control" id="content" name="content" value={note.content} rows="3" height="50px" placeholder="Description...." onChange={onChange}></textarea>
              {/* <input type="text my-3" id="content" name="content" className="form-control" placeholder="Description...." onChange={onChange} /> */}
            </div>   
                    
            <button disabled={note.title.length<5 || note.title.length<5 }type="submit" className="btn btn-dark" onClick={handelOnclick}>Add</button>
        </form>
    </div>
  )
}
