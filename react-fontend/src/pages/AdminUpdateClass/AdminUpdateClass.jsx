import React, { useState } from "react";
import { useFormik } from "formik";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

import "./AdminUpdateClass.scss";
import SideBar from "../../components/SideBar/SideBar";
import adminCreateClassSchema from "../../utlis/adminCreateClassSchema";
import { updateClassByAdmin } from "../../redux/adminClass/adminClassActions";
import BoxNotification from "../../components/BoxNotificaton/BoxNotifiacation";

const AdminUpdateClass = () => {
  const [statusBox, setStatusBox] = useState(null);
  const [showToast, setShowToast] = useState(false);
  const [text, setText] = useState("");
  const location = useLocation();
  const data = location.state;
  console.log(data.user.classId);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      title: data.user.title,
      description: data.user.description,
      teacherId: data.user.teacherId,
      startDate: data.user.startDate,
      endDate: data.user.endDate,
    },
    validationSchema: adminCreateClassSchema,

    onSubmit: async (values) => {
      const res = await dispatch(updateClassByAdmin(data.user.classId, values));

      if (res.success) {
        setShowToast(true);
        setText("Cập nhật class thành công");
        setStatusBox(true);
        setTimeout(() => {
          navigate("/Admin/Class");
        }, 1500);
      } else {
        setShowToast(true);
        setText("Cập nhật class không thành công");
        setStatusBox(false);
      }
    },
  });
  // notificaton

  return (
    <div className="AdminCreateClass-container">
      {showToast && (
        <BoxNotification
          message={text}
          status={statusBox}
          onClose={() => setShowToast(false)}
        />
      )}
      <div className="Home-left">
        <SideBar />
      </div>
      <div className="AdminCreateClass-right">
        <div className="AdminCreateClass_right--banner">
          <div className="logo-banner"></div>
          <div className="title-banner">
            <h3>Cập nhật lớp học</h3>
          </div>
        </div>

        <div className="box-create-class">
          <div className="add-class-form">
            <div className="add-class-form-title">
              <p>Thêm lớp học mới</p>
            </div>

            <form onSubmit={formik.handleSubmit}>
              <div className="form-group formNameClass">
                <label>Tên lớp học</label>
                <input
                  type="text"
                  name="title"
                  onChange={formik.handleChange}
                  value={formik.values.title}
                  placeholder="Nhập tên lớp học"
                />
                <span className="error">{formik.errors.title}</span>
              </div>
              <div className="form-row">
                <div className="form-group">
                  <label>Ngày bắt đầu</label>
                  <input
                    type="date"
                    name="startDate"
                    onChange={formik.handleChange}
                    value={formik.values.startDate}
                    placeholder="yyyy/mm/dd"
                  />
                  <span className="error">{formik.errors.startDate}</span>
                </div>

                <div className="form-group">
                  <label>Ngày kết thúc</label>
                  <input
                    type="date"
                    name="endDate"
                    onChange={formik.handleChange}
                    value={formik.values.endDate}
                    placeholder="yyyy/mm/dd"
                  />
                  <span className="error">{formik.errors.endDate}</span>
                </div>
              </div>

              <div className="form-group">
                <label>ID Leader</label>
                <input
                  type="text"
                  name="teacherId"
                  onChange={formik.handleChange}
                  value={formik.values.teacherId}
                  placeholder="Nhập tên Leader"
                />
                <span className="error">{formik.errors.teacherId}</span>
              </div>

              <div className="form-group">
                <label>Nội dung</label>
                <textarea
                  placeholder="Mô tả nội dung lớp học"
                  name="description"
                  onChange={formik.handleChange}
                  value={formik.values.description}
                  rows="3"
                ></textarea>
              </div>

              <div className="form-actions">
                <Link to="/Admin/Class">
                  <button type="button" className="cancelClass">
                    Hủy
                  </button>
                </Link>
                <button type="submit" className="submitClass">
                  Cập nhật
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminUpdateClass;
