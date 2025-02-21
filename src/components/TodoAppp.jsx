import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import io from "socket.io-client";
import { AuthContext } from "../AuthProvider/AuthProvider";
import { FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import Swal from "sweetalert2";
import Spinner from "./Spinner";

const TaskBoard = () => {
  const [updateId, setUpdateId] = useState("");
  const [modalTitle, setModalTitle] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [modalDescription, setModalDescription] = useState("");
  const [category, setCategory] = useState("To-Do");

  const [onDrop, setOnDrop] = useState(null)

  const { user } = useContext(AuthContext);

  const { isPending, isError, data, error, refetch } = useQuery({
    queryKey: ["tasks", user?.email],
    queryFn: async () => {
      const { data } = await axios.get(`http://localhost:5000/tasks`);
      return data;
    },
  });

  if (isPending) {
    return <Spinner></Spinner>;
  }
  // console.log(data);

  const handleSubmit = async () => {
    if (title.trim() === "" || title.length > 50 || description.length > 200) {
      alert("Please provide a valid title and description.");
      return;
    }

    const newTask = { title, description, category };

    // Send POST request to backend
    // await fetch("http://localhost:7000/tasks", {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(newTask),
    // });

    // setTitle("");
    // setDescription("");
    // setCategory("To-Do");
    console.log(newTask);
    try {
      await axios.post("http://localhost:5000/tasks", newTask);
      toast.success("Post success");
      refetch();
    } catch (error) {
      toast.error(error.message);
    }
  };

  // delete functionality
  const handleDelte = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`http://localhost:5000/tasks/${id}`);
          Swal.fire({
            title: "Deleted!",
            text: "Your data has been deleted.",
            icon: "success",
          });
          refetch();
        } catch (error) {
          toast.error(error.message);
        }
      }
    });
  };

  // update
  const handleUpdate = (id, title, description, category) => {
    setUpdateId(id);
    document.getElementById("my_modal_1").showModal();
  };

  const handleUpdateRequest = async () => {
    const updatedInfo = { modalTitle, modalDescription };
    console.log(updatedInfo, updateId);

    try {
      await axios.patch(`http://localhost:5000/tasks/${updateId}`, updatedInfo);
      toast.success("Updated successfull");
      refetch();
      document.getElementById("my_modal_1").close();
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDrag = (e, datum)=>{
    // console.log(datum);
    setOnDrop(datum);

    
  }

  
  

  const onDragOver = (e) =>{
    // console.log(e.target);
    e.preventDefault()
    
  }

  const handleOnDrop =async (e) =>{
    const status = e.target.getAttribute('data-status')
    console.log(e,status );

    try {
      await axios.patch(`http://localhost:5000/transfer/${onDrop._id}`, {whereToDrop: status})
      refetch()
      toast.success(`on ${status}`)
    } catch (error) {
      toast.error(error.message)
    }
    
  }

  return (
    <div className="min-h-screen p-6 bg-gray-100">
      <div className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Add Task</h2>
        <input
          type="text"
          placeholder="Title (required)"
          maxLength="50"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        />
        <textarea
          placeholder="Description (optional)"
          maxLength="200"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        ></textarea>
        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="w-full p-2 border rounded mb-2"
        >
          <option value="To-Do">To-Do</option>
        </select>
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Add Task
        </button>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* To-Do */}
        <div className="bg-white p-4 rounded-lg shadow-md space-y-3" onDragOver={(e)=>onDragOver(e)} onDrop={(e)=>handleOnDrop(e)} data-status="To-Do">
          <h3 className="text-lg font-semibold mb-2">To-Do</h3>
          {data.length > 0 &&
            data.map(
              (datum) =>
                datum.category == "To-Do" && (
                  <div
                  draggable
                  onDrag={(e)=>handleDrag(e, datum)}
                    key={datum._id}
                    className="bg-white p-4 rounded-lg shadow-md"
                  >
                    <h3 className="text-lg font-semibold mb-2 flex items-center justify-between">
                      <span>{datum?.title}</span>
                      <p className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            handleUpdate(
                              datum._id,
                              datum.title,
                              datum.description,
                              datum.category
                            )
                          }
                        >
                          <FaEdit />
                        </button>
                        <button onClick={() => handleDelte(datum._id)}>
                          <MdDelete />
                        </button>
                      </p>
                    </h3>
                    <p className="text-sm text-gray-600">
                      {datum?.description}
                    </p>
                  </div>
                )
            )}
        </div>
        {/* In progress */}
        <div className="bg-white p-4 rounded-lg shadow-md space-y-3" onDrop={(e)=>handleOnDrop(e)} onDragOver={(e)=>onDragOver(e)} data-status="In progress">
          <h3 className="text-lg font-semibold mb-2">In Progress</h3>
          {data.length > 0 &&
            data.map(
              (datum) =>
                datum.category == "In Progress" && (
                  <div
                  draggable
                  onDrag={(e)=>handleDrag(e, datum)}
                    key={datum._id}
                    className="bg-white p-4 rounded-lg shadow-md"
                  >
                    <h3 className="text-lg font-semibold mb-2 flex items-center justify-between">
                      <span >{datum?.title}</span>
                      <p className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            handleUpdate(
                              datum._id,
                              datum.title,
                              datum.description,
                              datum.category
                            )
                          }
                        >
                          <FaEdit />
                        </button>
                        <button onClick={() => handleDelte(datum._id)}>
                          <MdDelete />
                        </button>
                      </p>
                    </h3>
                    <p className="text-sm text-gray-600">
                      {datum?.description}
                    </p>
                  </div>
                )
            )}
        </div>
        {/* Done */}
        <div className="bg-white p-4 rounded-lg shadow-md space-y-3" onDrop={(e)=>handleOnDrop(e)} onDragOver={(e)=>onDragOver(e)} data-status="Done">
          <h3 className="text-lg font-semibold mb-2">Done</h3>
          {data.length > 0 &&
            data.map(
              (datum) =>
                datum.category == "Done" && (
                  <div
                  draggable
                  onDrag={(e)=>handleDrag(e, datum)}
                    key={datum._id}
                    className="bg-white p-4 rounded-lg shadow-md"
                  >
                    <h3 className="text-lg font-semibold mb-2 flex items-center justify-between">
                      <span>{datum?.title}</span>
                      <p className="flex items-center gap-2">
                        <button
                          onClick={() =>
                            handleUpdate(
                              datum._id,
                              datum.title,
                              datum.description,
                              datum.category
                            )
                          }
                        >
                          <FaEdit />
                        </button>
                        <button onClick={() => handleDelte(datum._id)}>
                          <MdDelete />
                        </button>
                      </p>
                    </h3>
                    <p className="text-sm text-gray-600">
                      {datum?.description}
                    </p>
                  </div>
                )
            )}
        </div>
      </div>
      {/* modal */}
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      {/* <button className="btn" onClick={()=>document.getElementById('my_modal_1').showModal()}>open modal</button> */}
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <div className="flex justify-between">
            <h2 className="text-xl font-semibold mb-4">Update Task</h2>
            <button className="btn" onClick={() => handleUpdateRequest()}>
              Update
            </button>
          </div>
          <input
            type="text"
            placeholder="Title (required)"
            maxLength="50"
            value={modalTitle}
            onChange={(e) => setModalTitle(e.target.value)}
            className="w-full p-2 border rounded mb-2"
          />
          <textarea
            placeholder="Description (optional)"
            maxLength="200"
            value={modalDescription}
            onChange={(e) => setModalDescription(e.target.value)}
            className="w-full p-2 border rounded mb-2"
          ></textarea>

          <div className="modal-action">
            <form method="dialog">
              {/* if there is a button in form, it will close the modal */}
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
};

export default TaskBoard;
