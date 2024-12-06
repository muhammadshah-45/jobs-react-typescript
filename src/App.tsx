import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import './App.css'

//component 
import Home from './components/Home'
import JobCard from './components/JobCard'

//pages
import Job from './pages/Job'
import Jobs from "./pages/Jobs"
import Add_job from './pages/Add_job'
import Not_found from './pages/Not_found'
import Switch from 'react-switch'
import {ThemeContext} from '../context/theme/Theme.tsx'

function App() {
  const [theme,setTheme] = useState('light');
  const [checked,setChecked] = useState(false)
  const handleChange =(check:boolean)=>{
    setChecked(!checked)
    if(check){
      setTheme('dark')
    }else{
      setTheme('light')
    }
  }
  return (
    <>
    <ThemeContext.Provider value={theme}>

    <Switch 
    className='react-switch'
    onChange={handleChange}
    checked={checked}>

    </Switch>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/card' element={<JobCard />} />

          <Route path='/job' element={<Job />} />
          <Route path='/jobs' element={<Jobs />} />
          <Route path='/add-job' element={<Add_job />} />
          <Route path='/not-found' element={<Not_found />}></Route>
        </Routes>
      </Router>
      </ThemeContext.Provider>
    </>
  )
}

export default App