import  { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import './App.css'

//component 
import Home from './components/Home'


//pages
import Job from './pages/Job'
import Jobs from "./pages/Jobs"
import Add_job from './pages/Add_job'

import Switch from 'react-switch'
import {ThemeContext} from '../context/theme/Theme.tsx'
import { IoMoon, IoSunny } from 'react-icons/io5'

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

    <Switch checkedHandleIcon={<IoMoon className='react-icons' size={20}/>}
    uncheckedHandleIcon={<IoMoon className='react-icons sun' size={20}/>}
    checkedIcon={<IoSunny className='react-icons' color='red' size={20}/>}
    uncheckedIcon={<IoSunny className='react-icons'  size={20}/>}
    className='react-switch'
    onChange={handleChange}
    checked={checked}>
      
    
    </Switch>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          {/* <Route path='/card' element={<JobCard  />} /> */}

          <Route path='/job' element={<Job />} />
          <Route path='/jobs' element={<Jobs />} />
          <Route path='/add-job' element={<Add_job />} />
         
        </Routes>
      </Router>
      </ThemeContext.Provider>
    </>
  )
}

export default App