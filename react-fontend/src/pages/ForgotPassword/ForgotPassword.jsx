import { Formik, Field, Form, ErrorMessage } from "formik";
import { useState } from "react";

import fotgotPasswordSchema from "../../utlis/fotgotPasswordSchema";
import "./ForgotPassword.scss";
import Logo from "../../assets/imgs/Logo-2.png";
import { ForgotPassword } from "../../api/UserCallApi";
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
  const handleSubmit = async (values) => {
    const res = await ForgotPassword(values.email);
    console.log(">>", res);
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
            initialValues={{ email: "" }}
            validationSchema={fotgotPasswordSchema}
            onSubmit={handleSubmit}
          >
            <Form>
              <label>Nhập email</label>

              <div className="inputEmail">
                <Field type="text" name="email" placeholder="Email" />
              </div>

              <ErrorMessage
                name="email"
                component="div"
                className={"errorEmail"}
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
