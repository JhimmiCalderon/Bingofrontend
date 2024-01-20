import HomeLayout from "../layout/HomeLayout";
import { Link } from "react-router-dom";

export default function Lobby(){
   return (
   <HomeLayout>
   <form action="">
      <h1>El juego comienza en </h1>
      <h2>30..29..</h2>

      <Link to="/match">
               <button>Crear Tarjeton</button>
            </Link>
   </form>
   </HomeLayout>
   );
}