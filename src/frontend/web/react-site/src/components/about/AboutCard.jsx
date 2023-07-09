import React from "react"
import Heading from "../common/heading/Heading"
import "./about.css"
import { homeAbout } from "../../dummydata"
import Awrapper from "./Awrapper"

const AboutCard = () => {
  return (
    <>
      <section className='aboutHome'>
        <div className='container flexSB'>
          <div className='reglement'>
            <Heading subtitle='Article 1: Objet et champ d’application' title='RÈGLEMENT INTÉRIEUR' />
            <p> Le présent règlement s'applique à toutes les personnes habilitées à entrer dans le lycée. 
              Il a pour objet de déterminer les règles et les normes de comportement et de discipline à l’intérieur 
              du lycée.
            </p> 
            <Heading subtitle='Article 2: Obligation générale' title='' />
            <p>Toutes les personnes habilitées à entrer dans le lycée s’engagent à respecter ce règlement intérieur. 
              Elles s’engagent également à respecter les autres règles et règlements applicables dans le lycée et à 
              adhérer à la culture du lycée.
            </p>
            <Heading subtitle='Article 3: Heures d’ouverture' title='' />
            <p>Le lycée est ouvert du lundi au vendredi de 7h00 à 17h00 et le samedi de 8h00 à 13h00.</p>
            <Heading subtitle='Article 4: Utilisation des locaux et des matériels' title='' />
            <p>Tous les élèves et les membres du personnel du lycée doivent respecter et veiller à la bonne 
              utilisation des locaux et du matériel mis à leur disposition. 
            </p>
            <Heading subtitle='Article 5: Utilisation des ressources en ligne' title='' />
            <p>L’accès à Internet et aux ressources en ligne est réservé aux fins d’études et de recherche et est 
              strictement interdit d’utiliser Internet et ces ressources dans des activités illicites ou 
              répréhensibles.
            </p>
            <Heading subtitle='Article 6: Interdiction de fumer' title='' />
            <p>Il est interdit de fumer ou de vapoter dans le lycée.</p>
            <Heading subtitle='Article 7: Respect du personnel et des élèves ' title='' />
            <p>Tous les membres du personnel et les étudiants du lycée doivent se respecter mutuellement et éviter 
              tout comportement inapproprié, abusif ou discriminatoire.
            </p>
            <Heading subtitle='Article 8: Sanctions ' title='' />
            <p>Toute activité ou comportement illicite ou répréhensible sera sanctionné par des mesures 
              disciplinaires appropriées.
            </p>
          </div>
        </div>
      </section>
      <Awrapper />
    </>
  )
}

export default AboutCard
