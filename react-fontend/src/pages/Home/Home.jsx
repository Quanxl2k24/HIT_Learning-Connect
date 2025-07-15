import { useNavigate, Link } from "react-router-dom";
import SideBar from "../../components/SideBar/SideBar";
import "./Home.scss";
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
        </div>
      </div>
    </div>
  );
};

export default Home;
