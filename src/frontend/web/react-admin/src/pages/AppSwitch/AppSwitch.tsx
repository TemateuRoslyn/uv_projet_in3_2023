import { Route, Routes } from 'react-router-dom';

import SignIn from '../Authentication/SignIn/SignIn';
import Calendar from '../Calendar';
import Chart from '../Chart';
import DashBoard from '../Dashboard/DashBoard';
import FormElements from '../Form/FormElements';
import FormLayout from '../Form/FormLayout';
import Profile from '../Profile';
import Parents from '../Parent/Parents.page';

import Professeurs from '../Professeur/Professeurs.page';
import Settings from '../Settings';
import Tables from '../Tables';
import Alerts from '../UiElements/Alerts';
import Buttons from '../UiElements/Buttons';
import NotFound from "./NotFound"

//ADMIN
//import AdminUser from './Admin/AdminUser';
import AdminRoleForm from '../Admin/AdminRoleForm';
import AdminPermissionForm from '../Admin/AdminPermissionForm';
import UserGrid from '../Admin/AdminUser';
import AddFaults from '../Admin/Faults/AddFaults';
import FaultsGrid from '../Admin/Faults/FaultsGrid';
import Convocations from '../Convocation/Convocation.page';

import { connect, useSelector } from 'react-redux';
import { ReduxProps } from '../../redux/configureStore';
import Permissions from '../Admin/Permission/Permissions.page';
import Roles from '../Admin/Role/Roles.page';
import CoursPage from '../cours/Cours.page';
import Classes from '../Classe/Classes.page';
import Eleves from '../Eleve/Eleves.page';
import ReglementInterieurPage from '../ReglementInterieur/ReglementInterieur.page';
import ReglePage from '../Regle/Regle.page';
import ReparationPage from '../Reparation/Reparation.page';

import ConseilDisciplines from '../ConseilDiscipline/ConseilDiscipline.page';

import SuggestionPage from '../Suggestion/Suggestion.page';
import Fautes from '../faute/Fautes.page';
import Personnels from '../Personnel/Personnel.page';
import SanctionPrevu from "../SanctionPrevu/SanctionPrevu.page";

interface AppSwitchProps {
  isLoggedIn: boolean;
}

const AppSwitch: React.FC<AppSwitchProps> = (props) => {
  const state = useSelector((state: ReduxProps) => state);
  console.log('isLoggedIn' + props.isLoggedIn);
  console.log('state loggedIn' + state.loggedIn);

  if (
    (props.isLoggedIn && props.isLoggedIn === true) ||
    (state.loggedIn && state.loggedIn === true)
  ) {
    return (
      <Routes>
        <Route exact path="/permissions" element={<Permissions />} />
        <Route exact path="/roles" element={<Roles />} />
        <Route exact path="/admin/users" element={<UserGrid />} />

        <Route exact path="/eleves" element={<Eleves />} />
        <Route exact path="/classes" element={<Classes />} />
        <Route exact path="/" element={<DashBoard />} />
        <Route exact path="/ui/buttons" element={<Buttons />} />
        <Route exact path="/calendar" element={<Calendar />} />
        <Route exact path="/profile" element={<Profile />} />
        <Route exact path="/parents" element={<Parents />} />
        <Route exact path="/cours" element={<CoursPage />} />
        <Route exact path="/professeurs" element={<Professeurs />} />

        <Route exact path="/forms/form-elements" element={<FormElements />} />
        <Route exact path="/forms/form-layout" element={<FormLayout />} />
        <Route exact path="/tables" element={<Tables />} />
        {/* <Route exact path="/settings" element={<Settings />} /> */}
        <Route exact path="/chart" element={<Chart />} />
        <Route exact path="/ui/alerts" element={<Alerts />} />
        <Route exact path="/ui/buttons" element={<Buttons />} />
        <Route exact path="/admin/newrole" element={<AdminRoleForm />} />
        <Route exact path="/admin/newpermission" element={<AdminPermissionForm />} />
        <Route exact path="/faults/addfaults" element={<AddFaults />} />
        <Route exact path="/faults/faults" element={<FaultsGrid />} />
        <Route exact path="/reglements" element={<ReglementInterieurPage />} />
        <Route exact path="/regles" element={<ReglePage />} />
        <Route exact path="/fautes" element={<Fautes />} />
        <Route exact path="/convocations" element={<Convocations />} />
        <Route exact path="/conseilDiscipline" element={<ConseilDisciplines />} />
        <Route exact path="/suggestions" element={<SuggestionPage />} />
        <Route exact path="/personnels" element={<Personnels/>} />
        <Route exact path="/reparations" element={<ReparationPage />} />
        <Route exact path="/sanctionPrevus" element={<SanctionPrevu/>} />
        <Route path="*" element={<NotFound />}/>
     
      </Routes>
    );
  } else {
    return (
      <Routes>
        <Route exact path="/auth/signin" element={<SignIn />} />
        {/* <Route exact path="/auth/signup" element={<SignUp/>} /> */}
        <Route exact path="*" element={<SignIn />} />
        <Route path="*" element={<NotFound />}/>
     
      </Routes>
    );
  }
};

function mapStateToProps(state: ReduxProps): ReduxProps {
  return {
    user: state.user,
    environment: state.environment,
    loggedIn: state.loggedIn,
  };
}

export default connect(mapStateToProps)(AppSwitch);


