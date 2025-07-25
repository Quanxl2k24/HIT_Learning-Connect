import { useEffect } from "react";
import { fetchUser } from "./redux/user/userActions";
import { useDispatch } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";

import Login from "./pages/Login/Login";
import Home from "./pages/Home/Home";
import ChangePassword from "./pages/ChangePassword/ChangePassword";
import ForgotPassword from "./pages/ForgotPassword/ForgotPassword";
import Information from "./pages/Information/Information";
import Change_Infor from "./pages/Change-Infor/Change-Infor";
import AdminUserManagement from "./pages/AdminUserManagement/AdminUserManagement";
import AdminCreateUser from "./pages/AdminCreateUser/AdminCreateUser";
import UserClass from "./pages/UserClass/UserClass";
import UserClassRegisterDetails from "./pages/UserClassRegisterDetails/UserClassRegisterDetails";
import UserEvaluate from "./pages/UserEvaluate/UserEvaluate";
import AdminUpdateUser from "./pages/AdminUpdateUser/AdminUpdateUser";
import UserRegister from "./pages/UserRegister/UserRegister";
import AdminClass from "./pages/AdminClass/AdminClass";
import AdminCreateClass from "./pages/AdminCreateClass/AdminCreateClass";
import AdminDocument from "./pages/AdminDocument/AdminDocument";
import AdminUpdateClass from "./pages/AdminUpdateClass/AdminUpdateClass";
import AdminRegister from "./pages/AdminRegister/AdminRegister";
// import AdminDocumentActionAdd from "./pages/AdminDocumentAction/AdminDocumentActionAdd";
// import AdminDocumentActionEdit from "./pages/AdminDocumentAction/AdminDocumentActionEdit";
import AdminManagesDocumentsByClass from "./pages/AdminManagesDocumentsByClass/AdminManagesDocumentsByClass";
import AdminCreateDocumentByClass from "./pages/AdminCreateDocumentByClass/AdminCreateDocumentByClass";
import UserLearningClass from "./pages/UserLearningClass/UserLearningClass";
import AdminEditDocumentByClass from "./pages/AdminEditDocumentByClass/AdminEditDocumentByClass";
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  return (
    <>
      <Routes>
        <Route path="/" element={<Navigate to="/Home" replace />} />
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
        <Route
          path="/User/Register/Class/Details"
          element={<UserClassRegisterDetails />}
        />
        <Route path="/User/Class/Evaluate" element={<UserEvaluate />} />
        <Route
          path="/Admin/UserManagement/Update"
          element={<AdminUpdateUser />}
        />
        <Route path="/User/Register" element={<UserRegister />} />
        <Route path="/Admin/Class" element={<AdminClass />} />
        <Route path="/Admin/Class/Create" element={<AdminCreateClass />} />
        <Route path="/Admin/Class/Update" element={<AdminUpdateClass />} />
        <Route path="Admin/Regiter" element={<AdminRegister />} />
        <Route
          path="/Admin/DocumentByClass/Document"
          element={<AdminDocument />}
        />
        <Route path="/Admin/Regiter" element={<AdminRegister />} />
        <Route
          path="/Admin/DocumentByClass/Document/Create"
          element={<AdminCreateDocumentByClass />}
        />
        {/* <Route
          path="/Admin/Document/Edit/:id"
          element={<AdminDocumentActionEdit />}
        /> */}
        <Route
          path="/Admin/DocumentByClass"
          element={<AdminManagesDocumentsByClass />}
        />

        <Route path="/User/Learning/Class" element={<UserLearningClass />} />
        <Route
          path="/Admin/DocumentByClass/Document/Edit"
          element={<AdminEditDocumentByClass />}
        />
      </Routes>
    </>
  );
}

export default App;
