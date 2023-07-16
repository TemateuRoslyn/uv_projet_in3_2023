import React from "react"
import { Link } from "react-router-dom"
import Back from "../common/back/Back"
import TeamCard from "./TeamCard"
import "./team.css"
import Awrapper from "../about/Awrapper"
import "../about/about.css"

const Enseignants = () => {
  return (
    <>
      <Back title='enseignant' />
      <section className='team padding'>
        <div className='container grid'>
          <Link to="/proviseur">
            <div className='items shadow'>
              <div className='img'>
                <img src="./images/team/user.jpeg" alt='' />
               {/*  <div className='overlay'>
                  <i className='fab fa-facebook-f icon'></i>
                  <i className='fab fa-twitter icon'></i>
                  <i className='fab fa-instagram icon'></i>
                  <i className='fab fa-tiktok icon'></i>
                </div> */}
              </div>
              <div className='details'>
                <h2>Ph.D Donald TCHOUMI</h2>
                <p>PROVISEUR</p>

              </div>
            </div>
          </Link>

          <TeamCard />
        </div>
      </section>
      <Awrapper />
    </>
  )
}

export default Enseignants
