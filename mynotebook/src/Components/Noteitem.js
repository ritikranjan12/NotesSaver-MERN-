import React, {useContext} from 'react'
import noteContext from "../context/notes/noteContext"


const Noteitem = (props) => {
    const context = useContext(noteContext);
    const { deleteNote , mode } = context;
    const { note, updateNote } = props;
    return (
        <div className="col-md-3">
            <div className={`card my-3 bg-${mode}`}>
                <div className="card-body">
                    <div className="d-flex align-items-center">
                        <h5 className="card-title">{note.title}</h5>
                        <i className="far fa-trash-alt mx-2" onClick={()=>{deleteNote(note._id);props.showAlert("Deleted Successfully!","success")}}></i>
                        <i className="far fa-edit mx-2" onClick={()=>{updateNote(note)}}></i>
                    </div>
                    <p className="card-text">{note.description}</p>
                    <h6 className='tag'>#{note.tag}</h6>
                    <i className="data">Added on {note.date}</i>

                </div>
            </div>
        </div>
    )
}

export default Noteitem             
