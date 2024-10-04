// src/components/Navbar.jsx
import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { StoreContext } from "../context/authentication";

const Navbar = () => {
  const { userName, currectLogin, setCurrectLogin, setUserName } =
    useContext(StoreContext);

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setUserName("");
    setCurrectLogin(false);
  };
  return (
    <nav className="bg-gray-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-white text-4xl font-bold ">BookYourMovie</div>
        <div className="flex space-x-4 text-lg">
          <Link
            to={"/searchmovie"}
            href="/accessquiz"
            className="text-white hover:text-gray-300"
          >
            searchMovie
          </Link>
          <Link
            to={"/bookedmovie"}
            href="/upload-product"
            className="text-white hover:text-gray-300 "
          >
            bookedMovie
          </Link>
        </div>
        <div>
          {currectLogin ? (
            <div className="flex">
              <p className="bg-blue-200 text-white mr-6 px-4 py-2 rounded hover:bg-blue-200">
                {userName}
              </p>
              <button
                href="/login"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                onClick={() => handleLogout()}
              >
                Logout
              </button>
            </div>
          ) : (
            <Link
              to={"/auth"}
              href="/login"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
