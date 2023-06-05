import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import SignIn from './pages/Authentication/SignIn';
import SignUp from './pages/Authentication/SignUp';
import Calendar from './pages/Calendar';
import Chart from './pages/Chart';
import DashBoard from './pages/Dashboard/DashBoard';
import FormElements from './pages/Form/FormElements';
import FormLayout from './pages/Form/FormLayout';
import Profile from './pages/Profile';
import Students from './pages/Students';
import Parents from './pages/Parents';
import Cours from './pages/Cours';
import Enseignant from './pages/Enseignant';
import Convocations from './pages/Convocations';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Alerts from './pages/UiElements/Alerts';
import Buttons from './pages/UiElements/Buttons';

//ADMIN
//import AdminUser from './pages/Admin/AdminUser';
import AdminUserForm from './pages/Admin/AdminUserForm';
import AdminRole from './pages/Admin/AdminRole';
import AdminRoleForm from './pages/Admin/AdminRoleForm';
import AdminPermission from './pages/Admin/AdminPermission';
import AdminPermissionForm from './pages/Admin/AdminPermissionForm';
import UserGrid from './pages/Admin/AdminUser';

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
// import 'ag-grid-enterprise';

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
// import 'ag-grid-enterprise';

function App() {
  const [loading, setLoading] = useState<boolean>(true);

  const preloader = document.getElementById('preloader');

  if (preloader) {
    setTimeout(() => {
      preloader.style.display = 'none';
      setLoading(false);
    }, 2000);
  }

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <p className=" text-center text-danger">Failed to lead app</p>
  ) : (
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
      <Route path="/auth/signin" element={<SignIn />} />
      <Route path="/auth/signup" element={<SignUp />} />
      //Admin routes
      <Route path="/admin/users" element={<UserGrid />} />
      <Route path="/admin/newuser" element={<AdminUserForm />} />
      <Route path="/admin/roles" element={<AdminRole />} />
      <Route path="/admin/newrole" element={<AdminRoleForm />} />
      <Route path="/admin/permissions" element={<AdminPermission />} />
      <Route path="/admin/newpermission" element={<AdminPermissionForm />} />
    </Routes>
  );
}

export default App;
