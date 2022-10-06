import React, { useContext } from 'react'
import { Button } from 'react-bootstrap';
import { NavLink, useLocation } from 'react-router-dom';
import AuthContext from '../../store/auth/auth-context';
import styles from './NavbarProfile.module.css';

const NavbarProfile = () => {
    const location=useLocation();
    const authCtx=useContext(AuthContext);
    const logoutHandler=()=>{
      authCtx.logout();
    }
  return (
    <div className='py-1 px-4'>
        <NavLink to={location.pathname}>Edit profile</NavLink>
        {/* <button >LOGOUT</button> */}
        <Button onClick={logoutHandler} className={`w-100 mt-1 ${styles.btn}`}>LOGOUT</Button>
    </div>
  )
}


export default NavbarProfile