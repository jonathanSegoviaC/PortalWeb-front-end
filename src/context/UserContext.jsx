import React, { createContext, useState, useEffect } from 'react';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Código para manejar el inicio/cierre de sesión del usuario y obtener los datos del usuario de tu mecanismo de autenticación

  useEffect(() => {
    // Verificar inicio de sesión existente o buscar datos de usuario al cargar la aplicación
    const usuarioAlmacenado = localStorage.getItem('user');
    if (usuarioAlmacenado) {
      setUser(JSON.parse(usuarioAlmacenado));
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext, UserProvider };