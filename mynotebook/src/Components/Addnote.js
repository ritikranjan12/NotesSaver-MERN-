import React, { useContext, useState } from 'react';
import noteContext from "../context/notes/noteContext";

const Addnote = (props) => {
    const context = useContext(noteContext);
    const {addnote} = context;
    const [note,setNote] = useState({title:"",description:"",tag:"default"})

    const handleClick = () => {
        addnote(note.title,note.description,note.tag);
        props.showAlert("Note Added Successfully!","success")
    }

    const onChange = (event) => {
       setNote({...note,[event.target.name] : event.target.value})
    } 
  return (
    <div>
      <div className="container my-3">
        <h1 className="my-2">Add a Note</h1>
        <form className="my-4">
          <div className="form-group my-2">
            <label htmlFor="title">Title</label>
            <input
              type="text" name="title" onChange={onChange}
              className="form-control "
              id="title" minLength={5} required
              placeholder="Enter title of your Notes"
            />
          </div>

          <div className="form-group my-2">
            <label htmlFor="description">Description</label>
            <textarea name='description'  minLength={5} required onChange={onChange} className="form-control " id="description" rows="4"></textarea>
          </div>

          <div className="form-group my-2">
            <label htmlFor="tag">Tag</label>
            <input name='tag'
              type="text" onChange={onChange}
              className="form-control "
              id="tag" 
              placeholder="Add tag for your Notes"
            />
          </div>
          <button disabled={note.title.length<5 || note.description.length<5} onClick={handleClick} type="submit" className="btn btn-primary my-3">
            Add Note
          </button>
        </form>
      </div>
    </div>
  )
}

export default Addnote
