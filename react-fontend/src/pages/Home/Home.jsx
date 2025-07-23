import { useNavigate, Link } from "react-router-dom";
import SideBar from "../../components/SideBar/SideBar";
import "./Home.scss";
import img_class from "../../assets/imgs/img_class.png";
const Home = () => {
  const navigate = useNavigate();
  const handleNavigateLogin = () => {
    navigate("/login");
  };

  return (
    <div className="Home">
      {/* component sidebar */}
      <div className="Home_left">
        <SideBar />
      </div>

      <div className="Home_right">
        <div className="banner-container">
          <div className="Home_right--banner">
            <div className="img-bannerHomePage"></div>

            <div className="content-container">
              <div className="content-banner">
                <div className="content-banner_h1">
                  <h1>Câu lạc bộ Tin Học HIT</h1>
                </div>

                <div className="content-banner_p">
                  Truyền lửa đam mê qua từng bài học, phát huy năng lực, chạm
                  tới thành công cùng cộng đồng học tập của HIT.
                </div>

                <Link to="#">
                  <button className="but_class">Học ngay thôi nào!!</button>
                </Link>
              </div>
            </div>
          </div>

          <div className="Home_right--content">
            <div className="title-content">
              <h1>Các khoá học</h1>
            </div>

            <div className="list-class">
              <button>
                <div className="box-class">
                  <div className="img-class">
                    <img src={img_class} alt="" />
                  </div>
                  <div className="text-class">
                    <h3>heheeh</h3>
                    <p>teacherFullName</p>
                    <p>startDate - endDate</p>
                  </div>
                </div>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
