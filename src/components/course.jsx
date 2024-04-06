import React from 'react';

export default function Course({ data,handleGet }) {
  const { courseCode, courseName, semester, departmentName } = data;

  return (
    <div className="bg-slate-400 rounded-lg shadow-md p-6 w-full max-w-md mx-auto">
      <h1 className="cursor-pointer text-xl font-semibold text-gray-800 mb-2" onClick={()=>handleGet(courseCode)}>Course Code: {courseCode}</h1>
      <h2 className="text-lg font-medium text-gray-700 mb-2">Subject: {courseName}</h2>
      <div className="flex items-center justify-between text-sm text-gray-600">
        <span>Semester: {semester}</span>
        <span>{departmentName}</span>
      </div>
    </div>
  );
}
