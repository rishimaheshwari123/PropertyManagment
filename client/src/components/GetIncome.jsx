import React, { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa"; // Import Trash Icon

const GetIncome = ({ propertyData, loading, onDelete }) => {
  const [yearFilter, setYearFilter] = useState(""); // State to store selected year

  if (loading) {
    return (
      <p className="text-center text-gray-500 text-lg font-semibold">
        Loading income information...
      </p>
    );
  }

  if (!propertyData || propertyData.length === 0) {
    return (
      <p className="text-center text-red-500 text-lg font-semibold">
        No income information found.
      </p>
    );
  }

  // Handle the year change
  const handleYearChange = (event) => {
    setYearFilter(event.target.value);
  };

  // Filter propertyData based on selected year
  const filteredData = propertyData.filter((income) => {
    const createdAt = new Date(income.createdAt); // Convert ISO string to Date
    const year = createdAt.getFullYear(); // Get the year from Date
    return !yearFilter || year.toString() === yearFilter; // Filter by year
  });

  // Calculate the total amount for all users
  const totalAmountForAllUsers = filteredData.reduce((total, income) => {
    const totalAmount = Object.values(income.months).reduce(
      (sum, amount) => sum + amount,
      0
    );
    return total + totalAmount;
  }, 0);

  return (
    <div className="income-info-container p-6 min-h-screen">
      <h2 className="text-3xl font-bold text-blue-600 mb-6 text-center">
        Income Information
      </h2>

      {/* Year Filter Dropdown */}
      <div className="mb-4 flex justify-center">
        <select
          value={yearFilter}
          onChange={handleYearChange}
          className="px-4 py-2 border border-gray-300 rounded-md"
        >
          <option value="">All Years</option>
          {propertyData.map((income) => {
            const createdAt = new Date(income.createdAt); // Convert ISO string to Date
            const year = createdAt.getFullYear(); // Get the year from Date
            return (
              <option key={year} value={year}>
                {year}
              </option>
            );
          })}
        </select>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-300">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-2 text-left text-gray-600 font-semibold">
                Owner Name
              </th>
              <th className="px-4 py-2 text-left text-gray-600 font-semibold">
                Contribution
              </th>
              <th className="px-4 py-2 text-left text-gray-600 font-semibold">
                January
              </th>
              <th className="px-4 py-2 text-left text-gray-600 font-semibold">
                February
              </th>
              <th className="px-4 py-2 text-left text-gray-600 font-semibold">
                March
              </th>
              <th className="px-4 py-2 text-left text-gray-600 font-semibold">
                April
              </th>
              <th className="px-4 py-2 text-left text-gray-600 font-semibold">
                May
              </th>
              <th className="px-4 py-2 text-left text-gray-600 font-semibold">
                June
              </th>
              <th className="px-4 py-2 text-left text-gray-600 font-semibold">
                July
              </th>
              <th className="px-4 py-2 text-left text-gray-600 font-semibold">
                August
              </th>
              <th className="px-4 py-2 text-left text-gray-600 font-semibold">
                September
              </th>
              <th className="px-4 py-2 text-left text-gray-600 font-semibold">
                October
              </th>
              <th className="px-4 py-2 text-left text-gray-600 font-semibold">
                November
              </th>
              <th className="px-4 py-2 text-left text-gray-600 font-semibold">
                December
              </th>
              <th className="px-4 py-2 text-left text-gray-600 font-semibold">
                Total Amount
              </th>
              <th className="px-4 py-2 text-center text-gray-600 font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((income, index) => {
              // Calculate the total amount for the user
              const totalAmount = Object.values(income.months).reduce(
                (sum, amount) => sum + amount,
                0
              );

              return (
                <tr
                  key={income._id}
                  className="border-b border-gray-200 hover:bg-gray-50"
                >
                  <td className="px-4 py-2 text-gray-800">
                    {income.ownerName}
                  </td>
                  <td className="px-4 py-2 text-gray-800">
                    {income?.contribution}
                  </td>
                  <td className="px-4 py-2 text-gray-800">
                    {income.months.January}
                  </td>
                  <td className="px-4 py-2 text-gray-800">
                    {income.months.February}
                  </td>
                  <td className="px-4 py-2 text-gray-800">
                    {income.months.March}
                  </td>
                  <td className="px-4 py-2 text-gray-800">
                    {income.months.April}
                  </td>
                  <td className="px-4 py-2 text-gray-800">
                    {income.months.May}
                  </td>
                  <td className="px-4 py-2 text-gray-800">
                    {income.months.June}
                  </td>
                  <td className="px-4 py-2 text-gray-800">
                    {income.months.July}
                  </td>
                  <td className="px-4 py-2 text-gray-800">
                    {income.months.August}
                  </td>
                  <td className="px-4 py-2 text-gray-800">
                    {income.months.September}
                  </td>
                  <td className="px-4 py-2 text-gray-800">
                    {income.months.October}
                  </td>
                  <td className="px-4 py-2 text-gray-800">
                    {income.months.November}
                  </td>
                  <td className="px-4 py-2 text-gray-800">
                    {income.months.December}
                  </td>
                  <td className="px-4 py-2 text-gray-800">{totalAmount}</td>
                  <td className="px-4 py-2 text-center">
                    <button
                      onClick={() => onDelete(income._id)}
                      className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 focus:outline-none"
                      title="Delete Income"
                    >
                      <FaTrash size={16} />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Display Total Amount for all users */}
      <div className="mt-6 text-white text-center text-lg font-semibold">
        <p>Total Amount for All Users: {totalAmountForAllUsers}</p>
      </div>
    </div>
  );
};

export default GetIncome;
