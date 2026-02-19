import { useUser } from '@clerk/clerk-react';
import { getCreatedProperties } from '@/api/apiProperties';
import useFetch from '@/hooks/use-fetch';
import { BarLoader } from 'react-spinners';


import '../LandingPage.css';
import { useEffect } from 'react';
import PropertyCard from '@/components/property-card';

const CreatedProperties = () => {

  const { user } = useUser();

  const {
    loading: loadingCreatedProperties,
    data: createdProperties,
    fn: fnCreatedProperties,
  } = useFetch(getCreatedProperties, user ? { owner_id: user.id } : null);

    useEffect(() => {
      if(user)  fnCreatedProperties();
      }, [user]);

      if(loadingCreatedProperties){ 
          return (<BarLoader className="mb-4" width={"100%"} color="#36d7b7"/>)
      }

  return (
    <>
    <div className="grid-background"></div>
    <div>
        <div className='mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4 px-10 md:px-10'>
           {createdProperties?.length ?(
              createdProperties.map((property) => {
                return (
                 <PropertyCard 
                    key={property.id}
                    property={property}
                    onPropertySaved={fnCreatedProperties}
                    isMyProperty
                  />
                );
              })
           ) : (
            <div>No properties found.</div>   
           )}
        </div>
    </div>
  </>
  );
};

export default CreatedProperties;