import AuthButton from "../componenets/Login";
import { useWishlist } from "./Wishlist";
import { useState, useEffect } from "react";
import { auth } from "../auth";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router";

export default function Navbar() {
  const { wishlist, downloadWishlist } = useWishlist(); 
   const [user, setUser] = useState(null);
     const navigate = useNavigate(); 

 useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (curUser) => {
      setUser(curUser ?? null);
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="navbar bg-base-100 shadow-md px-6 sticky top-0 z-50">
      <div className="flex-1 flex items-center gap-2">
        <img src="./app/public/MovieIcon.png" className="w-8 h-8 object-contain"/>
        <span className="text-xl font-bold tracking-tight">Movie Wishlister</span>
      </div>
      
      <div className="flex-none flex items-center gap-2">
        <button
           onClick={() => navigate('/')}>
          Home
        </button>
        <button
          onClick={() => {
            if (!user){
              navigate('/login');
            } else{
              downloadWishlist();
            }
          }}
          disabled={wishlist.length === 0}
          className="btn btn-ghost btn-sm"
          title={!user ? "Login to download" : "Download wishlist"}
        >
          Download
        </button>
        <div className="indicator">
          <span className="indicator-item badge badge-sm badge-primary">
            {wishlist.length}
          </span>
          <button onClick={() => navigate('/wishlist')} className="btn btn-ghost btn-sm gap-1">Wishlist</button>
        </div>
        <AuthButton />
      </div>
    </div>
  );
}