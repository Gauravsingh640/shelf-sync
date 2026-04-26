import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("userAuth");
    navigate("/login");
  };

  return (
    <>
      {/* NAVBAR */}
      <header className="w-full h-16 bg-white shadow-md flex items-center justify-between px-4 sm:px-8 relative z-50">
        
        {/* LEFT */}
        <h1 className="text-lg sm:text-xl font-bold text-orange-500">
          BookStore
        </h1>

        {/* CENTER (only desktop) */}
        <ul className="hidden md:flex gap-8 text-gray-700 font-medium">
          <li className="cursor-pointer hover:text-orange-500">Home</li>
          <li className="cursor-pointer hover:text-orange-500">About</li>
          <li className="cursor-pointer hover:text-orange-500">Contact</li>
        </ul>

        {/* RIGHT */}
        <div className="flex items-center gap-4">
          
          {/* Logout (desktop only) */}
          <button
            onClick={handleLogout}
            className="hidden md:block px-4 py-1.5 bg-orange-500 text-white rounded-md"
          >
            Logout
          </button>

          {/* Menu icon (mobile only) */}
          <button
            onClick={() => setOpen(true)}
            className="text-2xl md:hidden"
          >
            ☰
          </button>
        </div>
      </header>

      {/* OVERLAY */}
      {open && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40"
          onClick={() => setOpen(false)}
        />
      )}

      {/* SIDEBAR (mobile only) */}
      <div
        className={`fixed top-0 left-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 md:hidden ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="font-bold">Menu</h2>
          <button onClick={() => setOpen(false)}>✖</button>
        </div>

        <ul className="p-4 space-y-4 text-gray-700 font-medium">
          <li className="cursor-pointer hover:text-orange-500">Home</li>
          <li className="cursor-pointer hover:text-orange-500">About</li>
          <li className="cursor-pointer hover:text-orange-500">Contact</li>

          {/* Logout mobile */}
          <li
            onClick={handleLogout}
            className="text-red-500 cursor-pointer"
          >
            Logout
          </li>
        </ul>
      </div>
    </>
  );
};

export default Navbar;