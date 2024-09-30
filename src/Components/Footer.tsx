import React from "react";
import { Container, Row, Col } from 'react-bootstrap';

const Footer: React.FC = () => (
  <Container
    fluid
    className="mt-5"
    style={{
      backgroundColor: 'rgb(247, 247, 247)',
      height: '40vh',
      borderTop: '1px solid rgb(221, 221, 221)'
    }}>
    <Row className="d-flex h-100">
      {/* three columns */}
      <Row className="d-flex justify-content-around w-75 mx-auto pt-5">
        <Col xs={4} className='text-left d-flex flex-wrap flex-column'>
          <h5>Titulo 1</h5>
          <a className='footer-link footer-titles' href="/page2">Facebook</a>
          <a className='footer-link footer-titles' href="/page2">Facebook</a>
          <a className='footer-link footer-titles' href="/page2">Facebook</a>
          <a className='footer-link footer-titles' href="/page2">Facebook</a>
          <a className='footer-link footer-titles' href="/page2">Facebook</a>
          <a className='footer-link footer-titles' href="/page2">Facebook</a>
        </Col>
        <Col xs={4} className='text-left d-flex flex-wrap flex-column'>
          <h5>Titulo 2</h5>
          <a className='footer-link footer-titles' href="/page2">Facebook</a>
          <a className='footer-link footer-titles' href="/page2">Facebook</a>
          <a className='footer-link footer-titles' href="/page2">Facebook</a>
          <a className='footer-link footer-titles' href="/page2">Facebook</a>
          <a className='footer-link footer-titles' href="/page2">Facebook</a>
          <a className='footer-link footer-titles' href="/page2">Facebook</a>
        </Col>
        <Col xs={4} className='text-left d-flex flex-wrap flex-column'>
          <h5>Titulo 3</h5>
          <a className='footer-link footer-titles' href="/page2">Facebook</a>
          <a className='footer-link footer-titles' href="/page2">Facebook</a>
          <a className='footer-link footer-titles' href="/page2">Facebook</a>
          <a className='footer-link footer-titles' href="/page2">Facebook</a>
          <a className='footer-link footer-titles' href="/page2">Facebook</a>
          <a className='footer-link footer-titles' href="/page2">Facebook</a>
        </Col>
      </Row>
      {/* last links */}
      <Row
        style={{ borderTop: '1px solid rgb(221, 221, 221)' }}
        className="align-self-end mx-auto w-75 pt-4"
      >
        <Col xs={5}>
          <div className="" >
            <p>© 2023 Us & Plus{` `}·{` `}
              <a className='footer-link' href="https://usandplus.io/tyc">T&C</a>{` `}·{` `}
              <a className='footer-link' href="https://usandplus.io/privacidad">Privacidad</a></p>
          </div>
        </Col>
        <Col></Col>
        <Col className="" xs={5}>
          <div className="" >
            <a className='footer-link' href="/page2">Facebook</a>{` `}·{` `}
            <a className='footer-link' href="/page2">Instagram</a>{` `}·{` `}
            <a className='footer-link' href="/page2">TikTok</a>{` `}·{` `}
            <a className='footer-link' href="/page2">Youtube</a>
          </div>
        </Col>
      </Row>
    </Row>
  </Container >
);

export default Footer;