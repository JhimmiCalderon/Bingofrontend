import { useState } from "react";
import HomeLayout from "../layout/HomeLayout";
import { useAuth } from "../auth/AuthProvider";
import { Navigate, useNavigate } from "react-router-dom";
import { AuthResponse, AuthResponseError } from "../types/types";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorResponse, setErrorResponse] = useState("");

  const auth = useAuth();
  const goTo = useNavigate();

  async function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    console.log(username, password, name);

    try {
      const response = await fetch("http://localhost:3000/bingo/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, name }),
      });
      if (response.ok) {
        const json = (await response.json()) as AuthResponse;
        console.log(json);
        setUsername("");
        setPassword("");
        setName("");
        goTo("/");
      } else {
        const json = (await response.json()) as AuthResponseError;

        setErrorResponse(json.body.error);
      }
    } catch (error) {
      console.log(error);
    }
  }

  if (auth.isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return (
    <HomeLayout>
      
      <form onSubmit={handleSubmit}>
      {!!errorResponse && <div className="errorMessage">{errorResponse}</div>}
      <h1>Registro Usuarios</h1>
   <div className="form" >   
  <div className="username">
    <input type="text" placeholder="USERNAME" 
          name="username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}/>
  </div>
  <div className="name">
    <input type="text" placeholder="NAME" 
          name="name"
          onChange={(e) => setName(e.target.value)}
          value={name}/>
  </div>
  <div className="password">
  <input type="password" 
     name="password"
     onChange={(e) => setPassword(e.target.value)}
     value={password} placeholder="PASSWORD"/>
  </div>
  <div className="login">
    <button >CreaUsuario</button>
  </div>
</div>
</form>
    </HomeLayout>
  );
}