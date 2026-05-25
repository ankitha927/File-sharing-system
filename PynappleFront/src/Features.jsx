import React from "react";
import LandingNavbar from "./LandingNavbar";
import LandingFooter from "./LandingFooter";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";

// Import images for each feature (ensure the paths are correct)
import seamlessTransferImg from "/src/assets/FedEx.png";
import qrCodeImg from "/src/assets/qrcode.jpg";
import oneTimeModeImg from "/src/assets/shareonce.jpg";
import transferLinksImg from "/src/assets/links.jpg";
import fastEfficientImg from "/src/assets/fast.png";
import userFriendlyImg from "/src/assets/home.jpg";
import secureReliableImg from "/src/assets/security.jpg";
import transferLogsImg from "/src/assets/links.jpg";
import crossPlatformImg from "/src/assets/crossplatform.jpg";
import noRegistrationImg from "/src/assets/download.jpg";

// Add fade-in animation in CSS
const fadeInClass = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  .animate-fadeIn {
    animation: fadeIn 1s ease-in-out forwards;
  }
`;

const features = [
  {
    title: "Seamless File Transfer",
    description:
      "Effortlessly share files with friends, family, or colleagues using our intuitive platform.",
    img: seamlessTransferImg,
  },
  {
    title: "QR Code Generation",
    description: "Generate unique QR codes for each file transfer.",
    img: qrCodeImg,
  },
  {
    title: "One-Time Mode for File Transfers",
    description:
      "Enhanced security with one-time mode, ensuring files can only be downloaded once.",
    img: oneTimeModeImg,
  },
  {
    title: "Transfer Links",
    description: "Share files via unique transfer links.",
    img: transferLinksImg,
  },
  {
    title: "Fast and Efficient",
    description: "Optimized for fast file transfers, regardless of file size.",
    img: fastEfficientImg,
  },
  {
    title: "User-Friendly Interface",
    description: "Simple and clean design for a smooth user experience.",
    img: userFriendlyImg,
  },
  {
    title: "Secure and Reliable",
    description:
      "State-of-the-art encryption and security protocols to protect your files.",
    img: secureReliableImg,
  },
  {
    title: "Transfer Logs",
    description: "Keep track of your previous file transfers.",
    img: transferLogsImg,
  },
  {
    title: "Cross-Platform Compatibility",
    description:
      "Accessible on various devices including desktops, laptops, tablets, and smartphones.",
    img: crossPlatformImg,
  },
  {
    title: "No Registration Required",
    description: "Download files without the need to create an account.",
    img: noRegistrationImg,
  },
];

const Features = () => {
  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <LandingNavbar />
      <style>{fadeInClass}</style> {/* Add fade-in animation CSS */}
      <div className="flex-grow overflow-y-auto p-10 bg-yellow-300 font-sans leading-normal tracking-normal">
        <div className="container mx-auto pb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-orange-900">
            Key Features
          </h2>
          <Swiper
            spaceBetween={60}
            slidesPerView={1}
            loop={true}
            pagination={{ clickable: true }}
            navigation
            className="max-w-6xl mx-full"
            style={{ height: "70%" }}
          >
            {features.map((feature, index) => (
              <SwiperSlide key={index}>
                <div className="flex flex-col md:flex-row items-center justify-center w-full bg-white shadow-lg rounded-lg p-6 transform transition-all duration-500 ease-in-out hover:scale-105 h-full">
                  <div className="md:w-1/3 mb-4 md:mb-0">
                    <img
                      src={feature.img}
                      alt={feature.title}
                      className="max-w-full h-auto rounded-lg shadow-lg opacity-0 animate-fadeIn"
                    />
                  </div>
                  <div className="md:w-2/3 md:pl-8 text-center md:text-left">
                    <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
                    <p className="text-gray-700">{feature.description}</p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
      <LandingFooter />
    </div>
  );
};

export default Features;
