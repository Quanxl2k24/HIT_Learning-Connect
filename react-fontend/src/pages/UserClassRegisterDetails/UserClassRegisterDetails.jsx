import { Link, useLocation } from "react-router-dom";
import "./UserClassRegisterDetails.scss";
import SideBar from "../../components/SideBar/SideBar";
const UserClassRegisterDetail = ({ classData, onBack }) => {
  const location = useLocation();
  const data = location.state;
  console.log("data class: ", data);

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
              <h3>Chi tiết lớp học</h3>
            </div>
            <div className="from">
              <div className="form-group">
                <label>Tên lớp học</label>
                <input type="text" value={data.title || "HỌC HỌC"} readOnly />
              </div>

              <div className="form-group">
                <label>Thời gian</label>
                <input
                  type="text"
                  value={`${data.startDate} - ${data.endDate}`}
                  readOnly
                />
              </div>

              <div className="form-group">
                <label>Leader</label>
                <input
                  type="text"
                  value={data.teacherFullName || "Leader"}
                  readOnly
                />
              </div>

              <div className="form-group">
                <label>Trạng thái</label>
                <input
                  type="text"
                  value={classData?.status || "Thieu api"}
                  readOnly
                />
              </div>

              <div className="form-group">
                <label>Nội dung</label>
                <textarea rows="4" value={data.description} readOnly />
              </div>
              <div className="btn">
                <button className="register-btn">Đăng ký lớp học</button>
                <Link to={"/User/Register"}>
                  <button className="back-btn" onClick={onBack}>
                    Quay lại
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default UserClassRegisterDetail;
