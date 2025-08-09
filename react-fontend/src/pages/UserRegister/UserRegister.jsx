import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./UserRegister.scss";
import SideBar from "../../components/SideBar/SideBar";
import img_class from "../../assets/imgs/img_class.png";
import UserGetAllClassByRegister from "../../hooks/useGetAllClass";

const UserRegister = () => {
  const [data, setData] = useState([]);
  const getallclass = UserGetAllClassByRegister();
  const fetchData = async () => {
    const res = await getallclass();
    setData(res);
  };
  console.log("data", data);

  useEffect(() => {
    fetchData();
  }, []);

  // setListClass(data);
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
              {Array.isArray(data) &&
                data.map((item, index) => (
                  <button onClick={() => handleShowDetailsClass(item)}>
                    <div className="box-class-register" key={index}>
                      <div className="img-class">
                        <img src={img_class} alt="" />
                      </div>
                      <div className="text-class-register">
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
