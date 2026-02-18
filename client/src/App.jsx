import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import LandingPage from './pages/Landingpage';
import Header from './components/Header';
import PrivateRoute from './components/PrivateRoute';
import Onboarding from './pages/Onboarding';
import Savedproperties from './pages/savedproperties';
import ListingProperty from './pages/Listingproperty';
import PropertyPage from './pages/Property';
import AddProperty from './pages/Addproperty';
import CreatedProperties from './pages/Createdproperties';
import UploadImages from './pages/UploadImages';

export default function App() {
  return (
    <BrowserRouter>
        <Header />
          <Routes>
            <Route path="/" element={<LandingPage/>} />
            <Route element={<PrivateRoute />}>
              <Route path="/onboarding" element={<Onboarding />} />
              <Route path="/property/:id" element={<PropertyPage />} />
              <Route path="/properties" element={<ListingProperty />} />
              <Route path="/add-property" element={<AddProperty />} />
              <Route path="/saved-properties" element={<Savedproperties />} />
              <Route path="/created-properties" element={<CreatedProperties />} />
              <Route path="/properties/:id/upload-images" element={<UploadImages />} />
            </Route>
          </Routes>
    </BrowserRouter>
  )
}

