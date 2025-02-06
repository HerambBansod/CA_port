import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Homepage from './components/Homepage/Homepage'  
import Aboutus from './components/AboutUs/Aboutus'
import Service from './components/Services/service'
import Contact from './components/Contact US Page/Contact_Us_page'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Homepage />} /> 
           
          <Route path="/Services" element={<Service />} /> 
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
