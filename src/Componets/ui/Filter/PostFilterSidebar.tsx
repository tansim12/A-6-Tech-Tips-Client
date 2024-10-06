"use client";
import React, { useState } from "react";
export const coursePriceData = [
  {
    name: "সব",
    value: "false",
  },
  {
    name: "পেইড কোর্স",
    value: "false",
  },
  {
    name: "ফ্রি কোর্স",
    value: "true",
  },
];

const PostFilterSidebar = () => {
  const [filters, setFilters] = useState({
    
    freeCourse: [],
  });
  const handleFilterChange = (e: any) => {
    const { name, value, checked, type } = e.target;

    setFilters((prevFilters: any) => {
      // Ensure the field is initialized as an array if it’s not
      const currentValue = prevFilters[name] || [];

      if (type === "checkbox") {
        if (checked) {
          return {
            ...prevFilters,
            [name]: Array.isArray(currentValue)
              ? [...currentValue, value] // Add to the array if it's checked
              : [value], // Initialize with the first value
          };
        } else {
          return {
            ...prevFilters,
            [name]: currentValue.filter((v: any) => v !== value), // Remove if unchecked
          };
        }
      } else {
        return {
          ...prevFilters,
          [name]: value, // Handle other input types (e.g., radio, text)
        };
      }
    });
  };

  console.log(filters);

  return (
    <div className="text-3xl">
      <section className="w-full divide-y rounded mt-4">
        <details className="group border border-[#F1F2F3] rounded-md " open>
          <summary className="relative cursor-pointer list-none pr-8 py-1 ps-1 transition-colors duration-300 focus-visible:outline-none [&::-webkit-details-marker]:hidden bg-[#F1F2F3] text_blue rounded-se-lg rounded-ss-lg ">
            <span className="text_blue text-[16px] font-[500]">কোর্স দাম</span>
            <span className="absolute right-1 w-4 h-4 transition duration-300 top-1 shrink-0 ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="20"
                viewBox="0 -960 960 960"
                className="absolute opacity-100 group-open:opacity-0"
                width="20"
              >
                <path d="M440-440H200v-80h240v-240h80v240h240v80H520v240h-80v-240Z" />
              </svg>

              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="absolute bottom-1 opacity-0 group-open:opacity-100"
                height="20"
                viewBox="0 -960 960 960"
                width="21"
              >
                <path d="M240-120v-80h480v80H240Z" />
              </svg>
            </span>
          </summary>

          {coursePriceData?.map((item) => (
            <div
              //   key={item}
              className="mt-1 text-[#5D636F] text-[14px] font-[400]"
            >
              {/* 33 */}
              <div className="relative flex flex-wrap items-center">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="freeCourse"
                    value={item?.value}
                    className="h-4 w-4 rounded-md border-gray-200 bg-gray-500 shadow-sm"
                    onClick={handleFilterChange}
                  />

                  <span className="py-1 flex justify-center ">
                    {item?.name}
                  </span>
                </label>
              </div>
            </div>
          ))}
        </details>
      </section>
    </div>
  );
};

export default PostFilterSidebar;
