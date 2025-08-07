import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import "./UserDoContest.scss";
import SideBar from "../../components/SideBar/SideBar";
import useGetContestByContestId from "../../hooks/useGetContestByContestId";
import usePushFile from "../../hooks/usePushFile";
const UserDoContest = () => {
  //lay param
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const contestId = params.get("contestId");

  //handleBack
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/User/Contest");
  };

  // api lay chi tiet contest
  const [data, setData] = useState([]);
  const getcontestbyid = useGetContestByContestId();
  const fetchDataContestById = async (id) => {
    const res = await getcontestbyid(id);
    setData(res);
  };
  useEffect(() => {
    fetchDataContestById(contestId);
  }, []);

  // call api push file
  const pushfile = usePushFile();
  const handlePushfile = async () => {
    const resFile = await pushfile(selectedFile);
    console.log(resFile);
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
  return (
    <div className="UserDoContest-conatainer">
      <div className="UserDoContest">
        <div className="UserDoContest_left">
          <SideBar />
        </div>
        <div className="UserDoContest_right">
          <div className="UserDoContest_right--banner">
            <div className="logo-banner"></div>
            <div className="title-banner">
              <h3>Contest online</h3>
            </div>
          </div>

          <div className="UserDoContest_right--content">
            <div className="box-container">
              <div className="box">
                <div className="title-box">
                  <p>Nộp bài</p>
                </div>

                <div className="content-contest">
                  <div className="contest-title">
                    <h1>{data.title}</h1>
                  </div>
                  <div className="title-problem">Đề bài</div>
                  <div className="problem">
                    <button className="btn-problem">
                      <div>
                        <a href={data.urlFile} className="a-problem">
                          Đề bài
                        </a>
                      </div>
                      <div className="data-start-end">
                        <p className="date">Ngày tạo: {data.startTime}</p>
                        <p className="date">Ngày kết thúc: {data.startTime}</p>
                      </div>
                    </button>
                  </div>
                  <div className="title-description">
                    <p>Mô tả</p>
                  </div>
                  <div className="description">
                    <p>{data.description}</p>
                  </div>
                  <div className="title-submit">
                    <p>Nộp bài</p>
                  </div>
                  <div className="box-submit">
                    <div className="push-file">
                      <input type="file" onChange={handleChangeFile} />
                      <button
                        className="btn-push-file"
                        onClick={handlePushfile}
                      >
                        Tải tệp lên
                      </button>
                    </div>
                    <div className="btn-container">
                      <button className="btn-submit">Nộp bài</button>
                    </div>
                  </div>
                  <div className="btn-back">
                    <button onClick={handleBack}>Quay Lại</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserDoContest;
