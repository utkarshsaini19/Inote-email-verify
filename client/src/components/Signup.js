import React,{useState} from 'react'
import { useNavigate  } from 'react-router-dom'

const Signup = (props) => {

  const [credentials, setCredentials] = useState({name:"",email:"",password:"",cpassword:""});
  let usenavigate  = useNavigate ();
  const [msg,setMsg] = useState("")
  const [disabled,setDisabled] = useState(false)
  

  const handleSubmit = async (e) =>{
    e.preventDefault();
    console.log("Inside handle Submit before setting wait");
    setDisabled(true)
    setMsg("Wait...");
    try{
    const {name,email,password,cpassword} = credentials;
    const response = await fetch(`/api/auth/createuser`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({name,email,password})
      });

      const json = await response.json();
      console.log(json);
      setMsg(json.message);
    }
    catch(error){
      console.log("Inside error :",error.message);
    }
      
      
      // if(json.success)
      // {
      //   // Save the auth token and redirect
      //   localStorage.setItem("token",json.authtoken);
        // usenavigate("/");
      //   props.showAlert("Sign Up SuccessFully","success");
        
      // }
      // else
      // {
      //   props.showAlert("User already exists","danger");
      // }

}

const onChange = (e) =>{
    setCredentials({...credentials,[e.target.name]:e.target.value})
}

  return (
    <div className="container mt-3">
    <h2>Sign up to continue to iNote</h2>
      <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Name</label>
                <input type="text" className="form-control" onChange={onChange} id="name" value={credentials.name} name="name" aria-describedby="emailHelp"  />
            </div>
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email address</label>
                <input type="email" className="form-control" onChange={onChange} id="email" value={credentials.email} name="email" aria-describedby="emailHelp"  />
                <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">Password</label>
                <input type="password" className="form-control" onChange={onChange} id="password" value={credentials.password} name="password"  minLength={5} required />
            </div>
            <div className="mb-3">
                <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                <input type="password" className="form-control" onChange={onChange} id="cpassword" value={credentials.cpassword} name="cpassword"  minLength={5} required />
            </div>
            {msg && msg==="Wait..." ? <h3 style={{color:"red"}}> Wait... </h3> : <h3 style={{color:"green"}}>{msg}</h3>}
            <button disabled={disabled} type="submit" className="btn btn-primary">Submit</button>
        </form>
    </div>
  )
}

export default Signup