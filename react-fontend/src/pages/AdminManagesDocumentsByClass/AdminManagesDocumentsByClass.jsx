import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import "./AdminManagesDocumentsByClass.scss";
import SideBar from "../../components/SideBar/SideBar";
import img_class from "../../assets/imgs/img_class.png";
import { fetchAllClassByAdmin } from "../../redux/adminClass/adminClassActions";

const AdminManagesDocumentsByClass = () => {
  //chuyen trang
  const navigate = useNavigate();
  const handleChangePage = (param) => {
    navigate(`/Admin/DocumentByClass/Document?classId=${param}`);
  };
  //Call api
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllClassByAdmin());
  }, []);
  const listClass = useSelector((state) => state.adminClass.listClass);

  return (
    <div className="AdminManagesDocumentsByClass-container">
      <div className="AdminManagesDocumentsByClass">
        <div className="AdminManagesDocumentsByClass_left">
          <SideBar />
        </div>

        <div className="AdminManagesDocumentsByClass_right">
          <div className="AdminManagesDocumentsByClass_right--banner">
            <div className="logo-banner"></div>
            <div className="title-banner">
              <h3>Quản lý tài liệu theo lớp học</h3>
            </div>
          </div>

          <div className="AdminManagesDocumentsByClass_right--listboxclass">
            {listClass &&
              listClass.map((item, index) => (
                <button
                  onClick={() => handleChangePage(item.classId)}
                  key={index}
                >
                  <div className="box-class">
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
  );
};
export default AdminManagesDocumentsByClass;
