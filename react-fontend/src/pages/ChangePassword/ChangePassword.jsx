import { Formik, Field, Form, ErrorMessage } from "formik";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import * as Yup from "yup";

import ChangePasswordShema from "../../utlis/changePasswordSchema";
import ShowPassword from "../../assets/imgs/ShowPassword.png";
import HiddenPassword from "../../assets/imgs/HiddenPassword.png";
import "./ChangePassword.scss";
import Logo from "../../assets/imgs/Logo-2.png";
// goi hook
import useChangePassword from "../../hooks/useChangePassword";
import useVerifyCodeChangePassword from "../../hooks/useVerifyCodeChangePassword";

const ChangePassword = () => {
  const token = localStorage.getItem("token");
  const { ChangePassword } = useChangePassword();
  const { verifyCodeAndChangePassword, loading, error, success } =
    useVerifyCodeChangePassword();
  const navigate = useNavigate();
  const location = useLocation();

  const [typePassword, setTypePassword] = useState(false);
  const [typeConfirmPassword, setTypeConfirmPassword] = useState(false);
  const [verifyCode, setVerifyCode] = useState("");
  const [userEmail, setUserEmail] = useState("");

  // Extract email and code from URL params
  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);

    // Get email from URL
    const emailFromUrl = urlParams.get("email") || "";
    setUserEmail(emailFromUrl);
    console.log("Email from URL:", emailFromUrl);

    // Handle both ?code=433840 and &?code=433840 formats
    let codeFromUrl = urlParams.get("code") || urlParams.get("") || "";

    // If no code found, try to extract from the entire query string
    if (!codeFromUrl && location.search) {
      // Handle format like ?=783217
      const match1 = location.search.match(/[?&]=([^&]+)/);
      if (match1) {
        codeFromUrl = match1[1];
      }

      // Handle format like &?code=433840 (malformed URL)
      const match2 = location.search.match(/[&?]\?code=([^&]+)/);
      if (match2) {
        codeFromUrl = match2[1];
      }
    }

    console.log("URL search:", location.search);
    console.log("Email from URL:", emailFromUrl);
    console.log("Code from URL:", codeFromUrl);
    setVerifyCode(codeFromUrl);
  }, [location]);

  // Validation schema for verify code change password
  const verifyCodeChangePasswordSchema = Yup.object({
    email: Yup.string()
      .email("Email không hợp lệ")
      .required("Vui lòng nhập email"),
    newpassword: Yup.string()
      .required("Không được để trống")
      .matches(
        /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/,
        "Mật khẩu bao gồm 8 ký tự bao gồm số, chữ hoa, thường!"
      ),
    confirmpassword: Yup.string()
      .required("Không được để trống")
      .oneOf([Yup.ref("newpassword")], "Mật khẩu xác nhận không khớp!"),
  });

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

  //handle submit for normal change password (with token)
  const handleSubmit = (values, { setSubmitting }) => {
    ChangePassword(values.newpassword, values.confirmpassword, token, navigate);
    setSubmitting(false);
  };

  //handle submit for verify code change password
  const handleVerifyCodeSubmit = async (values, { setSubmitting }) => {
    try {
      // Use email from URL if available, otherwise use email from form
      const emailToUse = userEmail || values.email;
      console.log("Using email:", emailToUse, "and code:", verifyCode);

      await verifyCodeAndChangePassword(
        emailToUse,
        verifyCode,
        values.newpassword
      );

      // Navigate to login page
      setTimeout(() => {
        navigate("/Login");
      }, 2000);
    } catch (err) {
      console.error("Error changing password:", err);
    } finally {
      setSubmitting(false);
    }
  };

  // Check if we should use verify code flow (when code is present in URL)
  const useVerifyCodeFlow = verifyCode && verifyCode.trim().length > 0;

  console.log("=== CHANGE PASSWORD DEBUG ===");
  console.log("verifyCode:", verifyCode);
  console.log("useVerifyCodeFlow:", useVerifyCodeFlow);
  console.log("userEmail:", userEmail);
  console.log("=== END DEBUG ===");

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
          {useVerifyCodeFlow ? (
            // Verify code change password flow
            <Formik
              initialValues={{
                email: userEmail,
                newpassword: "",
                confirmpassword: "",
              }}
              enableReinitialize={true}
              validationSchema={verifyCodeChangePasswordSchema}
              onSubmit={handleVerifyCodeSubmit}
            >
              <Form>
                {/* Display verify code */}
                <div className="verify-code-display">
                  <label>Mã xác thực</label>
                  <div className="code-display">
                    <span>{verifyCode}</span>
                  </div>
                </div>

                {/* Email field */}
                <div>
                  <label>Email</label>
                </div>
                <div className="inputEmail">
                  <Field
                    type="email"
                    name="email"
                    placeholder="Nhập email của bạn"
                  />
                </div>
                <ErrorMessage
                  name="email"
                  component="div"
                  className={"errorEmail"}
                />

                {/* New password field */}
                <div>
                  <label>Mật khẩu mới</label>
                </div>
                <div className="inputNewPassword">
                  <Field
                    type={typePassword ? "text" : "password"}
                    name="newpassword"
                    placeholder="Nhập mật khẩu mới"
                  />
                  <button type="button" onClick={handleTypePassword}>
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

                {/* Confirm password field */}
                <div className="labelInputConfirmPassword">
                  <label>Nhập lại mật khẩu mới</label>
                </div>
                <div className="inputConfirmPassword">
                  <Field
                    type={typeConfirmPassword ? "text" : "password"}
                    name="confirmpassword"
                    placeholder="Nhập lại mật khẩu mới"
                  />
                  <button type="button" onClick={handleTypeConfirmPassword}>
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

                {/* Show loading, error, success messages */}
                {loading && (
                  <div className="loading-message">Đang xử lý...</div>
                )}
                {error && <div className="error-message">{error}</div>}
                {success && (
                  <div className="success-message">
                    Đổi mật khẩu thành công! Đang chuyển hướng...
                  </div>
                )}

                <button
                  type="submit"
                  className="ButtonChangePassword"
                  disabled={loading}
                >
                  {loading ? "Đang xử lý..." : "Xác Nhận"}
                </button>
              </Form>
            </Formik>
          ) : (
            // Normal change password flow (with token)
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
                  <button type="button" onClick={handleTypePassword}>
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

                  <button type="button" onClick={handleTypeConfirmPassword}>
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
          )}
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
