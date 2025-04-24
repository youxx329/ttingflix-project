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
import { Link } from 'react-router-dom';
import { useLocation } from 'react-router-dom';

const AppLayout = () => {
  const [keyword, setKeyword] = useState('');
  const navigate = useNavigate();
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const inputRef = useRef(null);
  const searchBoxRef = useRef(null);

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

  const toggleSearch = (e) => {
    e.stopPropagation(); // 👈 이벤트 전파 방지!!
    setIsSearchOpen((prev) => {
      const newState = !prev;

      // 닫을 때만 검색어 초기화
      if (!newState) {
        setKeyword('');
      }

      return newState;
    });

    setTimeout(() => {
      inputRef.current?.focus(); // 열릴 때는 포커스 주기
    }, 0);
  };

  // 인풋 영역 외 클릭 시 자동 닫힘
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
      <Outlet />
    </div>
  );
};

export default AppLayout;
