import React from 'react';
import { Link } from 'react-router-dom';

const Page01home = () => {
  return (
    <div className='pageStructure' data-scroll-container>

      {/* First Section */}
      <div className='firstContent flex flex-col md:flex-row p-4 gap-6'>
        {/* Text */}
        <div className='content w-full md:w-3/5'>
          <h1 className='text-4xl sm:text-5xl md:text-6xl lg:text-8xl font-bold font-[title]'>
            The Palmetto Tree
          </h1>
          <h3 className='text-lg sm:text-xl md:text-2xl lg:text-3xl font-medium italic font-[title] mt-2'>
            Trying to Find Our Design Ethos
          </h3>
          <div className="w-full border-black border my-3"></div>

          <div className='flex flex-col gap-3 font-[title] text-base sm:text-lg leading-relaxed'>
            <p>
              The palmetto tree, particularly the Sabal palmetto, stands as a powerful symbol of growth and strength in the Middle East...
            </p>
            <p>
              Despite facing environmental and geopolitical challenges, these communities have persisted...
            </p>
          </div>
        </div>

        {/* Video Placeholder */}
        <div className='video w-full md:w-2/5 flex justify-center items-center'>
          <div className='w-full sm:w-[90%] h-48 sm:h-64 md:h-[80%] bg-black rounded-lg'></div>
        </div>
      </div>

      <div className="divLine"></div>

      {/* Second Section */}
      <div className='secondContent flex flex-col md:flex-row p-4 gap-6'>
        {/* Text */}
        <div className='content2 w-full md:w-1/2 flex flex-col justify-center'>
          <h1 className='titleFont text-2xl sm:text-3xl lg:text-4xl'>
            We Would Like To Present Vol.3:
          </h1>
          <div className="w-full border-black border my-3"></div>
          <p className='font-[title] text-base sm:text-lg leading-relaxed'>
            We would first like to thank our collaborator on this project, Draphts from Bahrain...
          </p>
          <Link to={"/clothing"}>
          <button className='button-custom-01 mt-4 self-start'>
            Shop Now
          </button>
          </Link>
        </div>

        {/* Image */}
        <div className='image2 w-full md:w-1/2'>
          <img
            className='w-full h-auto object-cover rounded-lg'
            src="https://i-p.rmcdn.net/6291f44ed8843700356f4748/4900697/image-0ec6b0c6-a0ac-405f-971b-d6db479b2b75.png?w=626&e=webp"
            alt="Vol.3 Presentation"
          />
        </div>
      </div>

      <div className="divLine"></div>

      {/* Third Section */}
      <div className='thirdContent flex flex-col justify-center md:flex-row p-4 gap-6'>
        {/* Text & Image */}
        <div className='content3 w-full md:w-1/2 flex flex-col'>
          <h1 className='titleFont text-2xl sm:text-3xl lg:text-4xl'>
            Items From Vol.1 & Vol.2 Available:
          </h1>
          <img
            className='w-full h-auto object-cover my-3 rounded-lg'
            src="https://i-p.rmcdn.net/6291f44ed8843700356f4748/4900697/image-fb3b1264-f40b-4fe9-8d59-426b6a5c4c3e.png?w=540&e=webp"
            alt="Vol.1 & Vol.2 Items"
          />
          <Link to="/clothing">
            <button className='button-custom-01'>
              Clothing
            </button>
          </Link>
        </div>

      
      </div>

    </div>
  );
};

export default Page01home;