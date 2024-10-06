"use client";
import { categoryData, premiumData } from "@/src/Constant/filter.const";
import { TQueryParams } from "@/src/Types/Filter/filter.type";
import React, { useState } from "react";

const PostFilterSidebar = () => {
  const [filters, setFilters] = useState<TQueryParams[]>([]);
  const handleFilterChange = (e: any) => {
    const { name, value, checked, type } = e.target;
    setFilters((prevFilters: TQueryParams[]) => {
      if (type === "checkbox") {
        if (checked) {
          // Add the {name, value} object dynamically to the array
          return [...prevFilters, { name, value }];
        } else {
          // Remove the unchecked value from the array dynamically
          return prevFilters.filter(
            (filter) => !(filter.name === name && filter.value === value)
          );
        }
      } else {
        // Handle dynamic fields (e.g., radio, text, etc.)
        const existingFilterIndex = prevFilters.findIndex(
          (filter) => filter.name === name
        );

        if (existingFilterIndex > -1) {
          // If the field already exists, update the value
          const updatedFilters = [...prevFilters];
          updatedFilters[existingFilterIndex] = { name, value };
          return updatedFilters;
        } else {
          // Add a new filter dynamically
          return [...prevFilters, { name, value }];
        }
      }
    });
  };

  console.log(filters);

  return (
    <div className="text-3xl">
      {/* premium  */}
      <section className="w-full divide-y rounded mt-4">
        <details className="group border  rounded-md " open>
          <summary className="relative cursor-pointer list-none pr-8 py-1 ps-1 transition-colors duration-300 focus-visible:outline-none [&::-webkit-details-marker]:hidden bg-[#F1F2F3] text_blue rounded-se-lg rounded-ss-lg ">
            <span className="text-base text-[16px] font-[500]">Premium</span>
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

          {premiumData?.map((item) => (
            <div
              //   key={item}
              className="mt-1 text-[#5D636F] text-[14px] font-[400]"
            >
              {/* 33 */}
              <div className="relative flex flex-wrap items-center">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="premium"
                    value={item?.value as never}
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

      {/* category  */}
      <section className="w-full divide-y rounded mt-4">
        <details className="group border  rounded-md " open>
          <summary className="relative cursor-pointer list-none pr-8 py-1 ps-1 transition-colors duration-300 focus-visible:outline-none [&::-webkit-details-marker]:hidden bg-[#F1F2F3] text_blue rounded-se-lg rounded-ss-lg ">
            <span className="text-base text-[16px] font-[500]">Category</span>
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

          {categoryData?.map((item) => (
            <div
              //   key={item}
              className="mt-1 text-[#5D636F] text-[14px] font-[400]"
            >
              {/* 33 */}
              <div className="relative flex flex-wrap items-center">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    name="category"
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
