import { Route, Routes } from 'react-router-dom';

import SignIn from '../Authentication/SignIn/SignIn';
import SignUp from '../Authentication/SignUp/SignUp';
import Calendar from '../Calendar';
import Chart from '../Chart';
import DashBoard from '../Dashboard/DashBoard';
import FormElements from '../Form/FormElements';
import FormLayout from '../Form/FormLayout';
import Profile from '../Profile';
import Parents from '../Parent/Parents.page';


import Professeurs from '../Enseignant/Professeurs.page';
import Settings from '../Settings';
import Tables from '../Tables';
import Alerts from '../UiElements/Alerts';
import Buttons from '../UiElements/Buttons';

//ADMIN
//import AdminUser from './Admin/AdminUser';
import AdminRoleForm from '../Admin/AdminRoleForm';
import AdminPermissionForm from '../Admin/AdminPermissionForm';
import UserGrid from '../Admin/AdminUser';
import AddFaults from '../Admin/Faults/AddFaults';
import FaultsGrid from '../Admin/Faults/FaultsGrid';
//import Convocations from '../Convocation/Convocation.page'; 

import { connect,useSelector } from 'react-redux'
import { ReduxProps } from '../../redux/configureStore';
import Permissions from '../Admin/Permission/Permissions.page';
import Roles from '../Admin/Role/Roles.page';
import CoursPage from "../cours/Cours.page";
import Classes from '../Classe/Classes.page';
import Eleves from '../Eleve/Eleves.page';
import ReglementInterieurPage from '../ReglementInterieur/ReglementInterieur.page';
import ReglePage from '../Regle/Regle.page';

interface AppSwitchProps {
    isLoggedIn: boolean
}


const AppSwitch: React.FC<AppSwitchProps> = (props) => {

    const state = useSelector((state: ReduxProps) => state);
    console.log('isLoggedIn' + props.isLoggedIn);
    console.log('state loggedIn' + state.loggedIn);
   
    

    if((props.isLoggedIn && props.isLoggedIn ===true) || (state.loggedIn && state.loggedIn === true)){
        return(
        <Routes>
            <Route path="/admin/permissions" element={<Permissions />} />
            <Route path="/admin/roles" element={<Roles />} />
            <Route path="/admin/users" element={<UserGrid />} />
            
            <Route path="/eleves" element={<Eleves />} />
            <Route path="/classes" element={<Classes />} />
            <Route path="/" element={<DashBoard />} />
            <Route path="/ui/buttons" element={<Buttons />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/parents" element={<Parents />} />
            <Route path="/cours" element={<CoursPage />} />
            <Route path="/professeurs" element={<Professeurs />} />
            

            <Route path="/forms/form-elements" element={<FormElements />} />
            <Route path="/forms/form-layout" element={<FormLayout />} />
            <Route path="/tables" element={<Tables />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/chart" element={<Chart />} />
            <Route path="/ui/alerts" element={<Alerts />} />
            <Route path="/ui/buttons" element={<Buttons />} />
            <Route path="/admin/newrole" element={<AdminRoleForm />} />
            <Route path="/admin/newpermission" element={<AdminPermissionForm />} />
            <Route path="/faults/addfaults" element={<AddFaults/>} />
            <Route path="/faults/faults" element={<FaultsGrid />} />
            <Route path="/reglements" element={<ReglementInterieurPage />} />
            <Route path="/regles" element={<ReglePage />} />
            {/* <Route path="/convocations" element={<Convocations/>} />
 */}
        </Routes>
        )
    } else {
        return(
            <Routes>
                <Route path="/auth/signin" element={<SignIn/>} />
                {/* <Route path="/auth/signup" element={<SignUp/>} /> */}
                <Route path="*" element={<SignIn/>} />
            </Routes>
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
