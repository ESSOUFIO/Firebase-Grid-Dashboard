import { Navigate } from "react-router-dom";
import { useSession } from "../firebase/UserProvider";

const PrivateRoute = (Component) => {
  const Wrapper = (props) => {
    const { user } = useSession();
    return !!user ? <Component {...props} /> : <Navigate to="/login" />;
  };
  return Wrapper;
};

export default PrivateRoute;
