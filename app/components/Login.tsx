import { useState, useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../auth";
import { useNavigate } from "react-router";


export default function AuthButton() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate(); 
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (curUser) => {
      setUser(curUser ?? null);
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

   return (
    <div>
      {user ? (
        <button className="btn btn-ghost btn-sm" onClick={handleLogout}>
          Logout : {user.email}
        </button>
      ) : (
        <button className="btn btn-ghost btn-sm" onClick={() => navigate('/login')}>
          Login
        </button>
      )}
    </div>
  );
}