import { Navigate } from "react-router-dom";
import { useSession } from "../firebase/UserProvider";

const withProfileRedirect = (Component) => {
  const Wrapper = (props) => {
    const { user } = useSession();
    return !!user ? <Navigate to={-1} /> : <Component {...props} />;
  };
  return Wrapper;
};

export default withProfileRedirect;
