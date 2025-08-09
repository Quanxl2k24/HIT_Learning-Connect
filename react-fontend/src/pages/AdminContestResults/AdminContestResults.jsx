import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { GoCheck } from "react-icons/go";
import { GoX } from "react-icons/go";

import "./AdmincontestResults.scss";
import SideBar from "../../components/SideBar/SideBar";
import useGetSubmissionByContestId from "../../hooks/useGetSubmissionByContestId";
import { useFormik } from "formik";

const AdminContestResults = () => {
  //lay params
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const contestId = params.get("contestId");
  const Contest = params.get("Contest");
  console.log("id", contestId);

  //call api lay nhung nguoi da lam contest
  const [data, setData] = useState([]);
  const getsubmission = useGetSubmissionByContestId();
  const fetchData = async () => {
    const res = await getsubmission(contestId);
    setData(res);
  };
  console.log(data);
  useEffect(() => {
    fetchData();
  }, []);

  // hien cham diem
  const [openFormIndex, setOpenFormIndex] = useState(null);
  const handleToggleForm = (index) => {
    setOpenFormIndex((prevIndex) => (prevIndex === index ? null : index));
  };

  const handleCancelScoring = () => {
    setOpenFormIndex(null);
  };

  // formik
  const formik = useFormik({
    initialValues: {
      kk: "",
    },
  });
  return (
    <div className="AdminContestResults-container">
      <div className="AdminContestResults">
        <div className="AdminContestResults_left">
          <SideBar />
        </div>
        <div className="AdminContestResults_right">
          {/* <div className="box-scoring">
            <div className="title-scoring">
              <p>Teen nguoi lam contest</p>
            </div>
            <div className="form-Point">
              <form action="">
                <label>Điểm</label>
                <input type="text" />
                <label>Nhận xét</label>
                <input type="text" />
                <div className="btn-Point">
                  <button>Huỷ</button>
                  <button>Xác nhận</button>
                </div>
              </form>
            </div>
          </div> */}
          <div className="AdminContestResults_right--banner">
            <div className="logo-banner"></div>
            <div className="title-banner">
              <h3>Contest online </h3>
            </div>
          </div>
          <div className="AdminContestResults_right--content">
            <div className="box-container">
              <div className="box">
                <div className="title-box">
                  <p>{Contest}</p>
                </div>

                <div className="table-box-contest-results">
                  <table>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Người tham gia</th>
                        <th>File đã nộp</th>
                        <th>Điểm số</th>
                        <th>Thứ hạng</th>
                        <th>Hành động</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.isArray(data) &&
                        data.map((item, index) => (
                          <tr key={index}>
                            <td>{item.contestId}</td>
                            <td>{item.username}</td>
                            <td>
                              <a href={item.fileUrl}>File</a>
                            </td>
                            <td>{item.highestScore}</td>
                            <td>{item.ranking}</td>
                            <td className="td-form-Scoring ">
                              {openFormIndex !== index && (
                                <button
                                  className="btn-Scoring"
                                  onClick={() => handleToggleForm(index)}
                                >
                                  Chấm điểm
                                </button>
                              )}
                              {openFormIndex === index && (
                                <div className="form-Scoring">
                                  <form onSubmit={formik.handleSubmit}>
                                    <div className="form-top">
                                      <input
                                        type="text"
                                        className="point"
                                        placeholder="Điểm"
                                      />
                                      <button
                                        type="submit"
                                        className="btn-form-Scoring"
                                      >
                                        <GoCheck />
                                      </button>
                                      <button
                                        type="button"
                                        className="btn-form-Scoring"
                                        onClick={handleCancelScoring}
                                      >
                                        <GoX />
                                      </button>
                                    </div>
                                    <div className="form-bottom">
                                      <input
                                        type="text"
                                        className="Comment"
                                        placeholder="Nhận xét"
                                      />
                                    </div>
                                  </form>
                                </div>
                              )}
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
    </div>
  );
};
export default AdminContestResults;
