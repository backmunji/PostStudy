import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './Home';
import Board from './Board';
import SignIn from './SignIn';


const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/1" element={<Board/>}/>
          <Route path='/2' element={<SignIn/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
