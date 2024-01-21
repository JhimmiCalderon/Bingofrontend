import { useState } from "react";
import HomeLayout from "../layout/HomeLayout";
import { useAuth } from "../auth/AuthProvider";
import { Navigate } from "react-router-dom";
import { AuthResponse, AuthResponseError } from "../types/types";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorResponse, setErrorResponse] = useState("");

  const auth = useAuth();

  function handleChange(e: React.ChangeEvent) {
    const { name, value } = e.target as HTMLInputElement;
    if (name === "username") {
      setUsername(value);
    }
    if (name === "password") {
      setPassword(value);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    // auth.setIsAuthenticated(true);
    try {
      const response = await fetch("http://localhost:3000/bingo/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (response.ok) {
        const json = (await response.json()) as AuthResponse;
        console.log(json);

        if (json.body.accessToken && json.body.refreshToken) {
          auth.saveUser(json);
        }
      } else {
        const json = (await response.json()) as AuthResponseError;

        setErrorResponse(json.body.error);
      }
    } catch (error) {
      console.log(error);
    }
  }
   if(auth.isAuthenticated){
      return <Navigate to="/home" />
   }

   return (
   <HomeLayout>
   <form className="form" onSubmit={handleSubmit}>
      <h1>Bingo El gran Duda</h1>
      {!!errorResponse && <div className="errorMessage">{errorResponse}</div>}
      <label >Nombre</label>
      <input type="text" 
      value={username}
      onChange={(e) => setUsername(e.target.value)}/>

      <label >Contraseña</label>
      <input type="password" 
      value={password}
      onChange={(e) => setPassword(e.target.value)}/>

      <button>Iniciar Juego</button>
   </form>
   </HomeLayout>
   );
}