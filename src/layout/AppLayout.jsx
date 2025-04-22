import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Outlet, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { LinkContainer } from 'react-router-bootstrap';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const AppLayout = () => {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();

  const searchByKeyword = (event) => {
    event.preventDefault();
    // url을 바꿔주기
    if (!keyword.trim()) return;
    navigate(`/movies?q=${keyword}`);
    setKeyword('');

    if (!keyword.trim()) {
      // 입력값이 공백이거나 비어있으면 아무 동작 안함
      return;
    }

    navigate(`/movies?q=${keyword}`);
    setKeyword('');
  };

  const [isScrolled, setIsScrolled] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll); // cleanup
  }, []);

  // 페이지 이동 시 메뉴 닫기
  useEffect(() => {
    setExpanded(false);
  }, [location]);

  return (
    <div>
      <Navbar
        expand="lg"
        expanded={expanded}
        onToggle={() => setExpanded((prev) => !prev)}
        className={`bg-body-tertiary my-nav-bg Navbar ${
          isScrolled ? 'scrolled' : ''
        }`}
      >
        <Container fluid>
          <Navbar.Brand as={Link} to="/">
            <img
              src="/logo-purple.png"
              alt="ttingflix"
              height="28"
              width="130"
            />
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
              <LinkContainer to="/favorites">
                <Nav.Link>내가 찜한 리스트</Nav.Link>
              </LinkContainer>
            </Nav>
            <Form className="d-flex" onSubmit={searchByKeyword}>
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
                value={keyword}
                onChange={(event) => setKeyword(event.target.value)}
              />
              <Button className="btn-orange" type="submit">
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
