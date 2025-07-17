import React from "react";
import "./UserClassDetails.scss";
import SideBar from "../../components/SideBar/SideBar";
const UserClassDetail = ({ classData, onBack }) => {
  return (
    <div className="class-detail-page">
      <div className="Home_left">
        <SideBar />
      </div>
      <main className="class-detail-content">
        <div className="banner">
          <div className="logo-banner"></div>
          <div className="title-banner">
            <h3>Người dùng</h3>
          </div>
        </div>
        <div className="box-container">
          <div className="detail-box">
            <div className="title-box">
              <h3>Chi tiết lớp học</h3>
            </div>
            <div className="from">
              <div className="form-group">
                <label>Tên lớp học</label>
                <input
                  type="text"
                  value={classData?.name || "HỌC HỌC"}
                  readOnly
                />
              </div>

              <div className="form-group">
                <label>Thời gian</label>
                <input
                  type="text"
                  value={classData?.time || "19:00 - 21:00, Thứ 2 & Thứ 4"}
                  readOnly
                />
              </div>

              <div className="form-group">
                <label>Leader</label>
                <input
                  type="text"
                  value={classData?.leader || "Leader"}
                  readOnly
                />
              </div>

              <div className="form-group">
                <label>Số lượng</label>
                <input
                  type="text"
                  value={classData?.quantity || "18"}
                  readOnly
                />
              </div>

              <div className="form-group">
                <label>Trạng thái</label>
                <input
                  type="text"
                  value={classData?.status || "Đã duyệt/chưa duyệt"}
                  readOnly
                />
              </div>

              <div className="form-group">
                <label>Nội dung</label>
                <textarea
                  rows="4"
                  value={
                    classData?.description ||
                    "Khóa học lập trình web frontend với React, HTML, CSS và JavaScript. Học viên sẽ được thực hành xây dựng các dự án thực tế."
                  }
                  readOnly
                />
              </div>

              <button className="back-btn" onClick={onBack}>
                Quay lại
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserClassDetail;
