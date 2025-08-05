import "./AdminCreateContest.scss";
import SideBar from "../../components/SideBar/SideBar";
import { useFormik } from "formik";
import adminCreateContestSchema from "../../utlis/adminCreateContestSchema";
import { Link } from "react-router-dom";
import usePushFile from "../../hooks/usePushFile";
import { useState } from "react";
import useCreateContest from "../../hooks/useCreateContest";
const AdminCreateContest = () => {
  //call api push file len
  const pushfile = usePushFile();
  const handlePushfile = async () => {
    const resFile = await pushfile(selectedFile);
    if (resFile) {
      alert("Đã tải tệp lên thành công");
      formik.setFieldValue("urlFile", resFile);
    } else {
      alert("Tải tệp lên bị lỗi");
    }
  };

  //handleChangeFile
  const [selectedFile, setSelectedFile] = useState(null);
  const handleChangeFile = (e) => {
    const file = e.target.files[0];
    if (file) setSelectedFile(file);
  };

  //formik
  const createcontest = useCreateContest();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: "",
      startTime: "",
      endTime: "",
      description: "",
      urlFile: "",
    },
    validationSchema: adminCreateContestSchema,
    // submit create contest
    onSubmit: async (values) => {
      console.log(values);
      values.endTime = values.endTime + "T00:00:00Z";
      values.startTime = values.startTime + "T00:00:00Z";
      const res = await createcontest(values);
      console.log("res: ", res);
    },
  });

  // console.log(">>>", formik.values.endTime + "T00:00:00Z");

  return (
    <div className="AdminCreateContest-container">
      <div className="AdminCreateContest">
        <div className="AdminCreateContest_left">
          <SideBar />
        </div>
        <div className="AdminCreateContest_right">
          <div className="AdminCreateContest_right--banner">
            <div className="logo-banner"></div>
            <div className="title-banner">
              <h3>Contest online</h3>
            </div>
          </div>

          <div className="AdminCreateContest_right--content">
            <div className="box-container">
              <div className="box">
                <div className="title-box">
                  <p>Danh sách contest</p>
                </div>

                <div className="table-box">
                  <form onSubmit={formik.handleSubmit}>
                    <div className="form-input">
                      <label>Tên Contest *</label>
                      <input
                        type="text"
                        name="title"
                        value={formik.values.title}
                        onChange={formik.handleChange}
                      />
                      <small>{formik.errors.title}</small>
                    </div>

                    <div className="form-date">
                      <div className="form-input">
                        <label>Ngày bắt đầu *</label>
                        <input
                          type="date"
                          name="startTime"
                          value={formik.values.startTime}
                          onChange={formik.handleChange}
                        />
                        <small>{formik.errors.startTime}</small>
                      </div>

                      <div className="form-input">
                        <label>Ngày kết thúc *</label>
                        <input
                          type="date"
                          name="endTime"
                          value={formik.values.endTime}
                          onChange={formik.handleChange}
                        />
                        <small>{formik.errors.endTime}</small>
                      </div>
                    </div>

                    <div className="form-input">
                      <label>Mô tả contest *</label>
                      <textarea
                        type="text"
                        name="description"
                        value={formik.values.description}
                        onChange={formik.handleChange}
                      />
                      <small>{formik.errors.description}</small>
                    </div>

                    <div className="form-input">
                      <label>Link file</label>
                      <input
                        type="text"
                        name="urlFile"
                        value={formik.values.urlFile}
                        // onChange={formik.handleChange}
                      />
                      <small>{formik.errors.urlFile}</small>
                    </div>

                    <div className="form-input">
                      <label>File hướng dẫn </label>
                      <input
                        type="file"
                        onChange={handleChangeFile}
                        className="form-file"
                      />
                      <button
                        className="btn-push-file"
                        onClick={handlePushfile}
                        type="button"
                      >
                        Tải tệp lên
                      </button>
                    </div>

                    <div className="form-actions">
                      <Link to="/Admin/Contest">
                        <button type="button" className="cancelClass">
                          Hủy
                        </button>
                      </Link>
                      <button type="submit" className="submitClass">
                        Tạo contest
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

export default AdminCreateContest;
