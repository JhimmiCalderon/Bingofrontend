// User.tsx
import React, { useState } from 'react';
import './css/User.css'; // Importar el archivo CSS

/**
 * Componente Usuario
 * 
 * Este componente representa un contenedor de lista de usuarios con un botón de alternancia para mostrar/ocultar la lista de usuarios.
 * Utiliza un estado local para gestionar la visibilidad de la lista de usuarios.
 */
const User: React.FC = () => {
  // Estado para seguir la visibilidad de la lista de usuarios
  const [isVisible, setIsVisible] = useState(false);

  /**
   * Alternar Visibilidad
   * 
   * Función para alternar la visibilidad de la lista de usuarios.
   */
  const toggleVisibility = () => {
    setIsVisible((prevVisibility) => !prevVisibility);
  };

  return (
    <div className={`UserListContainer ${isVisible ? 'visible' : ''}`}>
      {/* Botón de Alternancia */}
      <button onClick={toggleVisibility} className="ToggleBtn">
        {isVisible ? 'x' : 'Usuarios Jugando'}
      </button>

      {/* Lista de Usuarios */}
      {isVisible && (
        <ul className="UserList">
          {/* Elementos de la Lista de Usuarios - Puedes ajustar el número de elementos según sea necesario */}
          <li className="UserListItem">
            <span className="UserNumber">-</span>
          </li>
          <li className="UserListItem">
            <span className="UserNumber">-</span>
          </li>
          <li className="UserListItem">
            <span className="UserNumber">-</span>
          </li>
          {/* Agrega más elementos según sea necesario */}
        </ul>
      )}
    </div>
  );
};

export default User;
