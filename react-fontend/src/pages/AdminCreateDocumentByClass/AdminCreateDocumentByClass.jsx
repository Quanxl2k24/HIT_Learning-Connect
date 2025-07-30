import "./AdminCreateDocumentByClass.scss";
import SideBar from "../../components/SideBar/SideBar";
import { useLocation, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { useState } from "react";
import { BiArrowFromBottom } from "react-icons/bi";
import usePushFile from "../../hooks/usePushFile";
import adminCreateDocumentByClassSchema from "../../utlis/adminCreateDocumentByClassSchema";
import usePushDocument from "../../hooks/usePushDocument";
import BoxNotification from "../../components/BoxNotificaton/BoxNotifiacation";
const AdminCreateDocumentByClass = () => {
  const [statusBox, setStatusBox] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [text, setText] = useState("");

  //lay param
  const location = useLocation();
  const param = new URLSearchParams(location.search);
  const classId = param.get("classId");

  //back lai trang cu
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(`/Admin/DocumentByClass/Document?classId=${classId}`);
  };

  //handleFileChange
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setSelectedFile(file);
  };

  //handlePushFile
  const pushfile = usePushFile();
  const handlePushFile = async () => {
    const resFile = await pushfile(selectedFile);
    if (resFile) {
      alert("Đã tải tệp lên thành công");
    } else {
      alert("Tải tệp lên bị lỗi");
    }
    if (resFile) {
      formik.setFieldValue("fileUrl", resFile);
    }
  };

  //formik
  const pushdocument = usePushDocument();
  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      fileUrl: "",
      classId: classId,
    },
    validationSchema: adminCreateDocumentByClassSchema,
    onSubmit: async (values) => {
      const res = await pushdocument(values);
      if (res) {
        setShowToast(true);
        setText("Đẩy tài liệu lên thành công");
        setStatusBox(true);
        setTimeout(() => {
          navigate(`/Admin/DocumentByClass/Document?classId=${classId}`);
        }, 1500);
      } else {
        setShowToast(true);
        setText("Đẩy tài liệu lên không thành công");
        setStatusBox(false);
      }
    },
  });

  return (
    <div className="AdminCreateDocumentByClass-container">
      <div className="AdminCreateDocumentByClass">
        {showToast && (
          <BoxNotification
            message={text}
            status={statusBox}
            onClose={() => setShowToast(false)}
          />
        )}
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
                      <input
                        type="text"
                        name="title"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                        placeholder="Tên tài liệu"
                      />
                      <p className="validate">{formik.errors.title}</p>
                    </div>

                    <div className="input-form">
                      <label>Tệp đính kèm</label>
                      <input
                        type="file"
                        className="input-file"
                        onChange={handleFileChange}
                      />

                      <button
                        type="button"
                        onClick={handlePushFile}
                        className="btn-push-file"
                      >
                        <BiArrowFromBottom />
                        <p>Tải file lên</p>
                      </button>
                    </div>

                    <div className="input-form">
                      <label>Mô tả</label>
                      <textarea
                        type="text"
                        name="description"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                        placeholder="Mô tả"
                      />
                      <p className="validate">{formik.errors.description}</p>
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
