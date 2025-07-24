import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./AdminUserManagement.scss";
import SearchBoxUser from "../../assets/imgs/SearchBoxUser.png";
import SideBar from "../../components/SideBar/SideBar";
import {
  fetchAllUser,
  adminUserDelete,
  fetchUserByKeyword,
} from "../../redux/admin/adminActions";
import { useEffect, useState } from "react";
import DelButton from "../../assets/imgs/img_Del.png";
import EditButton from "../../assets/imgs/img_Edit.png";
import BoxConfirmDelete from "../../components/BoxConfrimDelete/BoxConfirmDelete";
import BoxNotification from "../../components/BoxNotificaton/BoxNotifiacation";
const AdminUserManagement = () => {
  const [statusBox, setStatusBox] = useState(false);
  const [showToast, setShowToast] = useState(null);
  const [text, setText] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // số lượng user mỗi trang
  const size = 5;
  const [currentPage, setCurrentPage] = useState(1);

  // Gọi API lay du lieu khong co keyword
  const fetchData = async (page) => {
    const param = { page: page - 1, size: size, sort: "id" };
    await dispatch(fetchAllUser(param));
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);
  // Gọi API lay du lieu co keyword
  const [keyword, setKeyword] = useState("");
  const fecthUsersByFilter = async (page) => {
    const param = { page: page - 1, size: size, sort: "id", keyword: keyword };
    const res = await dispatch(fetchUserByKeyword(param));
    console.log("res", res);
  };
  //handle sreach
  const handleSreach = () => {
    fecthUsersByFilter(currentPage);
  };
  // Lấy dữ liệu từ redux
  const data = useSelector((state) => state.admin.listUser) || [];
  const Users = data.data;
  //handel edit
  const handleEdit = (user) => {
    navigate("/Admin/UserManagement/Update", { state: { user } });
  };
  //handle delete
  const [idDel, setIdDel] = useState(null);
  const handleDelete = (id) => {
    setShowConfirm(true);
    setIdDel(id);
  };

  const handleDeleteBoxConfirm = async () => {
    const res = await dispatch(adminUserDelete(idDel));
    await fetchData(currentPage);
    setIdDel(null);
    setShowConfirm(false);
    if (res.success) {
      setText("Xoá người dùng thành công");
      setStatusBox(true);
      setShowToast(true);
      setTimeout(() => {
        navigate("/Admin/UserManagement");
      }, 1500);
    } else {
      setText("Xoá người dùng không thành công");
      setShowToast(true);
      setStatusBox(false);
    }
  };
  //handle huy xoa
  const handleCancel = () => {
    setShowConfirm(false);
  };

  // Total page
  let totalPages = 0;
  if (data.amountOfAllUsers % size == 0) {
    totalPages = data.amountOfAllUsers / size;
  } else {
    totalPages = data.amountOfAllUsers / size + 1;
  }

  const getPages = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };

  const onPageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  // Xử lý box confirm
  const [ShowConfirm, setShowConfirm] = useState(false);
  // Call sreach

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
                      value={keyword}
                      onChange={(e) => setKeyword(e.target.value)}
                      placeholder="Tìm kiếm theo username, fullname, email"
                    />
                  </div>

                  <div className="but-box">
                    <button className="but-add" onClick={handleSreach}>
                      Tìm kiếm
                    </button>
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
                        <th>ID</th>
                        <th>Họ và tên</th>
                        <th>Giới tính</th>
                        <th>Ngày sinh</th>
                        <th>Email</th>
                        <th>Tên tài khoản </th>
                        <th>Mật khẩu</th>
                        <th>Hành động</th>
                      </tr>
                    </thead>
                    <tbody>
                      {Users &&
                        Users.map((user, index) => (
                          <tr key={user.id}>
                            {/* <td>{(currentPage - 1) * size + index + 1}</td> */}
                            <td>{user.id}</td>
                            <td>{user.fullName}</td>
                            <td>{user.gender}</td>
                            <td>{user.birthday}</td>
                            <td>{user.email}</td>
                            <td>{user.username}</td>
                            <td>********</td>
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
                                  onClick={() => handleDelete(user.id)}
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

                <div className="pagination">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUserManagement;
