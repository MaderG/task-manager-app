import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { UserContext } from '../context/UserContext';

const RegisterRoute = () => {
  const { login } = useContext(UserContext);
  return login ? <Navigate to="/" /> : <Outlet />;
};

export default RegisterRoute;
