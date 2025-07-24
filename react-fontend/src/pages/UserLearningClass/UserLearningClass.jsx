import "./UserLearningClass.scss";
import SideBar from "../../components/SideBar/SideBar";
const UserLearningClass = () => {
  return (
    <div className="UserLearningClass-container">
      <div className="UserLearningClass">
        <div className="UserLearningClass_left">
          <SideBar />
        </div>

        <div className="UserLearningClass_right">
          <div className="UserLearningClass_right--banner">
            <div className="logo-banner"></div>
            <div className="title-banner">
              <h3>khoá học</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLearningClass;
