import React from 'react';
import './AdminDocument.css';
import SideBar from '../../components/SideBar/SideBar';

function AdminDocument() {
  return (
    <div className="AdminDocument">
      <div className="Home_left">
        <SideBar />
      </div>

      <div className="Home_Right">
        <div className="AdminClass_Banner">
          <div className="logo-banner"></div>
          <div className="title-banner">
            <h3>Tài liệu</h3>
          </div>
        </div>

        <div className="DocumentBox">
          <div className="DocumentBoxHeader">
            Danh sách tài liệu
          </div>

          <div className="DocumentBoxControls">
            <input
              type="text"
              placeholder="Tìm kiếm theo tên tài liệu hoặc người tạo"
              className="SearchInput"
            />
            <button className="SearchBtn">Tìm kiếm</button>
          </div>

          <div className="DocumentTableWrapper">
            <table className="DocumentTable">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Tên tài liệu</th>
                  <th>Người tạo</th>
                  <th>Ngày tạo</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Tài liệu học bài</td>
                  <td>Thành Đạt</td>
                  <td>21/10/2005</td>
                </tr>
              </tbody>
            </table>
          </div>

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
  );
}

export default AdminDocument;
