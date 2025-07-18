import { useEffect } from "react";
import { fetchUser } from "./redux/user/userActions";
import { useDispatch } from "react-redux";
import { Routes, Route, Link } from "react-router-dom";

import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import ChangePassword from "./pages/ChangePassword/ChangePassword";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import Information from "./pages/Information/Information";
import Change_Infor from "./pages/Change-Infor/Change-Infor";
import AdminUserManagement from "./pages/AdminUserManagement/AdminUserManagement";
import AdminCreateUser from "./pages/AdminCreateUser/AdminCreateUser";
import UserClass from "./pages/UserClass/UserClass";
import UserClassDetails from "./pages/UserClassDetails/UserClassDetails";
import UserEvaluate from "./pages/UserEvaluate/UserEvaluate";
import AdminUpdateUser from "./pages/AdminUpdateUser/AdminUpdateUser";
//tesst components
import BoxConfirmDelete from "./components/BoxConfrimDelete/BoxConfirmDelete";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);
  return (
    <>
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/ChangePassword" element={<ChangePassword />} />
        <Route path="/ForgotPassword" element={<ForgotPassword />} />
        <Route path="/Information" element={<Information />} />
        <Route
          path="/Information/Change_Information"
          element={<Change_Infor />}
        />
        <Route path="/Admin/UserManagement" element={<AdminUserManagement />} />
        <Route
          path="/Admin/UserManagement/CreateUser"
          element={<AdminCreateUser />}
        />
        <Route path="/User/Class" element={<UserClass />} />
        <Route path="/User/Class/Details" element={<UserClassDetails />} />
        <Route path="/User/Class/Evaluate" element={<UserEvaluate />} />
        <Route
          path="/Admin/UserManagement/Update"
          element={<AdminUpdateUser />}
        />
        <Route path="/test" element={<BoxConfirmDelete   />} />
      </Routes>
    </>
  );
}

export default App;
