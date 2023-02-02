import React, { useContext, useEffect, useRef,useState } from 'react'
import { useNavigate } from 'react-router-dom';
import noteContext from '../context/notes/noteContext'
import AddNote from './AddNote';
import NoteItem from './NoteItem';

const Notes = (props) => {
  const context = useContext(noteContext);
  const { notes, getNotes , editNote } = context;
  const [note, setnote] = useState({id:"",etitle:"", edescription:"",etag:""})
  const usenavigate = useNavigate();
  useEffect(() => {
    if(localStorage.getItem('token'))
    {

      getNotes();
    }
    else{
      usenavigate('/login');
    }


    // eslint-disable-next-line
  }, [])

  const ref = useRef(null)
  const refClose = useRef(null)

  const updateNote = (currentNote) => {
    ref.current.click();
    setnote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag})
  }

  const handleClick = (e) =>{
    //console.log("Updating the note ...",note);
    editNote(note.id,note.etitle,note.edescription,note.etag)
    refClose.current.click();
    // addNote(note.title,note.description,note.tag);
    props.showAlert("Updated notes Successfully","success");
  }

  const onChange = (e) =>{
        setnote({...note,[e.target.name]:e.target.value})
  }


  return (
    <>
      <AddNote showAlert={props.showAlert} />

      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">

      </button>


      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" aria-describedby="emailHelp" placeholder="Enter Title" value={note.etitle} onChange={onChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="description">Description</label>
                  <input type="text" className="form-control" id="edescription" name="edescription" placeholder="Enter Description" value={note.edescription} onChange={onChange} />
                </div>
                <div className="form-group">
                  <label htmlFor="tag">Tag</label>
                  <input type="text" className="form-control" id="etag" name="etag" placeholder="Enter Tag" value={note.etag} onChange={onChange} />
                </div>

                
              </form>
            </div>
            <div className="modal-footer">
              <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button disabled={note.etitle.length<5 || note.edescription.length<5} onClick={handleClick} type="button" className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>

      <div className="row my-3">
        <h2>Your Notes</h2>
        <div className='container mx-1'>
        {notes.length === 0 && "No Notes Available"}
        </div>
        {notes.map((note) => {
          return <NoteItem showAlert={props.showAlert} key={note._id} updateNote={updateNote} note={note} />;
        })}
      </div>
    </>
  )
}

export default Notes