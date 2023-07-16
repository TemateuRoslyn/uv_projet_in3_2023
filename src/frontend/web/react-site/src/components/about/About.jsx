import React from "react"
import "./about.css"
import Back from "../common/back/Back"
import Heading from "../common/heading/Heading"
import AboutCard from "./AboutCard"

const About = () => {
  return (
    <>
      <Back title='À propos de nous' />
      <section className='aboutH p-20'>
        <div className='container flexSB'>
          <div className='left row'>
            {/* <img src='./images/about.webp' alt='' /> */}
            <img src='./images/logo.png' alt='' />
          </div>
          <div className='right row text-center justify-center align-items-center justify-content-center'>
            {/* <Heading subtitle='LEARN ANYTHING' title='Benefits About Online Learning Expertise' /> */}
            <p> L'application school discipline est née de la conviction que la technologie peut transformer l'expérience 
              d'apprentissage en milieu scolaire.
            </p>
            <p>Nous avons dévellopé une solution qui aide les écoles à maintenir un environnement discipliné
              et positif pour les élèves. Nous travaillons en étroite collaboration avec les établissements scolaires
              pour fournir une solution personnalisée et une assistance technique continue. 
            </p>
            <p>Notre application est dédiée à l'amélioration de l'environnement d'apprentissage en utilisant la
              technologie pour faciliter la gestion de la discipline en milieu scolaire.
            </p>
          </div>
        </div>
      </section>
      {/* <AboutCard /> */}
    </>
  )
}

export default About
