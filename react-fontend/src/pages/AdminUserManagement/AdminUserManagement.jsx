import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./AdminUserManagement.scss";
import SearchBoxUser from "../../assets/imgs/SearchBoxUser.png";
import SideBar from "../../components/SideBar/SideBar";
import { fetchAllUser } from "../../redux/admin/adminActions";
import { useEffect } from "react";

const AdminUserManagement = () => {
  const dispatch = useDispatch();
  const param = { page: 0, size: 10, sort: "username" };
  useEffect(() => {
    dispatch(fetchAllUser(param));
  }, []);

  const data = useSelector((state) => state.admin.listUser);
  console.log(data);
  // console.log(data[1].id);
  return (
    <div className="AdminUserManagement-container">
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
                    <button className="but-search">Tìm kiếm</button>
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

                    {data &&
                      data.map((i, index) => (
                        <tr key={index}>
                          <td>{data[index].id}</td>
                          <td>{data[index].fullName}</td>
                          <td>{data[index].gender}</td>
                          <td>{data[index].birthday}</td>
                          <td>{data[index].email}</td>
                          <td>{data[index].username}</td>
                          <td>{data[index].password}</td>
                          <td>button</td>
                        </tr>
                      ))}
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

export default AdminUserManagement;
