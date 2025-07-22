import React from 'react';
import './AdminLoginClass.css';
import SideBar from '../../components/SideBar/SideBar';

function AdminLoginClass() {
  return (
    <div className="LoginClass">
      <div className="Home_left">
        <SideBar />
      </div>

      <div className="Home_right">
        <div className="AdminClass_Banner">
          <div className="logo-banner"></div>
          <div className="title-banner">
            <h3>Đăng ký lớp học</h3>
          </div>
        </div>
        <h2 className="class_title">Các lớp học của CLB</h2>
        <div className="class_grid">
          {[...Array(12)].map((_, index) => (
            <div className="class_card" key={index}>
              <div className="class_image">
                <img src="../../assets/imgs/adminClass.png" alt="" />
                </div>              
                <div className="class_info">
                <div className="class_name">Lớp học</div>
                <div className="class_teacher">Nguyễn Thành Đạt</div>
                <div className="class_date">21/10/2005</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminLoginClass;
