import { useEffect, useState } from 'react';

import 'ag-grid-community/styles/ag-grid.css'; // Core grid CSS, always needed
import 'ag-grid-community/styles/ag-theme-alpine.css'; // Optional theme CSS
import AppSwitch from './pages/AppSwitch';
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
    <AppSwitch/>
  );
}

export default App;
