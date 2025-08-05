import "./UserContest.scss";
import SideBar from "../../components/SideBar/SideBar";
import useGetAllContestByUser from "../../hooks/useGetAllContestByUser";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useDeleteContestByAdmin from "../../hooks/useDeleteContestByAdmin";
const UserContest = () => {
  // call api get all contest
  const [data, setData] = useState([]);
  const getcontestbyuser = useGetAllContestByUser();
  const fetchData = async () => {
    const res = await getcontestbyuser();
    setData(res);
  };
  useEffect(() => {
    fetchData();
  }, []);
  console.log("data: ", data);

  //handleChangePageDetails
  const navigate = useNavigate();
  const handleChangePageDetails = (contestId) => {
    navigate(`/User/Contest/Details?contestId=${contestId}`);
  };

  // handleChangePageDoContest
  const handleChangePageDoContest = (contestId) => {
    navigate(`/User/Contest/DoContest?contestId=${contestId}`);
  };

  return (
    <div className="UserContest-container">
      <div className="UserContest">
        <div className="UserContest_left">
          <SideBar />
        </div>

        <div className="UserContest_right">
          <div className="UserContest_right--banner">
            <div className="logo-banner"></div>
            <div className="title-banner">
              <h3>Contest online</h3>
            </div>
          </div>

          <div className="UserContest_right--content">
            <div className="box-container">
              <div className="box">
                <div className="title-box">
                  <h1>Danh sách contest</h1>
                </div>

                <div className="content-contest">
                  <div className="list-contest">
                    {Array.isArray(data) &&
                      data.map((item, index) => (
                        <div className="contest" key={index}>
                          <div className="title-contest">
                            <h1>
                              <button
                                onClick={() =>
                                  handleChangePageDetails(item.contestId)
                                }
                              >
                                {item.title}
                              </button>
                            </h1>
                          </div>
                          <div className="date-contest">
                            <p>
                              {item.startTime} - {item.endTime}
                            </p>
                          </div>
                          <div className="contest-status">
                            {item.status == "Has Ended" ? (
                              <p className="contest-status-completed">
                                Đã kết thúc
                              </p>
                            ) : item.status == "Opening" ? (
                              <p className="contest-status-progress">
                                Đang diễn ra
                              </p>
                            ) : (
                              <p className="contest-status-upcoming">
                                Sắp diễn ra
                              </p>
                            )}
                          </div>
                          <div className="btn-contest-details">
                            {item.hasJoined && (
                              <button
                                onClick={() =>
                                  handleChangePageDoContest(item.contestId)
                                }
                              >
                                Tham gia
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    {/* <div className="contest">
                      <div className="title-contest">
                        <h1>Conets 1: Api....</h1>
                      </div>
                      <div className="date-contest">
                        <p>Thời gian: api....</p>
                      </div>
                      <div className="contest-status">
                        <p className="contest-status-progress">Đang diễn ra</p>
                        <p className="contest-status-upcoming">Sắp diễn ra</p>
                        <p className="contest-status-completed">Đã kết thúc</p>
                      </div>
                      <div className="btn-contest-details">
                        <button>Đăng ký</button>
                      </div>
                    </div> */}
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
export default UserContest;
