import React, { useContext, useEffect } from 'react'
import noteContext from '../context/notes/noteContext'
import AddNote from './AddNote';
import Notes from './Notes';

const Home = (props) => {

  const context = useContext(noteContext);
  const {notes, setnotes} = context;
  return (
    <div >
      

      <Notes showAlert={props.showAlert} />
    </div>
  )
}

export default Home