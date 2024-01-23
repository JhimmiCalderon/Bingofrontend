// User.tsx
import React, { useState } from 'react';
import './css/User.css'; // Importa el archivo CSS

const User: React.FC = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible((prevVisibility) => !prevVisibility);
  };

  return (
    
    <div className={`UserListContainer ${isVisible ? 'visible' : ''}`}>
        
      <button onClick={toggleVisibility} className="ToggleBtn">
        {isVisible ? 'x' : 'Usuarios Jugando'}
      </button>
      
      {isVisible && (
        <ul className="UserList">
          {/* Puedes ajustar el número de elementos según tus necesidades */}
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
