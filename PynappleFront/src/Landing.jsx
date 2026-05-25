import React, { useState, useEffect } from "react";
import LandingNavbar from "./LandingNavbar";
import { Link } from "react-router-dom";
import LandingFooter from "./LandingFooter";

function Landing() {
  const [fadeIn, setFadeIn] = useState(false);
  useEffect(() => {
    // Trigger fade-in effect after component mounts
    setFadeIn(true);
  }, []);

  return (
    <div className="bg-gray-100 font-sans leading-normal tracking-normal">
      <div className="sticky top-0 z-50">
        <LandingNavbar />
      </div>

      <section className="bg-yellow-300 border-b py-20">
        <div className="container mx-auto px-2 md:flex md:items-center">
          <div
            className={`w-full md:w-2/5 py-10 text-center ${
              fadeIn ? "opacity-100" : "opacity-0"
            }`}
            style={{ transition: "opacity 1s ease-in-out" }}
          >
            {/* Placeholder for your image */}
            <img
              className="w-full md:max-w-xs mx-auto"
              src="/src/assets/FedEx.png"
              alt="Feature Image"
            />
          </div>
          <div
            className={`w-full md:w-3/5 py-6 text-center ${
              fadeIn ? "opacity-100" : "opacity-0"
            }`}
            style={{
              transition: "opacity 1s ease-in-out",
              transitionDelay: "0.5s",
            }}
          >
            <h2 className="text-3xl text-orange-900 leading-tight font-bold mb-4">
              Securely Share and Receive Files
            </h2>
            <p className="text-gray-900 mb-4">
              "Pynapple Share is a versatile web application designed for
              seamless file sharing. It offers a range of innovative features to
              enhance user experience, including the ability to transfer files
              effortlessly via QR code or link. Users can opt for a one-time
              transfer mode, ensuring secure and controlled sharing. The
              application also keeps a detailed log of previously sent files for
              easy reference. With its emphasis on speed and user-friendliness,
              Pynapple Share simplifies file sharing, making it an ideal choice
              for both personal and professional use."
            </p>
            <div className="mt-8">
              <Link
                to="/login"
                className="bg-orange-600 hover:bg-orange-900 text-white font-bold py-2 px-4 rounded mr-4"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="bg-orange-600 hover:bg-orange-900 text-white font-bold py-2 px-4 rounded mr-4"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </section>

      <LandingFooter />
    </div>
  );
}

export default Landing;
