import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./AdminClass.scss";
import SearchBoxUser from "../../assets/imgs/searchBoxUser.png";
import SideBar from "../../components/SideBar/SideBar";
import {
  fetchAllClassByAdmin,
  deleteClassByAdmin,
} from "../../redux/adminClass/adminClassActions";
import { useEffect, useState } from "react";
import DelButton from "../../assets/imgs/img_Del.png";
import EditButton from "../../assets/imgs/img_Edit.png";
import BoxConfirmDelete from "../../components/BoxConfrimDelete/BoxConfirmDelete";
import BoxNotification from "../../components/BoxNotificaton/BoxNotifiacation";
import useSreachClass from "../../hooks/useSreachClass";
const AdminClass = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showToast, setShowToast] = useState(false);
  const [text, setText] = useState("");
  const [statusBox, setStatusBox] = useState(null);

  const [Class, setClass] = useState(null);

  // goi api
  const fetchData = () => {
    dispatch(fetchAllClassByAdmin());
  };
  useEffect(() => {
    fetchData();
  }, []);

  // Lấy dữ liệu từ redux
  const data = useSelector((state) => state.adminClass.listClass) || [];

  useEffect(() => {
    setClass(data);
  }, [data]);
  const handleEdit = (user) => {
    navigate("/Admin/Class/Update", { state: { user } });
  };

  // handle xoa
  const [idDel, setIdDel] = useState(null);
  const handleDelete = (id) => {
    setShowConfirm(true);
    setIdDel(id);
  };

  const handleDeleteBoxConfirm = async () => {
    const res = await dispatch(deleteClassByAdmin(idDel));
    await dispatch(fetchAllClassByAdmin());
    setIdDel(null);
    setShowConfirm(false);
    if (res.success) {
      setShowToast(true);
      setText("Xoá lớp thành công");
      setStatusBox(true);
    } else {
      setShowToast(true);
      setText("Xoá lớp không thành công");
      setStatusBox(false);
    }
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  // Xử lý box confirm
  const [ShowConfirm, setShowConfirm] = useState(false);

  // Sreach
  const [textSearch, setTextSearch] = useState("");

  const sreachclass = useSreachClass();
  const handleSreach = async () => {
    console.log("th nao", textSearch == "");

    if (textSearch == "") {
      fetchData();
    } else {
      const res = await sreachclass(textSearch);
      setClass(res.data.data);
    }
  };

  return (
    <div className="AdminUserManagement-container">
      {showToast && (
        <BoxNotification
          message={text}
          status={statusBox}
          onClose={() => setShowToast(false)}
        />
      )}
      <div className="BoxConfirm-container">
        <BoxConfirmDelete
          display={ShowConfirm}
          handleCancel={handleCancel}
          handleDeleteBoxConfirm={handleDeleteBoxConfirm}
        />
      </div>
      <div className="AdminUserManagement">
        <div className="Home_left">
          <SideBar />
        </div>
        <div className="AdminUserManagement_right">
          <div className="AdminUserManagement_right--banner">
            <div className="logo-banner"></div>
            <div className="title-banner">
              <h3>Lớp học</h3>
            </div>
          </div>
          <div className="AdminUserManagement_right--box">
            <div className="box-container">
              <div className="box">
                <div className="title-box">
                  <p>Danh sách các lớp học</p>
                </div>

                <div className="SearchAndAdd-box">
                  <div className="search">
                    <div className="imgSearch">
                      <img src={SearchBoxUser} alt="" />
                    </div>
                    <input
                      type="text"
                      value={textSearch}
                      onChange={(e) => setTextSearch(e.target.value)}
                      placeholder="Tìm kiếm theo username, fullname, email"
                    />
                  </div>

                  <div className="but-box">
                    <button className="but-add" onClick={handleSreach}>
                      Tìm kiếm
                    </button>
                    <Link to="/Admin/Class/Create" className="Link">
                      <button className="but-add">
                        <span>+ </span> Thêm
                      </button>
                    </Link>
                  </div>
                </div>

                <div className="table-box-class">
                  <table>
                    <thead>
                      <tr>
                        <th>ID CLASS</th>
                        <th>Tên lớp học</th>
                        <th>Thời gian bắt đầu</th>
                        <th>Thời gian kết thúc</th>
                        <th>Leader</th>
                        <th>Trạng Thái</th>
                        <th>Hành động</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Class &&
                        Class.map((item, index) => (
                          <tr key={index}>
                            <td>{item.classId}</td>
                            <td>{item.title}</td>
                            <td>{item.startDate}</td>
                            <td>{item.endDate}</td>
                            <td>{item.teacherFullName}</td>
                            <td>
                              {item.status == "IN_PROGRESS" ? (
                                <div className="admin-class-status-progress">
                                  <p>Đang mở</p>
                                </div>
                              ) : item.status == "COMPLETED" ? (
                                <div className="admin-class-status-complete ">
                                  <p>Đã kết thúc</p>
                                </div>
                              ) : (
                                <div className="admin-class-status-upcomming">
                                  <p>Sắp diễn ra</p>
                                </div>
                              )}
                            </td>
                            <td>
                              <div className="admin-class-btn">
                                <button
                                  className="admin-class-btn-Edit"
                                  onClick={() => handleEdit(item)}
                                >
                                  <img
                                    className="img-btn"
                                    src={EditButton}
                                    alt=""
                                  />
                                </button>
                                <button
                                  className="admin-class-btn-Del"
                                  onClick={() => handleDelete(item.classId)}
                                >
                                  <img
                                    className="img-btn"
                                    src={DelButton}
                                    alt=""
                                  />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminClass;
