import axios from "axios";
import React, { createContext, useContext, useEffect, useState } from "react";
import { BACKEND_URL } from "../utils";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [profile, setProfile] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("jwt"); // ✅ moved here

    const fetchProfile = async () => {
      try {
        if (token) {
          const { data } = await axios.get(`${BACKEND_URL}/api/users/my-profile`, {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });
          console.log("Profile:", data.user);
          setProfile(data.user);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.log("Profile fetch error:", error);
      }
    };

    const fetchBlogs = async () => {
      try {
        const { data } = await axios.get(`${BACKEND_URL}/api/blogs/all-blogs`, {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json", // ✅ fixed
            Authorization: `Bearer ${token}`,
          },
        });
        console.log("Blogs fetched:", data.blogs);
        setBlogs(data.blogs); // ✅ fixed here
      } catch (error) {
        console.log("Blogs fetch error:", error);
      }
    };

    fetchProfile();
    fetchBlogs();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        blogs,
        profile,
        setProfile,
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
