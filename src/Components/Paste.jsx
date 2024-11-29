import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromPastes } from "../redux/pasteSlice";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Paste = () => {
  const pastes = useSelector((state) => state.paste.pastes);
  const dispatch = useDispatch();
  const [searchTerm, setsearchTerm] = useState("");
  const filteredData = pastes.filter((paste) =>
    paste.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId));
  }

  function handleShare(paste) {
    if (navigator.share) {
      navigator
        .share({
          title: paste.title,
          text: paste.content,
          url: window.location.href,
        })
        .then(() => toast.success("Shared successfully!"))
        .catch((error) => toast.error("Error sharing: " + error.message));
    } else {
      toast.error("Sharing is not supported on this device");
    }
  }

  return (
    <div className="rounded-2xl max-h-50 bg-gradient-to-r from-indigo-100 via-purple-100 to-blue-100 p-5">
      <div className="max-w-4xl mx-auto">
        {/* Search Bar */}
        <input
          className="border-2 border-transparent focus:outline-none focus:ring-4 focus:ring-indigo-300 rounded-full p-3 w-full mt-4 shadow-md bg-white/70 backdrop-blur-md"
          type="text"
          placeholder="Search pastes..."
          value={searchTerm}
          onChange={(e) => setsearchTerm(e.target.value)}
        />

        {/* Paste Items */}
        <div className="grid grid-cols-1 gap-6 mt-6">
          {filteredData.length > 0 &&
            filteredData.map((paste) => {
              return (
                <div
                  className="border border-transparent rounded-lg p-4 shadow-lg bg-white/60 backdrop-blur-md hover:shadow-xl transition-all duration-300 ease-in-out"
                  key={paste?._id}
                >
                  <div className="flex justify-between items-center mb-2">
                    <h3 className="text-lg font-bold text-gray-800">
                      {paste.title}
                    </h3>
                    <span className="text-sm text-gray-600">
                      {new Date(paste.createdAt).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-700 mb-4">{paste.content}</p>

                  {/* Action Buttons */}
                  <div className="flex space-x-4">
                    <Link to={`/pastes/${paste?._id}`}>
                      <button className="px-4 py-2 bg-gradient-to-r from-teal-400 to-teal-600 text-white rounded-full hover:from-teal-500 hover:to-teal-700 transition">
                        View
                      </button>
                    </Link>
                    <a
                      href={`/?pasteId=${paste?._id}`}
                      className="px-4 py-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white rounded-full hover:from-yellow-500 hover:to-yellow-700 transition"
                    >
                      Edit
                    </a>
                    <button
                      onClick={() => handleDelete(paste?._id)}
                      className="px-4 py-2 bg-gradient-to-r from-red-400 to-red-600 text-white rounded-full hover:from-red-500 hover:to-red-700 transition"
                    >
                      Delete
                    </button>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(paste?.content);
                        toast.success("Copied to clipboard");
                      }}
                      className="px-4 py-2 bg-gradient-to-r from-green-400 to-green-600 text-white rounded-full hover:from-green-500 hover:to-green-700 transition"
                    >
                      Copy
                    </button>
                    <button
                      onClick={() => handleShare(paste)}
                      className="px-4 py-2 bg-gradient-to-r from-purple-400 to-purple-600 text-white rounded-full hover:from-purple-500 hover:to-purple-700 transition"
                    >
                      Share
                    </button>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Paste;
