import React, { useContext } from 'react'
import noteContext from '../context/notes/noteContext';

const NoteItem = (props) => {
    const { note,updateNote } = props;
    const context = useContext(noteContext);
    const {deleteNote} =context;
    return (
        <div className='col-md-3'>


            <div className="card my-2">
                <div className="card-body">
                    <h5 className="card-title">{note.title}</h5>
                    <p className="card-text">{note.description}</p>
                    <i style={{cursor : 'pointer'}} className="fa-solid fa-trash mx-3" onClick={()=>{deleteNote(note._id); props.showAlert("Deleted Note Successfully","success")}}></i>
                    <i style={{cursor : 'pointer'}} className="fa-solid fa-pen-to-square mx-3" onClick={()=>{updateNote(note)}}></i>
                </div>
            </div>
        </div>
    )
}

export default NoteItem