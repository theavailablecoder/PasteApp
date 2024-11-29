
import React, { useEffect, useState } from "react";
import { useParams, useSearchParams } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux'
import { addToPastes, updateToPastes } from "../redux/pasteSlice";

const ViewPaste = () => {

   const {id} = useParams();
   const allPastes = useSelector((state)=>state.paste.pastes);
   const paste = allPastes.filter((p)=>p._id === id)[0]
   console.log("final Paste", paste)

  return (
    <div>
      <div className="flex flex-row gap-7 place-content-between">
        <input
          className="p-2 w-[500px] pl-4 rounded-2xl mt-2 border-2 border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300 "
          type="text"
          placeholder="Enter title here"
          value={paste.title}
          disabled
          onChange={(e) => setTitle(e.target.value)}
        />

        {/* <button 
         onClick={createPaste}
        className="p-2  bg-blue-300 text-black rounded-2xl mt-2 border-2  border-blue-300 focus:outline-none focus:ring-2 focus:ring-blue-300">
          {pasteId ? "Update My Past" : "Create My Paste"}
        </button> */}
      </div>
      <div className="mt-6">
        <textarea
          className="rounded-2xl min-w-[500px] p-4 border-2 bg-gray-50 border-gray-400 focus:border-blue-500 focus:outline-none"
          value={paste.content}
          placeholder="Enter the content"
          disabled
          onChange={(e) => setValue(e.target.value)}
          rows={20}
        />
      </div>
    </div>
  )
}

export default ViewPaste