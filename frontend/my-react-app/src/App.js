import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Login from './component/Login';
import RegisterForm from './component/Register';
import Home from './component/Home';
import ViewData from './component/veiwdata';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<RegisterForm />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path="/view" element={<ViewData />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
