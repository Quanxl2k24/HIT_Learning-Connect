import "./AdminEditDocumentByClass.scss";
import SideBar from "../../components/SideBar/SideBar";
import { useLocation, useNavigate } from "react-router-dom";
import useGetDocumentBydocumentId from "../../hooks/useGetDocumentBydocumentId";
import { useEffect, useState } from "react";
import { useFormik } from "formik";
import adminUpdateDocumentSchema from "../../utlis/adminUpdateDocumentSchema";
import { BiArrowFromBottom } from "react-icons/bi";
import useUpdateDocumentByClass from "../../hooks/useUpdateDocumentByClass";
import BoxNotification from "../../components/BoxNotificaton/BoxNotifiacation";
import useDeleteFile from "../../hooks/useDeleteFile";
const AdminEditDocumentByClass = () => {
  const [showToast, setShowToast] = useState(false);
  const [text, setText] = useState("");
  const [statusBox, setStatusBox] = useState(null);
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const documentId = params.get("documentId");
  const classId = params.get("ClassId");

  //lay du lieu doc can edit
  const [data, setData] = useState(null);
  const getdocumentbydocumentid = useGetDocumentBydocumentId();
  const fetchData = async () => {
    const res = await getdocumentbydocumentid(documentId);
    setData(res.data.data);
  };

  useEffect(() => {
    fetchData();
  }, []);

  //handleBack
  const navigate = useNavigate();
  const handleBack = () => {
    navigate(`/Admin/DocumentByClass/Document?classId=${classId}`);
  };
  // call api update
  const updatedocumentbyclass = useUpdateDocumentByClass();
  //formik
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: data?.title || "",
      fileUrl: data?.fileUrl || "",
      description: data?.description || "",
      classId: classId,
    },

    validationSchema: adminUpdateDocumentSchema,

    onSubmit: async (values) => {
      console.log("documentId", documentId);
      const res = await updatedocumentbyclass(documentId, values);
      console.log("res", res);
      if (res) {
        setShowToast(true);
        setText("Cập nhật class thành công");
        setStatusBox(true);
        setTimeout(() => {
          navigate(`/Admin/DocumentByClass/Document?classId=${classId}`);
        }, 1500);
      } else {
        setShowToast(true);
        setText("Cập nhật class không thành công");
        setStatusBox(false);
      }
    },
  });

  //handleDeleteFile dang loi
  const deletefile = useDeleteFile();
  const handleDeleteFile = async (urlFile) => {
    const res = await deletefile(urlFile);
    console.log("res", res);
  };

  const [showUpFile, setShowUpFile] = useState(false);
  useEffect(() => {
    if (data?.fileUrl) {
      console.log(data?.fileUrl);

      setShowUpFile(true);
    }
  }, [data]);

  console.log("showFile", showUpFile);

  return (
    <div className="AdminEditDocumentByClass-conatainer">
      <div className="AdminEditDocumentByClass">
        {showToast && (
          <BoxNotification
            message={text}
            status={statusBox}
            onClose={() => setShowToast(false)}
          />
        )}
        <div className="AdminEditDocumentByClass_left">
          <SideBar />
        </div>

        <div className="AdminEditDocumentByClass_right">
          <div className="AdminEditDocumentByClass_right--banner">
            <div className="logo-banner"></div>
            <div className="title-banner">
              <h3>Chỉnh sửa tài liệu</h3>
            </div>
          </div>

          <div className="AdminEditDocumentByClass_right--box">
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
                      <label>Link tệp</label>
                      <input
                        type="text"
                        name="fileUrl"
                        value={formik.values.fileUrl}
                        onChange={formik.handleChange}
                        placeholder="Tên tài liệu"
                      />
                      <p className="validate">{formik.errors.fileUrl}</p>
                      <button
                        type="button"
                        onClick={() => handleDeleteFile(formik.values.fileUrl)}
                      >
                        Xoá file đã tải lên
                      </button>
                    </div>
                    {!showUpFile ? (
                      <div className="input-form">
                        <label>Tệp đính kèm</label>
                        <input
                          type="file"
                          className="input-file"
                          // onChange={handleFileChange}
                        />

                        <button
                          // onClick={handlePushFile}
                          className="btn-push-file"
                        >
                          <BiArrowFromBottom />
                          <p>Tải file lên</p>
                        </button>
                      </div>
                    ) : (
                      <div></div>
                    )}

                    {/* <div className="input-form">
                      <label>Tệp đính kèm</label>
                      <input
                        type="file"
                        className="input-file"
                        // onChange={handleFileChange}
                      />

                      <button
                        // onClick={handlePushFile}
                        className="btn-push-file"
                      >
                        <BiArrowFromBottom />
                        <p>Tải file lên</p>
                      </button>
                    </div> */}

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

export default AdminEditDocumentByClass;
