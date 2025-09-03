import React from "react";

const Page02About = () => {
  return (
    <div className="pageStructure" data-scroll-container>
      <h1 className="titleFont py-4 px-4 sm:px-10">About Us</h1>

      {/* First Section */}
      <div className="about-01 flex flex-col md:flex-row p-4 gap-4">
        {/* Image */}
        <div className="w-full md:w-1/2 flex flex-col justify-evenly items-center">
          <img
            className="w-full max-w-[80%] border-4 border-black"
            src="https://i-p.rmcdn.net/6291f44ed8843700356f4748/4900697/image-bb5b9d85-8dc3-4623-bf95-da1c8be2c442.png?w=513&e=webp"
            alt=""
          />
        </div>

        {/* Divider (hidden on mobile) */}
        <div className="divLine hidden md:block"></div>

        {/* Text */}
        <div className="w-full md:w-1/2 px-4 sm:px-6 md:px-10">
          <p className="text-base sm:text-lg md:text-2xl font-medium font-[title] leading-relaxed">
            I’m a <span className="font-bold">multidisciplinary designer</span>{" "}
            working independently to bring ideas to life. I handle every aspect
            of my projects myself, while always appreciating the people who have
            supported me along the way. In the future, I hope to collaborate
            with other creatives who share the same passion and vision...
          </p>
        </div>
      </div>

      <div className="divLine"></div>

      {/* Second Section */}
      <div className="about-02 px-4 sm:px-6 md:px-10 py-4">
        <h1 className="titleFont">Meaning Behind:</h1>
        <h1 className="titleFont">Palmetto</h1>
        <div className="h-5"></div>

        <h2 className="text-lg sm:text-2xl md:text-3xl font-[title] leading-relaxed">
          The Palmetto Tree, a low-growing fan-leaved palm, embodies creativity
          and imagination...
        </h2>

        <div className="h-5"></div>

        <h2 className="font-[title] italic text-lg sm:text-xl md:text-2xl text-center">
          Wheel of Fortune: Symbol of Wealth in Persian Carpetry
        </h2>

        <div className="h-5"></div>

        <img
          className="m-auto w-full sm:w-3/4 md:w-1/2 my-2"
          src="https://i-p.rmcdn.net/6291f44ed8843700356f4748/4900697/image-c480711a-97ff-400a-8c7f-5438c7e8584e.png?w=676&e=webp"
          alt="Persian Carpet Symbol"
        />

        <div className="h-5"></div>

        <h2 className="text-lg sm:text-2xl md:text-3xl font-[title] leading-relaxed">
          The new logo is inspired by the intricate ornaments of Persian rugs...
        </h2>

        <div className="h-5"></div>

        <h1 className="titleFont">Interested in</h1>
        <h1 className="titleFont">Working Together?</h1>

        <div className="h-5"></div>

        <h2 className="text-lg sm:text-2xl md:text-4xl font-[title] leading-relaxed">
          If you want to collaborate or share ideas, feel free to send us an
          email...
        </h2>

        <div className="flex items-center justify-center my-5">
          <button className="button-custom-01">Contact</button>
        </div>

        <div className="divLine"></div>
      </div>
    </div>
  );
};

export default Page02About;
