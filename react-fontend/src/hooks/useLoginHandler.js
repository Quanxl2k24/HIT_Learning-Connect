import { useNavigate } from "react-router-dom";
import { LoginApi } from "../api/UserCallApi";
const useLoginHandler = () => {
  const navigate = useNavigate();
  const handleLogin = async (username, password, navigator = null) => {
    try {
      const response = await LoginApi({ username, password });

      //  Lấy dữ liệu từ tầng response.data.data
      const { accessToken, refreshToken, id, authorities, firstLogin } =
        response.data.data;
      console.log("api tra ve: ", response.data.data.authorities[0].authority);

      //  Lưu token
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("token", accessToken);

      setTimeout(() => {
        if (!firstLogin) {
          if (response.data.data.authorities[0].authority === "ROLE_ADMIN") {
            navigator("/Admin/Home");
          } else {
            navigator("/Home");
          }
        } else {
          navigator("/ChangePassword");
        }
      }, 1500);

      return { success: true };
    } catch (error) {
      console.log("Đăng nhập thất bại: ", error.message);
      return { success: false };
    }
  };

  return { handleLogin };
};

export default useLoginHandler;
