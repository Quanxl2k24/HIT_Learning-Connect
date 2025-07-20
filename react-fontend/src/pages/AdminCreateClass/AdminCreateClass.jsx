// AddClassForm.jsx
import React from "react";
import "./AdminCreateClass.scss";
import SideBar from "../../components/SideBar/SideBar";

const AdminCreateClass = () => {
  return (
    <div className="AdminCreateClass-container">
      <div className="Home-left">
        <SideBar />
      </div>
      <div className="AdminCreateClass-right">
        <div className="AdminCreateClass_right--banner">
          <div className="logo-banner"></div>
          <div className="title-banner">
            <h3>Thêm mới lớp học</h3>
          </div>
        </div>

        <div className="box-create-class">
          <div className="add-class-form">
            <div className="add-class-form-title">
              <p>Thêm lớp học mới</p>
            </div>

            <form>
              <div className="form-group formNameClass">
                <label>Tên lớp học</label>
                <input type="text" placeholder="Nhập tên lớp học" />
                <span className="error">Vui lòng nhập tên lớp học</span>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Ngày bắt đầu</label>
                  <input type="date" placeholder="yyyy/mm/dd" />
                  <span className="error">Vui lòng nhập ngày bắt đầu</span>
                </div>

                <div className="form-group">
                  <label>Ngày kết thúc</label>
                  <input type="date" placeholder="yyyy/mm/dd" />
                </div>
              </div>

              <div className="form-group">
                <label>Leader</label>
                <input type="text" placeholder="Nhập tên Leader" />
                <span className="error">Vui lòng nhập tên Leader</span>
              </div>

              <div className="form-group">
                <label>Trạng thái</label>
                <select>
                  <option>Đang mở</option>
                  <option>Đã đóng</option>
                </select>
              </div>

              <div className="form-group">
                <label>Nội dung</label>
                <textarea
                  placeholder="Mô tả nội dung lớp học"
                  rows="3"
                ></textarea>
              </div>

              <div className="form-actions">
                <button type="button" className="cancel">
                  Hủy
                </button>
                <button type="submit" className="submit">
                  Thêm
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminCreateClass;
