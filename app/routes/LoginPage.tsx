import { useState } from 'react';
import { useNavigate } from 'react-router';
import AuthButton from '~/components/Login';
import Navbar from '../components/Navbar';
import {loginUser} from "../auth.js";
export default function Login(){

  const [email,setEmail]=useState('');
  const [password,setPassword] = useState('');
  const [error,setError] = useState('');
  const [loading,setLoading] = useState(false)
  const navigate = useNavigate(); 

  const handler = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password){
      setError("Failed");
      return;
    }

    setLoading(true);
    const result = await loginUser(email,password);
    setLoading(false);

    if (result.success){
      alert('Logged in!')
    } else {
      setError(result.error);
    }
  };

  return(
    <div>
        <Navbar/>
      <h1>
        User Login
        </h1>

        <form onSubmit={handler}>
          {error &&(
            <div>
              {error}
              </div>
          )}
          <div>
            <label>
              Email
              </label>
              <input type="email" value={email} onChange={(e)=> setEmail(e.target.value)}
              required/>
          </div>
          <div>
            <label>
              Password
              </label>
              <input type="password" value={password} onChange={(e)=> setPassword(e.target.value)}
              required/>
          </div>
          <button
          type="submit"
        disabled={loading}
          >
            {loading? 'Logging in':'Log In'}
            </button>
          </form>

            <p>
              Haven't created your User yet? <a href="/CreateUser">Create User here</a>
              </p>
        </div>
  )
}