import React from 'react'
import '../LandingPage.css';
import { Link } from 'react-router-dom';
import { useAuth } from '@clerk/clerk-react';

export default function Dashboard() {
  const { getToken } = useAuth();
  
  const handleCreateListing = async () => {
    try {
      const token = await getToken();
      
      if (!token) {
        console.error('No token available');
        return;
      }
      
      const response = await fetch('/api/listing/create', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: "Listing",
          description: "Test Description",
          adress: "Address",
          regularPrice: 50000,
          discountPrice: 45000,
          bathrooms: 2,
          bedrooms: 3,
          furnished: true,
          parking: true,
          type: "rent",
          offer: true,
          imageUrls: ["test1.jpg", "test2.jpg"],
          userRef: "user_ref"
        })
      });
      
      if (response.ok) {
        const data = await response.json();
        console.log('Listing created successfully:', data);
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error creating listing:', error);
    }
  };
  
  return (
    <>
        <div className="grid-background"></div>

        <div className='flex flex-col max-w-lg items-center mx-auto'>
          <div>
            <h1 className='text-3xl text-cyan-100 font-semibold my-7'>Create Listing</h1>
          </div>
          
            <button 
              onClick={handleCreateListing}
              className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95 disabled:opacity-80 shadow-lg hover:cursor-pointer'>
              Create Listing
            </button>
        </div>
    </>
  )
}