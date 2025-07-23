import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import "./SideBar.scss";

import LogoHit from "../../assets/imgs/Logo-2.png";
import Logout from "../../assets/imgs/logout-logo.png";

const SideBar = () => {
  const location = useLocation();
  const [isToken, setIsToken] = useState(false);

  //Lấy profile từ Redux
  const profileUser = useSelector((state) => state.user.profile);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsToken(true);
    }
  }, []);

  //Phân quyền vai trò
  const userRole = profileUser?.roleName === "ROLE_USER";

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("token");
    localStorage.removeItem("refreshToken");
    window.location.reload();
  };

  let listLink = [];

  if (userRole) {
    // list phia nguoi dung
    listLink = [
      { id: 1, path: "/Home", name: "Trang chủ" },
      { id: 2, path: "/Information", name: "Thông tin cá nhân" },
      // { id: 3, path: "/Admin/UserManagement", name: "Người dùng" },
      { id: 3, path: "/User/Class", name: "Lớp Học" },
      { id: 4, path: "/g", name: "Tài Liệu" },
      { id: 5, path: "/User/Register", name: "Đăng Ký lớp học" },
      { id: 6, path: "/e", name: "Contest online" },
      { id: 7, path: "/e", name: "Bài Viết" },
    ];
  } else {
    // list phia admin
    listLink = [
      { id: 1, path: "/Home", name: "Trang chủ" },
      { id: 2, path: "/Information", name: "Thông tin cá nhân" },
      { id: 3, path: "/Admin/UserManagement", name: "Người dùng" },
      { id: 4, path: "/Admin/Class", name: "Lớp Học" },
      { id: 5, path: "/Admin/Document", name: "Tài Liệu" },
      { id: 6, path: "/w", name: "Đăng Kí lớp học" },
      { id: 7, path: "/e", name: "Contest online" },
      { id: 8, path: "/e", name: "Bài Viết" },
    ];
  }

  return (
    <div>
      <div className="SideBar">
        <div className="SideBar_logo">
          <div className="SideBar_logo--top-bar"></div>
          <div className="SideBar_logo--logo">
            <Link to="/">
              <img src={LogoHit} alt="" />
            </Link>
          </div>
          <hr className="divider" />
        </div>

        {isToken && profileUser && (
          <div className="infor-title">
            <div className="user-card">
              <div className="avatar">
                {profileUser.fullName?.charAt(0) || "?"}
              </div>
              <div className="info">
                <div className="name">{profileUser.fullName}</div>
                <div className="role">{userRole ? "Học Viên" : "Admin"}</div>
              </div>
              <div className="circle-bg"></div>
              <div className="circle-bgg"></div>
            </div>
          </div>
        )}
        <div className="SideBar_listButton">
          <ul>
            {listLink.map((item) => (
              <li
                key={item.id}
                className={
                  location.pathname.startsWith(item.path) ? "active" : ""
                }
              >
                <Link to={item.path}>{item.name}</Link>
              </li>
            ))}
          </ul>
        </div>

        {isToken && (
          <div className="logout-btn">
            <img src={Logout} alt="logout" />
            <button onClick={handleLogout}>Đăng xuất</button>
          </div>
        )}
      </div>
    </div>
  );
};

export default SideBar;
