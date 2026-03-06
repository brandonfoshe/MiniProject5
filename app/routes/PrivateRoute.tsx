import { Navigate, Outlet } from "react-router";
import { useEffect, useState } from "react";
import { auth } from "../auth";
import { onAuthStateChanged } from "firebase/auth";

export default function PrivateRoute() { 
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (curUser) => {
      setUser(curUser ?? null);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  if (loading) return <div>Loading...</div>;

  return user 
    ? <Outlet />
    : <Navigate to="/login" />;
}