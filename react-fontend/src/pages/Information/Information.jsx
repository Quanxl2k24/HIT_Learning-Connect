import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Logo from "../../assets/imgs/LogoHit.png";
import "./Information.scss";
import Key from "../../assets/imgs/key.png";
import Pen from "../../assets/imgs/pen.png";
import Male from "../../assets/imgs/male.png";
import Lich from "../../assets/imgs/lich.png";
import Mail from "../../assets/imgs/mail.png";
import People from "../../assets/imgs/people.png";
import Logout from "../../assets/imgs/logout-logo.png";
import SideBar from "../../components/SideBar/SideBar";
import { isLoggedIn } from "../../components/StatusLog/Statuslog";

function Information() {
  const navigate = useNavigate();
  // kiemtra da dang nhap chua, chua thi chuyen sang sang nhap
  useEffect(() => {
    if (!isLoggedIn()) {
      navigate("/login");
    }
  }, []);
  // lay data
  const Profile = useSelector((state) => state.user.profile);
  //kiem tra data
  useEffect(() => {}, [Profile]);
  //phan quyen
  const userRole = Profile?.roleName === "ROLE_USER";
  return (
    <div className="infor">
      {/*  SideBar */}
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
          <div className="profile-card">
            <div className="card-header"></div>
            <div className="card-body">
              <div className="card-avatar">
                {Profile?.fullName.charAt(0) || "?"}
              </div>
              <h2 className="card-name">{Profile?.fullName}</h2>
              <p className="card-role">{userRole ? "Học viên" : "Admin"}</p>

              <div className="info-grid">
                <div className="info-item">
                  <img src={Male} alt="" />
                  <div className="info-item-content">
                    <span>Giới tính:</span>
                    <p>{Profile?.gender}</p>
                  </div>
                </div>
                <div className="info-item">
                  <img src={Mail} alt="" />
                  <div className="info-item-content">
                    <span>Email:</span>
                    <p>{Profile?.email}</p>
                  </div>
                </div>
                <div className="info-item">
                  <img src={Lich} alt="" />
                  <div className="info-item-content">
                    <span>Ngày sinh:</span>
                    <p>{Profile?.birthday}</p>
                  </div>
                </div>
                <div className="info-item">
                  <img src={People} alt="" />
                  <div className="info-item-content">
                    <span>Tên tài khoản:</span>
                    <p>{Profile?.username}</p>
                  </div>
                </div>
              </div>

              <div className="card-buttons">
                <Link to="/ForgotPassword" className="Link">
                  <button className="btn-outline">
                    <img src={Key} alt="key" /> Đổi mật khẩu
                  </button>
                </Link>

                <Link to="/Information/Change_Information" className="Link">
                  <button className="btn-solid">
                    <img src={Pen} alt="pen" /> Chỉnh sửa
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Information;
