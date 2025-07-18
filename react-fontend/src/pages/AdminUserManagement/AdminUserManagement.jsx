import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./AdminUserManagement.scss";
import SearchBoxUser from "../../assets/imgs/SearchBoxUser.png";
import SideBar from "../../components/SideBar/SideBar";
import { fetchAllUser, adminUserDelete } from "../../redux/admin/adminActions";
import { useEffect, useState } from "react";
import DelButton from "../../assets/imgs/img_Del.png";
import EditButton from "../../assets/imgs/img_Edit.png";

const AdminUserManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const size = 5; // số lượng user mỗi trang
  const [currentPage, setCurrentPage] = useState(1);

  // Gọi API với page hiện tại
  const fetchData = (page) => {
    const param = { page: page - 1, size: size, sort: "id" };
    dispatch(fetchAllUser(param));
  };

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  const data = useSelector((state) => state.admin.listUser) || [];

  console.log("datta", data.amountOfAllUsers);
  const Users = data.data;
  console.log("Users: ", Users);

  const handleEdit = (user) => {
    navigate("/Admin/UserManagement/Update", { state: { user } });
  };

  const handleDelete = async (id) => {
    await dispatch(adminUserDelete(id));
    fetchData(currentPage); // refresh lại sau khi xóa
  };

  // Total page  (ở đây dang fix cứng)
  const totalPages = data.amountOfAllUsers / size + 1;
  console.log("pages", totalPages);

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

  return (
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
                  <Link to="/Admin/UserManagement/CreateUser" className="Link">
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
                      <th>STT</th>
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
                          <td>{(currentPage - 1) * size + index + 1}</td>
                          <td>{user.fullName}</td>
                          <td>{user.gender}</td>
                          <td>{user.birthday}</td>
                          <td>{user.email}</td>
                          <td>{user.username}</td>
                          <td>{user.password}</td>
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
  );
};

export default AdminUserManagement;
