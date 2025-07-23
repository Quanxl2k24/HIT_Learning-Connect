import "./AdminCreateDocumentByClass.scss";
import SideBar from "../../components/SideBar/SideBar";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
const AdminCreateDocumentByClass = () => {
  //lay param
  const location = useLocation();
  const param = new URLSearchParams(location.search);
  const classId = param.get("classId");
  //back lai trang cu
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(`/Admin/DocumentByClass/Document/Create?classId=${classId}`);
  };
  const formik = useFormik({
    initialValues: {
      title: "",
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });
  return (
    <div className="AdminCreateDocumentByClass-container">
      <div className="AdminCreateDocumentByClass">
        <div className="AdminCreateDocumentByClass_left">
          <SideBar />
        </div>
        <div className="AdminCreateDocumentByClass_right">
          <div className="AdminCreateDocumentByClass_right--banner">
            <div className="logo-banner"></div>
            <div className="title-banner">
              <h3>Tài liệu</h3>
            </div>
          </div>

          <div className="AdminCreateDocumentByClass_right--box">
            <div className="box-container">
              <div className="box">
                <div className="title-box">
                  <p>Danh sách tài liệu theo từng buổi</p>
                </div>

                <div className="list-form">
                  <form onSubmit={formik.handleSubmit}>
                    <div className="input-form">
                      <label>Tên tài liệu</label>
                      <input type="text" placeholder="Tên tài liệu" />
                    </div>

                    <div className="input-form">
                      <label>Người tạo</label>
                      <input type="text" placeholder="Người tạo" />
                    </div>

                    <div className="input-form">
                      <label>Ngày tạo</label>
                      <input type="date" />
                    </div>

                    <div className="input-form">
                      <label>Tệp đính kèm</label>
                      <input type="file" className="input-file" />
                    </div>
                    <div className="input-form">
                      <label>Mô tả</label>
                      <textarea type="text" placeholder="Mô tả" />
                    </div>
                    <div className="button-create-document-by-class">
                      <button type="submit" className="btn-submit">
                        Xác nhận
                      </button>

                      <button
                        type="button"
                        className="btn-cancel"
                        onClick={handleBack}
                      >
                        Huỷ
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default AdminCreateDocumentByClass;
