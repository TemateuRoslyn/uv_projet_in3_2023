import { useState } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import SignIn from './Authentication/SignIn/SignIn';
import SignUp from './Authentication/SignUp/SignUp';
import Calendar from './Calendar';
import Chart from './Chart';
import DashBoard from './Dashboard/DashBoard';
import FormElements from './Form/FormElements';
import FormLayout from './Form/FormLayout';
import Profile from './Profile';
import Students from './Students';
import Parents from './Parents';
import Cours from './Cours';
import Enseignant from './Enseignant';
import Convocations from './Convocations';
import Settings from './Settings';
import Tables from './Tables';
import Alerts from './UiElements/Alerts';
import Buttons from './UiElements/Buttons';

//ADMIN
//import AdminUser from './Admin/AdminUser';
import AdminUserForm from './Admin/AdminUserForm';
import AdminRole from './Admin/AdminRole';
import AdminRoleForm from './Admin/AdminRoleForm';
import AdminPermission from './Admin/AdminPermission';
import AdminPermissionForm from './Admin/AdminPermissionForm';
import UserGrid from './Admin/AdminUser';
import useLocalStorage from '../hooks/useLocalStorage';
import environment from '../environments/environment';
import AddFaults from './Admin/Faults/AddFaults';
import FaultsGrid from './Admin/Faults/FaultsGrid';
import AddReglement from './Admin/ReglementInterieur/AddReglement';
import ReglementGrid from './Admin/ReglementInterieur/ReglementGrid';

import { ConfigurationParameters } from '../generated';


const AppSwitch = () => {

    const navigate = useNavigate();
    const [loggedIn, setLoggedIn] = useLocalStorage('loggedIn', false);
    const [user, setUser] = useLocalStorage('user', null);
    const [env, setEnv] = useState(environment)

    const setEnvironment = (newEnv: ConfigurationParameters, loggedIn?: boolean, user?: any) => {
        setEnv(newEnv);
        if(loggedIn !== undefined){
            setLoggedIn(loggedIn)
        }
        if(user !== undefined){
            setUser(user)
        }
      };

    if(loggedIn && loggedIn ===true){
        return(
        <Routes>
            <Route path="/" element={<DashBoard />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/students" element={<Students />} />
            <Route path="/parents" element={<Parents />} />
            <Route path="/cours" element={<Cours />} />
            <Route path="/enseignant" element={<Enseignant />} />
            <Route path="/convocations" element={<Convocations />} />
            <Route path="/forms/form-elements" element={<FormElements />} />
            <Route path="/forms/form-layout" element={<FormLayout />} />
            <Route path="/tables" element={<Tables />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/chart" element={<Chart />} />
            <Route path="/ui/alerts" element={<Alerts />} />
            <Route path="/ui/buttons" element={<Buttons />} />
            <Route path="/admin/users" element={<UserGrid />} />
            <Route path="/admin/newuser" element={<AdminUserForm />} />
            <Route path="/admin/roles" element={<AdminRole />} />
            <Route path="/admin/newrole" element={<AdminRoleForm />} />
            <Route path="/admin/permissions" element={<AdminPermission />} />
            <Route path="/admin/newpermission" element={<AdminPermissionForm />} />
            <Route path="/faults/addfaults" element={<AddFaults/>} />
            <Route path="/faults/faults" element={<FaultsGrid />} />
            <Route path="/reglement/addreglement" element={<AddReglement/>} />
            <Route path="/reglement/reglements" element={<ReglementGrid />} />

        </Routes>
        )
    } else {
        return(
            <Routes>
                <Route path="/" element={<SignIn environment={env} setEnvironment={setEnvironment} />} />
                <Route path="/auth/signin" element={<SignIn environment={env} setEnvironment={setEnvironment} />} />
                <Route path="/auth/signup" element={<SignUp environment={env} setEnvironment={setEnvironment} />} />
            </Routes>
        )
    }
}

export default AppSwitch;
