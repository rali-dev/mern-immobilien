import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { SignedIn, SignedOut, SignInButton, SignUpButton, UserButton } from '@clerk/clerk-react';
import { Button } from './ui/button';

export default function Header() {
  return (
    <header className=' shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-4'>
        <Link to='/'>
          <h1 className='font-bold text-sm sm:text-xl flex flex-wrap underline'>
            <span>Rali</span>
            <span className='text-slate-400'>Immobilien</span>
          </h1>
        </Link>
        <form className='bg-slate-400 p-3 rounded-lg flex items-center'>
            <input type="text" placeholder='Search...' className='bg-transparent focus:outline-none w-24 sm:w-64' />
            <FaSearch className='text-slate-800' />
        </form>
      <div className='flex items-center gap-4'>
        
        </div>
        <ul className='flex justify-between gap-4 '>
            <Link to='/'>
                <li className='hidden sm:inline hover:underline text-slate-400 font-semibold'>Home</li>
            </Link>
            <Link to='/about'>
                <li className='hidden sm:inline hover:underline text-slate-400 font-semibold'>About</li>
            </Link>
            
            <SignedOut>
                <SignInButton mode="modal">
                    <Button variant="outline">Sign In</Button>
                </SignInButton>
            </SignedOut>
            <SignedIn>
                <Link to='/dashboard'>
                    <li className='hidden sm:inline hover:underline text-slate-400 font-semibold'>Dashboard</li>
                </Link>
                <UserButton />
            </SignedIn>
        </ul>
      </div>    
    </header>
  )
}
