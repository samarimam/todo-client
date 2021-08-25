import React from "react";
import axios from "axios";
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import {useHistory} from 'react-router-dom';
import Loader from '../Loader';

interface SignupProps {
  renderLogin: () => void;
}

const Signup = ({renderLogin}: SignupProps) => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [disabled, setDisabled] = React.useState(false);
  const [loading,setLoading] = React.useState(false);

  const history = useHistory()

  const onSubmit = async () => {
    setLoading(true);
    try{
    const response = await axios.post('https://mymerntodolist.herokuapp.com/signup', {
      username: username,
      password: password
    })
    if (response.status === 201) {
      const token = response.data.token;
      console.log(response.data)
      localStorage.setItem('token', token);
      
      toast.success('User added Successfully')
      history.push('/dashboard')
      setLoading(false);
    } 
  }catch(e){
    toast.error('Something went wrong')
    console.log(e)    
    setLoading(false);
  }
  }

  React.useEffect(() => {
    if (password === confirmPassword) setDisabled(false);
    else setDisabled(true);
  }, [password, confirmPassword])

  return(
    <>
    {loading?<Loader />:
    <div style={{height: '300px'}}>
      <h1 className="text-center text-green-400 font-bold">Signup</h1>
      <div className="mb-4">
        <label>username</label>
        <input onChange={(e) => setUsername(e.target.value)} className="w-full px-3 py-2 border border-gray-400 rounded-md" type="text" placeholder="username" />
      </div>
      <div className="mb-4">
        <label>password</label>
        <input onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2 border border-gray-400 rounded-md" type="password" placeholder="password" />
      </div>
      <div className="mb-4">
        <label>confirm password</label>
        <input onChange={(e) => setConfirmPassword(e.target.value)} className="w-full px-3 py-2 border border-gray-400 rounded-md" type="password" placeholder="password" />
      </div>
      <div className="flex justify-between items-center">
        <div>
          <p>Already a member? <span className="text-green-400 cursor-pointer" onClick={renderLogin}>Login</span></p>
        </div>
        <button className={`rounded-lg px-6 py-3 font-bold text-white ${disabled ? "bg-gray-400" : "bg-green-400"}`} disabled={disabled} onClick={() => onSubmit()}>Signup</button>
      </div>
    </div>}
    </>
  )
}

export default Signup;