import { Container, Nav, Navbar } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";
import { useSession } from "../firebase/UserProvider";
import { logout } from "../firebase/auth";
import { useNavigate } from "react-router-dom";

function Header() {
  const { user } = useSession();
  const navigate = useNavigate();

  const logoutHandler = async () => {
    await logout();
    setTimeout(() => {
      navigate("login");
    }, 1000);
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
            <Nav.Link>Feature</Nav.Link>
          </LinkContainer>

          <LinkContainer to="/pricing" className="me-auto">
            <Nav.Link>Pricing</Nav.Link>
          </LinkContainer>

          {user && (
            <>
              <LinkContainer
                to={`profile/${user.uid}`}
                style={{ marginLeft: "40vw" }}
              >
                <Nav.Link>Profile</Nav.Link>
              </LinkContainer>
              <Nav.Link onClick={logoutHandler}>Logout</Nav.Link>
            </>
          )}
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
