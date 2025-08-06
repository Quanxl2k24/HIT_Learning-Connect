import SideBar from "../../components/SideBar/SideBar";
import "./AdminEditContest.scss";
import adminEditContestSchema from "../../utlis/adminEditContestSchema";
import { useFormik } from "formik";
import { Link, useLocation, useNavigate } from "react-router-dom";
import useGetContestDetails from "../../hooks/useGetContestDetails";
import { useEffect, useState } from "react";
import useUpdateContestByAdmin from "../../hooks/useUpdateContestByAdmin";
import BoxNotification from "../../components/BoxNotificaton/BoxNotifiacation";
const AdminEditContest = () => {
  //useState notification
  const [showToast, setShowToast] = useState(false);
  const [text, setText] = useState("");
  const [statusBox, setStatusBox] = useState(null);

  //lay param
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const contestId = params.get("contestId");

  //call api lay noi dung
  const [data, setData] = useState(null);
  const getcontestdetails = useGetContestDetails();
  const fetchData = async () => {
    const res = await getcontestdetails(contestId);
    setData(res);
  };
  useEffect(() => {
    fetchData();
  }, []);
  console.log(data);

  // khai bao hook
  const updatecontest = useUpdateContestByAdmin();
  //formik
  const navigate = useNavigate();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: data?.title || "",
      startTime: data?.startTime || "",
      endTime: data?.endTime || "",
      description: data?.description || "",
      urlFile: data?.urlFile || "",
      highestScore: null,
      resultSummary: null,
      ranking: null,
    },
    validationSchema: adminEditContestSchema,
    onSubmit: async (values) => {
      values.endTime = values.endTime + "T00:00:00Z";
      values.startTime = values.startTime + "T00:00:00Z";
      console.log(values);
      const res = await updatecontest(contestId, values);
      console.log("res: ", res);
      if (res) {
        setShowToast(true);
        setText("Cập nhật contest thành công");
        setStatusBox(true);
        setTimeout(() => {
          navigate("/Admin/Contest");
        }, 1500);
      } else {
        setShowToast(true);
        setText("Cập nhật contest không thành công");
        setStatusBox(false);
      }
    },
  });
  return (
    <div className="AdminEditContest-container">
      <div className="AdminEditContetst">
        {showToast && (
          <BoxNotification
            message={text}
            status={statusBox}
            onClose={() => setShowToast(false)}
          />
        )}
        <div className="AdminEditContest_left">
          <SideBar />
        </div>
        <div className="AdminEditContest_right">
          <div className="AdminEditContest_right--banner">
            <div className="logo-banner"></div>
            <div className="title-banner">
              <h3>Contest online</h3>
            </div>
          </div>

          <div className="AdminEditContest_right--content">
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
                      <textarea
                        type="text"
                        name="urlFile"
                        value={formik.values.urlFile}
                        onChange={formik.handleChange}
                      />
                      <small>{formik.errors.urlFile}</small>
                    </div>

                    <div className="form-input">
                      <label>File hướng dẫn </label>
                      <input type="file" className="form-file" />
                    </div>

                    <div className="form-actions">
                      <Link to="/Admin/Contest">
                        <button type="button" className="cancelClass">
                          Hủy
                        </button>
                      </Link>
                      <button type="submit" className="submitClass">
                        Cập nhật
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

export default AdminEditContest;
