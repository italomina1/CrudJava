import React from 'react'
import Navbar from '../componentes/Navbar'

const Home = () => {
  return (
    <div>
    <Navbar/>
    <div className='container'>
        <h3>Bem vindo ao sistema de testes!</h3>
        <h4>O objetivo do projeto é consumir uma api</h4>
    </div>
    </div>
  )
}

export default Home