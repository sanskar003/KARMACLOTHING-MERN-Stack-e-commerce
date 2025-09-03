import React, { useRef, useState } from "react";
import gsap from "gsap";
import { Link } from "react-router-dom";
import { useGSAP } from "@gsap/react";

const Nav = () => {
  const navLinks = [
    { name: "About", path: "/about" },
    { name: "Clothing", path: "/clothing" },
    { name: "Cart", path: "/cart" },
    { name: "Profile", path: "/profile" },
  ];

  const scrollRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useGSAP(() => {
    gsap.to(scrollRef.current, {
      xPercent: -100,
      repeat: -1,
      duration: 10,
      ease: "linear",
      modifiers: {
        xPercent: gsap.utils.wrap(-100, 0),
      },
    });
  });

  return (
    <div className="w-full md:w-[65vw] mx-auto border-x-0 md:border-x-4 border-t-4 border-black py-2 bg-[#F5F5DC]">
      <nav className="flex flex-col items-center px-4 sm:px-6 md:px-8 ">
        {/* Scrolling Greeting */}
        <div className="overflow-hidden  w-full relative">
          <div ref={scrollRef} className="flex whitespace-nowrap">
            {[...Array(3)].map((_, i) => (
              <h1
                key={i}
                className="text-lg sm:text-xl md:text-3xl font-bold my-2"
              >
                नमस्कार こんにちは नमस्ते Hello Здравствуйте Hola Bonjour&nbsp;
              </h1>
            ))}
          </div>
        </div>

        <div className="w-full my-2 border border-black" />

        {/* Logo */}
        <Link to={"/"}>
          <header className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-zinc-700 tracking-widest font-[navHead] text-center">
            KARMA CLOTHING
          </header>
        </Link>

        <div className="w-full h-0.5 border-black border my-3" />

        {/* Desktop Links */}
        <div className="hidden md:block w-full">
          <ul className="flex justify-center items-center my-4 text-2xl md:text-3xl font-[navHead]">
            {navLinks.map((link, index) => (
              <li
                key={index}
                className="border  border-black py-1 px-8 hover:bg-black hover:text-white  transition-all duration-300 cursor-pointer"
              >
                <Link to={link.path}>{link.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden w-full flex justify-end">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="p-2  rounded"
          >
            {/* Simple hamburger icon */}
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d={
                  menuOpen
                    ? "M6 18L18 6M6 6l12 12" // X icon
                    : "M4 6h16M4 12h16M4 18h16" // Hamburger
                }
              />
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden w-full mt-2">
            <ul className="flex flex-col gap-2 text-lg font-[navHead]">
              {navLinks.map((link, index) => (
                <li
                  key={index}
                  className="border border-black py-2 px-4 hover:bg-black hover:text-white transition-all duration-300 cursor-pointer"
                  onClick={() => setMenuOpen(false)}
                >
                  <Link to={link.path}>{link.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>
        <div className="divLine border-black"/>
    </div>
  );
};

export default Nav;