import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fectchRegisterbyAdmin } from "../../redux/adminRegister/adminRegisterActions";
import { useDispatch, useSelector } from "react-redux";
import "./AdminRegister.scss";
import SideBar from "../../components/SideBar/SideBar";
import SearchBoxUser from "../../assets/imgs/searchBoxUser.png";
import DelButton from "../../assets/imgs/img_Del.png";
import img_accept from "../../assets/imgs/img_accept.png";
import img_deny from "../../assets/imgs/img_deny.png";
import useApproveOrDeny from "../../hooks/useApproveOrDeny";
import { deleteRegisterbyAdmin } from "../../redux/adminRegister/adminRegisterActions";
import BoxConfirmDelete from "../../components/BoxConfrimDelete/BoxConfirmDelete";
import BoxNotification from "../../components/BoxNotificaton/BoxNotifiacation";
const AdminRegister = () => {
  //useState notification
  const [showToast, setShowToast] = useState(false);
  const [text, setText] = useState("");
  const [statusBox, setStatusBox] = useState(null);
  const dispatch = useDispatch();
  const size = 5;
  const [currentPage, setCurrentPage] = useState(1);

  //ham call api
  const fetchRegisters = (page) => {
    const params = { page: page - 1, size: size, sort: "registrationId" };
    dispatch(fectchRegisterbyAdmin(params));
  };
  const data = useSelector((state) => state.adminRegister.listRegister);
  const listRegister = data?.data?.content;
  useEffect(() => {
    fetchRegisters(currentPage);
  }, [currentPage]);
  let totalPages = 0;
  if (data?.data?.totalElements % size == 0) {
    totalPages = data?.data?.totalElements / size;
  } else {
    totalPages = data?.data?.totalElements / size + 1;
  }
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

  //handleAccpet va handleDney
  const { callApproveOrDeny } = useApproveOrDeny();

  // accpet
  const handleAccpet = async (id) => {
    const data = {
      registrationId: id,
      approved: true,
    };
    await callApproveOrDeny(data);
    await fetchRegisters(currentPage);
  };

  // deny
  const handleDeny = async (id) => {
    const data = {
      registrationId: id,
      approved: false,
    };
    await callApproveOrDeny(data);
    await fetchRegisters(currentPage);
  };

  //handleDelete
  const [showConfirm, setShowConfirm] = useState(false);
  const handleCancel = () => {
    setShowConfirm(false);
  };

  const [idDel, setIdDel] = useState(null);
  const handleDelete = async (id) => {
    setShowConfirm(true);
    setIdDel(id);
  };
  const handleDeleteBoxConfirm = async () => {
    const res = await dispatch(deleteRegisterbyAdmin(idDel));
    await fetchRegisters(currentPage);
    setShowConfirm(false);
    if (res.success) {
      setShowToast(true);
      setText("Xoá đơn đăng ký thành công");
      setStatusBox(true);
    } else {
      setShowToast(true);
      setText("Xoá đơn đăng ký không thành công");
      setStatusBox(false);
    }
  };
  return (
    <div className="AdminRegister-container">
      <div className="AdminRegister">
        {showToast && (
          <BoxNotification
            message={text}
            status={statusBox}
            onClose={() => setShowToast(false)}
          />
        )}
        <div className="BoxConfirm-container">
          <BoxConfirmDelete
            display={showConfirm}
            handleCancel={handleCancel}
            handleDeleteBoxConfirm={handleDeleteBoxConfirm}
          />
        </div>
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
                  {/* <Link to="#" className="Link">
                    <button className="but-add">
                      <span>+ </span> Thêm
                    </button>
                  </Link> */}
                </div>
              </div>

              <div className="table-box">
                <table>
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Tên lớp học</th>
                      <th>Thời gian đăng ký</th>
                      <th>Email người đăng ký</th>
                      <th>Trạng thái</th>
                      <th>Hành động</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listRegister &&
                      listRegister.map((item, index) => (
                        <tr key={index}>
                          <td>{item.registrationId}</td>
                          <td>{item.classTitle}</td>
                          <td>{item.registeredAt}</td>
                          <td>{item.studentEmail}</td>
                          <td>
                            {item.registrationStatus === "ACCEPTED" ? (
                              <div className="status-class-accpet">
                                <p>Đã duyệt</p>
                              </div>
                            ) : item.registrationStatus === "REJECTED" ? (
                              <div className="status-class-reject">
                                <p>Đã huỷ</p>
                              </div>
                            ) : (
                              <div className="status-class-pending">
                                <p>Chờ duyệt</p>
                              </div>
                            )}
                          </td>
                          <td>
                            <div className="admin-reigster-btn">
                              {item.pending && (
                                <>
                                  <button
                                    className="admin-register-btn-accept"
                                    onClick={() =>
                                      handleAccpet(item.registrationId)
                                    }
                                  >
                                    <img
                                      className="img-register-deny-approve "
                                      src={img_accept}
                                      alt=""
                                    />
                                  </button>
                                  <button
                                    className="admin-reigster-btn-deny"
                                    onClick={() =>
                                      handleDeny(item.registrationId)
                                    }
                                  >
                                    <img
                                      className="img-register-deny-approve "
                                      src={img_deny}
                                      alt=""
                                    />
                                  </button>
                                </>
                              )}

                              <button
                                className="admin-reigster-btn-Del"
                                onClick={() =>
                                  handleDelete(item.registrationId)
                                }
                              >
                                <img
                                  className="img-register"
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
