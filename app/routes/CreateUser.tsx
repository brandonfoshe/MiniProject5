import { useState } from 'react';
import { useNavigate } from 'react-router';
import AuthButton from '~/components/Login';
import Navbar from '../components/Navbar';
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
    <div className="min-h-screen bg-base-200">
      <Navbar/>

      <div className="flex items-center justify-center py-16 px-4">
        <div className="card bg-base-100 shadow-md w-full max-w-md">
          <div className="card-body gap-4">

            <h1 className="text-2xl font-bold text-center">Create Account</h1>

            <form onSubmit={handler} className="flex flex-col gap-4">
              {error && (
                <div className="alert alert-error text-sm">
                  {error}
                </div>
              )}

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Email *</span>
                </label>
                <input type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="user@example.com"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Password *</span>
                </label>
                <input type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 6 characters"
                  className="input input-bordered w-full"
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text font-semibold">Confirm Password *</span>
                </label>
                <input type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Re-enter password"
                  className={`input input-bordered w-full ${confirmPassword && confirmPassword !== password ? "input-error" : ""}`}
                  required
                />
                {confirmPassword && confirmPassword !== password && (
                  <label className="label">
                    <span className="text-error">Passwords do not match</span>
                  </label>
                )}
              </div>

              <button type="submit"
                disabled={loading || confirmPassword !== password}
                className="btn btn-primary w-full mt-2"
              >
                {loading ? 'Creating Account...' : 'Create Account'}
              </button>
            </form>

            <p className="text-center text-sm text-base-content/60">
              Already have an account?{" "}
              <a href="/login" className="text-primary font-semibold hover:underline">
                Log in here
              </a>
            </p>

          </div>
        </div>
      </div>
    </div>
  )
}