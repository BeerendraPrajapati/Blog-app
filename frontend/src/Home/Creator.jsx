import axios from "axios";
import React, { useEffect, useState } from "react";
import { BACKEND_URL } from "../utils";

function Creator() {
  const [admin, setAdmin] = useState([]);
  const [loading, setLoading] = useState(true); // Loading state
  const token = localStorage.getItem("jwt");

  useEffect(() => {
    const fetchAdmins = async () => {
      try {
        const { data } = await axios.get(`${BACKEND_URL}/api/users/admins`, {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`, // token included
          },
        });
        setAdmin(data.admins || []);
      } catch (error) {
        console.log("Error fetching admins:", error);
        setAdmin([]); // fallback empty
      } finally {
        setLoading(false);
      }
    };

    fetchAdmins();
  }, [token]);

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Loading...
      </div>
    );
  }

  if (!admin || admin.length === 0) {
    return (
      <div className="flex h-screen items-center justify-center">
        No Admins Found
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-semibold mb-6">Popular Creators</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 my-5">
        {admin.slice(0, 4).map((element) => (
          <div key={element._id} className="text-center">
            <img
              src={element.photo?.url || "/imgPL.webp"} // fallback image
              alt={element.name || "Admin"}
              className="md:w-56 md:h-56 object-cover border border-black rounded-full mx-auto"
            />
            <p className="mt-2">{element.name}</p>
            <p className="text-gray-600 text-xs">{element.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Creator;
