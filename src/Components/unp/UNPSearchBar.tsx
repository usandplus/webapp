import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Form, Button, Offcanvas, Modal } from 'react-bootstrap';
import { BiSearch, BiFilterAlt, BiCross, BiError, BiX } from 'react-icons/bi';
import './styles/UNPSearchBar.scss';

interface SearchBarProps {
  onSearch?: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [showFilters, setShowFilters] = useState(false);
  const [query, setQuery] = useState('');
  const [isDesktop, setIsDesktop] = useState(false);
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      // Bootstrap lg breakpoint ~992px
      setIsDesktop(window.innerWidth >= 992);
    };
    window.addEventListener('resize', handleResize);
    handleResize(); // initial check
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleShowFilters = () => setShowFilters(true);
  const handleCloseFilters = () => setShowFilters(false);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    onSearch && onSearch(query);
  };

  const containerClasses = `d-flex align-items-center bg-white rounded-pill shadow-sm px-3 py-2 flex-grow-1 transition-all`;
  const focusStyle = {
    transition: 'width 0.3s ease, box-shadow 0.3s ease',
    boxShadow: isDesktop && isFocused ? '0 0 0 2px rgba(0, 123, 255, 0.25)' : 'none',
  };

  return (
    <Container fluid className="py-3" >
      <Row className="justify-content-center">
        <Col xs={10} md={12}>
          <Row className="d-flex align-items-center w-100">
            {/* Search bar container with focus styling on desktop */}
            <Col
              className={containerClasses}
              style={focusStyle}
            >
              <BiSearch size={20} className="me-2 text-muted" />
              <Form.Control
                type="text"
                placeholder="Buscar..."
                className="border-0 "
                style={{ boxShadow: 'none' }}
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                onFocus={() => setIsFocused(true)}
                onBlur={() => setIsFocused(false)}
              />
              {
                query.length > 0
                  ? <BiX
                    onClick={() => {
                      setQuery('');
                      onSearch && onSearch(''); // Notify parent that query is cleared
                    }}
                    size={20} className="me-2 text-muted" />
                  : <></>
              }
            </Col>

            {/* Filter Button */}
            <Col xs={2}>
              <Button
                variant="outline-primary"
                className="rounded-circle d-flex d-md-none align-items-center justify-content-center ms-3"
                style={{ width: '40px', height: '40px' }}
                onClick={handleShowFilters}
              >
                <BiFilterAlt size={20} />
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>

      {/* Conditional Rendering: Modal on desktop, Offcanvas on mobile */}
      {isDesktop ? (
        <Modal show={showFilters} onHide={handleCloseFilters} centered>
          <Modal.Header closeButton>
            <Modal.Title>Advanced Filters</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {/* Your advanced filters go here */}
            <p>Filter options...</p>
          </Modal.Body>
        </Modal>
      ) : (
        <Offcanvas show={showFilters} onHide={handleCloseFilters} placement="bottom">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>Advanced Filters</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            {/* Your advanced filters go here */}
            <p>Filter options...</p>
          </Offcanvas.Body>
        </Offcanvas>
      )}
    </Container>
  );
};

export default SearchBar;
