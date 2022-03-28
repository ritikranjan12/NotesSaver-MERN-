import React, { useContext} from 'react'
import noteContext from "../context/notes/noteContext"

export const Alert = (props) => {
    const context = useContext(noteContext);
    const { mode } = context;

    const capitalize = (word)=>{
        if(word==='danger'){
            word="error";
        }
        const lower = word.toLowerCase();
        return lower.charAt(0).toUpperCase() + lower.slice(1);
    }

    
    return (
        <div  style={{height: '50px'}}>
        {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
           <strong>{capitalize(props.alert.type)}</strong>: {props.alert.msg} 
        </div>}
        </div>
    )
}

export default Alert