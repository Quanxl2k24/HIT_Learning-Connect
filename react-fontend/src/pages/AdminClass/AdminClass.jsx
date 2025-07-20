import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./AdminClass.scss";
import SearchBoxUser from "../../assets/imgs/SearchBoxUser.png";
import SideBar from "../../components/SideBar/SideBar";
import {
  fetchAllClassByAdmin,
  deleteClassByAdmin,
} from "../../redux/adminClass/adminClassActions";
import { useEffect, useState } from "react";
import DelButton from "../../assets/imgs/img_Del.png";
import EditButton from "../../assets/imgs/img_Edit.png";
import BoxConfirmDelete from "../../components/BoxConfrimDelete/BoxConfirmDelete";
const AdminClass = () => {
  // const now = new Date();
  // console.log("thoi gian", now);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const size = 5; // số lượng user mỗi trang
  const [currentPage, setCurrentPage] = useState(1);
  // Gọi API
  // const fetchData = (page) => {
  //   const param = { page: page - 1, size: size, sort: "id" };
  //   dispatch(fetchAllUser(param));
  // };

  // goi api

  useEffect(() => {
    dispatch(fetchAllClassByAdmin());
  }, []);

  // useEffect(() => {
  //   fetchData(currentPage);
  // }, [currentPage]);

  // Lấy dữ liệu từ redux
  const Class = useSelector((state) => state.adminClass.listClass) || [];

  const handleEdit = (user) => {
    navigate("/Admin/UserManagement/Update", { state: { user } });
  };

  // handle xoa
  const [idDel, setIdDel] = useState(null);
  const handleDelete = (id) => {
    setShowConfirm(true);
    setIdDel(id);
  };

  const handleDeleteBoxConfirm = async () => {
    await dispatch(deleteClassByAdmin(idDel));
    await dispatch(fetchAllClassByAdmin());
    setIdDel(null);
    setShowConfirm(false);
  };

  const handleCancel = () => {
    setShowConfirm(false);
  };

  // Total page
  // let totalPages = 0;
  // if (data.amountOfAllUsers % size == 0) {
  //   totalPages = data.amountOfAllUsers / size;
  // } else {
  //   totalPages = data.amountOfAllUsers / size + 1;
  // }

  // const getPages = () => {
  //   const pages = [];
  //   for (let i = 1; i <= totalPages; i++) {
  //     pages.push(i);
  //   }
  //   return pages;
  // };

  const onPageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // Xử lý box confirm
  const [ShowConfirm, setShowConfirm] = useState(false);

  return (
    <div className="AdminUserManagement-container">
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
              <h3>Người dùng</h3>
            </div>
          </div>
          <div className="AdminUserManagement_right--box">
            <div className="box-container">
              <div className="box">
                <div className="title-box">
                  <p>Danh sách tài khoản của thành viên HIT</p>
                </div>

                <div className="SearchAndAdd-box">
                  <div className="search">
                    <div className="imgSearch">
                      <img src={SearchBoxUser} alt="" />
                    </div>
                    <input
                      type="text"
                      placeholder="Tìm kiếm theo username, fullname, email"
                    />
                  </div>

                  <div className="but-box">
                    <button className="but-add">Tìm kiếm</button>
                    <Link
                      to="/Admin/UserManagement/CreateUser"
                      className="Link"
                    >
                      <button className="but-add">
                        <span>+ </span> Thêm
                      </button>
                    </Link>
                  </div>
                </div>

                <div className="table-box">
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
                            {/* <td>{(currentPage - 1) * size + index + 1}</td> */}
                            <td>{item.classId}</td>
                            <td>{item.title}</td>
                            <td>{item.startDate}</td>
                            <td>{item.endDate}</td>
                            <td>{item.teacherFullName}</td>
                            <td>Cho api</td>
                            <td>
                              <div className="admin-class-btn">
                                <button
                                  className="admin-class-btn-Edit"
                                  onClick={() => handleEdit(user)}
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

                {/* <div className="pagination">
                  <button
                    className="nav-button"
                    onClick={() => onPageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    &laquo;
                  </button>

                  {getPages().map((page) => (
                    <button
                      key={page}
                      className={`page-number ${
                        page === currentPage ? "active" : ""
                      }`}
                      onClick={() => onPageChange(page)}
                    >
                      {page}
                    </button>
                  ))}

                  <button
                    className="nav-button"
                    onClick={() => onPageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    &raquo;
                  </button>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminClass;
