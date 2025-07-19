import "./UserRegister.scss";
import SideBar from "../../components/SideBar/SideBar";
const UserRegister = () => {
  return (
    <div className="UserRegister-conatainer">
      <div className="UserRegister">
        <div className="Home_left">
          <SideBar />
        </div>
        <div className="UserRegister_right">
          <div className="UserRegister_right--banner">
            <div className="logo-banner"></div>
            <div className="title-banner">
              <h3>Đăng ký lớp học</h3>
            </div>
          </div>

          <div className="UserRegister_right--content">
                <div className="title-content">
                    
                </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserRegister;
