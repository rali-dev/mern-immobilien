import React, { useEffect } from 'react';
import '../LandingPage.css';
import { useParams } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { getSingleProperty, updatePropertyStatus } from '@/api/apiProperties';
import { getOwnerById } from '@/api/apiOwners';
import useFetch from '@/hooks/use-fetch';
import { BarLoader } from 'react-spinners';
import { BadgePercent, Bath, Bed, Car, DollarSign, DoorClosed, DoorOpen, MapPinIcon, Send, Sofa, Tag} from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

const  PropertyPage = () => {
  const { isLoaded, user } = useUser();
  const { id } = useParams(); 

  const {
    fn: fnProperty,
    data: property,
    loading: loadingProperty
  } = useFetch(getSingleProperty, { property_id: id });
  
  const {loading: loadingPropertyStatus, fn: fnPropertyStatus} = useFetch(
     updatePropertyStatus, 
     {
        property_id: id 
    });

  const { fn: fnOwner, data: owner } = useFetch(getOwnerById, {
    owner_id: property?.owner_id,
  });

  const handleStatusChange = async (value) => {
    const isOpen = value === 'available';
    fnPropertyStatus(isOpen).then(() => fnProperty());
  };

  useEffect(() => {
    if(isLoaded) fnProperty();
  }, [isLoaded]);

  useEffect(() => {
    if (property?.owner_id) fnOwner();
  }, [property?.owner_id]);

  if (!isLoaded || loadingProperty) {
    return (<BarLoader className="mb-4" width={"100%"} color="#36d7b7"/>)
  }

  console.log("owner_id:", property?.owner_id);
  console.log("user.id:", user?.id);

    return (
      <>
        <div className="grid-background"></div>
        <div className='flex flex-col gap-8 mt-5 px-10 md:px-10'>  
          <div className='flex flex-col-reverse gap-6 md:flex-row justify-between items-center'>
            <h1 className='gradient-title font-extrabold pb-3 text-4xl sm:text-6xl'>
              {property?.name}
            </h1>  
            <img src={property?.company?.logo_url} className="h-12" alt={property?.name} />
          </div>


           <div className='flex justify-between'>

            <div className='flex gap-2'>
              <MapPinIcon/>
              {property?.location}
            </div>
             <div className='flex gap-2'>
              {property?.isOpen ? (
               <>
                 <DoorOpen/> Available
               </>
            ) :    (   
                <>
                  <DoorClosed/> Off Market
                </>

              )}
            </div>
          </div>

          {/* property status : available or off market */}
           {loadingPropertyStatus && <BarLoader className="mb-4" width={"100%"} color="#36d7b7"/>}
           {property?.owner_id === user?.id &&  (
              <Select onValueChange={handleStatusChange}>
                  <SelectTrigger
                      className={`w-full ${
                        property?.isOpen
                          ? "bg-green-950 dark:bg-green-950"
                          : "bg-red-950 dark:bg-red-950"
                      }`}
                    >
                    <SelectValue placeholder={"Property:" + (property?.isOpen ? " Available" : " Off Market")} />
                  </SelectTrigger>
                  <SelectContent>
                        <SelectItem value="available">Available</SelectItem>
                        <SelectItem value="off_market">Off Market</SelectItem>
                  </SelectContent>
               </Select>
           )}

          <h2 className='text-2xl sm:text-3xl font-bold'>About this property</h2>

          <div className="w-1/2 grid gap-2 rounded-lg border bg-slate-900/30 p-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="flex items-center gap-2">
              <Tag />
              {`For ${property?.forSale === true ? 'Sale' : 'Rent'}`}
            </div>

            <div className="flex items-center gap-2">
              <DollarSign />
              {property?.forSale === true ? (
                <>
                  {`Price: ${property?.regular_price}`}
                </>
              ) :(
                <>
                  {`${property?.regular_price} / month`}
                </>
              )}
            </div>

            <div className="flex items-center gap-2">
              <DollarSign />
              {property?.forSale === true ? (
                <>
                  {`Now: ${property?.discount_price}`}
                </>
              ) :(
                <>
                  {`${property?.regular_price} / month`}
                </>
              )}
            </div>

            <div className="flex items-center gap-2">
              <BadgePercent />
              {property?.regular_price && property?.discount_price ? (
                `${Math.round(
                  ((property.regular_price - property.discount_price) / property.regular_price) * 100
                )}% Discount`
              ) : null}
            </div>
          </div>
          
          <p className='sm:text-lg'>{property?.description}</p>

          <div className='flex justify-between '>
                <div className='flex gap-2'>
                    <Bed /> {property?.bedrooms} Beds
                </div>
                <div className='flex gap-2'>
                  <Bath /> {property?.bathrooms} Baths
                </div>
                <div className='flex gap-2'>
                  {property?.parking ? (
                      <>
                      <Car />  Parking Spot
                      </>
                    ) : (
                      <>
                      <Car /> No Parking
                      </>
                    )
                  }    
                </div>
                <div className='flex gap-2'>
                  {property?.furnished ? (
                      <>
                      <Sofa />  Furnished
                      </>
                    ) : (
                      <>
                      <Sofa /> Unfurnished
                      </>
                    )
                  }    
                </div>
           </div>
          {/* Send inquiry */}
          {/* <div className='w-1/2 rounded-lg border bg-slate-900/30 p-4 mt-4'>
            <div>
              {owner?.name && (
                <>
                {`Name: ${owner.name}` + (owner.lastname ? ` ${owner.lastname}` : '')}
                </>
              )}
            </div>
             <div>
              {owner?.email && (
                <>
                {`Email: ${owner.email}`}
                </>
              )}
             </div>
          </div> */}

          <img 
             src={property?.image_url} 
             alt={property?.name}
             className="w-full max-h-[520px] rounded-2xl object-cover shadow-xl ring-1 ring-white/10 mb-12"
          />
          <div>
            {property?.isOpen === true && (
              <>
                <Send /> <h1 className='text-2xl font-bold mt-4'>Send inquiry</h1>
              </>
            )}
          </div>
        </div>
      </>
  );
};

export default PropertyPage;