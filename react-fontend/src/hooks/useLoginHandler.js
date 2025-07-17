import { LoginApi } from "../api/UserCallApi";
import { useDispatch } from "react-redux";
import { fetchUser } from "../redux/user/userActions";
const useLoginHandler = () => {
  const handleLogin = async (
    username,
    password,
    navigator = null,
    dispatch
  ) => {
    try {
      const response = await LoginApi({ username, password });

      // In ra toàn bộ để debug
      // console.log("Full response: ", response);

      //  Lấy đúng dữ liệu từ tầng response.data.data
      const {
        tokenType,
        accessToken,
        refreshToken,
        id,
        authorities,
        firstLogin,
      } = response.data.data;

      //  Lưu token
      localStorage.setItem("accessToken", `${tokenType} ${accessToken}`);
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("token", accessToken);

      //  Log thông tin user
      console.log("Đăng nhập thành công", { id, authorities });
      console.log("Co phai lan dau", firstLogin);

      //  Điều hướng nếu cần

      // can sua lai day bro(do lai if else la dc)
      if (!firstLogin) {
        if (navigator) {
          navigator("/");
        }
      } else {
        navigator("/ChangePassword");
      }
    } catch (error) {
      console.log("Đăng nhập thất bại: ", error.message);
    }
  };

  return { handleLogin };
};

export default useLoginHandler;
