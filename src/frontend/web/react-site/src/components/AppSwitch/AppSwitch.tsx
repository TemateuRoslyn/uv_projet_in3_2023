import { Route, Routes } from 'react-router-dom';
import { connect,useSelector } from 'react-redux'
import { ReduxProps } from '../../redux/configureStore';

import About from "../about/About"
import CourseHome from "../allcourses/CourseHome"
import Team from "../team/Team"
import Pricing from "../pricing/Pricing"
import Blog from "../blog/Blog"
import Contact from "../contact/Contact"
import Convocation from "../convocation/Convocation"
import FauteSanction from "../fautesanction/FauteSanction"
import Notification from "../notification/Notification"
import Login from "../login/login"
import Proviseur from "../team/proviseur"
import Enseignants from "../team/Team"

import Home from "../home/Home"
import Header from '../common/header/Header';
import Footer from '../common/footer/Footer';
import NotFound from "./NotFound";


interface AppSwitchProps {
    isLoggedIn: boolean
}


const AppSwitch: React.FC<AppSwitchProps> = (props) => {

    const state = useSelector((state: ReduxProps) => state);
    console.log('isLoggedIn :' + props.isLoggedIn);
    console.log('state loggedIn :' + state.loggedIn);
    

    if((props.isLoggedIn && props.isLoggedIn ===true) || (state.loggedIn && state.loggedIn === true)){
        console.log("Logged in");
        return(
            <>
            <Header isLoggedIn={props.isLoggedIn} />
            <Routes>
          <Route exact path='/' element={<Home />} />
          <Route exact path='/about' element={<About />} />
          <Route exact path='/courses' element={<CourseHome />} />
          <Route exact path='/enseignant' element={<Enseignants />} />
          <Route exact path='/pricing' element={<Pricing />} />
          <Route exact path='/journal' element={<Blog />} />
          <Route exact path='/contact' element={<Contact />} />
          <Route exact path='/convocation' element={<Convocation />} />

          <Route exact path='/faute_sanction' element={<FauteSanction />} />
          <Route exact path='/notification' element={<Notification />} />
 
          <Route exact path='/proviseur' element={<Proviseur />} />
          <Route exact path="*" element={<NotFound />}/>

        </Routes>
        <Footer />
            </>
        
        )
    } else {
        console.log("Logged in No");
        return(
            <>
            <Header isLoggedIn={props.isLoggedIn} />
            <Routes>
             

            <Route exact path='/' element={<Home />} />
          <Route exact path='/about' element={<About />} />
          <Route exact path='/courses' element={<CourseHome />} />
          <Route exact path='/enseignant' element={<Enseignants />} />
          <Route exact path='/pricing' element={<Pricing />} />
          <Route exact path='/journal' element={<Blog />} />
          <Route exact path='/contact' element={<Contact />} />
          <Route exact path='/proviseur' element={<Proviseur />} />
       
          <Route exact path='/login' element={<Login isLoggedIn={props.isLoggedIn} />} />
          <Route path="*" element={<NotFound />}/>
          
        </Routes>
        <Footer />
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
  
export default connect(mapStateToProps)(AppSwitch)
