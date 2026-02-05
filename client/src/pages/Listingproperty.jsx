import useFetch from '@/hooks/use-fetch';
import { getProperties } from '@/api/apiProperties';
import '../LandingPage.css';
import { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { BarLoader } from 'react-spinners';
import PropertyCard from '@/components/property-card';

const ListingProperty = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [company_id, setCompany_id] = useState('');
  const {user, isLoaded} = useUser();

  const {
    fn: fnProperties,
    data: properties,
    loading: loadingProperties
  } = useFetch(getProperties, { location, company_id, searchQuery: searchQuery });
  
  useEffect(() => {
    if(isLoaded) {
      console.log('Clerk User ID:', user?.id);
      fnProperties();
    }
  }, [isLoaded]);

  if(!isLoaded){
    return (<BarLoader className="mb-4" width={"100%"} color="#36d7b7"/>)
  }

  console.log('Properties Data:', properties);
  return (
    <>
      <div className="grid-background"></div>
      <div>
         <h1 className='gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8'>
            Latest Properties
         </h1>
      {/* Add filters here */}

      {loadingProperties && (
        <BarLoader className="mb-4" width={"100%"} color="#36d7b7"/>
      )}

      {loadingProperties ===false && (
        <div className='mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4 px-10 md:px-10'>
           {properties?.length ?(
              properties.map((property) => {
                return (
                 <PropertyCard 
                    key={property.id}
                    property={property}
                    savedInit={property.saved?.length>0}
                  />
                );
              })
           ) : (
            <div>No properties found.</div>   
           )}
        </div>
      )}

      </div>
     
    </>
  );
}

export default ListingProperty;
