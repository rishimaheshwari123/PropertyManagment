import React, { useState, useEffect } from "react";
import { FaTrash } from "react-icons/fa";
import {
  getAllIncomeApi,
  updateMonthIncomeApi,
} from "../services/operation/function";
import { toast } from "react-toastify";

const GetIncome = ({ propertyData, loading, onDelete, id }) => {
  const [yearFilter, setYearFilter] = useState(""); // State to store selected year
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedIncomeId, setSelectedIncomeId] = useState(null); // New state to store selected income ID
  const [paymentStatus, setPaymentStatus] = useState("Not Paid");
  const [partialAmount, setPartialAmount] = useState(0);
  const [incomeData, setIncomeData] = useState(propertyData); // Added state to store fetched income data

  useEffect(() => {
    // Fetch income data when the component mounts or when propertyData changes
    setIncomeData(propertyData);
  }, [propertyData]);

  if (loading) {
    return (
      <p className="text-center text-gray-500 text-lg font-semibold">
        Loading income information...
      </p>
    );
  }

  if (!incomeData || incomeData.length === 0) {
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

  // Filter incomeData based on selected year
  const filteredData = incomeData.filter((income) => {
    const createdAt = new Date(income.createdAt); // Convert ISO string to Date
    const year = createdAt.getFullYear(); // Get the year from Date
    return !yearFilter || year.toString() === yearFilter; // Filter by year
  });

  // Handle month click
  const handleMonthClick = (incomeId, month) => {
    setSelectedIncomeId(incomeId); // Set selected income ID
    setSelectedMonth(month);
    // Log the selected row's ID and contribution
    const selectedIncome = filteredData.find(
      (income) => income._id === incomeId
    );
    if (selectedIncome) {
      console.log(`Selected Income ID: ${incomeId}`);
      console.log(`Contribution: ${selectedIncome.contribution}`);
    }
  };

  const fetchIncome = async () => {
    try {
      const data = await getAllIncomeApi(id);
      setIncomeData(data);
    } catch (error) {
      console.error("Error fetching income data:", error);
    }
  };

  const handleSubmit = async () => {
    let amountToUpdate = 0;

    // Ensure we have the selectedIncomeId and the selected month
    if (!selectedIncomeId) {
      toast.error("No income selected."); // Show error using toast
      return;
    }

    const income = filteredData.find(
      (income) => income._id === selectedIncomeId
    );

    if (!income) {
      toast.error("Income data not found."); // Show error using toast
      return;
    }

    if (paymentStatus === "Not Paid") {
      amountToUpdate = 0;
    } else if (paymentStatus === "Full Paid") {
      // Use the contribution from the selected income
      amountToUpdate = income.contribution;
    } else if (paymentStatus === "Partially Paid") {
      amountToUpdate = partialAmount;
    }

    try {
      const result = await updateMonthIncomeApi(
        selectedIncomeId, // Send the specific incomeId
        selectedMonth,
        amountToUpdate
      );

      if (result) {
        toast.success("Month updated successfully"); // Success toast
        setSelectedMonth(null);
        setSelectedIncomeId(null); // Clear selectedIncomeId
        fetchIncome(); // Re-fetch income data after the update
      }
    } catch (error) {
      toast.error("Error updating the month. Please try again."); // Error toast
    }
  };

  // Calculate the total amount for all users
  const totalAmountForAllUsers = filteredData.reduce((total, income) => {
    const totalAmount = Object.values(income.months).reduce(
      (sum, month) => sum + month.amount,
      0
    );
    return total + totalAmount;
  }, 0);

  // List of all months
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Get current date dynamically
  const currentDate = new Date(); // Use real current date

  // Function to check if the selected month is in the future
  const isFutureMonth = (month) => {
    const monthIndex = months.indexOf(month);
    if (monthIndex === -1) return false;
    const selectedDate = new Date(currentDate.getFullYear(), monthIndex, 1);
    return selectedDate > currentDate;
  };

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
          {incomeData.map((income) => {
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

      {/* Table */}
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
              {months.map((month) => (
                <th
                  key={month}
                  className="px-4 py-2 text-left text-gray-600 font-semibold"
                >
                  {month}
                </th>
              ))}
              <th className="px-4 py-2 text-left text-gray-600 font-semibold">
                Total Amount
              </th>
              <th className="px-4 py-2 text-center text-gray-600 font-semibold">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredData.map((income) => {
              const totalAmount = Object.values(income.months).reduce(
                (sum, month) => sum + month.amount,
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
                    {income.contribution}
                  </td>
                  {months.map((month) => (
                    <td
                      key={month}
                      className="px-4 py-2 text-gray-800 cursor-pointer"
                      onClick={() => handleMonthClick(income._id, month)} // Pass income._id here
                    >
                      {income.months[month]}
                    </td>
                  ))}
                  <td className="px-4 py-2 text-gray-800">
                    {income?.totalAmount}
                  </td>
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

      {/* Popup Modal */}
      {selectedMonth && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-xl mb-4">Update {selectedMonth}</h3>
            <div>
              <label className="block text-gray-600 mb-2">Payment Status</label>
              <select
                value={paymentStatus}
                onChange={(e) => setPaymentStatus(e.target.value)}
                className="w-full border border-gray-300 rounded-md px-4 py-2 mb-4"
              >
                {isFutureMonth(selectedMonth) ? (
                  <option value="Full Paid">Pay in Advance</option>
                ) : (
                  <>
                    <option value="Not Paid">Not Paid</option>
                    <option value="Full Paid">Full Paid</option>
                    <option value="Partially Paid">Partially Paid</option>
                  </>
                )}
              </select>

              {paymentStatus === "Partially Paid" && (
                <div>
                  <label className="block text-gray-600 mb-2">
                    Partial Amount
                  </label>
                  <input
                    type="number"
                    value={partialAmount}
                    onChange={(e) => setPartialAmount(Number(e.target.value))}
                    className="w-full border border-gray-300 rounded-md px-4 py-2"
                  />
                </div>
              )}

              <button
                onClick={handleSubmit}
                className="w-full bg-blue-600 text-white py-2 rounded-md mt-4"
              >
                Update
              </button>
              <button
                onClick={() => setSelectedMonth(null)}
                className="w-full bg-gray-300 text-black py-2 rounded-md mt-2"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GetIncome;
