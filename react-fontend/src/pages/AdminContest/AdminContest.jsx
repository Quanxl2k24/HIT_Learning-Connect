import "./AdminContest.scss";
import SideBar from "../../components/SideBar/SideBar";
import SearchBox from "../../assets/imgs/searchBoxUser.png";
import DelButton from "../../assets/imgs/img_Del.png";
import EditButton from "../../assets/imgs/img_Edit.png";
import UserGetAllContestByAdmin from "../../hooks/useGetAllContestByAdmin";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useDeleteContestByAdmin from "../../hooks/useDeleteContestByAdmin";
import BoxConfirmDelete from "../../components/BoxConfrimDelete/BoxConfirmDelete";
import BoxNotification from "../../components/BoxNotificaton/BoxNotifiacation";
import useSearchContestByAdmin from "../../hooks/useSearchContestByAdmin";
const AdminContest = () => {
  //useState
  const [showToast, setShowToast] = useState(false);
  const [text, setText] = useState("");
  const [statusBox, setStatusBox] = useState(null);

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

  //handleChangePageReults
  const handleChangePageReults = (id, title) => {
    console.log(">>>>", title);
    navigate(`/Admin/Contest/Results?contestId=${id}&Contest=${title}`);
  };

  //handleDeleteContest
  const [idDel, setIdDel] = useState(null);
  const [ShowConfirm, setShowConfirm] = useState(false);
  const deletecontest = useDeleteContestByAdmin();
  const handleDeleteContest = async (contestId) => {
    setShowConfirm(true);
    setIdDel(contestId);
  };
  const handleDeleteBoxConfirm = async () => {
    const res = await deletecontest(idDel);
    await fetchData();
    setIdDel(null);
    setShowConfirm(false);
    if (res) {
      setShowToast(true);
      setText("Xoá contest thành công");
      setStatusBox(true);
    } else {
      setShowToast(true);
      setText("Xoá contest không thành công");
      setStatusBox(false);
    }
  };
  const handleCancel = () => {
    setShowConfirm(false);
  };

  //handle search contest
  const [keyword, setKeyword] = useState("");
  const searchcontest = useSearchContestByAdmin();
  const search = async () => {
    const res = await searchcontest(keyword);
    setData(res);
  };
  const handleSearch = () => {
    if (keyword !== "") {
      search();
    } else {
      fetchData();
    }
  };

  return (
    <div className="AdminContest-container">
      <div className="AdminContest">
        {showToast && (
          <BoxNotification
            message={text}
            status={statusBox}
            onClose={() => setShowToast(false)}
          />
        )}
        <div className="BoxConfirm-container">
          <BoxConfirmDelete
            display={ShowConfirm}
            handleCancel={handleCancel}
            handleDeleteBoxConfirm={handleDeleteBoxConfirm}
          />
        </div>
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
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                    />
                  </div>

                  <div className="but-box">
                    <button
                      type="button"
                      onClick={handleSearch}
                      className="but-add"
                    >
                      Tìm kiếm
                    </button>

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
                            <td>{item.contestId}</td>
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
                            <td className="status-contest">
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
                            </td>
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
                                  onClick={() =>
                                    handleDeleteContest(item.contestId)
                                  }
                                >
                                  <img
                                    className="img-btn"
                                    src={DelButton}
                                    alt=""
                                  />
                                </button>
                                <button
                                  className="btn-show-result"
                                  onClick={() =>
                                    handleChangePageReults(
                                      item.contestId,
                                      item.title
                                    )
                                  }
                                >
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
