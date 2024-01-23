import { Children } from "react"
import { Link } from "react-router-dom"

interface HomeLayoutProps{
    children: React.ReactNode;
}
export default function HomeLayout({ children }: HomeLayoutProps){
    return(
        <>
        <header>
            <nav>
                <ul>
                    <li>
                    <Link to="/Home">
              Home
            </Link>
                    </li>
            
                </ul>
            </nav>
        </header>

        <main>
        
            {children}
            
        </main>
        <footer>
      <div className="contact-info">
          <p>Contacto:Correo electrónico: jhimmi@example.com,Número de teléfono: +1 (123) 456-789,
          Dirección física: 123 Calle Principal, Ciudad</p>
        </div>

        <div className="copyright">
          <p>&copy;2024 Jhimmi. Todos los derechos reservados.</p>
        </div>
      </footer>
     
        </>
        

    )
}