import "./UserClass.scss";
import SideBar from "../../components/SideBar/SideBar";
const UserClass = () => {
  return (
    <div>
      <div className="class-page">
        <div className="Home_left">
          <SideBar />
        </div>
        <main className="content">
          <div className="banner">
            <div className="logo-banner"></div>
            <div className="title-banner">
              <h3>Người dùng</h3>
            </div>
          </div>

          <div className="padding-class-list">
            <div className="class-list-container">
              <div className="title">
                <div className="title-class-list">
                  <h3>Danh sách lớp học của Câu lạc bộ tin học - HIT</h3>
                </div>
                <button className="btn-register">+ Đăng ký lớp học</button>
              </div>

              <table className="class-table">
                <thead>
                  <tr>
                    <th>Tên lớp học</th>
                    <th>Thời gian</th>
                    <th>Leader</th>
                    <th>Số lượng</th>
                    <th>Trạng thái</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <span className="class-name">
                        Lập trình ngôn ngữ siêu nâng cao
                      </span>
                    </td>
                    <td>19:00 - 21:00, Thứ 2 & Thứ 4</td>
                    <td>Nguyễn thị bích ngọc thảo mây</td>
                    <td>-</td>
                    <td>
                      <span className="status approved">Đã duyệt</span>
                    </td>
                    <td>
                      <a href="#">Đánh giá</a>
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="class-name">adadadadad</span>
                    </td>
                    <td>19:00 - 21:00, Thứ 2 & Thứ 9</td>
                    <td>Nguyễn thị bích ngọc thảo mây</td>
                    <td>-</td>
                    <td>
                      <span className="status pending">Chưa duyệt</span>
                    </td>
                    <td>
                      <a href="#">Hủy đăng ký</a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
export default UserClass;
