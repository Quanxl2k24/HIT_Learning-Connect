import "./UserContestResult.scss";
import SideBar from "../../components/SideBar/SideBar";
import img_cup from "../../assets/imgs/img_cup.png";
import { useLocation, useNavigate } from "react-router-dom";
import useGetSubmissionByUser from "../../hooks/useGetSubmissionByUser";
import { useEffect, useState } from "react";

const UserContestResult = () => {
  //lay params
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const contestId = params.get("contestId");

  //handleback
  const navigate = useNavigate();
  const handleback = () => {
    navigate(`/User/Contest`);
  };

  //call api lasy submission
  const [data, setData] = useState([]);
  const getsubmission = useGetSubmissionByUser();
  const fetchData = async () => {
    const res = await getsubmission(contestId);
    const sorted = [...res].sort((a, b) => b.highestScore - a.highestScore);
    setData(sorted);
  };
  useEffect(() => {
    fetchData();
  }, []);
  console.log("data", data);

  //loc data
  const [data_2, setData_2] = useState([]);

  const filterData = () => {
    const userName = localStorage.getItem("userName");
    const filtered = data.filter((item) => item.username === userName);
    setData_2(filtered);
  };

  useEffect(() => {
    filterData();
  }, [data]);

  console.log(">>>>", data_2);

  //xu li data da loc
  const [index, setIndex] = useState(null);
  const HighestScore = () => {
    if (data_2.length === 0) return null;

    let tmp = data_2[0].highestScore;
    let tmp_2 = 0;
    for (let i = 1; i < data_2.length; i++) {
      if (tmp < data_2[i].highestScore) {
        tmp = data_2[i].highestScore;
        tmp_2 = i;
      }
    }
    return tmp_2;
  };

  useEffect(() => {
    const maxScore = HighestScore();
    setIndex(maxScore);
  }, [data_2]);

  return (
    <div className="UserContestResult-container">
      <div className="UserContestResult">
        <div className="UserContestResult_left">
          <SideBar />
        </div>
        <div className="UserContestResult_right">
          <div className="UserContestResult_right--banner">
            <div className="logo-banner"></div>
            <div className="title-banner">
              <h3>Contest online</h3>
            </div>
          </div>

          <div className="UserContestResult_right--content">
            <div className="box-container">
              <div className="box">
                <div className="title-box">
                  <p>Kết quả</p>
                </div>

                <div className="contest-content">
                  <div className="point">
                    <p className="title-point">Kết quả của bạn</p>
                    <div className="box-point">
                      <div className="point-left">
                        <p>Điểm số</p>
                        <div className="h1-point">
                          <h1>
                            <span>
                              {index !== null &&
                                Array.isArray(data) &&
                                data[index].highestScore}
                            </span>
                            /100
                          </h1>
                        </div>
                      </div>

                      <div className="point-right">
                        <p>Thứ hạng</p>
                        <div className="point-right-content">
                          <img src={img_cup} alt="" />
                          <h1>{index + 1}</h1>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="file">
                    <p className="title-file">File đã nộp</p>
                    <div className="box-file">
                      <a
                        href={
                          index !== null &&
                          Array.isArray(data) &&
                          data[index].fileUrl
                        }
                      >
                        Bài làm đã nộp
                      </a>
                    </div>
                  </div>

                  <div className="comment">
                    <p className="title-comment">Nhận xét</p>
                    <div className="box-comment">
                      <p>
                        {index !== null &&
                          Array.isArray(data) &&
                          data[index].resultSummary}
                      </p>
                    </div>
                  </div>

                  <div className="table-result">
                    <table>
                      <tr>
                        <th>Thứ hạng</th>
                        <th>Tên người tham gia</th>
                        <th>Điểm số</th>
                      </tr>
                      {Array.isArray(data) &&
                        data.map((item, index) => (
                          <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{item.username}</td>
                            <td>{item.highestScore}</td>
                          </tr>
                        ))}
                      {/* <tr>
                        <td>api</td>
                        <td>api</td>
                        <td>api</td>
                      </tr> */}
                    </table>
                  </div>

                  <div className="btn-back">
                    <button onClick={handleback}>Quay lại</button>
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

export default UserContestResult;
