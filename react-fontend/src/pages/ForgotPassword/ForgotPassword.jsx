import { Formik, Field, Form, ErrorMessage } from "formik";
import { useState } from "react";

import ChangePasswordShema from "../../utlis/changePasswordSchema"; // bo
import fotgotPasswordSchema from "../../utlis/fotgotPasswordSchema";
import ShowPassword from "../../assets/imgs/ShowPassword.png";
import HiddenPassword from "../../assets/imgs/HiddenPassword.png";
import "./ForgotPassword.scss";
import Logo from "../../assets/imgs/Logo-2.png";

const ChangePassword = () => {
  const [typePassword, setTypePassword] = useState(false);
  const [typeConfirmPassword, setTypeConfirmPassword] = useState(false);

  //handle chuyen type new password
  const handleTypePassword = (e) => {
    e.preventDefault();
    setTypePassword(!typePassword);
  };

  //handle chuyen type confirm password
  const handleTypeConfirmPassword = (e) => {
    e.preventDefault();
    setTypeConfirmPassword(!typeConfirmPassword);
  };

  //handle submit
  const handleSubmit = (values) => {
    console.log(">>", values.newpassword);
  };

  return (
    <div className="ChangePassword">
      <div className="ChangePassword_logo">
        <div className="ChangePassword_logo--img">
          <img src={Logo} alt="" />
        </div>
      </div>

      <div className="ChangePassword_box">
        <div className="ChangePassword_box--title">
          <p>Đổi Mật Khẩu</p>
        </div>

        <div className="ChangePassword_box--input">
          <Formik
            initialValues={{ newpassword: "", confirmpassword: "" }}
            validationSchema={fotgotPasswordSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <label>Nhập email</label>
              <div className="inputNewPassword">
                <Field type="text" name="email" placeholder="Email" />
              </div>

              <ErrorMessage
                name="email"
                component="div"
                className={"errorNewPassword"}
              />

              <button type="submit" className="ButtonFotgotPassword">
                Lấy lại mật khẩu
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
