import React from "react";
import axios from "axios";
import {toast} from 'react-toastify';
import {useHistory} from 'react-router-dom';
import Loader from '../Loader'


interface LoginProps {
  renderSignup: () => void;
}
const Login = ({renderSignup}: LoginProps) => {
  const [username, setUsername] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [loading,setLoading] = React.useState(false);
  const history = useHistory()

  const onSubmit = async () => {
    setLoading(true);
    try{
      const response = await axios.post('https://mymerntodolist.herokuapp.com/login', {
      username: username,
      password: password
    })
      // sucessful, save the token
      if (response.status === 200) {
        const token = response.data.token;
        localStorage.setItem('token', token);
        toast.success('Logged in Successfully')
        history.push('/dashboard')
        setLoading(false);
      }} catch(e) {
        // do some validation, logging
        toast.error('Incorrect username or password')
        setLoading(false);
      }
  }

  return(
    <>
    {loading?<Loader />:
    <div style={{height: '300px'}}>
      <h1 className="text-center text-green-400 font-bold">Login</h1>
      <div className="mb-4">
        <label>username</label>
        <input onChange={(e) => setUsername(e.target.value)} className="w-full px-3 py-2 border border-gray-400 rounded-md" type="text" placeholder="username" />
      </div>
      <div className="mb-4">
        <label>password</label>
        <input onChange={(e) => setPassword(e.target.value)} className="w-full px-3 py-2 border border-gray-400 rounded-md" type="password" placeholder="password" />
      </div>
      <div className="flex justify-between items-center">
        <div>
          <p>No account? <span className="text-green-400 cursor-pointer" onClick={renderSignup}>Signup</span></p>
        </div>
        <button className="rounded-lg px-6 py-3 font-bold bg-green-400 text-white" onClick={() => onSubmit()}>Login</button>
      </div>
    </div>}
</>
  )}

export default Login;