import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { LinkContainer } from 'react-router-bootstrap';

const AppLayout = () => {
  return (
    <div>
      <Navbar expand="lg" className="bg-body-tertiary my-nav-bg">
        <Container fluid>
          <Navbar.Brand href="#">
            <img src="/logo-org.png" alt="ttingflix" height="30" width="100" />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0 my-nav-color"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <LinkContainer to="/">
                <Nav.Link>홈</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/movies">
                <Nav.Link>영화</Nav.Link>
              </LinkContainer>
              <LinkContainer to="">
                <Nav.Link>내가 찜한 리스트</Nav.Link>
              </LinkContainer>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button className="btn-orange">
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className="ico-search"
                />
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <Outlet />
    </div>
  );
};

export default AppLayout;
