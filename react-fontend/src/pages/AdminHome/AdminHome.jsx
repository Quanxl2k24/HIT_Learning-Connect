import { useNavigate, Link } from "react-router-dom";
import SideBar from "../../components/SideBar/SideBar";
import "./AdminHome.scss";
import img_class from "../../assets/imgs/img_class.png";
import img_background from "../../assets/imgs/img_background.png";
import useGetAllClassAccpet from "../../hooks/useGetAllClassAccpet";
import { useEffect, useState } from "react";
import { FaPeopleGroup } from "react-icons/fa6";
import { SiGoogleclassroom } from "react-icons/si";
import { MdAdminPanelSettings } from "react-icons/md";
import useGetTotal from "../../hooks/useGetTotal";

const AdminHome = () => {
  //api lay thong tin chung
  const [data, setData] = useState([]);
  const gettotal = useGetTotal();
  const fetchdata = async () => {
    const res = await gettotal();
    setData(res);
  };

  useEffect(() => {
    fetchdata();
  }, []);

  console.log(data);

  return (
    <div>
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
            </div>

            <div className="Home_right--content">
              <div className="title-content">
                <h1>Thông tin chung</h1>
              </div>

              <div className="list-box">
                <div className="box">
                  <div className="icon">
                    <SiGoogleclassroom />
                  </div>
                  <div className="text-box">
                    <h1>{data.totalClass}</h1>
                    <p>Tổng số lớp học</p>
                  </div>
                </div>
                <div className="box">
                  <div className="icon">
                    <FaPeopleGroup />
                  </div>
                  <div className="text-box">
                    <h1>{data.totalUser}</h1>
                    <p>Tổng số học viên</p>
                  </div>
                </div>
                <div className="box">
                  <div className="icon">
                    <MdAdminPanelSettings />
                  </div>
                  <div className="text-box">
                    <h1>{data.totalAdmin}</h1>
                    <p>Tổng số lớp học</p>
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

export default AdminHome;
