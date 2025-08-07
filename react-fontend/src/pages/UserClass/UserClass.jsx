import "./UserClass.scss";
import SideBar from "../../components/SideBar/SideBar";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  deleteClass,
  fetchAllClass,
} from "../../redux/userClass/userClassActions";
import BoxNotification from "../../components/BoxNotificaton/BoxNotifiacation";
import BoxConfirmDelete from "../../components/BoxConfrimDelete/BoxConfirmDelete";

const UserClass = () => {
  // useState cho thong bao
  const [showToast, setShowToast] = useState(false);
  const [text, setText] = useState("");
  const [statusBox, setStatusBox] = useState(null);
  // call api lay cac lop da dang ky
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllClass());
  }, []);
  const data = useSelector((state) => state.userClass.listClass) || [];

  // call api huy lop
  const deleteClickClass = async (classId) => {
    setShowConfirm(true);
    setIdDel(classId);
  };

  // confirm delete
  const [ShowConfirm, setShowConfirm] = useState(false);
  const [idDel, setIdDel] = useState(null);
  const handleCancel = () => {
    setShowConfirm(false);
  };
  const handleDeleteBoxConfirm = async () => {
    const res = await dispatch(deleteClass(idDel));
    await dispatch(fetchAllClass());
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
  return (
    <div>
      <div className="class-page">
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
        <div className="Home_left">
          <SideBar />
        </div>
        <main className="content">
          <div className="banner">
            <div className="logo-banner"></div>
            <div className="title-banner">
              <h3>Lớp học</h3>
            </div>
          </div>

          <div className="padding-class-list">
            <div className="class-list-container">
              <div className="title">
                <div className="title-class-list">
                  <h3>Danh sách lớp học của Câu lạc bộ tin học - HIT</h3>
                </div>
                {/* Link dang de trong */}
                <Link to="/User/Register" className="Link">
                  <button className="btn-register">+ Đăng ký lớp học</button>
                </Link>
              </div>

              <table className="class-table">
                <thead>
                  <tr>
                    <th>Tên lớp học</th>
                    <th>Thời gian đăng ký</th>
                    <th>Leader</th>
                    <th>Thời gian</th>
                    <th>Trạng thái</th>
                    <th>Hành động</th>
                  </tr>
                </thead>
                <tbody>
                  {data &&
                    data.map((item, index) => (
                      <tr key={index}>
                        <td>
                          <span className="class-name">{item.classTitle}</span>
                        </td>
                        <td>{item.registeredAt}</td>
                        <td>{item.classRoom.teacherFullName}</td>
                        <td>
                          {item.classRoom.startDate} - {item.classRoom.endDate}
                        </td>
                        <td>
                          {item.registrationStatus == "PENDING" ? (
                            <span className="status pending">Chưa duyệt</span>
                          ) : (
                            <span className="status approved">Đã duyệt</span>
                          )}
                        </td>
                        <td>
                          {/* <Link to="/User/Class/Evaluate">Đánh giá</Link> */}
                          <button
                            onClick={() =>
                              deleteClickClass(item.classRoom.classId)
                            }
                          >
                            {/* Hủy đăng ký */}
                            {item.registrationStatus == "PENDING"
                              ? "Hủy đăng ký"
                              : "Xoá lớp"}
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};
export default UserClass;
