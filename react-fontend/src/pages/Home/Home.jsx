import { useNavigate, Link } from "react-router-dom";
import SideBar from "../../components/SideBar/SideBar";
import "./Home.scss";
import img_class from "../../assets/imgs/img_class.png";
import img_background from "../../assets/imgs/img_background.png";
import useGetAllClassAccpet from "../../hooks/useGetAllClassAccpet";
import { useEffect, useState } from "react";
const Home = () => {
  // chuyen trang
  const navigate = useNavigate();
  // call api
  const [data, setData] = useState([]);
  const getallclassaccpet = useGetAllClassAccpet();
  const fetchdata = async () => {
    const res = await getallclassaccpet();
    setData(res?.data?.data?.content);
  };

  useEffect(() => {
    fetchdata();
  }, []);

  //handle change page

  const handleChangePage = ({ classId, classTitle }) => {
    navigate(
      `/Home/User/Learning/Class?classId=${classId}&classTitle=${classTitle}`
    );
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
            <div className="img-bannerHomePage">
              <img src={img_background} alt="" />
            </div>

            {/* <div className="content-container">
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
            </div> */}
          </div>

          <div className="Home_right--content">
            <div className="title-content">
              <h1>Các khoá học</h1>
            </div>

            <div className="list-class">
              {data &&
                data.map((item, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      handleChangePage({
                        classId: item.classRoom.classId,
                        classTitle: item.classTitle,
                      })
                    }
                  >
                    <div className="box-class">
                      <div className="img-class">
                        <img src={img_class} alt="" />
                      </div>
                      <div className="text-class">
                        <h3>{item.classTitle}</h3>
                        <p>{item.classRoom.teacherFullName}</p>
                        <p>
                          {item.classRoom.startDate} - {item.classRoom.endDate}
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

export default Home;
