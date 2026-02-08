import '../LandingPage.css';
import { useUser } from '@clerk/clerk-react';
import { getSavedProperties } from '@/api/apiProperties';
import useFetch from '@/hooks/use-fetch';
import { BarLoader } from 'react-spinners';
import PropertyCard from '@/components/property-card';
import { useEffect } from 'react';

const SavedProperties = () => {
   const { isLoaded} = useUser();
   const {
      loading: loadingSavedProperties,
      data: savedProperties,
      fn: fnSavedProperties,
    } = useFetch(getSavedProperties);
   
     useEffect(() => {
        if(isLoaded) fnSavedProperties();
      }, [isLoaded]);

    if(!isLoaded || loadingSavedProperties){
       return (<BarLoader className="mb-4" width={"100%"} color="#36d7b7"/>)
     }

    return (
      <>
        <div className="grid-background"></div>
        <div className="max-w-4xl mx-auto">
           <h1 className='gradient-title font-extrabold text-6xl sm:text-7xl text-center pb-8'>
             Saved Properties
           </h1>

             {loadingSavedProperties === false && (
              <div className='mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4 px-10 md:px-10'>
                {savedProperties?.length ?(
                    savedProperties.map((saved) => {
                      return (
                      <PropertyCard
                          key={saved.id}
                          property={saved.property}
                          savedInit={true}
                          onPropertySaved={fnSavedProperties}
                        />
                      );
                    })
                ) : (
                  <div>No Saved Properties Found!</div>   
                )}
              </div>
            )}
        </div>
      </>
  )
}

export default SavedProperties;