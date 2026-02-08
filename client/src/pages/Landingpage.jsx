import React from 'react';
import '../LandingPage.css';
import raliLogo from '/raliLogo.png';
import estateLogo from '/estateLogo.png';
import { Link } from 'react-router-dom';
import { useUser } from '@clerk/clerk-react';
import { Button } from '../components/ui/button';
import companies from '../data/companies.json';
import { Carousel, CarouselContent, CarouselItem } from '../components/ui/carousel';
import Autoplay from 'embla-carousel-autoplay';
import { useResponsiveButtonSize } from '../hooks/useResponsiveButtonSize.js';
import { Card, CardHeader, CardTitle, CardContent } from '../components/ui/card';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '../components/ui/accordion';
import faqs from '../data/faqs.json';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem } from '../components/ui/dropdown-menu';



export default function LandingPage() {
  const buttonSize = useResponsiveButtonSize();
  const { user } = useUser();
  const isOwner = user?.unsafeMetadata?.role === 'owner';
  
  return (
      <>
        <main className='flex flex-col gap-10 sm:gap-20 py-10 sm:py-20'>
          
          <div className="grid-background"></div>
          <section className='text-center'>
             
             <h1 className='flex flex-col items-center justify-center gradient-title text-4xl font-extrabold sm:text-5xl lg:text-6xl tracking-tighter py-0'>
                <img src={raliLogo} alt="raliLogo" className='h-80 sm:h-80 lg:h-80'/>
                 Find your dream home
             </h1>
             <p className="text-gray-300 sm:mt-4 text-xs sm:text-xl">Find your next home among thousands of verified real estate offers.
             </p>
          </section>

          <div className='flex gap-6 justify-center'>
            <Link to="/properties">
              <Button variant="blue" size={buttonSize} className="sm:size-xl" >Browse properties</Button>
            </Link>
            {isOwner ? (
              <Link to="/add-property">
                <Button variant="destructive" size={buttonSize} className="sm:size-xl">
                  List Your Property
                </Button>
              </Link>
            ) : (
              <Button variant="destructive" size={buttonSize} className="sm:size-xl" disabled>
                List Your Property
              </Button>
            )}
          </div>

           <Carousel
              plugins={[Autoplay({delay: 1500})]}
              className="w-full py-10"
            >
              <CarouselContent className="flex gap-5 sm:gap-20 items-center"
              >
                {companies.map(({name, path, id}) => {
                  return (
                    <CarouselItem key={id} className="basis-1/3 lg:basis-1/6 ">
                      <img src={path} alt={name} className='h-9 sm:h-14 object-contain bg-transparent'/>
                    </CarouselItem>
                  )
                })}
              </CarouselContent> 
            </Carousel>

             <section className="text-center flex justify-center my-0">
                <div
                  className="text-gray-300 text-xs sm:text-xl leading-relaxed max-w-sm md:max-w-lg lg:max-w-xl"
                >
                  <span>
                    We are proud to collaborate with leading real estate companies such as Zillow, Realtor, Redfin, Engel & Völkers, Era, and RE/MAX.
                  </span>
                  <br /><br />
                  <span>
                    Our partnerships ensure that you have access to the most reliable property listings and professional services in the market.
                  </span>
                </div>
            </section>
             <section className="grid grid-cols-1 md:grid-cols-2 gap-4 mx-10">
              <Card>
                <CardHeader>
                  <CardTitle>Verified Listings</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    All properties on our platform are carefully verified to ensure authenticity and accuracy. We work closely with trusted partners to provide you with reliable listings for a secure home search experience.
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Professional Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    Our team and partners offer expert guidance throughout your real estate journey. From initial search to final purchase, you benefit from professional support and transparent service every step of the way.
                  </p>
                </CardContent>
              </Card>
            </section>

          <div className="flex flex-col-reverse items-center gap-6 md:flex-row md:items-start md:gap-10 ">    
           <div>
              <Accordion type="single" collapsible className="gap-4 max-w-4xl mx-10">
                {faqs.map((faq, index) =>{
                  return (
                  <AccordionItem key={index} value={`item-${index+1}`}>
                  <AccordionTrigger>{faq.title}</AccordionTrigger>
                  <AccordionContent>
                    {faq.content}
                  </AccordionContent>
                </AccordionItem>
                  )
              })}   
              </Accordion>
            </div>
             <div className='flex justify-center md:w-1/3'>
              <img src={estateLogo} alt="estateLogo" className='h-65 sm:h-80 lg:h-100 my-0'/>
            </div>
          </div>
        </main>
      </>
  )
}