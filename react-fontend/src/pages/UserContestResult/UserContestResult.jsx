import "./UserContestResult.scss";
import SideBar from "../../components/SideBar/SideBar";
import img_cup from "../../assets/imgs/img_cup.png";
import { useNavigate } from "react-router-dom";
const UserContestResult = () => {
  //handleback
  const navigate = useNavigate();
  const handleback = () => {
    navigate(`/User/Contest`);
  };

  
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
                  <p>Kết quả: .... </p>
                </div>

                <div className="contest-content">
                  <div className="point">
                    <p className="title-point">Kết quả của bạn</p>
                    <div className="box-point">
                      <div className="point-left">
                        <p>Điểm số</p>
                        <div>
                          <h1>api/100</h1>
                        </div>
                      </div>

                      <div className="point-right">
                        <p>Thứ hạng</p>
                        <div className="point-right-content">
                          <img src={img_cup} alt="" />
                          <h1>api</h1>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="file">
                    <p className="title-file">File đã nộp</p>
                    <div className="box-file">
                      <a href="#">Bài làm đã nộp</a>
                    </div>
                  </div>

                  <div className="comment">
                    <p className="title-comment">Nhận xét</p>
                    <div className="box-comment">
                      <p>api</p>
                    </div>
                  </div>

                  <div className="table-result">
                    <table>
                      <tr>
                        <th>Thứ hạng</th>
                        <th>Tên người tham gia</th>
                        <th>Điểm số</th>
                      </tr>

                      <tr>
                        <td>api</td>
                        <td>api</td>
                        <td>api</td>
                      </tr>
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
