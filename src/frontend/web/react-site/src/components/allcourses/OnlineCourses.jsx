import React from "react"
import "./courses.css"
import { online } from "../../dummydata"
import { francophone } from "../../dummydata"
import { bilingue } from "../../dummydata"
import Heading from "../common/heading/Heading"

const OnlineCourses = () => {
  return (
    <>
      <section className='online'>
        <div className='container'>
          <Heading subtitle='Premier & second cycle' title='Section Anglophone' />
          <div className='content grid3'>
            {online.map((val, key) => (
              <div className='box' key={key}>
                <div className='img'>
                  <img src={val.cover} />
                  <img src={val.hoverCover} alt='' className='show' />
                </div>
                <h1>{val.courseName}</h1>
                {/* <span>{val.course}</span> */}
              </div>
            ))}
          </div>
        </div>


        <div className='container'>
          <Heading subtitle='Premier & second cycle' title='Section Francophone' />
          <div className='content grid3'>
            {francophone.map((val, key) => (
              <div className='box' key={key}>
                <div className='img'>
                  <img src={val.cover} />
                  <img src={val.hoverCover} alt='' className='show' />
                </div>
                <p><span>{val.cycle}</span></p>
                <p><span>{val.serie}</span></p>
              </div>
            ))}
          </div>
        </div>


        <div className='container'>
          <Heading subtitle='Premier & second cycle' title='Section Bilingue' />
          <p>
            Les aprenants en section bilingue suivent un programme bilingue durant le premier cycle et 
            rejoignent le programme anglophone ou francophone pour ceux désirant continuer 
            en série scientifique, ou alors, rejoinent la série Allemande Bilingue pour ceux désirant continuer
            en série littéraire. 
          </p>
          <p>Et donc, nous listerons juste le programmes du premier cycle.</p>
          <br/>
          <div className='content grid3'>
            {bilingue.map((val, key) => (
              <div className='box' key={key}>
                <div className='img'>
                  <img src={val.cover} />
                  <img src={val.hoverCover} alt='' className='show' />
                </div>
                <h1>{val.courseName}</h1>
                <p><span>{val.langue}</span></p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}

export default OnlineCourses
