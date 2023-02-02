import React,{useContext,useState} from 'react'
import noteContext from '../context/notes/noteContext';

const AddNote = (props) => {
    const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setnote] = useState({title:"", description:"",tag:""})

  const handleClick = (e) =>{
    e.preventDefault();
    addNote(note.title,note.description,note.tag);
    setnote({title:"", description:"",tag:""});
    props.showAlert("Added notes Successfully","success");
  }

  const onChange = (e) =>{
        setnote({...note,[e.target.name]:e.target.value})
  }

  return (
    
    <div className="container my-3">
        <h1>Add a Note</h1>
        <form>
          <div className="form-group">
            <label htmlFor="title">Title</label>
            <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} placeholder="Enter Title" onChange={onChange} minLength={5} required/>
          </div>
          <div className="form-group">
            <label htmlFor="description">Description</label>
            <input type="text" className="form-control" id="description" name="description" value={note.description} placeholder="Enter Description" onChange={onChange} minLength={5} required/>
          </div>
          <div className="form-group">
            <label htmlFor="tag">Tag</label>
            <input type="text" className="form-control" id="tag" name="tag" value={note.tag} placeholder="Enter Tag" onChange={onChange}/>
          </div>
          
          <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add Note</button>
        </form>
      </div>
  )
}

export default AddNote