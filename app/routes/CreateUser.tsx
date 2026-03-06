import { useState } from 'react';
import { useNavigate } from 'react-router';
import AuthButton from '~/componenets/Login';
import Navbar from '../componenets/Navbar';
import {signUpUser} from "../auth.js";


export default function CreateUser(){

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate(); 

  const handler = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password){
      setError("Failed");
      return;
    }

    setLoading(true);
    const result = await signUpUser(email,password);
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
        {error && (
          <div>
            {error}
          </div>
        )}


        <hr />

        <div>
          <label>
            Email *
          </label>
          <input 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            placeholder="User@example.com"
            required
          />
        </div>

        <div>
          <label>
            Password *
          </label>
          <input 
            type="password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            placeholder="At least 6 characters"
            required
          />
        </div>

        <div>
          <label>
            Confirm Password *
          </label>
          <input 
            type="password" 
            value={confirmPassword} 
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Re-enter password"
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading || confirmPassword != password}
        >
          {loading ? 'Creating User...' : 'Create User'}
        </button>
      </form>

    </div>
  )
}