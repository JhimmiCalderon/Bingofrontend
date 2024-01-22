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
                    <li>
              <Link to="/signup">Signup</Link>
            </li>
                </ul>
            </nav>
        </header>

        <main>
        
            {children}
            
        </main>
        </>

    )
}