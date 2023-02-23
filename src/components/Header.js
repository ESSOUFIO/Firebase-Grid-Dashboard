import { Container, Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect, useState } from "react";
import { auth } from "../firebase/config";
import { useNavigate } from "react-router-dom";

function Header() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const listen = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => {
      listen();
    };
  }, []);

  const logoutHandler = () => {
    const auth = getAuth();
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        // An error happened.
      });
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">The Grid</Navbar.Brand>
        <Nav className="me-auto">
          <LinkContainer to="/" className="me-auto">
            <Nav.Link>Home</Nav.Link>
          </LinkContainer>

          <LinkContainer to="/feature" className="me-auto">
            <Nav.Link>Features</Nav.Link>
          </LinkContainer>

          <LinkContainer to="/pricing" className="me-auto">
            <Nav.Link>Pricing</Nav.Link>
          </LinkContainer>

          {user ? (
            <>
              <Nav.Link style={{ marginLeft: "50vw" }} onClick={logoutHandler}>
                Logout
              </Nav.Link>
              <LinkContainer to="dashboard">
                <Nav.Link>Dashboard</Nav.Link>
              </LinkContainer>
            </>
          ) : (
            <>
              <LinkContainer to="login" style={{ marginLeft: "50vw" }}>
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
              <LinkContainer to="signup">
                <Nav.Link>Sign Up</Nav.Link>
              </LinkContainer>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
