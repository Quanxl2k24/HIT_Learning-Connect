import React from 'react';
import './AdminDocument.css';
import SideBar from '../../components/SideBar/SideBar';
import DelButton from "../../assets/imgs/img_Del.png";
import EditButton from "../../assets/imgs/img_Edit.png";
import { useNavigate } from 'react-router-dom';

function AdminDocument() {
  const navigate = useNavigate();

  const handleAdd = (slug) => {
    navigate(`/admin/document/add/${slug}`);
  };

  const handleEdit = (slug) => {
    navigate(`/admin/document/edit/${slug}`);
  };

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
            <button className="AddBtn"  onClick={() => handleAdd('AdminDocumentAdd')}>+   Thêm</button>
          </div>

          <div className="DocumentTableWrapper">
            <table className="DocumentTable">
              <thead>
                <tr>
                  <th>STT</th>
                  <th>Tên tài liệu</th>
                  <th>Người tạo</th>
                  <th>Ngày tạo</th>
                  <th>Hành động</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Tài liệu học bài</td>
                  <td>Thành Đạt</td>
                  <td>21/10/2005</td>
                  <td>
                    <div className="button-action">
                      <button onClick={() => handleEdit('AdminDocumentEdit')}>
                        <img className="img-btn" src={EditButton} alt="Edit"/>
                      </button>
                      <button>
                        <img className="img-btn" src={DelButton} alt="Delete" />
                      </button>
                    </div>
                  </td>
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
