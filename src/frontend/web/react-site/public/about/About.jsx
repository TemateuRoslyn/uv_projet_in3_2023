import React from "react"
import "./about.css"
import Back from "../common/back/Back"
import AboutCard from "./AboutCard"
import Heading from "../common/heading/Heading"

const About = () => {
  return (
    <>
      <Back title='A propos de nous' />
      <section className='aboutHome'>
        <div className='container flexSB'>
          {/* <div className='left row'>
            <img src='./images/about.webp' alt='' />
          </div> */}
          <div className='reglement'>
            <Heading subtitle=' ' title='NOUS SOMMES...' />
            <p>un groupe de jeunes etudiants...</p>
          </div>
        </div>
      </section>
    </>
  )
}

export default About
