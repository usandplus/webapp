import React, { useState, useRef, useEffect } from "react";
import { Col, Navbar, Nav, NavDropdown, Image, Row, Button, Badge } from "react-bootstrap";
import { LinkContainer } from "react-router-bootstrap";

function FilterCarousel() {
  const fundaciones = [{}, {}, {}, {}, {}, {}, {}, {},]
  const linkContainer = () => {
    return <>
    </>
  }

  const scrollContainer = useRef<HTMLDivElement>(null);
  const [isLeftButtonDisabled, setIsLeftButtonDisabled] = useState(true);
  const [isRightButtonDisabled, setIsRightButtonDisabled] = useState(false);

  const scrollLeft = () => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollLeft -= 200;
    }
  };

  const scrollRight = () => {
    if (scrollContainer.current) {
      scrollContainer.current.scrollLeft += 200;
    }
  };

  useEffect(() => {
    const element = scrollContainer.current;
    function updateButtonStatus() {
      if (element) {
        setIsLeftButtonDisabled(element.scrollLeft === 0);
        setIsRightButtonDisabled(element.scrollLeft + element.clientWidth >= element.scrollWidth);
      }
    }
    element?.addEventListener("scroll", updateButtonStatus);
    updateButtonStatus();

    return () => element?.removeEventListener("scroll", updateButtonStatus);
  }, [scrollContainer?.current?.scrollLeft]);

  return (
    <Row>
      <Col className="d-flex flex-nowrap">
        <div
          onClick={scrollLeft}
          style={{ cursor: 'pointer' }}
          className={isLeftButtonDisabled ? 'invisible' : ''}
        >
          <Badge bg="primary" style={{ height: 30 }}>-</Badge>
        </div>
        <Nav ref={scrollContainer} variant="pills" className="horizontal-scrollable">
          {fundaciones.map((fundacion, index) => {
            let to = "/fundaciones/mascotas";
            if (index != 0) {
              to += index;
            }
            return (
              <Nav.Item key={index}>
                <LinkContainer to={to}>
                  <Nav.Link>
                    <Row>
                      <Image src="/full_logo.png" height="40" width="30" />
                    </Row>
                    <Row>
                      <p className="m-0">Mascotas</p>
                    </Row>
                  </Nav.Link>
                </LinkContainer>
              </Nav.Item>
            );
          })}

        </Nav>
        <div
          onClick={scrollRight}
          style={{ cursor: 'pointer', verticalAlign: 'middle' }}
          className={isRightButtonDisabled ? 'invisible' : ''}
        >
          <Badge bg="primary" className='align-center' style={{ height: 30 }}>+</Badge>
        </div>
      </Col>
    </Row>
  );
}

export default FilterCarousel;
