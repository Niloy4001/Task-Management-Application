import { createBrowserRouter } from "react-router-dom";
import LogIn from "../Authentication/Login";
import Home from "../Pages/Home";
import PrivateRoute from "../PrivateRoute/PrivateRoute";


const router = createBrowserRouter([
    {
      path: "/",
      element: <LogIn></LogIn>,
    },
    {
        path:"/home",
        element: <PrivateRoute><Home></Home></PrivateRoute>
    },

  ]);


  export default router;