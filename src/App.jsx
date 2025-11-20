
import React from 'react'
import {AllRoutes} from './Routes/AllRoutes'
import { Header } from './Components'
import { Footer } from './Components'

const App = () => {
  return (
    <div className='App dark:bg-dark'>
      
      <Header/>
      <AllRoutes/>
      <Footer/>
    </div>
  )
}

export default App
