import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import LandingPage from './pages/Landingpage';
import About from './pages/About';
import Dashboard from './pages/Dashboard';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import { ThemeProvider } from './components/theme-provider';

export default function App() {
  return (
    <BrowserRouter>
        <Header />
          <Routes>
            <Route path="/" element={<LandingPage/>} />
            <Route path="/about" element={<About />} />
            <Route element={<PrivateRoute />}>
              <Route path="/dashboard" element={<Dashboard />} />
            </Route>
          </Routes>
    </BrowserRouter>
  )
}

