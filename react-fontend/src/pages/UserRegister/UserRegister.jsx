import "./UserRegister.scss";
import SideBar from "../../components/SideBar/SideBar";
import img_class from "../../assets/imgs/img_class.png";

const listClass = [
  {
    title: "Photoshop",
    leader: "Bui Anh Quan",
    day: "12/12/2024",
  },
  {
    title: "Photoshop",
    leader: "Bui Anh Quan",
    day: "12/12/2024",
  },
  {
    title: "Photoshop",
    leader: "Bui Anh Quan",
    day: "12/12/2024",
  },
  {
    title: "Photoshop",
    leader: "Bui Anh Quan",
    day: "12/12/2024",
  },
  {
    title: "Photoshop",
    leader: "Bui Anh Quan",
    day: "12/12/2024",
  },
  {
    title: "Photoshop",
    leader: "Bui Anh Quan",
    day: "12/12/2024",
  },
  {
    title: "Photoshop",
    leader: "Bui Anh Quan",
    day: "12/12/2024",
  },
  {
    title: "Photoshop",
    leader: "Bui Anh Quan",
    day: "12/12/2024",
  },
  {
    title: "Photoshop",
    leader: "Bui Anh Quan",
    day: "12/12/2024",
  },
  {
    title: "Photoshop",
    leader: "Bui Anh Quan",
    day: "12/12/2024",
  },
  {
    title: "Photoshop",
    leader: "Bui Anh Quan",
    day: "12/12/2024",
  },
  {
    title: "Photoshop",
    leader: "Bui Anh Quan",
    day: "12/12/2024",
  },
  {
    title: "Photoshop",
    leader: "Bui Anh Quan",
    day: "12/12/2024",
  },
  {
    title: "Photoshop",
    leader: "Bui Anh Quan",
    day: "12/12/2024",
  },
];

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
              <h1>Các lớp học của CLB</h1>
            </div>

            <div className="list-class">
              {listClass.map((item, index) => (
                <div className="box-class" key={index}>
                  <div className="img-class">
                    <img src={img_class} alt="" />
                  </div>
                  <div className="text-class">
                    <h3>{item.title}</h3>
                    <p>{item.leader}</p>
                    <p>{item.day}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default UserRegister;
