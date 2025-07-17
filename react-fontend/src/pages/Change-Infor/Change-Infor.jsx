import React from "react";
// import Logo from "../../assets/imgs/LogoHit.png";
// import Logout from "../../assets/imgs/logout-logo.png";
import { useState } from "react";
import "./Change-Infor.css";
import Peoplee from "../../assets/imgs/peoplee.png";
import Vector from "../../assets/imgs/Vector.png";
import Book from "../../assets/imgs/book.png";
import Thu from "../../assets/imgs/thu.png";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import SideBar from "../../components/SideBar/SideBar";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { updateUser } from "../../redux/user/userActions";
import BoxNotification from "../../components/BoxNotificaton/BoxNotifiacation";

function Change_Infor() {
  const [showToast, setShowToast] = useState(null);
  const [text, setText] = useState("");
  const [statusBox, setStatusBox] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const Profile = useSelector((state) => state.user.profile);
  const errorChange = useSelector((state) => state.user.error);
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
      console.log("Loi day", errorChange);
      
      if (!errorChange) {
        setStatusBox(true);
        setText("Cập nhật thông tin thành công");
        setShowToast(true);
        setTimeout(() => {
          navigate("/Information");
        }, 1500);
      } else {
        setStatusBox(false);
        setText("Cập nhật thông tin không thành công");
        setShowToast(true);
      }
    },
  });

  return (
    <div className="infor">
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
                    name="email"
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
                <Link to="/Information" className="Link">
                  <button type="button" className="btn-outline ">
                    Hủy
                  </button>
                </Link>
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
