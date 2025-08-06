import { useLocation, useNavigate } from "react-router-dom";
import SideBar from "../../components/SideBar/SideBar";
import "./AdminContestDetails.scss";
import useGetContestDetails from "../../hooks/useGetContestDetails";
import { useEffect, useState } from "react";

const AdminContestDetails = () => {
  //lay param
  const loction = useLocation();
  const params = new URLSearchParams(loction.search);
  const contestId = params.get("contestId");

  const navigate = useNavigate();
  //handle back page
  const handleBackPage = () => {
    navigate("/Admin/Contest");
  };

  //handle change edit
  const handleChangePageEdit = () => {
    navigate(`/Admin/Contest/Edit?contestId=${contestId}`);
  };

  // call api lay du lieu
  const [data, setData] = useState([]);
  const getcontestdetails = useGetContestDetails();
  const fetchData = async () => {
    const res = await getcontestdetails(contestId);
    setData(res);
  };
  console.log(data);

  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div className="AdminContestDetails-container">
      <div className="AdminContestDetails">
        <div className="AdminContestDetails_left">
          <SideBar />
        </div>
        <div className="AdminContestDetails_right">
          <div className="AdminContestDetails_right--banner">
            <div className="logo-banner"></div>
            <div className="title-banner">
              <h3>Contest online </h3>
            </div>
          </div>

          <div className="AdminContestDetails_right--content">
            <div className="box-container">
              <div className="box">
                <div className="title-box">
                  <p>Chi tiết contest</p>
                </div>
                <div className="box-content">
                  <div className="title-contest">
                    <h1>{data?.title}</h1>
                  </div>
                  <div className="box-date">
                    <div className="date">
                      <p className="date-title">Thời gian bắt đầu</p>
                      <p>{data?.startTime}</p>
                    </div>
                    <div className="date">
                      <p className="date-title">Thời gian bắt đầu</p>
                      <p>{data?.endTime}</p>
                    </div>
                  </div>

                  <div className="description">
                    <p className="description-title">Mô tả contest</p>
                    <p>{data?.description}</p>
                  </div>

                  <div className="url-file">
                    <p className="url-file-title">File hướng dẫn</p>
                    <a href={data.urlFile}>Chi tiết hướng dẫn</a>
                    <p></p>
                  </div>

                  <div className="btn-content-details">
                    <button
                      className="btn btn-edit"
                      onClick={handleChangePageEdit}
                    >
                      Chỉnh sửa
                    </button>
                    <button className="btn btn-cancel" onClick={handleBackPage}>
                      Quay lại
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

export default AdminContestDetails;
