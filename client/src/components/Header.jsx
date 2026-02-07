import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { Link, useSearchParams } from 'react-router-dom';
import { SignedIn, SignedOut, UserButton, SignIn, useUser } from '@clerk/clerk-react';
import raliLogo from '/raliLogo.png';
import { LayoutDashboard, PenBox } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from "./ui/button.jsx"
import {
  DropdownMenu,
  DropdownMenuItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function Header (){

  const [showSignIn, setShowSignIn] = useState(false);
  const [search, setSearch] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (search.get('sign-in')) {
      setShowSignIn(true);
    }
  }, [search]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      setShowSignIn(false);
      setSearch({});
    }
  };

  const { user } = useUser();

  return (
    <>
      <nav className='flex justify-between items-center max-w-6xl mx-auto py-2 px-2 sm:px-6 bg-transparent'>
        <Link to='/'>
          <h1 className='font-bold text-sm sm:text-xl flex flex-wrap underline items-center'>
            <span> 
               <img src={raliLogo
               } className='h-16 sm:h-16 lg:h-16'/>
            </span>
            <span className='text-slate-400'>Estate</span>
          </h1>
        </Link>
        <form className='bg-slate-400 p-2 rounded-lg flex items-center mx-10'>
            <input type="text" placeholder='Search...' className='bg-transparent focus:outline-none w-24 sm:w-64' />
            <FaSearch className='text-slate-800' />
        </form>
      <div className='flex items-center gap-4'>
        
        </div>
        <div className='flex justify-between gap-8 '>
            <SignedOut>
                <Button variant="outline" onClick={() => setShowSignIn(true)}>Sign In</Button>
            </SignedOut>
           
            <SignedIn>
               {user?.unsafeMetadata?.role === 'owner' && (
                <Link to="/list-property">
                <Button variant="destructive" className={"rounded-full"}>List a property
                    <PenBox size={20} className="mr-2" />
                </Button>
                </Link>
               )}

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline"><LayoutDashboard /></Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56">

                    <DropdownMenuLabel>Quick Navigation</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => navigate('/my-properties')}>
                      my properties
                    </DropdownMenuItem>
                     <DropdownMenuItem onClick={() => navigate('/saved-properties')}>
                      saved properties
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
                
                 <UserButton
                    appearance={{
                      elements: {
                        avatarBox: 'w-20 h-20',
                      }
                    }}
                  />
            </SignedIn>
          </div>
        </nav>  
        
        {showSignIn && (
          <div className="fixed inset-0 flex bg-black bg-opacity-50 items-center justify-center"
            onClick={handleOverlayClick}
          >
          <SignIn
            signUpForceRedirectUrl="/onboarding"
            fallbackRedirectUrl="/onboarding"
          />
        </div>
      )}
    </> 
  )
}
