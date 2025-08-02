import "./UserContestDetails.scss";
import SideBar from "../../components/SideBar/SideBar";
const UserContestDetails = () => {
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
                    <h1>Title: api....</h1>
                  </div>

                  <div className="box-date">
                    <div className="date">
                      <p className="date-title">Thời gian bắt đầu</p>
                      <p>2025/1/1</p>
                    </div>
                    <div className="date">
                      <p className="date-title">Thời gian bắt đầu</p>
                      <p>2025/1/5 </p>
                    </div>
                  </div>

                  <div className="description">
                    <p className="description-title">Mô tả contest</p>
                    <p>kkkkkkkk</p>
                  </div>

                  <div className="url-file">
                    <p className="url-file-title">File hướng dẫn</p>
                    <p>urllll</p>
                  </div>

                  <div className="btn-content-details">
                    <button
                      className="btn btn-edit"
                      //   onClick={handleChangePageEdit}
                    >
                      Đăng ký
                    </button>
                    <button
                      className="btn btn-cancel"
                      //  onClick={handleBackPage}
                    >
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
