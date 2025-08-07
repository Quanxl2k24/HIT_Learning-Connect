import React, { useEffect, useState } from "react";
import "./AdminDocument.scss";
import SideBar from "../../components/SideBar/SideBar";
import DelButton from "../../assets/imgs/img_Del.png";
import EditButton from "../../assets/imgs/img_Edit.png";
import SearchBoxUser from "../../assets/imgs/searchBoxUser.png";
import { useNavigate, useLocation } from "react-router-dom";
import useGetDocumentByClass from "../../hooks/useGetDocumentByClass";
import useDeleteDocument from "../../hooks/useDeleteDocument";
import BoxNotification from "../../components/BoxNotificaton/BoxNotifiacation";
import BoxConfrimDelete from "../../components/BoxConfrimDelete/BoxConfirmDelete";
function AdminDocument() {
  const [showToast, setShowToast] = useState(false);
  const [text, setText] = useState("");
  const [statusBox, setStatusBox] = useState(null);
  const navigate = useNavigate();
  //lay params
  const location = useLocation();
  const param = new URLSearchParams(location.search);
  const classId = param.get("classId");

  //handle chuyen sang trang them tai lieu
  const handleChangeAddDocument = () => {
    navigate(`/Admin/DocumentByClass/Document/Create?classId=${classId}`);
  };

  //call api lay document
  const [data, setData] = useState(null);
  const getdocumentbyclass = useGetDocumentByClass();
  const fetchData = async (classId) => {
    const data = await getdocumentbyclass(classId);
    setData(data);
  };
  useEffect(() => {
    fetchData(classId);
  }, []);

  //xoa document
  const [ShowConfirm, setShowConfirm] = useState(false);
  const [documentId, setDocumentId] = useState(null);
  const deletedocument = useDeleteDocument();
  //handle click delete
  const handleClickDelete = (documentId) => {
    setShowConfirm(true);
    setDocumentId(documentId);
  };
  //handle huy
  const handleCancel = () => {
    setShowConfirm(false);
  };
  //handle xoa doc
  const handleDeleteDocument = async () => {
    const res = await deletedocument(documentId);

    await fetchData(classId);
    setShowConfirm(false);
    setDocumentId(null);
    if (res) {
      setShowToast(true);
      setText("Xoá tài liệu thành công");
      setStatusBox(true);
    } else {
      setShowToast(true);
      setText("Xoá tài liệu không thành công");
      setStatusBox(false);
    }
  };

  // handle chuyen trang edit tai lieu
  const handleChangeUrlEdit = (documentId) => {
    navigate(
      `/Admin/DocumentByClass/Document/Edit?ClassId=${classId}&documentId=${documentId}`,
      {
        state: data,
      }
    );
  };
  return (
    <div className="AdminDocument-container">
      <div className="AdminDocument">
        <div className="BoxConfirm-container">
          <BoxConfrimDelete
            display={ShowConfirm}
            handleCancel={handleCancel}
            handleDeleteBoxConfirm={handleDeleteDocument}
          />
        </div>
        {showToast && (
          <BoxNotification
            message={text}
            status={statusBox}
            onClose={() => setShowToast(false)}
          />
        )}
        <div className="AdminDocument_left">
          <SideBar />
        </div>

        <div className="AdminDocument_Right">
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
                      <th>Id tài liệu</th>
                      <th>Tên tài liệu</th>
                      <th>Người tạo</th>
                      <th>Ngày tạo</th>
                      <th>Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data &&
                      data.map((item, index) => (
                        <tr key={index}>
                          <td>{item.id}</td>
                          <td>{item.title}</td>
                          <td>{item.uploader.fullName}</td>
                          <td>{item.createdAt}</td>
                          <td>
                            <div className="button-action">
                              <button
                                onClick={() => handleChangeUrlEdit(item.id)}
                              >
                                <img
                                  className="img-btn"
                                  src={EditButton}
                                  alt="Edit"
                                />
                              </button>
                              <button
                                onClick={() => handleClickDelete(item.id)}
                              >
                                <img
                                  className="img-btn"
                                  src={DelButton}
                                  alt="Delete"
                                />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdminDocument;
