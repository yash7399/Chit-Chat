import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/home/Home";
import Login from "../pages/authentication/Login";
import Signup from "../pages/authentication/Signup";
import ProtectedRoute from "../components/ProtectedRoute";


export const routes= createBrowserRouter([
    {
        path:"/",
        element :(
        <ProtectedRoute>
            <Home/>
        </ProtectedRoute>
         )
    },
    {
        path:"/login",
        element : <Login/>
    },
    {
        path:"/signup",
        element : <Signup/>
    }
])