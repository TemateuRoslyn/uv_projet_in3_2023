import React from "react"
import Heading from "../../common/heading/Heading"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltRight} from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom"
import "./Hero.css" 

const Hero = () => {
  return (
    <>
        <section className='hero'>
          <div className='container'>
            <div className='wel'>
              <Heading subtitle='Consultez votre état disciplinaire' title='Bienvenue sur SchoolDiscipline' />
              {/* <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p> */}
              {/* <div className='flex'>
                <Link to='/login'> 
                  <button className=' rounded bg-[#1eb2a6] p-4 m-1'>
                  Sign in  <FontAwesomeIcon icon={faLongArrowAltRight} />
                  </button>
                </Link>
                <p className=' rounded bg-[#fff] p-4 m-1 text-[#1eb2a6] '>
                  VIEW COURSE <FontAwesomeIcon icon={faLongArrowAltRight} />
                </p>
              </div> */}
            </div>
          </div>
      </section>
      <div className='margin'></div>
    </>
  )
}

export default Hero
