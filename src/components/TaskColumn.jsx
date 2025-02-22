import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function TaskColumn({
  datum,
  handleDrag,
  handleDelte,
  refetch,
  handleUpdateRequest,
  openModal,
  handleDrop,
}) {
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
        // onDrag={(e) => handleDrag(e, datum)}
        // for pc
        style={{ touchAction: "none" }}
        draggable={true}
        onDragStart={(ev) => handleDrag(ev, datum)}
        onDragOver={(ev) => ev.preventDefault()}
        onDrop={(ev) => handleDrop(ev, datum)}
        // touch event handlers for mobile
        onTouchStart={(ev) => handleDrag(ev, datum)}
        // onTouchMove={(ev) => ev.preventDefault()}
        onTouchEnd={(ev) => handleDrop(ev, datum)}
        key={datum._id}
        className="bg-white p-4 rounded-lg shadow-md 3"
      >
        <h3 className="text-lg font-semibold mb-2 flex items-center justify-between">
          <span>{datum?.title}</span>
          <p className="flex items-center gap-2">
            <button onClick={() => openModal(datum._id)}>
              <FaEdit />
            </button>
            <button onClick={() => handleDelte(datum._id)}>
              <MdDelete />
            </button>
          </p>
        </h3>
        <p className="text-sm text-gray-600">{datum?.description}</p>
      </div>
      
    </>
  );
}
