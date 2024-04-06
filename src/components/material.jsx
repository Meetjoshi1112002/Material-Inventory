import React, { useContext } from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri'; // Import delete icon from react-icons library
import { StudentContext } from '../context/context';
import axios from 'axios';

const MaterialCard = ({ data,indicator }) => {
    const { fileUrl, courseCode, name, uploader  } = data;
    console.log(data);
    const {currentUser} = useContext(StudentContext);
    const handleDownload = () => {
        // Implement download logic here
        window.open(fileUrl, '_blank'); // Opens the file in a new tab
    };

    const handleDelete = async () => {
        try {
            // Implement delete logic here
            const response = await axios.delete(`http://localhost:3001/api/user/deleteMaterial`, {
                data: {
                    courseCode: courseCode,
                    name: name
                }
            });
            console.log(response.data); // Log the response from the server
            alert("Item deleted Successfully")
            indicator();
        } catch (error) {
            console.error('Error deleting material:', error);
        }
    };
    
    return (
        <div className="max-w-sm rounded overflow-hidden shadow-lg bg-white relative">
            <div className="px-6 py-4 my-8">
                <div className="font-bold text-xl mb-2">{name}</div>
                <p className="text-gray-700 text-base mb-2">Course Code: {courseCode}</p>
                <p className="text-gray-700 text-base mb-2">Uploaded by: {uploader?.username}</p>
            </div>
            <div className="flex justify-between items-center px-6 py-4 absolute bottom-0 right-0 w-full">
                <button 
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                    onClick={handleDownload}
                >
                    Download
                </button>
                {currentUser?.role === "Professor" && currentUser?._id === uploader?._id  && <button 
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleDelete}
                >
                    <RiDeleteBin6Line /> {/* Render delete icon */}
                </button>}
            </div>
        </div>
    );
};

export default MaterialCard;
