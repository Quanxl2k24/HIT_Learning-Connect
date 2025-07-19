import { useState } from "react";
import { useFormik } from "formik";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./AdminUpdateUser.scss";
import SideBar from "../../components/SideBar/SideBar";
import adminUpdateUserSchema from "../../utlis/adminUpdateUserSchema";
import { adminUserUpdate } from "../../redux/admin/adminActions";
import BoxNotification from "../../components/BoxNotificaton/BoxNotifiacation";
const AdminUpdateUser = () => {
  const [statusBox, setStatusBox] = useState(false);
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(null);
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  // lay du lieu de sua
  const location = useLocation();
  const User = location.state;

  // formik
  const formik = useFormik({
    initialValues: {
      username: User.user.username || "",
      fullname: User.user.fullName || "",
      birthday: User.user.birthday || "",
      gender: User.user.gender || "",
      email: User.user.email || "",
      role: User.user.roleName || "",
    },

    validationSchema: adminUpdateUserSchema,
    onSubmit: async (values) => {
      const data = { id: User.user.id, ...values };
      const res = await dispatch(adminUserUpdate(data));

      if (res.success) {
        setText("Cập nhật người dùng thành công");
        setStatusBox(true);
        setShowToast(true);
        setTimeout(() => {
          navigate("/Admin/UserManagement");
        }, 1500);
      } else {
        setText("Cập nhật người dùng không thành công");
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
                  name="fullname"
                  onChange={formik.handleChange}
                  value={formik.values.fullname}
                  placeholder="Nhập họ và tên"
                />
                <p className="validate p">{formik.errors.fullname}</p>
              </div>
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
                <label>Ngày sinh *</label>
                <input
                  type="date"
                  name="birthday"
                  value={formik.values.birthday}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="form-group">
                <label>Giới tính *</label>
                <input
                  type="text"
                  name="gender"
                  value={formik.values.gender}
                  onChange={formik.handleChange}
                />
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
              {/* <div className="form-group">
                <label>Mật khẩu</label>
                <input
                  type="password"
                  name="password"
                  onChange={formik.handleChange}
                  placeholder="Password"
                />
                <p className="validate p">{formik.errors.password}</p>
              </div> */}

              <div className="form-actions">
                <Link to={"/Admin/UserManagement/"}>
                  <button type="button" className="cancel btn">
                    Hủy
                  </button>
                </Link>

                <button type="submit" className="submit btn">
                  Cập nhật
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </>
  );
};

export default AdminUpdateUser;
