import { useState } from "react";

const TodoApp = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
//   const [tasks, setTasks] = useState({
//     todo: [],
//     inProgress: [],
//     done: []
//   });

  const handleSubmit = () => {
    if (title.trim() === "" || title.length > 50 || description.length > 200) {
      alert("Please provide a valid title (max 50 chars) and description (max 200 chars). Title is required.");
      return;
    }
    // setTasks({ ...tasks, todo: [...tasks.todo, { title, description }] });
    setTitle("");
    setDescription("");

    console.log(title,description);
    
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
        <button
          onClick={handleSubmit}
          className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
        >
          Add Task
        </button>
      </div>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
       
          <div  className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">To-Do</h3>
            
                <div  className="p-2 border rounded mb-2">
                  <h4 className="font-semibold">Title</h4>
                  <p className="text-sm text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis maiores commodi magni quisquam. Molestias, tempore sapiente ad accusamus quasi officia deleniti! Veniam cupiditate, delectus esse exercitationem earum a necessitatibus aperiam?</p>
                </div>

            {/* ) : (
              <p className="text-gray-500">No tasks</p>
            ) */}
          </div>
          <div  className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">In Progress</h3>
            
                <div  className="p-2 border rounded mb-2">
                  <h4 className="font-semibold">Title</h4>
                  <p className="text-sm text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis maiores commodi magni quisquam. Molestias, tempore sapiente ad accusamus quasi officia deleniti! Veniam cupiditate, delectus esse exercitationem earum a necessitatibus aperiam?</p>
                </div>

            {/* ) : (
              <p className="text-gray-500">No tasks</p>
            ) */}
          </div>
          <div  className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-lg font-semibold mb-2">Done</h3>
            
                <div  className="p-2 border rounded mb-2">
                  <h4 className="font-semibold">Title</h4>
                  <p className="text-sm text-gray-600">Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis maiores commodi magni quisquam. Molestias, tempore sapiente ad accusamus quasi officia deleniti! Veniam cupiditate, delectus esse exercitationem earum a necessitatibus aperiam?</p>
                </div>

            {/* ) : (
              <p className="text-gray-500">No tasks</p>
            ) */}
          </div>
       
      </div>
    </div>
  );
};

export default TodoApp;
