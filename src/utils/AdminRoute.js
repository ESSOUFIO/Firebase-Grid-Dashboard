import { Navigate } from "react-router-dom";
import { useSession } from "../firebase/UserProvider";

const AdminRoute = (Component) => {
  const Wrapper = (props) => {
    const { user, isAdmin } = useSession();
    return !!user && isAdmin ? <Component {...props} /> : <Navigate to="/" />;
  };
  return Wrapper;
};

export default AdminRoute;
