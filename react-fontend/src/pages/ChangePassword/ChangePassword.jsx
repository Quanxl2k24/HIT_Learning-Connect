import { Formik, Field, Form, ErrorMessage } from "formik";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

import ChangePasswordShema from "../../utlis/changePasswordSchema";
import ShowPassword from "../../assets/imgs/ShowPassword.png";
import HiddenPassword from "../../assets/imgs/HiddenPassword.png";
import "./ChangePassword.scss";
import Logo from "../../assets/imgs/Logo-2.png";
// goi hook
import useChangePassword from "../../hooks/useChangePassword";

const ChangePassword = () => {
  const token = localStorage.getItem("token");
  const { ChangePassword } = useChangePassword();
  const navigate = useNavigate();
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
  const handleSubmit = (values, { setSubmitting }) => {
    ChangePassword(values.newpassword, values.confirmpassword, token, navigate);
    setSubmitting(false);
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
              <div>
                <label>Mật khẩu</label>
              </div>

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
              <div className="labelInputConfirmPassword">
                <label>Nhập mật lại khẩu mới</label>
              </div>
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
