import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import {useDispatch, useSelector} from 'react-redux';
import { addToPastes, updateToPastes } from "../redux/pasteSlice";


const Home = () => {
  const allPastes = useSelector((state)=>state.paste.pastes);
  const [title, setTitle] = useState("");
  const [value, setValue] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const pasteId = searchParams.get("pasteId");
  const dispatch = useDispatch();

  useEffect(()=>{
     if(pasteId){
      const paste = allPastes.find((p)=>p._id === pasteId);
      setTitle(paste.title);
      setValue(paste.content);
     }
  },[pasteId]);

  function createPaste(){
    const paste = {
      title: title,
      content: value,
      _id: pasteId || Date.now().toString(),
      createdAt: new Date().toISOString()
    };
    if(pasteId){
      //update
      dispatch(updateToPastes(paste));
    } else {
      //create
      dispatch(addToPastes(paste));
    }

    //after creation or updation
    setTitle('');
    setValue('');
    setSearchParams({});
  }

  return (
    <div className="  border-2  rounded-2xl bg-gradient-to-r from-blue-100 via-purple-100 to-teal-100 p-8">
      <div className="max-w-10xl  mx-auto bg-white/60 backdrop-blur-lg rounded-xl p-6 shadow-xl">
        <div className="flex flex-row gap-7 justify-between">
          {/* Title Input */}
          <input
            className="p-4 w-full rounded-xl border-2 border-transparent bg-white/70 shadow-lg backdrop-blur-lg focus:outline-none focus:ring-4 focus:ring-teal-300 transition-all"
            type="text"
            placeholder="Enter title here..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          {/* Create/Update Button */}
          <button 
            onClick={createPaste}
            className="p-4 bg-gradient-to-r from-indigo-400 to-blue-600 text-white rounded-xl shadow-lg focus:outline-none hover:from-indigo-500 hover:to-blue-700 transition-all"
          >
            {pasteId ? "Update My Paste" : "Create My Paste"}
          </button>
        </div>

        {/* Content Textarea */}
        <div className="mt-8">
          <textarea
            className="w-full rounded-xl p-6 bg-white/70 shadow-lg backdrop-blur-lg border-2 border-transparent focus:outline-none focus:ring-4 focus:ring-teal-300 transition-all min-h-[400px]"
            value={value}
            placeholder="Enter the content..."
            onChange={(e) => setValue(e.target.value)}
            rows={10}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;
