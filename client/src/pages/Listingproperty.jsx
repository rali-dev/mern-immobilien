
import React from 'react';
import { useUser } from '@clerk/clerk-react';
import { Navigate } from 'react-router-dom';
import '../LandingPage.css';

export default function ListingProperty() {
  const { user, isLoaded} = useUser();

  if (!isLoaded) return null;
  // Only allow if user is seller
  if (user?.unsafeMetadata?.role !== 'seller') {
    return <Navigate to="/onboarding" replace />;
  }

  return (
    <>
      <div className="grid-background"></div>
      <div className='flex flex-col max-w-lg items-center mx-auto'>
        <h1 className='text-3xl text-cyan-100 font-semibold my-7'>List a property</h1>
      </div>
    </>
  );
}