"use client";
import React, { useMemo } from "react";
import history from "@/src/assets/history.jpg";
import banner from "@/src/assets/banner.jpg";
import e1 from "@/src/assets/e1.jpg";
import e2 from "@/src/assets/e2.jpg";
import e3 from "@/src/assets/e3.jpg";

import Image from "next/image";
import ReUseableBanner from "../Componets/ui/Banner/ReUseableBanner";
import Map from "../Componets/ui/AboutAndContact/Map";
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

// Sample team members data
const teamMembers = [
  { name: "John Doe", role: "CEO", photo: e2 },
  { name: "Jane Smith", role: "CTO", photo: e1 },
  { name: "Emily Johnson", role: "COO", photo: e3 },
];

const CAboutUsPage = () => {
  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="bg-pageBg">
        <ReUseableBanner
          image={banner}
          title="About Us"
          subTitle="** Contact"
        />
      </div>

      {/* Company History */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-3xl font-semibold mb-4 text-black">
                Company History
              </h2>
              <p className="text-black mb-4">
                Founded in 2010, our company has been committed to providing
                excellent service with a focus on customer satisfaction and
                innovation.
              </p>
              <p className="text-black">
                Our mission is to deliver top-notch transportation solutions,
                and our vision is to become the leading car rental service
                globally.
              </p>
            </div>
            <div className="flex justify-center items-center">
              <Image
                src={history}
                alt="Company History"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Our Team */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-8 text-center text-black">
            Our Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {teamMembers.map((member, index) => (
              <div
                key={index}
                className="bg-white shadow-lg rounded-lg overflow-hidden"
              >
                <Image
                  src={member.photo}
                  alt={member.name}
                  className="object-cover w-full h-48"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-lg">{member.name}</h3>
                  <p className="text-black">{member.role}</p>
                  <button className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-500 transition">
                    Contact
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Fleet */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-3xl font-semibold mb-4">Our Fleet</h2>
              <p className="text-black dark:text-white mb-4">
                We offer a diverse range of vehicles including economy, luxury,
                and SUVs to meet all your transportation needs.
              </p>
            </div>
            <div className="flex justify-center">
              <Image
                src={history}
                alt="Our Fleet"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values & Commitment */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold mb-4 text-center text-black">
            Values & Commitment
          </h2>
          <p className="text-black text-center">
            We are committed to excellent customer service and sustainability.
            Our values drive us to continually improve and meet the highest
            standards.
          </p>
        </div>
      </section>

      {/* Contact Information */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h2 className="text-3xl font-semibold mb-4 text-black">
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
      </section>
    </div>
  );
};

export default CAboutUsPage;
