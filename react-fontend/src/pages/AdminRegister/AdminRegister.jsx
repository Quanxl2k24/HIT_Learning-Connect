import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import "./AdminRegister.scss";
import SideBar from "../../components/SideBar/SideBar";
import SearchBoxUser from "../../assets/imgs/SearchBoxUser.png";
import { fectchRegisterbyAdmin } from "../../redux/adminRegister/adminRegisterActions";
import { useDispatch } from "react-redux";

const AdminRegister = () => {
  const dispatch = useDispatch();
  const size = 5;
  const [currentPage, setCurrentPage] = useState(1);

  //ham call api
  const fetchRegisters = (page) => {
    const params = { page: page - 1, size: size, sort: "id" };
    dispatch(fectchRegisterbyAdmin(params));
  };

  useEffect(() => {
    fetchRegisters(currentPage);
  }, [currentPage]);
  let totalPages = 3;
  // if (data.amountOfAllUsers % size == 0) {
  //   totalPages = data.amountOfAllUsers / size;
  // } else {
  //   totalPages = data.amountOfAllUsers / size + 1;
  // }
  const onPageChange = (page) => {
    if (page < 1 || page > totalPages) return;
    setCurrentPage(page);
  };

  const getPages = () => {
    const pages = [];
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    return pages;
  };
  const Users = null;
  return (
    <div className="AdminRegister-container">
      <div className="AdminRegister">
        <div className="AdminRegister_left">
          <SideBar />
        </div>
      </div>
      <div className="AdminRegister_right">
        <div className="AdminRegister_right--banner">
          <div className="logo-banner"></div>
          <div className="title-banner">
            <h3>Đăng ký lớp học</h3>
          </div>
        </div>
        {/* box */}
        <div className="AdminRegister_right--box">
          <div className="box-container">
            <div className="box">
              <div className="title-box">
                <p>Danh sách đơn đăng ký lớp học</p>
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
                  <Link to="#" className="Link">
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
                      <th>Tên lớp học</th>
                      <th>Thời gian</th>
                      <th>Người đăng ký</th>
                      <th>Trạng thái</th>
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
                          <td></td>
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
export default AdminRegister;
