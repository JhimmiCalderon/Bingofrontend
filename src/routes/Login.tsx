import { useState } from "react";
import HomeLayout from "../layout/HomeLayout";
import { useAuth } from "../auth/AuthProvider";
import { Navigate } from "react-router-dom";

export default function Login(){
   const [username, setUsername] = useState("");
   const [password, setPassword] = useState("");
   const auth = useAuth();

   if(auth.isAuthenticated){
      return <Navigate to="/home" />
   }

   return (
   <HomeLayout>
   <form action="">
      <h1>Bingo El gran Duda</h1>
      <label htmlFor="">Nombre</label>
      <input type="text" 
      value={username}
      onChange={(e) => setUsername(e.target.value)}/>

      <label htmlFor="">Contraseña</label>
      <input type="Password" 
      value={password}
      onChange={(e) => setPassword(e.target.value)}/>

      <button>Iniciar Juego</button>
   </form>
   </HomeLayout>
   );
}