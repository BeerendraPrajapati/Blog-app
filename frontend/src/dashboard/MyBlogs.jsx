import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { BACKEND_URL } from "../utils";

function MyBlogs() {
  const navigateTo = useNavigate();
  const [myBlogs, setMyBlogs] = useState([]);

  useEffect(() => {
    const fetchMyBlogs = async () => {
      try {
        const { data } = await axios.get(
          `${BACKEND_URL}/api/blogs/my-blog`,
          { withCredentials: true }
        );
        setMyBlogs(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchMyBlogs();
  }, []);

  const handleDelete = async (id) => {
    try {
      const res = await axios.delete(
        `${BACKEND_URL}/api/blogs/delete/${id}`,
        { withCredentials: true }
      );
      toast.success(res.data.message || "Blog deleted successfully");
      setMyBlogs((value) => value.filter((blog) => blog._id !== id));
    } catch (error) {
      toast.error(error.response?.message || "Failed to delete blog");
    }
  };

  return (
    <div className="container mx-auto my-12 p-4">
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 md:ml-20">
        {myBlogs && myBlogs.length > 0 ? (
          myBlogs.map((element) => (
            <div
              key={element._id}
              className="bg-white shadow-lg rounded-lg overflow-hidden"
            >
              <Link to={`/blog/${element._id}`}>
                {element?.blogImage && (
                  <img
                    src={element?.blogImage?.url}
                    alt="blogImg"
                    className="w-full h-32 object-cover"
                  />
                )}
                <div className="p-4">
                  <span className="text-sm text-gray-600">
                    {element.category}
                  </span>
                  <h4 className="text-xl font-semibold my-2">
                    {element.title}
                  </h4>
                </div>
              </Link>

              {/* Buttons outside main Link */}
              <div className="flex justify-between px-4 pb-4">
                <Link
                  to={`/blog/update/${element._id}`}
                  className="text-blue-500 bg-white rounded-md shadow-lg px-3 py-1 border border-gray-400 hover:underline"
                >
                  UPDATE
                </Link>
                <button
                  onClick={() => handleDelete(element._id)}
                  className="text-red-500 bg-white rounded-md shadow-lg px-3 py-1 border border-gray-400 hover:underline"
                >
                  DELETE
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">
            You have not posted any blog to see!
          </p>
        )}
      </div>
    </div>
  );
}

export default MyBlogs;
