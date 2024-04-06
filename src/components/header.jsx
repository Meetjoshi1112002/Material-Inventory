import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import { StudentContext } from '../context/context.js'

export default function Header() {
  const {login,currentUser}  = useContext(StudentContext);
  return (
    <div className="bg-slate-200">
        <div className="flex justify-between max-w-6xl mx-auto items-center p-3">
            <h1 className='font-bold'>Material Inventory</h1>
            <ul className="flex gap-4">
                <Link to="/">
                <li>Home</li>
                </Link>
                <Link to="/about">
                <li>About</li>
                </Link>
                <Link to={login? (currentUser.role === "student"?"/AllMaterial":"/MyMaterial"):  "/Sign-in"}>
                <li>{login? (currentUser.role === "student"?"All Material":"My Material"):  "Sign in"}</li>
                </Link>
            </ul>
        </div>
      
    </div>
  )
}
