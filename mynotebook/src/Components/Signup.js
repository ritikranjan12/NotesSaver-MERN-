import React, {useState,useContext } from 'react'
import { useNavigate} from 'react-router-dom'
import noteContext from "../context/notes/noteContext"

const Signup = (props) => {
  let navigate = useNavigate();

  const context = useContext(noteContext);
  const { mode ,   } = context;

  const handleSubmit = async (e) => {

    e.preventDefault();

    const response = await fetch(`http://localhost:5000/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name: userName,email :email, password :pass})
    });
    const json = await response.json();
    console.log(json);
    if(json.success){
      //save the authtoken and redirect
      localStorage.setItem('token',json.authtoken);
      navigate("/login"); 
      props.showAlert("Account created Successfully !","success");
      
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
const onChangeUser = (e) => {
  setusername(e.target.value);
}

const onChangeConfirmPass = (e) => {
  setconfirmpass(e.target.value);
}
const [email, setEmail] = useState("");
const [pass, setPass] = useState("");
const [userName, setusername] = useState("");
const [confirmpass, setconfirmpass] = useState("");
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
      <h2 className='mb-3 mx-4'>Create Account on NoteSaver</h2>
      <form  onSubmit={handleSubmit}>
      <div className="mb-3 mx-4">
    <label htmlFor="username" className="form-label">UserName</label>
    <input type="text" name='username' onChange={onChangeUser} value={userName} className="form-control" required id="username" />
  </div>
  <div className="mb-3 mx-4">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" name='email' onChange={onChangeEmail} value={email} className="form-control" required id="exampleInputEmail1" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3 mx-4">
    <label htmlFor="exampleInputPassword1"   className="form-label">Password</label>
    <input name='password' type="password"  onChange={onChangePass} value={pass} className="form-control" required id="exampleInputPassword1"/>
  </div>

  <div className="mb-3 mx-4">
    <label htmlFor="exampleInputPassword1"   className="form-label">Confirm Password</label>
    <input name='confirmpassword' type="password"  onChange={onChangeConfirmPass} value={confirmpass} className="form-control" required id="exampleInputPassword"/>
  </div>
  <button type="submit" className="btn btn-success mx-4  my-2">Sign up</button>
  <a href="/login" className="btn btn-primary" role="button">
            Log in
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

export default Signup
