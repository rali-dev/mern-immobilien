import { Button } from '@/components/ui/button';
import { useUser } from '@clerk/clerk-react';
import { BarLoader } from 'react-spinners';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import useFetch from '@/hooks/use-fetch';
import { upsertOwner } from '@/api/apiOwners';

const Onboarding = () => {
  const { user, isLoaded } = useUser();
  const navigate = useNavigate();
  const { fn: fnUpsertOwner } = useFetch(upsertOwner);

  const handleRoleSelection = async(role) => {
    try {
      await user.update({ unsafeMetadata: { role } });

      if (role === 'owner') {
        await fnUpsertOwner({
          email: user.primaryEmailAddress?.emailAddress ?? null,
          name: user.firstName ?? null,
          lastname: user.lastName ?? null,
          phone: user.primaryPhoneNumber?.phoneNumber ?? null,
          owner_id: user.id,
        });
      }

      navigate(role === 'customer' ? '/my-properties' : '/list-property');
    } catch (error) {
      console.error('Error updating role:', error);
    }
  }

  useEffect(() => {
    if(user?.unsafeMetadata?.role){
       navigate(
         user?.unsafeMetadata?.role === 'customer' ? '/my-properties' : '/list-property'
       )
    }
  }, [user]);
  if(!isLoaded){
    return (<BarLoader className="mb-4" width={"100%"} color="#36d7b7"/>)
  }
  return (
    <>
     <div className="grid-background"></div>
     <div className='flex flex-col items-center justify-center mt-32'>
         <h2 className='gradient-title font-extrabold text-7xl sm:text-8xl tracking-tighter'>I am a ...
         </h2>
         <div className='mt-16 grid grid-cols-2 gap-4 w-full md:px-40'>
            <Button 
               variant='blue' 
               className="h-36 text-2xl"
               onClick={() => handleRoleSelection('customer')}
            >
               Customer
            </Button>
            <Button 
               variant='destructive' 
               className="h-36 text-2xl"
               onClick={() => handleRoleSelection('owner')}
            >
              Owner
            </Button>
         </div>
     </div>
    </>
  )
}

export default Onboarding;
