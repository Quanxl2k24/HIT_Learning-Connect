import React from "react";
import "./AdminDocument.scss";
import SideBar from "../../components/SideBar/SideBar";
import DelButton from "../../assets/imgs/img_Del.png";
import EditButton from "../../assets/imgs/img_Edit.png";
import SearchBoxUser from "../../assets/imgs/SearchBoxUser.png";
import { useNavigate, useLocation } from "react-router-dom";

function AdminDocument() {
  const navigate = useNavigate();
  const handleEdit = (slug) => {
    navigate(`/admin/document/edit/${slug}`);
  };
  //lay params
  const location = useLocation();
  const param = new URLSearchParams(location.search);
  const classId = param.get("classId");

  //handle chuyen sang trang them tai lieu
  const handleChangeAddDocument = () => {
    navigate(`/Admin/DocumentByClass/Document/Create?classId=${classId}`);
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
        <div className="document-box-container">
          <div className="DocumentBox">
            <div className="DocumentBoxHeader">Danh sách tài liệu</div>

            <div className="SearchAndAdd-box">
              <div className="search">
                <div className="imgSearch">
                  <img src={SearchBoxUser} alt="" />
                </div>
                <input
                  type="text"
                  placeholder="Tìm kiếm theo username, fullname, email"
                />
              </div>

              <div className="but-box">
                <button className="but-add">Tìm kiếm</button>

                <button className="but-add" onClick={handleChangeAddDocument}>
                  <span>+ </span> Thêm
                </button>
              </div>
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
                        <button onClick={() => handleEdit("AdminDocumentEdit")}>
                          <img
                            className="img-btn"
                            src={EditButton}
                            alt="Edit"
                          />
                        </button>
                        <button>
                          <img
                            className="img-btn"
                            src={DelButton}
                            alt="Delete"
                          />
                        </button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDocument;
