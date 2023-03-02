import React from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";



import FirstPageCreated from "./components/firstPageCreated";
import Login from "./components/Login";
import Register from "./components/Register";
import Logout from "./components/Logout";
import Profile from "./components/profile/Profile";
import SinglePost from "./components/singlePost/SinglePost";
import EditProfile from "./components/editProfile/EditProfile";
import Home from "./components/home/Home";




import MyGroup from "./components/myGroup";
// import AllGroup from "./components/allGroup";
import Group from "./group/Group";
import Allgroups from "./allgroups/Allgroups";
import AllUsers from "./allUsers/allUsers";









const router = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Register />,
  },
  {
    path: "/profile/:profile_id",
    element: <Profile />,
  },
  {
    path: "/profile/:profile_id/edit",
    element: <EditProfile />,
  },
  {
    path: "/profile/:profile_id/post/:postID",
    element: <SinglePost />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "/home",
    element: <FirstPageCreated />,
  },
  {
    path: "/groups/:id/show",
    element: <Group />,
  },
  {
    path: "/Allgroups",
    element: <Allgroups />,
  },
  {
    path: "/Allusers",
    element: <AllUsers />,
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);
