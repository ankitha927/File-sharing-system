import React from 'react';
import LandingNavbar from './LandingNavbar';
import LandingFooter from './LandingFooter';

function About() {
  const headerStyle = {
    position: 'fixed',
    top: 0,
    width: '100%',
    zIndex: 1000
  };

  const footerStyle = {
    position: 'fixed',
    bottom: 0,
    width: '100%',
    zIndex: 1000
  };

  const mainContentStyle = {
    marginTop: '60px', // Adjust based on your header height
    marginBottom: '60px', // Adjust based on your footer height
    overflowY: 'auto',
    flexGrow: 1
  };

  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh'
  };

  const sectionStyle = {
    backgroundColor: '#FFEB3B',
    borderBottom: '1px solid #ccc',
    padding: '20px 0',
    flex: '1 0 auto'
  };

  const innerContainerStyle = {
    width: '100%',
    maxWidth: '768px',
    padding: '0 1rem',
    margin: '0 auto',
    textAlign: 'center'
  };

  return (
    <div style={containerStyle}>
      <div style={headerStyle}>
        <LandingNavbar />
      </div>
      
      <div style={mainContentStyle}>
        <section style={sectionStyle}>
          <div style={innerContainerStyle}>
            <div>
              <h3 class="mt-10 text-yellow-300">Pynapple</h3>
              <h2 className="text-3xl mt-10 leading-tight mb-4">About Pynapple Share</h2>
              <p className="text-gray-700 mb-4">
                Welcome to Pynapple Share, your premier destination for seamless and secure file sharing. At Pynapple Share, we understand the importance of efficient and reliable file transfer solutions, whether for personal use or professional collaboration. Our mission is to provide a versatile platform that simplifies the process of sharing files, ensuring both convenience and security.
              </p>
              <h3 className="text-2xl leading-tight mb-4">Our Story</h3>
              <p className="text-gray-700 mb-4">
                Pynapple Share was developed by a team of passionate individuals dedicated to creating innovative digital solutions. Our journey began with the realization that there was a need for a user-friendly and instant file-sharing application. With this vision in mind, Pynapple Share took birth.
              </p>
              <h3 className="text-2xl leading-tight mb-4">Our Commitment</h3>
              <p className="text-gray-700 mb-4">
                At Pynapple Share, we are committed to maintaining the highest standards of security and privacy. We understand the importance of protecting your data, and we employ state-of-the-art encryption and security protocols to safeguard your information.
              </p>
              <h3 className="text-2xl leading-tight mb-4">Contact Us</h3>
              <p className="text-gray-700 mb-4">
                We value your feedback and are always here to assist you. If you have any questions or need support, please do not hesitate to contact us at <a href="mailto:contact@pynappleshare.com" className="text-gray-900 hover:underline">contact@pynappleshare.com</a> or call us at <a href="tel:+910123456789" className="text-gray-900 hover:underline">+91 0123456789</a>.
              </p>
              <p className="text-gray-700 mb-4">
                Thank you for choosing Pynapple Share. We look forward to serving you!
              </p>
              <p className="text-1xl leading-tight mb-20">The Pynapple Share Team :)</p>
              <h2 class="mb-20 text-yellow-300">Pynapple</h2>
            </div>
          </div>
        </section>
      </div>

      <div style={footerStyle}>
        <LandingFooter />
      </div>
    </div>
  );
}

export default About;
