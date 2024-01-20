import HomeLayout from "../layout/HomeLayout";
import { Link } from "react-router-dom";

export default function Home(){
   return (
   <HomeLayout>
   <form action="">
   <Link to="/lobby">
               <button>Iniciar Juego</button>
            </Link>
      
   </form>
   </HomeLayout>
   );
}