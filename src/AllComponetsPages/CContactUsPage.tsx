"use client";
import React, { useMemo } from "react";
// // import Map from "../Componets/ui/About And Contact/Map";

// import dynamic from "next/dynamic"; // Ensure dynamic import from next/dynamic

// // Lazy load the Map component using dynamic import
// const Map = useMemo(
//   () =>
//     dynamic(() => import("@/src/Componets/ui/AboutAndContact/Map"), {
//       ssr: false, // Disable server-side rendering for this component
//     }),
//   []
// );

const CContactUsPage = () => {
  return (
    <>
      <div>
        <div className=" min-h-screen">
          {/* Header */}
          <section className="bg-blue-600 text-white py-12">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-4xl font-bold">Contact Us</h1>
              <p className="mt-4 text-lg">We're here to help you!</p>
            </div>
          </section>

          {/* Contact Form */}
          <section className="py-12">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                  <h2 className="text-2xl font-semibold mb-4 text-black">
                    Get in Touch
                  </h2>
                  <form>
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 mb-2"
                        htmlFor="name"
                      >
                        Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        placeholder="Your Name"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 mb-2"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        placeholder="Your Email"
                        required
                      />
                    </div>
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 mb-2"
                        htmlFor="message"
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        rows={4 as number}
                        className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                        placeholder="Your Message"
                        required
                      ></textarea>
                    </div>
                    <button
                      type="submit"
                      className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-500 transition duration-200"
                    >
                      Send Message
                    </button>
                  </form>
                </div>

                {/* Map Section */}
                <div className=" z-50">
                  <div>
                    <div className=" border m-1">
                      <iframe
                        allowFullScreen
                        height="350"
                        loading="lazy"
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d29210.841191686242!2d90.32901490397191!3d23.77036439141986!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3755c0af678d9809%3A0x7aaa2fe4ee51b350!2sDhaka%201207!5e0!3m2!1sen!2sbd!4v1724320018344!5m2!1sen!2sbd"
                        width="100%"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Contact Information */}
          <section className="bg-white py-12">
            <div className="container mx-auto px-4 text-center">
              <h2 className="text-2xl font-semibold mb-4 text-black">
                Contact Information
              </h2>
              <p className="text-gray-700 mb-2">Phone: (123) 456-7890</p>
              <p className="text-gray-700 mb-2">
                Email: contact@ourcompany.com
              </p>
              <p className="text-gray-700">
                Address: 123 Main Street, Anytown, USA
              </p>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default CContactUsPage;
