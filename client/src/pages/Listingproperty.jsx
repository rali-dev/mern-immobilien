import useFetch from '@/hooks/use-fetch';
import { getProperties } from '@/api/apiProperties';
import '../LandingPage.css';
import { useEffect, useState } from 'react';
import { useUser } from '@clerk/clerk-react';
import { BarLoader } from 'react-spinners';
import PropertyCard from '@/components/property-card';
import { getCompanies } from '@/api/apiCompanies';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import { State } from 'country-state-city';

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

  // Callback to re-fetch properties after saving
  const handlePropertySaved = () => {
    fnProperties();
  };
  
  const {fn: fnCompanies, data: companies} = useFetch(getCompanies);
  
  useEffect(() => {
    if(isLoaded) fnCompanies();
  }, [isLoaded]);

  useEffect(() => {
    if(isLoaded) fnProperties();
  }, [isLoaded, location, company_id, searchQuery]);

    const handleSearch = (e) => {
      e.preventDefault();
      let forData = new FormData(e.target);
      const query = forData.get("search-query");
      if(query) setSearchQuery(query);
    };

    const clearFilters = () => {
      setLocation('');
      setCompany_id('');
      setSearchQuery('');
    };

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
      <form onSubmit={handleSearch} className="h-14 flex w-full gap-2 items-center mb-3 px-10 md:px-10">
        <Input 
          type="text"
          placeholder="Search properties by name..." 
          name="search-query"
          className="h-full px-4 text-md"
          />
        <Button type="submit" className="h-full sm:w-28" variant="blue">
          Search
        </Button>
      </form>

      <div className='flex flex-col sm:flex-row gap-2 px-10 md:px-10'>
         <div className="w-full sm:w-1/2">
                <Select value={location} onValueChange={(value) => setLocation(value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Filter by location" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {State.getStatesOfCountry("DE").map(({name}) => {
                        return( 
                        <SelectItem key={name} value={name}>
                            {name}
                        </SelectItem>
                          );
                      })}
                      
                    </SelectGroup>
                  </SelectContent>
                </Select>
                </div>

                <div className="w-full sm:w-1/2">
                <Select value={company_id} onValueChange={(value) => setCompany_id(value)}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Filter by company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {companies?.map(({ name, id }) => (
                        <SelectItem key={name} value={id}>
                          {name}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                </div>

                <Button onClick={clearFilters} variant='destructive' className="sm:w-1/2">
                  Clear Filters
                </Button>
           </div> 
        
      </div>
      {loadingProperties && (
        <BarLoader className="mb-4" width={"100%"} color="#36d7b7"/>
      )}

      {loadingProperties === false && (
          <div className='mt-8 grid md:grid-cols-2 lg:grid-cols-3 gap-4 px-10 md:px-10'>
            {properties?.length ?(
              properties.map((property) => {
               return (
                <PropertyCard 
                  key={property.id}
                  property={property}
                  savedInit={property.saved?.length>0}
                  onPropertySaved={handlePropertySaved}
                />
               );
              })
            ) : (
            <div>No properties found.</div>   
            )}
          </div>
      )}

      
     
    </>
  );
}

export default ListingProperty;
