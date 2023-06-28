import "./App.css"
import Header from "./components/common/header/Header"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import About from "./components/about/About"
import CourseHome from "./components/allcourses/CourseHome"
import Enseignants from "./components/team/Team"
import Pricing from "./components/pricing/Pricing"
import Blog from "./components/blog/Blog"
import Contact from "./components/contact/Contact"
import Convocation from "./components/convocation/Convocation"
import FauteSanction from "./components/fautesanction/FauteSanction"
import Notification from "./components/notification/Notification"
import Login from "./components/login/login"
import Footer from "./components/common/footer/Footer"
import Home from "./components/home/Home"
import Proviseur from "./components/team/proviseur"


const App = () => {
  return (
    <>
      <Router>
        <Header />
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
          <Route path='/notification' element={<Notification />} />
          <Route path='/login' element={<Login />} />
          <Route path='/proviseur' element={<Proviseur />} />

        </Routes>


        <Footer />
      </Router>
    </>
  )
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