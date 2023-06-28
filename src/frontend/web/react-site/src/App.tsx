import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useEffect, useState } from 'react';

import { ReduxProps } from './redux/configureStore';
import { IS_LOGGED_LOCAL_STORAGE_KEY } from './constants/LOCAL_STORAGE';



import AppSwitch from "./components/AppSwitch/AppSwitch"

const  App = () =>{
  const [loading, setLoading] = useState<boolean>(true);
  const preloader = document.getElementById('preloader');

  const isLoggedIn: boolean = Boolean(localStorage.getItem(IS_LOGGED_LOCAL_STORAGE_KEY));  
  console.log(isLoggedIn);
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
    <>
      <Router>
       
       
        <AppSwitch isLoggedIn={isLoggedIn}/>
        
       
      </Router>
    </>
      
  );
  
}

export default App

/* import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1 className=' text-red-400'>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
 */