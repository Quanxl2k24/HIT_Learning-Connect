import "./UserDoContest.scss";
import SideBar from "../../components/SideBar/SideBar";
import { useNavigate } from "react-router-dom";
const UserDoContest = () => {
  //handleBack
  const navigate = useNavigate();
  const handleBack = () => {
    navigate("/User/Contest");
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
                  <p>Teen contest: api....</p>
                </div>

                <div className="content-contest">
                  <div className="contest-title">
                    <h1>Api.... </h1>
                  </div>
                  <div className="title-problem">Đề bài</div>
                  <div className="problem">
                    <button className="btn-problem">
                      <div>
                        <p>đề bài</p>
                      </div>
                      <div>
                        <p>Ngày tạo: </p>
                      </div>
                    </button>
                  </div>
                  <div className="title-description">
                    <p>Mô tả</p>
                  </div>
                  <div className="description">
                    <p>Api.....</p>
                  </div>
                  <div className="title-submit">
                    <p>Nộp bài</p>
                  </div>
                  <div className="box-submit">
                    <div className="push-file">
                      <input type="file" />
                      <button className="btn-push-file">Tải tệp lên</button>
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
