import React, {useState,useContext } from 'react'
import { useNavigate} from 'react-router-dom'
import noteContext from "../context/notes/noteContext"
const Login = (props) => {
  let navigate = useNavigate();

  const context = useContext(noteContext);
  const { mode ,   } = context;

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({email :email, password :pass})
    });
    const json = await response.json();
    console.log(json);
    if(json.success){
      //save the authtoken and redirect
      localStorage.setItem('token',json.authtoken);
      props.showAlert("Log in Successfull!","success");
      navigate("/"); 
      
    } else {
      props.showAlert("Invalid Credentials","danger");
    }

  }
  const onChangeEmail = (e)=>{
    setEmail(e.target.value);
    
}
const onChangePass = (e) => {
  setPass(e.target.value);
}
const [email, setEmail] = useState("");
const [pass, setPass] = useState("");
  return (
    
    <>
    <div className="row">
      <div className="col-md-3 my-4">

      </div>
    <div className="col-md-6 my-3">
    <div className={`card my-1 bg-${mode}`}>
    
  <img src={require('../static/login.png')} className="card-img-top" alt="..."/>
  
    
    <div className={`card my-1 bg-${mode}`}>
    <div className="container mx-4 my-4">
      <h2 className='mb-3 mx-4'>Login to NoteSaver</h2>
      <form  onSubmit={handleSubmit}>
  <div className="mb-3 mx-4">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" name='email' onChange={onChangeEmail} value={email} className="form-control" required id="exampleInputEmail1" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3 mx-4">
    <label htmlFor="exampleInputPassword1"   className="form-label">Password</label>
    <input name='password' type="password"  onChange={onChangePass} value={pass} className="form-control" required id="exampleInputPassword1"/>
  </div>
  <button type="submit" className="btn btn-primary mx-4  my-2">Log in</button>
  <a href="/signup" className="btn btn-success" role="button">
            Sign up
  </a>
</form>

</div>
</div>
</div>

</div>
</div>
    </>
  )
}

export default Login
