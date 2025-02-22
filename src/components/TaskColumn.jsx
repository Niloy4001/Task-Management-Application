import axios from "axios";
import moment from "moment/moment";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { AuthContext } from "../AuthProvider/AuthProvider";

export default function TaskColumn({
  datum,
  handleDrag,
  handleDelte,
  refetch,
  handleUpdateRequest,
  openModal,
  handleDrop,
}) 
{
  const { theme,setTheme } = useContext(AuthContext);
  // Track touch position
  // const handleTouchStart = (e, datum) => {
  //   e.preventDefault();
  //   handleDrag(e, datum); // Store dragged data
  // };

  // const handleTouchEnd = (e, datum) => {
  //   e.preventDefault();
  //   handleDrop(e, datum); // Trigger drop action
  // };

  return (
    <>
      <div
        // draggable
        style={{ touchAction: "none" }}
        draggable={true}
        onDragStart={(ev) => handleDrag(ev, datum)}
        onDragOver={(ev) => ev.preventDefault()}
        onDrop={(ev) => handleDrop(ev, datum)}
        onTouchStart={(ev) => handleDrag(ev, datum)}
        onTouchEnd={(ev) => handleDrop(ev, datum)}
        key={datum._id}
        className={`${theme === 'light'? 'bg-white text-gray-800':'bg-gray-800 text-white '} p-5 rounded-lg shadow-lg transition-transform hover:scale-105 hover:shadow-xl`}
      >
        <h3 className="text-lg font-semibold mb-3 flex  items-center justify-between ">
          <span>{datum?.title}</span>
          <p className="flex items-center gap-3">
            <button
              onClick={() => openModal(datum._id)} 
              className=" transition"
            >
              <FaEdit />
            </button>
            <button
              onClick={() => handleDelte(datum._id)}
              className=" transition"
            >
              <MdDelete />
            </button>
          </p>
        </h3>
        <p className="text-sm  mb-3">{datum?.description}</p>
        <div className="flex justify-between items-center mt-3">
          <div className="badge badge-soft bg-lime-green text-white">
            {moment(datum?.timeStamp).format("MMMM Do YYYY, h:mm:ss a")}
          </div>
          {/* Add more interactive components if needed */}
        </div>
      </div>
    </>
  );
}
