import React from 'react';
import {useSelector} from 'react-redux';

export default function Profile() {
  const {currentUser} = useSelector((state) => state.user);
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center text-slate-700 my-7'>Profile</h1>
      <form className ="flex flex-col gap-4">
        <img src={currentUser.avatar} alt="profile" className="rounded-full h-24 w-24 mx-auto object-cover cursor-pointer self-center mt-2"/>
        <input type="text" placeholder='username' id='username' className='border border-gray-300 p-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'/>
        <input type="email" placeholder='email' id='email' className='border border-gray-300 p-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'/>
        <input type="password" placeholder='password' id='password' className='border border-gray-300 p-3 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'/>
        <button className='bg-slate-700 text-white rounded-lg p-3 hover:opacity-95 disabled:opacity-80'>update</button>
      </form>
      <div className='flex justify-between mt-5'>
        <span className='text-red-600 cursor-pointer'>Delete account</span>
        <span className='text-red-600 cursor-pointer'>Sign out</span>
      </div>
    </div>
  )
}