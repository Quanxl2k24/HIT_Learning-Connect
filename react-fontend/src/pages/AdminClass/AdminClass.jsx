import React from 'react';
import "./AdminClass.css";
import SideBar from '../../components/SideBar/SideBar';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';



function AdminClass() {
  return (
    <div className="AdminClass">
      <div className="Home_left">
        <SideBar />
      </div>

      <div className="Home_Right">
        <div className="AdminClass_Banner">
            <div className="logo-banner"></div>
            <div className="title-banner">
              <h3>Lớp học</h3>
            </div>
          </div>

        <div className="ClassBox">
          <div className="ClassBoxHeader">
            Danh sách lớp học của Câu lạc bộ tin học - HIT
          </div>

          <div className="ClassBoxControls">
            <input
              type="text"
              placeholder="Tìm kiếm theo tên lớp học"
              className="SearchInput"
            />
            <button className="SearchBtn">Tìm kiếm</button>
            <button className="AddBtn">+ Thêm</button>
          </div>

          <div className="ClassTableWrapper">
            <table className="ClassTable">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Tên lớp học</th>
                  <th>Thời gian</th>
                  <th>Leader</th>
                  <th>Số lượng</th>
                  <th>Trạng thái</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                {/* Lặp dữ liệu giả */}
                {[...Array(10)].map((_, i) => (
                  <tr key={i}>
                    <td>1</td>
                    <td className="ClassName">Lập trình ngôn ngữ siêu nâng cao</td>
                    <td>01/06/2023 - 30/08/2023</td>
                    <td>Nguyễn Thành Đạt</td>
                    <td className="SoLuong">14</td>
                    <td><span className="Status Open">Đang mở</span></td>
                    <td>
                      <button className="ActionBtn Edit"><FontAwesomeIcon icon={faPen} /></button>
                      <button className="ActionBtn Delete"><FontAwesomeIcon icon={faTrash} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="Pagination">
              <button>{'<'}</button>
              <button className="active">1</button>
              <button>2</button>
              <button>3</button>
              <button>{'>'}</button>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminClass;
