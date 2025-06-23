
import { Formik, Field, Form, ErrorMessage } from "formik";
import { useState } from "react";

import ChangePasswordShema from "../../utlis/changePasswordSchema";
import ShowPassword from "../../assets/imgs/ShowPassword.png";
import HiddenPassword from "../../assets/imgs/HiddenPassword.png";
import "./ChangePassword.scss";
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
            validationSchema={ChangePasswordShema}
            onSubmit={handleSubmit}
          >
            <Form>
              <label>Nhập mật khẩu mới</label>
              <div className="inputNewPassword">
                <Field
                  type={typePassword ? "text" : "password"}
                  name="newpassword"
                  placeholder="New password"
                />
                <button onClick={handleTypePassword}>
                  <img
                    src={typePassword ? HiddenPassword : ShowPassword}
                    alt=""
                  />
                </button>
              </div>

              <ErrorMessage
                name="newpassword"
                component="div"
                className={"errorNewPassword"}
              />
              <label>Nhập mật lại khẩu mới</label>
              <div className="inputConfirmPassword">
                <Field
                  type={typeConfirmPassword ? "text" : "password"}
                  name="confirmpassword"
                  placeholder="Nhập lại mật khẩu mới"
                />

                <button onClick={handleTypeConfirmPassword}>
                  <img
                    src={typeConfirmPassword ? HiddenPassword : ShowPassword}
                    alt=""
                  />
                </button>
              </div>

              <ErrorMessage
                name="confirmpassword"
                component={"div"}
                className="errorConfirmPassword"
              />

              <button type="submit" className="ButtonChangePassword">
                Xác Nhận
              </button>
            </Form>
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
