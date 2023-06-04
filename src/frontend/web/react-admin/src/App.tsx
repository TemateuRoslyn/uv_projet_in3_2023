import { useEffect, useState } from 'react';
import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import AppSwitch from './pages/AppSwitch/AppSwitch';

// redux
import { connect } from 'react-redux';
import { ReduxProps } from './redux/configureStore';
import { IS_LOGGED_LOCAL_STORAGE_KEY } from './constants/LOCAL_STORAGE';



function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const preloader = document.getElementById('preloader');

  const isLoggedIn: boolean = Boolean(localStorage.getItem(IS_LOGGED_LOCAL_STORAGE_KEY));  

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
      <AppSwitch isLoggedIn={isLoggedIn}/>
  );
}

function mapStateToProps(state: ReduxProps): ReduxProps {
  return {
    user: state.user,
    environment: state.environment,
    loggedIn: state.loggedIn,
  };
} 
export default connect(mapStateToProps)(App)
