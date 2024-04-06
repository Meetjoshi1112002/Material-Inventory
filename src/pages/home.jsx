import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { StudentContext } from "../context/context.js";
import Option from "../components/option.jsx";
import Course from "../components/course.jsx";
import MaterialCard from "../components/material.jsx";
import { storage } from "../components/firebase.js";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

export default function Home() {

  const { login, currentUser } = useContext(StudentContext);
  const [file, setFile] = useState(undefined);
  const [code, setCode] = useState("");
  const [Mname, setName] = useState("");
  const [courses, setCourses] = useState([]);
  const [materials, setMaterials] = useState([]);
  const [courseAvailable, setCourseAvailable] = useState(false);
  const [materialAvailable, setMaterialAvailable] = useState(false);
  const [showUploadPopup, setPopUp] = useState(false);
  const arr = [1, 2, 3, 4, 5, 6, 7, 8];


  const handleUploadButtonClick = () => {
    setPopUp(!showUploadPopup);
  };

  const handleUploadSubmit = async (e) => {
    e.preventDefault();
    try {
        if (file === undefined) return;

        const fileRef = ref(storage, `files/${file.name}`);
        uploadBytes(fileRef, file)
            .then(() => {
                alert("File uploaded successfully");
                getDownloadURL(fileRef)
                    .then(async (url) => {
                        console.log("Download URL", url);
                        const item = {
                            courseCode: code,
                            uploader: currentUser._id,
                            fileUrl: url,
                            name: Mname
                        };
                        console.log(item);
                        setPopUp(false);

                        // Add material to the database
                        const response = await fetch("http://localhost:3001/api/user/addMaterial", {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json",
                            },
                            body: JSON.stringify(item),
                        });

                        if (!response.ok) {
                            throw new Error("Failed to add material to the database");
                        }

                        // Update materials state to trigger re-render
                        handleGetMaterials(code);
                    })
                    .catch((error) => {
                        console.log("Error on download URLs:", error);
                        // Handle error if necessary
                    });
            })
            .catch((error) => {
                console.log("Error uploading file:", error);
                // Handle error if necessary
            });
    } catch (error) {
        console.error("Error:", error);
        // Handle error if necessary
    }
};

  const toggle = ()=>{
    handleGetMaterials(code);
  }
  

  const handleChange = async (id) => {
    try {
      const semester = id;
      const departmentName = currentUser.departmentName;
      const data = await fetch(
        `http://localhost:3001/api/user/${departmentName}/${semester}`
      );
      const courses = await data.json();
      setCourses(courses);
      setCourseAvailable(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleGetMaterials = async (cod) => {
    try {
      setCode(cod);
      const data = await fetch(
        `http://localhost:3001/api/user/getMaterials?code=${cod}`
      );
      const res = await data.json();
      console.log("THe data is", res);
      setMaterials(res);
      setMaterialAvailable(true);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="">
      {login === true && (
        <div className="my-5 mx-20 gap-10  ">
          <h1 className="font-bold text-2xl">
            Welcome, {currentUser.role === "Professor" && "Professor"}
            <span className="text-blue-500">{currentUser.username}</span>
          </h1>
          <h1 className="font-bold text-2xl my-8">Select Semester :</h1>
          <div className="flex flex-wrap justify-center gap-4">
            {arr.map((sem, index) => {
              return <Option id={sem} key={index} handleClick={handleChange} />;
            })}
          </div>
        </div>
      )}

      {login === false && (
        <div className="text-blue-400">
          <Link to="/sign-in">please log in first</Link>
        </div>
      )}

      {courseAvailable && (
        <div className="mt-8 mx-20 ">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Courses :</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 ">
            {courses.map((obj, ind) => (
              <Course data={obj} key={ind} handleGet={handleGetMaterials} />
            ))}
          </div>
        </div>
      )}

      {materialAvailable && (
        <div className="mt-8 mx-20">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Materials:</h1>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 cursor-pointer">
            {materials?.map((material, index) => (
              <MaterialCard key={index} data={material} indicator={toggle} />
            ))}
            {materials?.length === 0 && (
              <div className="flex justify-center items-center h-40">
                <h1 className="text-xl text-gray-800">No Materials to show for selected course {code}</h1>
              </div>
            )}
          </div>
          {currentUser.role === "Professor" && (
            <button
              onClick={handleUploadButtonClick}
              className="mx-96 my-12 mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Upload
            </button>
          )}
          {showUploadPopup && (
            <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-gray-900 bg-opacity-50">
              <div className="bg-white p-8 rounded-lg">
                <h2 className="text-xl font-bold mb-4">Upload Material</h2>
                <form onSubmit={(e) => handleUploadSubmit(e)}>
                  <div className="mb-4">
                    <label
                      htmlFor="materialName"
                      className="block text-gray-800 font-bold mb-1"
                    >
                      Material Name:
                    </label>
                    <input
                      type="text"
                      id="materialName"
                      className="w-full border-gray-300 rounded-md"
                      value={Mname}
                      onChange={(e) => setName(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      htmlFor="fileUpload"
                      className="block text-gray-800 font-bold mb-1"
                    >
                      Upload File:
                    </label>
                    <input
                      type="file"
                      id="fileUpload"
                      className="w-full border-gray-300 rounded-md"
                      onChange={(e) => setFile(e.target.files[0])}
                    />
                  </div>
                  <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Submit
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
