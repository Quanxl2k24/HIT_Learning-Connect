import { LoginApi } from "../api/UserCallApi";
const useLoginHandler = () => {
  const handleLogin = async (
    username,
    password,
    navigator = null,
    dispatch
  ) => {
    try {
      const response = await LoginApi({ username, password });

      //  Lấy dữ liệu từ tầng response.data.data
      const { accessToken, refreshToken, id, authorities, firstLogin } =
        response.data.data;
      // console.log("api tra ve: ", response.data.data);

      //  Lưu token
      localStorage.setItem("refreshToken", refreshToken);
      localStorage.setItem("token", accessToken);

      //  Log thông tin user
      // console.log("Đăng nhập thành công", { id, authorities });
      // console.log("Co phai lan dau", firstLogin);

      // can sua lai day bro(do lai if else la dc)

      setTimeout(() => {
        if (!firstLogin) {
          if (navigator) {
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
