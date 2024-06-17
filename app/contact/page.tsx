'use client';

import Footer from '../components/core/Footer';
import Header from '../components/core/Header';
import AboutMe from '../components/ui/AboutMe';
import ContactForm from '../components/ui/ContactForm';

const Contact = () => {
  return (
    <div className='min-h-screen flex flex-col items-center justify-center bg-gray-100 '>
      <Header />

      <AboutMe />

      {/* <div className='bg-white p-10 rounded-lg shadow-md w-full mb-10'>
        <ContactForm />
      </div> */}

      <Footer />
    </div>
  );
};

export default Contact;
