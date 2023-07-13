import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { connect, useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import Head from "./Head"
import "./header.css"

import { 
  IS_LOGGED_LOCAL_STORAGE_KEY, 
  TOKEN_LOCAL_STORAGE_KEY, 
  USER_LOCAL_STORAGE_KEY,
} from '../../../constants/LOCAL_STORAGE';
import { setIsLOggedAction } from '../../../redux/Actions/LoggedInAction';
import { ReduxProps } from '../../../redux/configureStore';
import { AuthApi } from '../../../generated';
import DropdownUser from './DropdownUser';
interface HeaderProps {
  isLoggedIn: boolean
}


const Header: React.FC<HeaderProps> = (props) => {

  const navigate = useNavigate();

  const dispatch = useDispatch()
  const authUser = JSON.parse(localStorage.getItem(USER_LOCAL_STORAGE_KEY)!);
 
  const state = useSelector((state: ReduxProps) => state);
  console.log('isLoggedIn :' + props.isLoggedIn);
  console.log('state loggedIn :' + state.loggedIn);
 
  const [click, setClick] = useState(false)

  const logout = () => {
    const authApi = new AuthApi(state.environment);
    const token : string = localStorage.getItem(TOKEN_LOCAL_STORAGE_KEY)!;
    console.log("token :" + token);
    authApi.authLogout('Bearer '+ token)
    .then((response) => {navigate("/");})
    .catch((error) => {})
    .finally(() => {
      localStorage.removeItem(TOKEN_LOCAL_STORAGE_KEY);
      localStorage.removeItem(USER_LOCAL_STORAGE_KEY);
      localStorage.removeItem(IS_LOGGED_LOCAL_STORAGE_KEY);
      dispatch(setIsLOggedAction(false));
      
      navigate("/");
     

    });
  }

  if((props.isLoggedIn && props.isLoggedIn ===true) || (state.loggedIn && state.loggedIn === true)){
    console.log("Logged in");
    if(authUser.roles[0].description=="PARENT"){
      return (
        <>
          <Head />
          <header>
            <nav className='flexSB'>
              <ul className={click ? "mobile-nav" : "flexSB "} onClick={() => setClick(false)}>
              <li>
                <Link to='/'>Acceuil</Link>
              </li>
              <li>
                <Link to='/courses'>Cours</Link>
              </li>
              <li>
                <Link to='/about'>A propos</Link>
              </li>
              <li>
                <Link to='/enseignant'>Enseignants</Link>
              </li>
              <li>
                <Link to='/proviseur'>Proviseur</Link>
              </li>
              <li>
                <Link to='/contact'>Contacts</Link>
              </li>
            
              <li>
                <Link to='/notification'>Notification</Link>
              </li>
              <li>
                <Link to='/MesEnfants'>MesEnfants</Link>
              </li>
            </ul>
              <div className='start'>
                <div className='button'>
                 
                  <DropdownUser/> 
                </div>
              </div>
              <button className='togglle' onClick={() => setClick(!click)}>
                {click ?  <FontAwesomeIcon icon={faTimes} />:<FontAwesomeIcon icon={faBars} />}
              </button>
            </nav>
          </header>
        </>
      )

    }else{
      return (
        <>
          <Head />
          <header>
            <nav className='flexSB'>
              <ul className={click ? "mobile-nav" : "flexSB "} onClick={() => setClick(false)}>
              <li>
                <Link to='/'>Acceuil</Link>
              </li>
              <li>
                <Link to='/courses'>Cours</Link>
              </li>
              <li>
                <Link to='/about'>A propos</Link>
              </li>
              <li>
                <Link to='/enseignant'>Enseignants</Link>
              </li>
              <li>
                <Link to='/proviseur'>Proviseur</Link>
              </li>
              <li>
                <Link to='/contact'>Contacts</Link>
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
                <div className='button'>
                 
                  <DropdownUser/> 
                </div>
              </div>
              <button className='togglle' onClick={() => setClick(!click)}>
                {click ?  <FontAwesomeIcon icon={faTimes} />:<FontAwesomeIcon icon={faBars} />}
              </button>
            </nav>
          </header>
        </>
      )
    }
  }else{
    console.log("Logged in No");
    
    return (
      <>
        <Head />
        <header>
          <nav className='flexSB'>
            <ul className={click ? "mobile-nav" : "flexSB "} onClick={() => setClick(false)}>
            <li>
              <Link to='/'>Acceuil</Link>
            </li>
            <li>
              <Link to='/courses'>Cours</Link>
            </li>
            <li>
              <Link to='/about'>A propos</Link>
            </li>
            <li>
              <Link to='/enseignant'>Enseignants</Link>
            </li>
            <li>
              <Link to='/proviseur'>Proviseur</Link>
            </li>
            <li>
              <Link to='/contact'>Contacts</Link>
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
}
function mapStateToProps(state: ReduxProps): ReduxProps {
    return { 
        user: state.user,
        environment: state.environment,
        loggedIn: state.loggedIn,
    };
  } 
  
export default connect(mapStateToProps)(Header)
