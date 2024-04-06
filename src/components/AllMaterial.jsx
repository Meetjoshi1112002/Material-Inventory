import React, { useState, useEffect, useContext } from "react";
import MaterialCard from "./material.jsx"; // Import the MaterialCard component
import axios from "axios";
import { StudentContext } from "../context/context.js";

const AllMaterialsPage = () => {
  const { currentUser } = useContext(StudentContext);
  const [materials, setMaterials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [reload, setRelod] = useState(false);

  useEffect(() => {
    // Fetch all materials when the component mounts
    fetchAllMaterials();
  }, [reload]);

  const toggle = () => {
    setRelod(!reload);
  };

  const fetchAllMaterials = async () => {
    try {
      // Call the API function to get all materials
      let response;
      if (currentUser.role === "student")
        response = await axios.get(
          "http://localhost:3001/api/user/getAllMaterials"
        );
      else
        response = await axios.get(
          `http://localhost:3001/api/user/getAllMaterialsbyUser?uploader=${currentUser._id}`
        );

      // Update the state with the fetched materials
      setMaterials(response.data);
      setLoading(false); // Set loading to false after materials are fetched
    } catch (error) {
      console.log(error?.response.data.message);
      setError(error?.response.data.message); // Set the error state
      setLoading(false); // Set loading to false in case of error
    }
  };

  return (
    <div className="container mx-auto mt-8">
      <h1 className="text-3xl font-bold mb-4">
        {currentUser?.role == "student" ? "All Materials" : "My Material"}
      </h1>
      {loading && <p>Loading...</p>}
      {error && <p>{error}</p>}
      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {/* Map through the materials array and render MaterialCard for each material */}
          {materials.map((material, index) => (
            <MaterialCard key={index} data={material} indicator={toggle} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AllMaterialsPage;
