import React from 'react'
import { useAuth } from '@clerk/clerk-react';
import { Outlet, Navigate } from 'react-router-dom';

export default function PrivateRoute() {
  const { isSignedIn, isLoaded } = useAuth();
  
  // While Clerk is loading, show nothing (or a loading spinner)
  if (!isLoaded) {
    return <div>Loading...</div>;
  }
  
  return(
    isSignedIn ? <Outlet /> : <Navigate to="/" />
  );
}

