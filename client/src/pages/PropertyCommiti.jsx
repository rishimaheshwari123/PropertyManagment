import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  handleCreatePropertyCommitiAPi,
  getAllCommitiApi,
  deleteCommitiApi,
} from "../services/operation/function";
import GetPropertyCommiti from "../components/GetPropertyCommiti";

const PropertyCommiti = () => {
  const [name, setName] = useState("");
  const [position, setPosition] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [account, setAccount] = useState("");
  const [currency, setCurrency] = useState("USD"); // Default value
  const [showForm, setShowForm] = useState(false);
  const [propertyData, setPropertyData] = useState([]);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();
  const navigate = useNavigate();

  const handleSubmit = async () => {
    const propertyData = {
      name,
      position,
      phone,
      email,
      account,
      currency,
      categoryId: id,
    };

    const success = await handleCreatePropertyCommitiAPi(propertyData);

    if (success) {
      setName("");
      setPosition("");
      setPhone("");
      setEmail("");
      setAccount("");
      setCurrency("USD");
      setShowForm(false);
      fetchCommiti();
    }
  };

  const fetchCommiti = async () => {
    if (!id) return;

    try {
      setLoading(true);
      const data = await getAllCommitiApi(id);
      setPropertyData(data);
    } catch (error) {
      console.error("Error fetching property information:", error);
    } finally {
      setLoading(false);
    }
  };

  // Delete Property
  const handleDelete = async (propertyId) => {
    const confirmed = await Swal.fire({
      title: "Are you sure?",
      text: "Do you want to delete this property? This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirmed.isConfirmed) {
      const success = await deleteCommitiApi(propertyId);
      if (success) {
        fetchCommiti();
      }
    }
  };

  useEffect(() => {
    fetchCommiti();
  }, [id]);

  return (
    <div className="p-6 min-h-screen">
      <div className="property-page flex flex-col items-center mb-6">
        <div className="flex flex-wrap gap-3 justify-center md:justify-start mb-6">
          <button onClick={() => navigate("/")} className="button-85">
            Go to Home
          </button>
          <button className="button-85" onClick={() => setShowForm(!showForm)}>
            {showForm ? "Cancel" : "Add Property Information"}
          </button>
          <button onClick={() => window.print()} className="button-85">
            Print Property
          </button>
        </div>

        {showForm && (
          <div className="form bg-gray-100 p-6 rounded-lg shadow-md w-full max-w-4xl">
            <input
              type="text"
              placeholder="Enter Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-2 w-full mb-4 rounded-lg"
            />
            <input
              type="text"
              placeholder="Enter Position of responsibility"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className="border p-2 w-full mb-4 rounded-lg"
            />
            <input
              type="text"
              placeholder="Enter phone number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="border p-2 w-full mb-4 rounded-lg"
            />
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-2 w-full mb-4 rounded-lg"
            />
            <input
              type="text"
              placeholder="Enter Bank Account"
              value={account}
              onChange={(e) => setAccount(e.target.value)}
              className="border p-2 w-full mb-4 rounded-lg"
            />
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="border p-2 w-full mb-4 rounded-lg"
            >
              <option value="USD">USD</option>
              <option value="EUR">EUR</option>
              <option value="INR">INR</option>
              <option value="GBP">GBP</option>
              <option value="JPY">JPY</option>
            </select>

            <div className="flex justify-center items-center">
              <button onClick={handleSubmit} className="button-85">
                Create Property Committi
              </button>
            </div>
          </div>
        )}
      </div>

      <GetPropertyCommiti
        propertyData={propertyData}
        loading={loading}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default PropertyCommiti;
