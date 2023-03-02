import { Navigate } from "react-router-dom";
import { useSession } from "../firebase/UserProvider";

const withProfileRedirect = (Component) => {
  const Wrapper = (props) => {
    const { user, isAdmin } = useSession();
    return !!user && !isAdmin ? (
      <Navigate to={"/"} />
    ) : isAdmin ? (
      <Navigate to={"/users"} />
    ) : (
      <Component {...props} />
    );
  };
  return Wrapper;
};

export default withProfileRedirect;
