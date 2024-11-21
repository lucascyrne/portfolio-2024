'use client';

import Footer from "@/app/components/core/Footer";
import Header from "@/app/components/core/Header";
import AboutMe from "@/app/components/ui/AboutMe";

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
