import "./UserContestDetails.scss";
import SideBar from "../../components/SideBar/SideBar";
import { useLocation, useNavigate } from "react-router-dom";
import useGetContestByContestId from "../../hooks/useGetContestByContestId";
import { useEffect, useState } from "react";
import { LuArrowDownToLine } from "react-icons/lu";
const UserContestDetails = () => {
  //lay param
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const contestId = params.get("contestId");

  //handleBackPage
  const navigate = useNavigate();
  const handleBackPage = () => {
    navigate("/User/Contest");
  };

  // call pai lay thong tin chi contest
  const [data, setData] = useState([]);
  const getcontestbyid = useGetContestByContestId();
  const fetchDataContestById = async (id) => {
    const res = await getcontestbyid(id);
    setData(res);
  };
  console.log(data);

  useEffect(() => {
    fetchDataContestById(contestId);
  }, []);

  return (
    <div className="UserContestDetails-container">
      <div className="UserContestDetails">
        <div className="UserContestDetails_left">
          <SideBar />
        </div>

        <div className="UserContestDetails_right">
          <div className="UserContestDetails_right--banner">
            <div className="logo-banner"></div>
            <div className="title-banner">
              <h3>Contest online</h3>
            </div>
          </div>

          <div className="UserContestDetails_right--content">
            <div className="box-container">
              <div className="box">
                <div className="title-box">
                  <p>Chi tiết contest</p>
                </div>

                <div className="content-contest">
                  <div className="title-contest">
                    <h1>{data.title}</h1>
                  </div>

                  <div className="box-date">
                    <div className="date">
                      <p className="date-title">Thời gian bắt đầu</p>
                      <p>{data.startTime}</p>
                    </div>
                    <div className="date">
                      <p className="date-title">Thời gian bắt đầu</p>
                      <p>{data.endTime}</p>
                    </div>
                  </div>

                  <div className="description">
                    <p className="description-title">Mô tả contest</p>
                    <p>{data.description}</p>
                  </div>

                  <div className="url-file">
                    <p className="url-file-title">File hướng dẫn</p>
                    <a href={data.fileUrl}>
                      <button>
                        <LuArrowDownToLine />
                        Tải tài liệu
                      </button>
                    </a>
                  </div>

                  <div className="btn-content-details">
                    <button
                      className="btn btn-edit"
                      //   onClick={handleChangePageEdit}
                    >
                      Đăng ký
                    </button>
                    <button className="btn btn-cancel" onClick={handleBackPage}>
                      Huỷ
                    </button>
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

export default UserContestDetails;
