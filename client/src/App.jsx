import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import LandingPage from './pages/Landingpage';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import Onboarding from './pages/Onboarding';
import MyProperties from './pages/myproperties';
import Savedproperties from './pages/savedproperties';
import ListingProperty from './pages/Listingproperty';
import PropertyPage from './pages/Property';

export default function App() {
  return (
    <BrowserRouter>
        <Header />
          <Routes>
            <Route path="/" element={<LandingPage/>} />
            <Route element={<PrivateRoute />}>
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/property/:id" element={<PropertyPage />} />
              <Route path="/list-property" element={<ListingProperty />} />
              <Route path="/my-properties" element={<MyProperties />} />
              <Route path="/saved-properties" element={<Savedproperties />} />
            </Route>
          </Routes>
    </BrowserRouter>
  )
}

