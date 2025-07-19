import { useState } from "react";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./AdminCreateUser.scss";
import SideBar from "../../components/SideBar/SideBar";
import adminCreateUserSchema from "../../utlis/adminCreateUserSchema";
import { adminUserCreate } from "../../redux/admin/adminActions";
import BoxNotification from "../../components/BoxNotificaton/BoxNotifiacation";
const AdminCreateUser = () => {
  const [statusBox, setStatusBox] = useState(false);
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(null);
  const error = useSelector((state) => state.admin.error);
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      fullName: "",
      email: "",
      role: "",
    },

    validationSchema: adminCreateUserSchema,
    onSubmit: async (values) => {
      const res = await dispatch(adminUserCreate(values));
      if (res.success) {
        setText("Tạo người dùng thành công");
        setStatusBox(true);
        setShowToast(true);
        setTimeout(() => {
          navigate("/Admin/UserManagement");
        }, 1500);
      } else {
        setText("Tạo người dùng không thành công");
        setShowToast(true);
        setStatusBox(false);
      }
    },
  });

  return (
    <>
      <div className="container">
        {showToast && (
          <BoxNotification
            message={text}
            status={statusBox}
            onClose={() => setShowToast(false)}
          />
        )}
        <div className="Home_left">
          <SideBar />
        </div>

        <main className="main-content">
          <div className="banner">
            <div className="logo-banner"></div>
            <div className="title-banner">
              <h3>Người dùng</h3>
            </div>
          </div>
          <div className="box-conatiner">
            <p className="section-title">Tạo tài khoản</p>
            {/* FROM */}
            <form className="form" onSubmit={formik.handleSubmit}>
              <div className="form-group">
                <label>Họ và tên *</label>
                <input
                  type="text"
                  name="fullName"
                  onChange={formik.handleChange}
                  value={formik.values.fullName}
                  placeholder="Nhập họ và tên"
                />
                <p className="validate p">{formik.errors.fullName}</p>
              </div>
              {/* <div className="form-group">
                <label>Giới tính *</label>
                <select required>
                  <option value="">--Chọn giới tính--</option>
                  <option value="Nam">Nam</option>
                  <option value="Nữ">Nữ</option>
                </select>
              </div> */}
              <div className="form-group">
                <label>Role </label>
                <input
                  type="text"
                  name="role"
                  onChange={formik.handleChange}
                  value={formik.values.role}
                  placeholder="Role(ROLE_USER)"
                />
                <p className="validate p">{formik.errors.role}</p>
              </div>

              <div className="form-group">
                <label>Email </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Nhập email"
                  onChange={formik.handleChange}
                  value={formik.values.email}
                />
                <p className="validate p">{formik.errors.email}</p>
              </div>
              <div className="form-group">
                <label>Tên tài khoản</label>
                <input
                  type="text"
                  name="username"
                  onChange={formik.handleChange}
                  value={formik.values.username}
                  placeholder="Nhập tên tài khoản"
                />
                <p className="validate p">{formik.errors.username}</p>
              </div>
              <div className="form-group">
                <label>Mật khẩu</label>
                <input
                  type="password"
                  name="password"
                  onChange={formik.handleChange}
                  placeholder="Password"
                />
                <p className="validate p">{formik.errors.password}</p>
              </div>
              <div className="form-actions">
                <Link to={"/Admin/UserManagement/"}>
                  <button type="button" className="cancel btn">
                    Hủy
                  </button>
                </Link>
                <button type="submit" className="submit btn">
                  Tạo tài khoản
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </>
  );
};

export default AdminCreateUser;
