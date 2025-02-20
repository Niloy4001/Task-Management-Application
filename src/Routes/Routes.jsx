import { createBrowserRouter } from "react-router-dom";
import LogIn from "../Authentication/Login";

const router = createBrowserRouter([
    {
      path: "/",
      element: <LogIn></LogIn>,
    },
    {
        path:"/home",
        element: <h1>Home</h1>
    },

  ]);


  export default router;