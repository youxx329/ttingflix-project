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
import React, { useEffect, useState, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../App.css';

const AppLayout = () => {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const inputRef = useRef(null);
  const searchBoxRef = useRef(null);

  const searchByKeyword = (event) => {
    event.preventDefault();
    if (!keyword.trim()) return;
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
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setExpanded(false);
  }, [location]);

  const toggleSearch = (e) => {
    e.stopPropagation();
    setIsSearchOpen((prev) => {
      const newState = !prev;
      if (!newState) setKeyword('');
      return newState;
    });
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        isSearchOpen &&
        searchBoxRef.current &&
        !searchBoxRef.current.contains(e.target)
      ) {
        setIsSearchOpen(false);
        setKeyword('');
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isSearchOpen]);

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
          <Navbar.Collapse id="navbarScroll" className="mobile-menu-collapse">
            <Nav className="me-auto my-2 my-lg-0 my-nav-color" navbarScroll>
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
              <div
                className={`search-bar ${isSearchOpen ? 'active' : ''}`}
                ref={searchBoxRef}
              >
                <Form.Control
                  type="search"
                  placeholder="제목"
                  value={keyword}
                  onChange={(e) => setKeyword(e.target.value)}
                  ref={inputRef}
                />
                {isSearchOpen && keyword && (
                  <button
                    className="clear-btn"
                    type="button"
                    onClick={() => setKeyword('')}
                  >
                    ×
                  </button>
                )}
              </div>
              <Button
                type="button"
                onClick={toggleSearch}
                className="search-icon"
              >
                <FontAwesomeIcon icon={faMagnifyingGlass} />
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <div className="page-content-wrap">
        <Outlet />
      </div>
    </div>
  );
};

export default AppLayout;
