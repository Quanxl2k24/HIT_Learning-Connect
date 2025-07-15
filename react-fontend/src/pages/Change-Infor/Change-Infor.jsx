import React from "react";
// import Logo from "../../assets/imgs/LogoHit.png";
// import Logout from "../../assets/imgs/logout-logo.png";
import "./Change-Infor.css";
import Peoplee from "../../assets/imgs/peoplee.png";
import Vector from "../../assets/imgs/Vector.png";
import Book from "../../assets/imgs/book.png";
import Thu from "../../assets/imgs/thu.png";

import { useSelector } from "react-redux";
import SideBar from "../../components/SideBar/SideBar";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/user/userActions";

function Change_Infor() {
  const dispatch = useDispatch();
  const Profile = useSelector((state) => state.user.profile);
  const formik = useFormik({
    initialValues: {
      fullName: Profile?.fullName || "",
      gender: Profile?.gender || "",
      birthday: Profile?.birthday || "",
      email: Profile?.email || "",
      username: Profile?.username || "",
    },

    onSubmit: (values) => {
      dispatch(updateUser(values));
      // console.log(values);
    },
  });

  return (
    <div className="infor">
      <div className="Home_left">
        <SideBar />
      </div>
      <div className="infor-colum2">
        <div className="infor-colum2-banner">
          <div className="solid-banner-infor-co2"></div>
          <div className="infor-colum2-banner-content">
            <h3>Thông tin cá nhân</h3>
          </div>
        </div>
        <div className="infor-colum2-body">
          <div className="edit-card">
            <div className="edit-header">Chỉnh sửa thông tin cá nhân</div>
            <form className="edit-form" onSubmit={formik.handleSubmit}>
              <div className="form-row">
                <div className="form-group">
                  <label>
                    <img src={Peoplee} alt="" /> Họ và tên *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formik.values.fullName}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>
                    <img src={Vector} alt="" /> Giới tính *
                  </label>
                  <input
                    type="text"
                    name="gender"
                    value={formik.values.gender}
                    onChange={formik.handleChange}
                  />
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>
                    <img src={Book} alt="" /> Ngày sinh *
                  </label>
                  <input
                    type="date"
                    name="birthday"
                    value={formik.values.birthday}
                    onChange={formik.handleChange}
                  />
                </div>
                <div className="form-group">
                  <label>
                    <img src={Thu} alt="" /> Email
                  </label>
                  <input
                    type="email"
                    name="eamil"
                    value={formik.values.email}
                    onChange={formik.handleChange}
                  />
                  {/* <small>Email không thể thay đổi</small> */}
                </div>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>
                    <img src={Peoplee} alt="" /> Tên tài khoản
                  </label>
                  <input
                    type="text"
                    value={formik.values.username}
                    onChange={formik.handleChange}
                  />
                  <small>Tên tài khoản không thể thay đổi</small>
                </div>
              </div>
              <div className="form-buttons">
                <button type="button" className="btn-outline">
                  Hủy
                </button>
                <button type="submit" className="btn-solid">
                  Xác nhận
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Change_Infor;
