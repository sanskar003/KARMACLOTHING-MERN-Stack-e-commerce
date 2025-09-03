import React, { useEffect, useRef } from "react";
import LocomotiveScroll from "locomotive-scroll";
import "locomotive-scroll/dist/locomotive-scroll.css";
import { useLocation } from "react-router-dom";

const SmoothScrollWrapper = ({ children }) => {
  const scrollRef = useRef(null);
  const location = useLocation(); // Detects page change

  useEffect(() => {
    const scroll = new LocomotiveScroll({
      el: scrollRef.current,
      smooth: true,
      // multiplier: 1, // Reduce scroll speed for ultra-smooth effect
      // lerp: 0.15,
    });

    setTimeout(() => {
      scroll.update(); //  Forces Locomotive Scroll to recalculate the page height
    }, 500);

    return () => {
      scroll.destroy();
    };
  }, [location.pathname]); //  Runs when page changes

  return (
    <div data-scroll-container ref={scrollRef} className="h-screen/2 overflow-y-auto">
      {children}
    </div>
  );
};

export default SmoothScrollWrapper;
