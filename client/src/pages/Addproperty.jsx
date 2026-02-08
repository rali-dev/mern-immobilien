import '../LandingPage.css';
import z from 'zod';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Input } from '@/components/ui/input';
import {Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select"
import { State } from 'country-state-city';
import { useUser } from '@clerk/clerk-react';
import { useEffect } from 'react';
import useFetch from '@/hooks/use-fetch';
import { getCompanies } from '@/api/apiCompanies';
import { BarLoader } from 'react-spinners';
import { Navigate, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import MDEditor from '@uiw/react-md-editor';
import { addNewProperty } from '@/api/apiProperties'; 

  const schema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  address: z.string().min(1, "Address is required"),
  regular_price: z.number().positive("Price must be a positive number"),
  discount_price: z.number().positive("Discount price must be a positive number").optional(),
  bathrooms: z.number().int().positive("Bathrooms must be a positive integer"),
  bedrooms: z.number().int().positive("Bedrooms must be a positive integer"),
  furnished: z.boolean(),
  parking: z.boolean(),
  type: z.enum(['rent', 'sale'], "Type must be either 'rent' or 'sale'"),
  isOpen: z.boolean(),
  image_url: z.string().url("Image URL must be a valid URL"),
  owner_id: z.string(),
  company_id: z.string().optional(),
  location: z.string().min(1, "Location is required"),
  forSale: z.boolean(),
});

const AddProperty = () => {
  const {user, isLoaded} = useUser();
  const navigate = useNavigate();
  
    const {
      register,
      control,
      handleSubmit,
      formState: { errors }
    } = useForm({
      defaultValues: {
        company_id: '',
        forSale: false,
        isOpen: true,
        owner_id: '',
      },
      resolver: zodResolver(schema),
    });

    // Log Zod validation errors for debugging
    useEffect(() => {
      if (Object.keys(errors).length > 0) {
        console.log('Zod validation errors:', errors);
      }
    }, [errors]);

   const {
      fn: fnCompanies, 
      data: companies,
      loading: loadingCompanies,
    } = useFetch(getCompanies);
  
    useEffect(() => {
      if(isLoaded) fnCompanies();
    }, [isLoaded]);

     const {
      loading: loadingCreateProperty,
      error: errorCreateProperty,
      data: dataCreateProperty,
      fn: fnCreateProperty, 
    } = useFetch(addNewProperty);
  
    const onSubmit = (data) => {
      const submitData = {
        ...data,
        owner_id: user.id,
        isOpen: true,
      };
      console.log('onSubmit called', submitData);
      fnCreateProperty(submitData);
    }

    useEffect(() => {
      if(dataCreateProperty?.length > 0) navigate('/properties');
    }, [dataCreateProperty])

    if(!isLoaded || loadingCompanies){
      return (<BarLoader className="mb-4" width={"100%"} color="#36d7b7"/>)
    }

    if(user?.unsafeMetadata?.role !== 'owner'){
      return <Navigate to="/properties" />
    }

    return (
     <>
      <div className="grid-background"></div>
      <div className='px-10 md:px-10'>
        <div className="max-w-4xl mx-auto">
          <h1 className='gradient-title font-extrabold text-5xl sm:text-7xl text-center pb-8'>
             List a Property
          </h1>
        </div>
        <form className='flex flex-col gap-4 p-4 pb-0' onSubmit={handleSubmit(onSubmit)}>
            <Input placeholder="Property Name" {...register("name")} />
            {errors.name && <p className="text-red-500">{errors.name.message}</p>}

            {/* <Textarea placeholder="Property Description" {...register("description")} />
            {errors.description && <p className="text-red-500">{errors.description.message}</p>}
           */}
           
           <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <MDEditor 
                   value={field.value ?? ""} 
                   onChange={field.onChange}
                   data-color-mode="dark" />
              )}
            />
            {errors.description && (
              <p className="text-red-500">{errors.description.message}</p>
            )}

            <Input placeholder="Address" {...register("address")} />
            {errors.address && <p className="text-red-500">{errors.address.message}</p>}
          
            <Input type="number" placeholder="Regular Price" {...register("regular_price", { valueAsNumber: true })} />
            {errors.regular_price && <p className="text-red-500">{errors.regular_price.message}</p>}

            <Input type="number" placeholder="Discount Price" {...register("discount_price", { valueAsNumber: true })} />
            {errors.discount_price && <p className="text-red-500">{errors.discount_price.message}</p>}

            <Input type="number" placeholder="Bathrooms" {...register("bathrooms", { valueAsNumber: true })} />
            {errors.bathrooms && <p className="text-red-500">{errors.bathrooms.message}</p>}

            <Input type="number" placeholder="Bedrooms" {...register("bedrooms", { valueAsNumber: true })} />
            {errors.bedrooms && <p className="text-red-500">{errors.bedrooms.message}</p>}

            <Input type="text" placeholder="Image URL" {...register("image_url")} />
            {errors.image_url && <p className="text-red-500">{errors.image_url.message}</p>}

             <div className='flex gap-4'>
                <label className='flex items-center gap-2'>
                  <input type="checkbox" {...register("furnished")} />
                  Furnished
                </label>
                <label className='flex items-center gap-2'>
                  <input type="checkbox" {...register("parking")} />
                  Parking
                </label>
                <label className='flex items-center gap-2'>
                  <input type="checkbox" {...register("forSale")} />
                  For Sale
                </label>
             </div>

            {/* Type select input */}
            <div className='flex items-center gap-4'>
              <Controller
                name="type"
                control={control}
                render={({ field }) => (
                  <Select
                    value={field.value ?? ''}
                    onValueChange={field.onChange}
                    required
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Type (rent/sale)" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectItem value="rent">Rent</SelectItem>
                        <SelectItem value="sale">Sale</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>
             
          
            <div className='flex items-center gap-4'>
              <Controller
                name="location"
                control={control}
                render={({field}) => (
                  <Select 
                    value={field.value ?? ''} 
                    onValueChange={field.onChange}
                    >
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="location" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {State.getStatesOfCountry("DE").map(({name}) => {
                            return( 
                              <SelectItem value={name} key={name}>
                                {name}
                              </SelectItem>
                            );
                            })}
                          
                        </SelectGroup>
                      </SelectContent>
                  </Select>                  
                )}
              />
 
             <Controller
                name="company_id"
                control={control}
                render={({field}) => (
              <Select 
                   value={field.value ?? ''} 
                   onValueChange={field.onChange}
                  >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="company">
                      {field.value
                        ? companies.find((com) => com.id === Number(field.value))?.name
                        : "Company"
                      }
                    </SelectValue>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {companies?.map(({name, id }) => {
                        return( 
                          <SelectItem key={name} value={id}>
                            {name}
                          </SelectItem>
                          );
                      })}
                    </SelectGroup>
                  </SelectContent>
               </Select>
             )}
            />

              {/* Add company drawer */}
           </div>

           {errors.location && (
              <p className="text-red-500">{errors.location.message}</p>
            )}

           {errors.company_id && (
              <p className="text-red-500">{errors.company_id.message}</p>
            )}

            {errorCreateProperty?.message && (
              <p className="text-red-500">{errorCreateProperty?.message}</p>
            )}
            {loadingCreateProperty && <BarLoader className="mb-4" width={"100%"} color="#36d7b7"/>}
            <Button type="submit" variant="blue" size="lg" className="mt-2 mb-10">
              Submit
            </Button>
        </form>
      </div>
     </>
    )
}

export default AddProperty;