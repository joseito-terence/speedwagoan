import React from "react";
import "./AboutUs.css";
import ContactUs from "./ContactUs";
import MetaTags from '../MetaTags';

function AboutUs() {
   return(
      <>
         <MetaTags title='About Us' />
         <div className='aboutUs'>   
            <div>
               <h1 align="center">About Us</h1>
            </div>

            <div className="para1">
               <p className='mb-0'> 
                  Our goal is to give customers a wide variety of their favorite products, guaranteed satisfaction, and a great online shopping experience.
               </p>
            </div>

            <div className="who">
               <h2 align="center">Who We Are</h2> 
                  <p id="para2">
                     Our mission is to be the most competitvie company on the market. 
                     SpeedWaGoan is guided by sheer zeal for profits, leaving no stone unturned to get you the best services and products possible. 
                     We aspire to meet and outmatch any bars set by our competitors, affording you the power of choice in an increasingly monopolistic market.
                  </p>
            </div>

            <div className="contact text-center">
               <h3 align="center" className='mb-4'>Contact Us</h3>
               <ContactUs />
            </div>          
         </div>
      </>
   ); 
}
   
export default AboutUs;