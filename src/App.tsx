import logo from './logo.svg';
import { BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';
import React from 'react';
import Main from './Pages/Main';
import './Components/styles.css';
import Pokemon from './Pages/Pokemon';

function App() {
  return (
    <BrowserRouter>
    <Routes>
        <Route path="/">
          <Route index element={<Main />} />
          <Route path="/poke-ts/Pokemon/:poke_id" element={<Pokemon />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
