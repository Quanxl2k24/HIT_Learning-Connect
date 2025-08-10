import { useState } from "react";
import { VerifyCodeAndChangePasswordApi } from "../api/UserCallApi";

const useVerifyCodeChangePassword = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const verifyCodeAndChangePassword = async (email, code, newPassword) => {
    setLoading(true);
    setError(null);
    setSuccess(false);

    try {
      const response = await VerifyCodeAndChangePasswordApi({
        email,
        code,
        newPassword,
      });

      console.log("Verify code and change password response:", response);
      setSuccess(true);
      return response.data;
    } catch (error) {
      console.error("Verify code and change password failed:", error);
      setError(error.response?.data?.message || "Đổi mật khẩu thất bại");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  return {
    verifyCodeAndChangePassword,
    loading,
    error,
    success,
  };
};

export default useVerifyCodeChangePassword;
