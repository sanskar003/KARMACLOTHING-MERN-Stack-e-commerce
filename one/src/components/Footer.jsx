import React from "react";

const Footer = () => {
  const footerLinks = [
    { name: "TERMS & CONDITIONS", href: "#" },
    { name: "SOCIALS", href: "#" },
    { name: "BACK TO TOP", href: "#" },
  ];

  return (
    <footer className="pageStructure py-6 border-b-4 border-t-2">
      <ul className="flex flex-col md:flex-row justify-evenly items-center gap-4 md:gap-0 text-lg sm:text-2xl md:text-3xl font-[navHead] mx-2">
        {footerLinks.map((link, index) => (
          <li
            key={index}
            className="border border-black w-full md:w-auto text-center py-2 px-6 hover:bg-black hover:text-white transition-all duration-300"
          >
            <a href={link.href}>{link.name}</a>
          </li>
        ))}
      </ul>
    </footer>
  );
};

export default Footer;