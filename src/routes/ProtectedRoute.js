import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const location = useLocation();
  const checkAuth = JSON.parse(localStorage.getItem('isAuth')) || false

  console.log("what is AUth:::", checkAuth)
  if (!checkAuth) {
    return <Navigate to='/login' state={{ from: location }} />
  }
  return children;
}

export default ProtectedRoute;