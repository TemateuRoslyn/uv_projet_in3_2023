import React from "react"
import Heading from "../../common/heading/Heading"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLongArrowAltRight} from '@fortawesome/free-solid-svg-icons';

import "./Hero.css"

const Hero = () => {
  return (
    <>
      <section className='hero'>
        <div className='container'>
          <div className='row'>
            <Heading subtitle='WELCOME TO ACADEMIA' title='Best Online Education Expertise' />
            <p>Far far away, behind the word mountains, far from the countries Vokalia and Consonantia, there live the blind texts.</p>
            <div className='flex'>
              <button className=' rounded bg-[#1eb2a6] p-4 m-1'>
                GET STARTED NOW <FontAwesomeIcon icon={faLongArrowAltRight} />
              </button>
              <button className=' rounded bg-[#fff] p-4 m-1 text-[#1eb2a6] '>
                VIEW COURSE <FontAwesomeIcon icon={faLongArrowAltRight} />
              </button>
            </div>
          </div>
        </div>
      </section>
      <div className='margin'></div>
    </>
  )
}

export default Hero
