import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

export default function TaskColumn({ datum, handleDrag, handleDelte ,refetch, handleUpdateRequest,openModal}) {
    // const [modalTitle, setModalTitle] = useState("");
    // const [modalDescription, setModalDescription] = useState("");
    // const [updateId, setUpdateId] = useState("");

 
//     const handleSubmitModal = (e)=>{
//         e.preventDefault();
//         const title = e.target.title.value;
//         const description = e.target.description.value;
//         setModalTitle(title)
//         setModalDescription(description)
        
//     }
//     console.log(modalTitle,modalDescription);
//   console.log(updateId);
  




  return (
    <div
      draggable
      onDrag={(e) => handleDrag(e, datum)}
      key={datum._id}
      className="bg-white p-4 rounded-lg shadow-md"
    >
      <h3 className="text-lg font-semibold mb-2 flex items-center justify-between">
        <span>{datum?.title}</span>
        <p className="flex items-center gap-2">
          <button onClick={() =>  openModal(datum._id)}>
            <FaEdit />
          </button>
          <button onClick={() => handleDelte(datum._id)}>
            <MdDelete />
          </button>
        </p>
      </h3>
      <p className="text-sm text-gray-600">{datum?.description}</p>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <div className="flex justify-between">
            <h2 className="text-xl font-semibold mb-4">Update Task</h2>
            
          </div>
         <form onSubmit={async(e)=>await handleUpdateRequest(e)}>
         <input
            type="text"
            placeholder="Title (required)"
            maxLength="50"
            name="title"
            className="w-full p-2 border rounded mb-2"
          />
          <textarea
            placeholder="Description (optional)"
            maxLength="200"
            name="description"
            className="w-full p-2 border rounded mb-2"
          ></textarea>
          <button className="btn" >
              Update
            </button>
         </form>

          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}
