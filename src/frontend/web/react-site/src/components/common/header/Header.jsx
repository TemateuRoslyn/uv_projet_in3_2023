import React, { useState } from "react"
import { Link } from "react-router-dom"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import Head from "./Head"
import "./header.css"

const Header = () => {
  const [click, setClick] = useState(false)

  return (
    <>
      <Head />
      <header>
        <nav className='flexSB'>
          <ul className={click ? "mobile-nav" : "flexSB "} onClick={() => setClick(false)}>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/courses'>Nos programmes</Link>
            </li>
            <li>
              <Link to='/about'>About</Link>
            </li>
            <li>
              <Link to='/team'>Nos enseignants</Link>
            </li>
            <li>
              <Link to='/pricing'>Principal</Link>
            </li>
            <li>
              <Link to='/contact'>Contact</Link>
            </li>
            <li>
              <Link to='/convocation'>Convocation</Link>
            </li>
            <li>
              <Link to='/faute_sanction'>Mes fautes et sanctions</Link>
            </li>
            <li>
              <Link to='/notification'>Notification</Link>
            </li>
          </ul>
          <div className='start'>
            <div className='button'><Link to='/login'>Mon compte personnel</Link></div>
          </div>
          <button className='togglle' onClick={() => setClick(!click)}>
            {click ?  <FontAwesomeIcon icon={faTimes} />:<FontAwesomeIcon icon={faBars} />}
          </button>
        </nav>
      </header>
    </>
  )
}

export default Header
