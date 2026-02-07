import { Heart, MapPinIcon, Trash2Icon } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "./ui/card";
import { useUser } from "@clerk/clerk-react";
import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { saveProperty } from "@/api/apiProperties";
import { useEffect, useState } from "react";
import useFetch from "@/hooks/use-fetch";

const PropertyCard = ({
  property,
  isMyProperty = false,
  savedInit = false,
  onPropertySaved = () => {},
}) => {
    const [saved, setSaved] = useState(savedInit);

    const {
    fn: fnSavedProperty,
    data: savedPropery,
    loading: loadingSavedProperty,
  } = useFetch(saveProperty, {
    alreadySaved: saved,
  });
  
  const {user} = useUser();

  const handleSaveProperty = async() => {
    await fnSavedProperty({
      customer_id: user.id,
      property_id: property.id,
    });
    onPropertySaved();
  };

  useEffect(() => {
    if(savedPropery !== undefined) setSaved(savedPropery?.length >0);
  }, [savedPropery]);
  
  return (
    <Card className="flex flex-col">
      <CardHeader>
        <CardTitle className="flex justify-between font-bold">
          {property.name}
          
          {isMyProperty && (
          <Trash2Icon
            fill="red"
            size={18}
            className="text-red-300 cursor-pointer"
          />
          )}
        </CardTitle>
      </CardHeader>

       <CardContent className="flex flex-col gap-4 flex-1">
          <div className="flex justify-between">
            {property.company && <img src={property.company.logo_url} className="h-6" />}
            <div className="flex gap-2 items-center">
              <MapPinIcon size={15} /> {property.location}
            </div>
          </div>
          <hr />
          {property.description.substring(0, property.description.indexOf('.'))}
       </CardContent>
       
        <CardFooter className="flex gap-2">
          <Link to={`/property/${property.id}`} className="flex-1">
             <Button variant="secondary" className="w-full">
               More Details
             </Button>
          </Link>
          {!isMyProperty && (
            <Button 
              variant="outline"
              className="w-15"
              onClick={handleSaveProperty}
              disabled={loadingSavedProperty}
             >
               {saved ? (
                  <Heart size={20} stroke="red" fill="red" />
                 )  : (
                  <Heart size={20} />
                 )
               }
             </Button>
          )}
        </CardFooter>
    </Card>
  );
} 

export default PropertyCard;