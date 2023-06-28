import React from "react"

import Back from "../common/back/Back"
import TeamCard from "./TeamCard"
import "./team.css"
import Awrapper from "../about/Awrapper"
import "../about/about.css"

const Team = () => {
  return (
    <>
      <Back title='Team' />
      <section className='team padding'>
        <div className='container grid'>
          <Link to="/proviseur">
            <img src="./images/team/t1.webp" alt="Description de l'image" />
          </Link>

          <TeamCard />
        </div>
      </section>
      <Awrapper />
    </>
  )
}

export default Team
