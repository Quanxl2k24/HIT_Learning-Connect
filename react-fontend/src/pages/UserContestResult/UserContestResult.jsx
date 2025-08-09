import "./UserContestResult.scss";
import SideBar from "../../components/SideBar/SideBar";
import img_cup from "../../assets/imgs/img_cup.png";
const UserContestResult = () => {
  return (
    <div className="UserContestResult-container">
      <div className="UserContestResult">
        <div className="UserContestResult_left">
          <SideBar />
        </div>
        <div className="UserContestResult_right">
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
                  <p>Kết quả: .... </p>
                </div>

                <div className="contest-result-content">
                  <div className="point">
                    <p>Kết quả của bạn</p>
                    <div className="box-point">
                      <div className="point-left">
                        <p>Điểm số</p>
                        <div>
                          <h1>api/100</h1>
                        </div>
                      </div>

                      <div className="point-right">
                        <p>Thứ hạng</p>
                        <div>
                          <img src={img_cup} alt="" />
                          <h1>api</h1>
                        </div>
                      </div>
                    </div>
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
