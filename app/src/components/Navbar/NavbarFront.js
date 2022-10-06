import React, { Fragment, useState } from 'react'
import {Button, Col, Container, Navbar, NavDropdown, Row} from 'react-bootstrap';
import styles from './NavbarFront.module.css';
import NavbarProfile from './NavbarProfile';
import navLogo from '../../img/navLogo.svg';
import profile from '../../img/img-profile.jpeg';
import {OffCanvasFormCustomizeTomato} from "../OffCanvasFormCustomizeTomato/OffCanvasFormCustomizeTomato";
const NavbarFront = () => {
  const [profileDropdown,setProfileDropdown]=useState(false);
  const showProfileDropdown=()=>{
    setProfileDropdown(true);
  };
  const hideProfileDropdown=()=>{
    setProfileDropdown(false);
  };
  const img=<img className={`${styles.profile}`} width='50' height='50' src={profile} alt='profile'/>;

  const [showCanvas, setShowCanvas] = useState(false);
  const handleOpenCanvas = () => setShowCanvas(true);

  return (
    <Fragment>
      <Navbar className={`${styles.myNavbar}`} variant="dark">
          <Row className='justify-content-between align-items-center container-fluid mx-5'>
              <Navbar.Brand href="/home" className='col-1'>
                <img
                  alt=""
                  src={navLogo}
                  width="130"
                  height="30"
                  className="d-inline-block align-top"
                />{' '}
                {/* TOMATIME */}
              </Navbar.Brand>

              <Col className='text-center col-10'>
                  <Button variant='secondary' className='text-uppercase' onClick={handleOpenCanvas}>
                      customize tomato
                  </Button>
              </Col>
              
              <NavDropdown
              className={`${styles.test} col text-end`}
              title={img} 
              id="collasible-nav-dropdown" 
              show={profileDropdown}
              rootCloseEvent='mousedown'
              onMouseEnter={showProfileDropdown} 
              onMouseLeave={hideProfileDropdown}
              >
                <NavbarProfile/>
              </NavDropdown>
          </Row>
      </Navbar>
        <OffCanvasFormCustomizeTomato show={showCanvas} setShow={setShowCanvas} />
    </Fragment>
  )
}

export default NavbarFront