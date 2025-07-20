import React from "react";
import "./UserEvaluate.scss";
import SideBar from "../../components/SideBar/SideBar";
const UserEvaluate = () => {
  return (
    <div className="class-detail-page">
      <div className="Home_left">
        <SideBar />
      </div>
      <main className="class-detail-content">
        <div className="banner">
          <div className="logo-banner"></div>
          <div className="title-banner">
            <h3>Lớp học</h3>
          </div>
        </div>
        <div className="box-container">
          <div className="detail-box">
            <div className="title-box">
              <h3>Đánh giá lớp học</h3>
            </div>
            <div className="from">
              <div className="form-group">
                <label>Tên lớp học</label>
                <input type="text" readOnly />
              </div>

              <div className="form-group">
                <label>Leader</label>
                <input type="text" readOnly />
              </div>

              <div className="form-group">
                <label>Đánh giá sao</label>
                <input type="text" readOnly />
              </div>

              <div className="form-group">
                <label>Nội dung</label>
                <textarea rows="4" readOnly />
              </div>

              <div className="bttn">
                <button className="back-bttn back">Quay lại</button>
                <button className="back-bttn send">Gửi</button>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserEvaluate;
