import { Navigate, useLocation, useNavigate } from "react-router-dom";
import "./UserLearningClass.scss";
import SideBar from "../../components/SideBar/SideBar";
import useGetAllDocumentByUser from "../../hooks/useGetAllDocumentByUser";
import { useEffect, useState } from "react";

const UserLearningClass = () => {
  // lay classId bang param
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const classId = params.get("classId");
  const classTitle = params.get("classTitle");
  // call api lay doc
  const [data, setData] = useState([]);
  const getdocumnet = useGetAllDocumentByUser();
  const fetchdata = async () => {
    const res = await getdocumnet(classId);
    setData(res.data.data);
  };

  useEffect(() => {
    fetchdata();
  }, []);

  //handleChangePage
  const navigate = useNavigate();
  const handleChangePage = (documentId) => {
    navigate(
      `/Home/User/Learning/Class/Details?classId=${classId}&classTitle=${classTitle}&documentId=${documentId}`
    );
  };
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
              <h3>{classTitle}</h3>
            </div>
          </div>

          <div className="UserLearningClass_right--box">
            <div className="box-conatiner">
              <div className="title-box">
                <h1>Danh sách buổi học</h1>
              </div>
              <div className="list-card">
                {data &&
                  data.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => handleChangePage(item.id)}
                    >
                      <div className="card-lesson">
                        <div className="card-title">
                          <h2>{item.title}</h2>
                          <p>Ngày tạo: {item.createdAt}</p>
                          <p>Nội dung: {item.description}</p>
                        </div>
                      </div>
                    </button>
                  ))}
                {/* <button>
                  <div className="card-lesson">
                    <div className="card-title">
                      <h2>Buổi 1: Giới thiệu về</h2>
                      <p>Ngay tao: 12/12/2025</p>
                      <p>Noi dung: cai dat abc</p>
                    </div>
                  </div>
                </button> */}
              </div>
            </div>
          </div>

          <div className="UserLearningClass_right--card"></div>
        </div>
      </div>
    </div>
  );
};

export default UserLearningClass;
