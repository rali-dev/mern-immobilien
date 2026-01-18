import React from 'react';
import { useUser } from '@clerk/clerk-react';
import { Outlet, Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = () => {
  const { isSignedIn, user, isLoaded } = useUser();
  const { pathname } = useLocation();
  
  // Redirect to sign-in if not signed in
  if (isLoaded && !isSignedIn && isSignedIn !== undefined) {
    return <Navigate to="/?sign-in=true" />;
  }
  
  if(user !== undefined && !user?.unsafeMetadata?.role && pathname!=='/onboarding'){
     return <Navigate to="/onboarding" />;
  }
  return <Outlet />;
}

export default PrivateRoute;

