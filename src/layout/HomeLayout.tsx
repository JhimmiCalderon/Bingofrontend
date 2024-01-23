import React from "react";
import { Link } from "react-router-dom";

interface LayoutProps {
  children: React.ReactNode;
}

const HomeLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/Home">Home</Link>
            </li>
            <li>
              <Link to="/signup">Registro</Link>
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
  );
};

export default HomeLayout;
