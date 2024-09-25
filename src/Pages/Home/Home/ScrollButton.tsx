import React from "react";
import { useState, useEffect } from "react";
import { FaArrowUp } from "react-icons/fa";

const ScrollButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    window.addEventListener("scroll", toggleVisibility);
    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  return (
    isVisible && (
      <div
        onClick={scrollToTop}
        className="fixed bottom-4 right-4 p-3 rounded-full bg-green-900 text-white cursor-pointer shadow-lg hover:bg-green-700 transition duration-300"
      >
        <FaArrowUp className="text-xl" />
      </div>
    )
  );
};

export default ScrollButton;
