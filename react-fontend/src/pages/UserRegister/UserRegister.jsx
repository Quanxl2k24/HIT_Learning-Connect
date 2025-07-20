import "./UserRegister.scss";
import SideBar from "../../components/SideBar/SideBar";
import img_class from "../../assets/imgs/img_class.png";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllClass } from "../../redux/userClass/userClassActions";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const UserRegister = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllClass());
  }, []);

  const listClass = useSelector((state) => state.userClass.listClass);
  const navigate = useNavigate();
  const handleShowDetailsClass = (data) => {
    navigate("/User/Register/Class/Details", { state: data });
  };

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
              <h1>Các lớp học của CLB</h1>
            </div>

            <div className="list-class">
              {listClass.map((item, index) => (
                <button
                  onClick={() => handleShowDetailsClass(listClass[index])}
                >
                  <div className="box-class" key={index}>
                    <div className="img-class">
                      <img src={img_class} alt="" />
                    </div>
                    <div className="text-class">
                      <h3>{item.title}</h3>
                      <p>{item.teacherFullName}</p>
                      <p>
                        {item.startDate} - {item.endDate}
                      </p>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserRegister;
