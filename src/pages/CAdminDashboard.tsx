"use client";
import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { useAdminAnalyticsData } from "../hooks/userProfile.hook";
import ComponentsLoading from "../Componets/ui/Loading/ComponentsLoading";

const CAdminDashboard = () => {
  const { data: analyticsData, isLoading } = useAdminAnalyticsData();

  // Conditional rendering in case data is still loading
  if (isLoading) {
    return <ComponentsLoading />;
  }

  if (!analyticsData) {
    return <div>No data available</div>;
  }

  // Destructure the analytics data
  const {
    totalPosts,
    totalPremiumPosts,
    totalDeletedPosts,
    totalReaders,
    totalReactions,
    totalComments,
    totalShares,
    totalPremiumUsers,
    totalRevenue,
    totalPayments,
    monthlyData,
  } = analyticsData;

  // Summary data for the bar chart
  const summaryData = [
    { name: "Total Posts", value: totalPosts },
    { name: "Premium Posts", value: totalPremiumPosts },
    { name: "Deleted Posts", value: totalDeletedPosts },
    { name: "Readers", value: totalReaders },
    { name: "Reactions", value: totalReactions },
    { name: "Comments", value: totalComments },
    { name: "Shares", value: totalShares },
    { name: "Premium Users", value: totalPremiumUsers },
    { name: "Payments", value: totalPayments },
  ];

  // Monthly revenue data
  const monthlyRevenueData = monthlyData.map((item: any) => ({
    name: item.month,
    value: item.revenue,
  }));



  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      {/* Header Summary */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-lg md:text-2xl font-bold">Readers</h2>
          <p className=" text-2xl md:text-4xl">{totalReaders}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-lg md:text-2xl font-bold">Reactions</h2>
          <p className=" text-2xl md:text-4xl">{totalReactions}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-lg md:text-2xl font-bold">Comments</h2>
          <p className=" text-2xl md:text-4xl">{totalComments}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-lg md:text-2xl font-bold">Shares</h2>
          <p className=" text-2xl md:text-4xl">{totalShares}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-lg md:text-2xl font-bold">Premium Users</h2>
          <p className=" text-2xl md:text-4xl">{totalPremiumUsers}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <h2 className="text-lg md:text-2xl font-bold">Revenue</h2>
          <p className=" text-2xl md:text-4xl">${totalRevenue}</p>
        </div>
      </div>

      {/* Summary Bar Chart */}
      <div className="w-full h-96 bg-gray-800  rounded-lg shadow-lg">
        <ResponsiveContainer>
          <BarChart
            data={summaryData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
            <XAxis dataKey="name" tick={{ fill: "white" }} />
            <YAxis tick={{ fill: "white" }} />
            <Tooltip />
            <Legend />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Revenue Chart */}
      <div className="space-y-8">
        {/* Total Revenue Chart */}
        <div className="w-full h-64 bg-gray-800  rounded-lg shadow-lg">
          <ResponsiveContainer>
            <BarChart
              data={[{ name: "Total Revenue", value: totalRevenue }]}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
              <XAxis dataKey="name" tick={{ fill: "white" }} />
              <YAxis tick={{ fill: "white" }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Monthly Revenue Chart */}
        <div className="w-full h-96 bg-gray-800rounded-lg shadow-lg">
          <ResponsiveContainer>
            <BarChart
              data={monthlyRevenueData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="#ccc" />
              <XAxis dataKey="name" tick={{ fill: "white" }} />
              <YAxis tick={{ fill: "white" }} />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default CAdminDashboard;
