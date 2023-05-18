import './App.css'
import { BrowserRouter, Route, Routes , Link , NavLink} from "react-router-dom";
import React, { useState } from 'react';
import Home from './pages/Home';
import Login from './pages/signIn';
import Login2 from './pages/logein';




function App() {
  return (   
    <BrowserRouter>
      <main>
        <Routes>
          <Route index element={<Home/>}/>
          <Route path='/signIn' element={<Login/>}/>
          <Route path='/login' element={<Login2/>}/>
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App
