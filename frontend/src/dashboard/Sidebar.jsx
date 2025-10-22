import React, { useState } from "react";
import { useAuth } from "../context/AuthProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CiMenuBurger } from "react-icons/ci";
import { BiSolidLeftArrowAlt, BiUser, BiHomeAlt, BiLogOut } from "react-icons/bi";
import { FaBlog } from "react-icons/fa";
import { MdCreate } from "react-icons/md";
import toast from "react-hot-toast";

function Sidebar({ setComponent }) {
  const { profile, setIsAuthenticated } = useAuth();
  const navigateTo = useNavigate();
  const [show, setShow] = useState(false);

  const handleComponents = (value) => {
    setComponent(value);
  };

  const gotoHome = () => {
    navigateTo("/");
  };

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get("http://localhost:4001/api/users/logout", {
        withCredentials: true,
      });
      toast.success(data.message);
      localStorage.removeItem("jwt");
      setIsAuthenticated(false);
      navigateTo("/login");
    } catch (error) {
      console.log(error);
      toast.error(error?.response?.data?.message || "Failed to logout");
    }
  };

  return (
    <>
      {/* Mobile Menu Icon */}
      <div
        className="sm:hidden fixed top-4 left-4 z-50"
        onClick={() => setShow(!show)}
      >
        <CiMenuBurger className="text-3xl cursor-pointer" />
      </div>

      {/* Sidebar */}
      <div
        className={`group w-16 hover:w-56 sm:w-16 hover:sm:w-56 h-full shadow-lg fixed top-0 left-0 bg-gray-50 transition-all duration-300 overflow-hidden ${
          show ? "translate-x-0" : "-translate-x-full sm:translate-x-0"
        }`}
      >
        {/* Close Button (Mobile) */}
        <div
          className="sm:hidden absolute top-4 right-4 text-2xl cursor-pointer"
          onClick={() => setShow(!show)}
        >
          <BiSolidLeftArrowAlt />
        </div>

        {/* Profile Section */}
        <div className="text-center mt-6">
          <img
            className="w-12 h-12 sm:w-16 sm:h-16 rounded-full mx-auto mb-2"
            src={profile?.user?.photo?.url}
            alt="user"
          />
          <p className="text-sm font-semibold hidden group-hover:block">
            {profile?.user?.name}
          </p>
        </div>

        {/* Buttons */}
        <ul className="space-y-4 mt-8 px-2">
          <button
            onClick={() => handleComponents("My Blogs")}
            className="flex items-center space-x-3 w-full py-2 px-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition duration-300"
          >
            <FaBlog className="text-lg" />
            <span className="hidden group-hover:inline">My Blogs</span>
          </button>

          <button
            onClick={() => handleComponents("Create Blog")}
            className="flex items-center space-x-3 w-full py-2 px-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition duration-300"
          >
            <MdCreate className="text-lg" />
            <span className="hidden group-hover:inline">Create Blog</span>
          </button>

          <button
            onClick={() => handleComponents("My Profile")}
            className="flex items-center space-x-3 w-full py-2 px-3 bg-pink-500 text-white rounded-lg hover:bg-pink-600 transition duration-300"
          >
            <BiUser className="text-lg" />
            <span className="hidden group-hover:inline">My Profile</span>
          </button>

          <button
            onClick={gotoHome}
            className="flex items-center space-x-3 w-full py-2 px-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition duration-300"
          >
            <BiHomeAlt className="text-lg" />
            <span className="hidden group-hover:inline">Home</span>
          </button>

          <button
            onClick={handleLogout}
            className="flex items-center space-x-3 w-full py-2 px-3 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition duration-300"
          >
            <BiLogOut className="text-lg" />
            <span className="hidden group-hover:inline">Logout</span>
          </button>
        </ul>
      </div>
    </>
  );
}

export default Sidebar;