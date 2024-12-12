import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  handleCreateIncomeApi,
  deleteIncomeApi,
  getAllIncomeApi,
} from "../services/operation/function";
import GetIncome from "../components/GetIncome";

const Income = () => {
  const [ownerName, setOwnerName] = useState("");
  const [months, setMonths] = useState({
    January: "",
    February: "",
    March: "",
    April: "",
    May: "",
    June: "",
    July: "",
    August: "",
    September: "",
    October: "",
    November: "",
    December: "",
  });

  const [showForm, setShowForm] = useState(false);
  const [incomeData, setIncomeData] = useState([]);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const incomePayload = {
      ownerName,
      months,
      categoryId: id, // Optional if linked with a category
    };

    const success = await handleCreateIncomeApi(incomePayload);

    if (success) {
      setOwnerName("");
      setMonths({
        January: 0,
        February: 0,
        March: 0,
        April: 0,
        May: 0,
        June: 0,
        July: 0,
        August: 0,
        September: 0,
        October: 0,
        November: 0,
        December: 0,
      });

      setShowForm(false);
      fetchIncome();
    }
  };

  const fetchIncome = async () => {
    if (!id) return;

    try {
      setLoading(true);
      const data = await getAllIncomeApi(id);
      console.log(data);
      setIncomeData(data);
    } catch (error) {
      console.error("Error fetching income data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (incomeId) => {
    const confirmed = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this income entry? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmed.isConfirmed) {
      const success = await deleteIncomeApi(incomeId);
      if (success) {
        fetchIncome();
      }
    }
  };

  useEffect(() => {
    fetchIncome();
  }, [id]);

  return (
    <div className="p-6 min-h-screen">
      <div className="income-page flex flex-col items-center mb-6">
        <div className="flex flex-wrap gap-3 justify-center md:justify-start mb-6">
          <button onClick={() => navigate("/")} className="button-85">
            Go to Home
          </button>
          <button className="button-85" onClick={() => setShowForm(!showForm)}>
            {showForm ? "Cancel" : "Add Income"}
          </button>
          <button onClick={() => window.print()} className="button-85">
            Print Income
          </button>
        </div>

        {showForm && (
          <div className="form bg-gray-100 p-6 rounded-lg shadow-md w-full max-w-4xl">
            <input
              type="text"
              placeholder="Enter Owner Name"
              value={ownerName}
              onChange={(e) => setOwnerName(e.target.value)}
              className="border p-2 w-full mb-4 rounded-lg"
            />

            {Object.keys(months).map((month) => (
              <div key={month} className="mb-4">
                <label className="block mb-1">{month}:</label>
                <input
                  type="number"
                  placeholder={`Enter amount for ${month}`}
                  value={months[month]}
                  onChange={(e) =>
                    setMonths({ ...months, [month]: Number(e.target.value) })
                  }
                  className="border p-2 w-full rounded-lg"
                />
              </div>
            ))}

            <div className="flex justify-center items-center">
              <button onClick={handleSubmit} className="button-85">
                Create Income
              </button>
            </div>
          </div>
        )}
      </div>

      <GetIncome
        propertyData={incomeData}
        loading={loading}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Income;
