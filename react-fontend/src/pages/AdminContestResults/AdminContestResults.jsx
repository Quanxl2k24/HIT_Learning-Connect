import "./AdmincontestResults.scss";
import SideBar from "../../components/SideBar/SideBar";
const AdminContestResults = () => (
  <div className="AdminContestResults-container">
    <div className="AdminContestResults">
      <div className="AdminContestResults_left">
        <SideBar />
      </div>
      <div className="AdminContestResults_right">
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
                <p>Kết quả contest: api:.....</p>
              </div>

              <div className="table-box-contest-results">
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>NGười tham gia</th>
                      <th>File đã nộp</th>
                      <th>Điểm số</th>
                      <th>Thứ hạng</th>
                      <th>Hành động</th>
                    </tr>
                  </thead>
                  {/* <tbody>
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
                              <button
                                className="btn-show-result"
                                onClick={() =>
                                  handleChangePageReults(item.contestId)
                                }
                              >
                                Xem kết quả
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody> */}
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default AdminContestResults;
