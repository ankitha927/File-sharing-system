import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInstagram, faFacebook, faTwitter } from '@fortawesome/free-brands-svg-icons';

function LandingFooter() {
  return (
    <footer className="bg-white border-t border-gray-400 shadow">
      <div className="container mx-auto py-4">
        <div className="flex flex-wrap">
          <div className="w-full lg:w-1/2 mb-4 lg:mb-0">
            <div className="px-4">
              <h3 className="font-bold text-gray-900">About Us</h3>
              <p className="py-2 text-gray-600 text-sm">
                Developed by <a href="mailto:contact@pynappleshare.com" className="text-gray-900 hover:underline">Pynapple Share Team</a><br />
                Phone: <a href="tel:+910123456789" className="text-gray-900 hover:underline">+91 0123456789</a>
              </p>
            </div>
          </div>
          <div className="w-full lg:w-1/2 lg:text-right">
            <div className="px-4">
              <h3 className="font-bold text-gray-900">Social Media</h3>
              <ul className="list-none p-0 mt-2">
                <li className="inline-block mr-4">
                  <a href="https://www.instagram.com/" className="text-gray-600 hover:text-gray-900">
                    <FontAwesomeIcon icon={faInstagram} size="lg" /> 
                    PynappleShareOfficial
                  </a>
                </li>
                <li className="inline-block mr-4">
                  <a href="https://www.facebook.com/" className="text-gray-600 hover:text-gray-900">
                    <FontAwesomeIcon icon={faFacebook} size="lg" />
                    /pynappleshare
                  </a>
                </li>
                <li className="inline-block">
                  <a href="https://twitter.com/" className="text-gray-600 hover:text-gray-900">
                    <FontAwesomeIcon icon={faTwitter} size="lg" />
                    PynappleShare
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-gray-200 py-2">
        <div className="container mx-auto text-center text-gray-600 text-sm">
          &copy; 2024 Pynapple Share. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default LandingFooter;
