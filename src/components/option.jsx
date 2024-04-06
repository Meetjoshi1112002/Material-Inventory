import React from 'react';

export default function Option({ id ,handleClick}) {
  return (
    <div className='cursor-pointer bg-slate-500 w-24 h-24 flex items-center justify-center rounded-lg'>
      <h1 className="text-white text-lg" onClick={()=>handleClick(id)}>Semester {id}</h1>
    </div>
  );
}


