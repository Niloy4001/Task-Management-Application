import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";

import { AuthContext } from "../AuthProvider/AuthProvider";

import Swal from "sweetalert2";
import Spinner from "./Spinner";
import TaskColumn from "./TaskColumn";

const TodoAppp = () => {
  const [updatedId, setUpdatedId] = useState("");
  // const [modalTitle, setModalTitle] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  // const [modalDescription, setModalDescription] = useState("");
  const [category, setCategory] = useState("To-Do");

  const [onDrop, setOnDrop] = useState(null);
  const [draggedData, setDraggedData] = useState();

  const { user } = useContext(AuthContext);

  const {
    data: tasks,
    isPending,
    refetch,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const { data } = await axios.get(`https://task-management-application-tawny.vercel.app/tasks`);
      return data;
    },
    select: (data) => ({
      todoTask: data.filter((task) => task.category === "To-Do"),
      inProgressTask: data.filter((task) => task.category === "In Progress"),
      doneTask: data.filter((task) => task.category === "Done"),
    }),
  });

  if (isPending) {
    return <Spinner></Spinner>;
  }
  // console.log(data);

  console.log(tasks?.todoTask);
  console.log(tasks?.inProgressTask);
  console.log(tasks?.doneTask);

  const handleSubmit = async () => {
    if (title.trim() === "" || title.length > 50 || description.length > 200) {
      alert("Please provide a valid title and description.");
      return;
    }

    const newTask = {
      title,
      description,
      category,
      timeStamp: new Date(),
      order: 0,
    };

    try {
      await axios.post("https://task-management-application-tawny.vercel.app/tasks", newTask);
      toast.success("Post success");
      setTitle("");
      setDescription("");
      setCategory("To-Do");
      console.log(newTask);
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
        //  console.log(id);

        try {
          await axios.delete(`https://task-management-application-tawny.vercel.app/tasks/${id}`);
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

  // const handleDrag = (e, datum) => {
  //   // console.log(datum);
  //   setOnDrop(datum);
  // };

  // const onDragOver = (e) => {
  //   // console.log(e.target);
  //   e.preventDefault();
  // };

 

  const openModal = (id) => {
    setUpdatedId(id);

    document.getElementById("my_modal_1").showModal();
  };

  const handleUpdateRequest = async (e) => {
    e.preventDefault();

    const modalTitle = e.target.title.value;
    const modalDescription = e.target.description.value;
    const updatedInfo = { modalTitle, modalDescription };
    console.log(updatedInfo);
    console.log(updatedId);

    try {
      await axios.patch(
        `https://task-management-application-tawny.vercel.app/tasks/${updatedId}`,
        updatedInfo
      );
      toast.success("Updated successfull");
      refetch();
      document.getElementById("my_modal_1").close();
      e.target.title.value = "";
      e.target.description.value = "";
      setUpdatedId("");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleDrag = (ev, datum) => {
    // console.log(ev);
    setDraggedData(datum);
  };
  const handleDrop = async (ev, datum) => {
    console.log(ev);
    console.log(datum);
    
    
    // if dragged and dropped element from same category then will chang just order number
    if (draggedData.category == datum.category) {
      console.log("same category");
      console.log({
        draggedId: draggedData._id,
        draggedOrder: draggedData.order,
        droppedId: datum._id,
        droppedOrder: datum.order,
      });
      try {
        await axios.patch(`https://task-management-application-tawny.vercel.app/reorder`, {
          draggedId: draggedData._id,
          draggedOrder: draggedData.order,
          droppedId: datum._id,
          droppedOrder: datum.order,
        });
        refetch();
        toast.success("Re-order success");
      } catch (error) {
        toast.error(error.message);
      }
    } 
    // else if (draggedData.category != datum.category) {
    //   console.log("different");
    //   const status = ev.target.getAttribute("data-status");
    //     console.log( status );
    //   try {
    //     await axios.patch(`https://task-management-application-tawny.vercel.app/changeCategory`, {
    //       draggedId: draggedData._id,
    //       draggedCategory: draggedData.category,
    //       droppedId: datum._id,
    //       droppedCategory: datum.category,
    //     });
    //     refetch();
    //     toast.success("Changed Category");
    //   } catch (error) {
    //     toast.error(error.message);
    //   }
    // }
  };

   const handleOnDrop = async (e) => {
    const status = e.currentTarget.getAttribute("data-status");
    console.log(status ,draggedData._id);

    if (status == draggedData.category) {
      return
    }

    try {
      await axios.patch(`https://task-management-application-tawny.vercel.app/transfer/${draggedData._id}`, {
        whereToDrop: status,
      });
      refetch();
      toast.success(`on ${status}`);
    } catch (error) {
      toast.error(error.message);
    }
  };

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

      <div className="mt-6  space-x-6 space-y-6 1 flex flex-col lg:flex-row justify-center items-start">
        {/* To-Do */}
        <div
          className="bg-white p-4 rounded-lg shadow-md space-y-3  w-full lg:w-[30%]  "
          onDragOver={(e) => e.preventDefault()}
          onDrop={(e) => handleOnDrop(e)}
          data-status="To-Do"
        >
          <h3 className="text-lg font-semibold mb-2">To-Do</h3>
          {/* {data.length > 0 && */}
          {tasks?.todoTask.length > 0 &&
            // data.map(
            tasks?.todoTask
              .sort((a, b) => a.order - b.order)
              .map(
                (datum) =>
                  datum.category == "To-Do" && (
                    <TaskColumn
                      key={datum._id}
                      datum={datum}
                      handleDelte={handleDelte}
                      handleDrag={handleDrag}
                      refetch={refetch}
                      handleUpdateRequest={handleUpdateRequest}
                      openModal={openModal}
                      handleDrop={handleDrop}
                    ></TaskColumn>
                  )
              )}
        </div>
        {/* In progress */}
        <div
          className="bg-white p-4 rounded-lg shadow-md space-y-3 w-full lg:w-[30%]"
          onDrop={(e) => handleOnDrop(e)}
          onDragOver={(e) => e.preventDefault()}
          data-status="In Progress"
        >
          <h3 className="text-lg font-semibold mb-2">In Progress</h3>
          {/* {data.length > 0 &&  */}
          {tasks?.inProgressTask.length > 0 &&
            // data.map(
            tasks?.inProgressTask
              .sort((a, b) => a.order - b.order)
              .map(
                (datum) =>
                  datum.category == "In Progress" && (
                    <TaskColumn
                      key={datum._id}
                      datum={datum}
                      handleDelte={handleDelte}
                      handleDrag={handleDrag}
                      refetch={refetch}
                      handleUpdateRequest={handleUpdateRequest}
                      openModal={openModal}
                      handleDrop={handleDrop}
                    ></TaskColumn>
                  )
              )}
        </div>
        {/* Done */}
        <div
          className="bg-white p-4 rounded-lg shadow-md space-y-3 w-full lg:w-[30%] "
          onDrop={(e) => handleOnDrop(e)}
          onDragOver={(e) => e.preventDefault()}
          data-status="Done"
        >
          <h3 className="text-lg font-semibold mb-2">Done</h3>
          {/* {data.length > 0 && */}
          {tasks?.doneTask.length > 0 &&
            // data.map(
            tasks?.doneTask
              .sort((a, b) => a.order - b.order)
              .map(
                (datum) =>
                  datum.category == "Done" && (
                    <TaskColumn
                      key={datum._id}
                      datum={datum}
                      handleDelte={handleDelte}
                      handleDrag={handleDrag}
                      refetch={refetch}
                      handleUpdateRequest={handleUpdateRequest}
                      openModal={openModal}
                      handleDrop={handleDrop}
                    ></TaskColumn>
                  )
              )}
        </div>
      </div>
      <dialog id="my_modal_1" className="modal">
        <div className="modal-box">
          <div className="flex justify-between">
            <h2 className="text-xl font-semibold mb-4">Update Task</h2>
          </div>
          <form onSubmit={async (e) => await handleUpdateRequest(e)}>
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
            <button className="btn">Update</button>
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
};

export default TodoAppp;
