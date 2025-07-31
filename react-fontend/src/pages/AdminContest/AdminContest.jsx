import "./AdminContest.scss";
import SideBar from "../../components/SideBar/SideBar";
import SearchBox from "../../assets/imgs/searchBoxUser.png";
import DelButton from "../../assets/imgs/img_Del.png";
import EditButton from "../../assets/imgs/img_Edit.png";
import UserGetAllContestByAdmin from "../../hooks/useGetAllContestByAdmin";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const AdminContest = () => {
  //call api lay tat ca contest
  const [data, setData] = useState([]);
  const usegetcontestbyadmin = UserGetAllContestByAdmin();
  const fetchData = async () => {
    const res = await usegetcontestbyadmin();
    setData(res);
  };
  useEffect(() => {
    fetchData();
  }, []);
  console.log("data", data);

  //handle edit
  const navigate = useNavigate();
  const handleEdit = (id) => {
    navigate(`/Admin/Contest/Edit?contestId=${id}`);
  };

  // handle change page
  const handleChangePage = () => {
    navigate("/Admin/Contest/Create");
  };

  // handleChangePageDetails
  const handleChangePageDetails = (id) => {
    navigate(`/Admin/Contest/Details?contestId=${id}`);
  };
  return (
    <div className="AdminContest-container">
      <div className="AdminContest">
        <div className="AdminContest_left">
          <SideBar />
        </div>

        <div className="AdminContest_right">
          <div className="AdminContest_right--banner">
            <div className="logo-banner"></div>
            <div className="title-banner">
              <h3>Contest online</h3>
            </div>
          </div>
          <div className="AdminContest_right--content">
            <div className="box-container">
              <div className="box">
                <div className="title-box">
                  <p>Danh sách contest</p>
                </div>

                <div className="SearchAndAdd-box">
                  <div className="search">
                    <div className="imgSearch">
                      <img src={SearchBox} alt="" />
                    </div>
                    <input
                      type="text"
                      placeholder="Tìm kiếm theo username, fullname, email"
                    />
                  </div>

                  <div className="but-box">
                    <button className="but-add">Tìm kiếm</button>

                    <button className="but-add" onClick={handleChangePage}>
                      <span>+ </span> Thêm
                    </button>
                  </div>
                </div>

                <div className="table-box-contest">
                  <table>
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Tên Contest</th>
                        <th>Thời gian bắt đầu</th>
                        <th>Thời gian kết thúc</th>
                        <th>Trạng Thái</th>
                        <th>Hành động</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Array.isArray(data) &&
                        data.map((item, index) => (
                          <tr key={index}>
                            <td style={{ width: "100px" }}>{item.contestId}</td>
                            <td>
                              <button
                                className="btn-details"
                                onClick={() =>
                                  handleChangePageDetails(item.contestId)
                                }
                              >
                                {item.title}
                              </button>
                            </td>
                            <td>{item.startTime}</td>
                            <td>{item.endTime}</td>
                            <td>{item.status}</td>
                            <td>
                              <div className="admin-contest-btn">
                                <button
                                  className="admin-contest-btn-Edit"
                                  onClick={() => handleEdit(item.contestId)}
                                >
                                  <img
                                    className="img-btn"
                                    src={EditButton}
                                    alt=""
                                  />
                                </button>
                                <button
                                  className="admin-contest-btn-Del"
                                  onClick={() => handleDelete(item.classId)}
                                >
                                  <img
                                    className="img-btn"
                                    src={DelButton}
                                    alt=""
                                  />
                                </button>
                                <button className="btn-show-result">
                                  Xem kết quả
                                </button>
                              </div>
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

export default AdminContest;
