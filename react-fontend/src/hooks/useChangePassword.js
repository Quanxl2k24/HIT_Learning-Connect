import { ChangePasswordApi } from "../api/UserCallApi";

const useChangePassword = () => {
  const ChangePassword = async (
    password,
    confirmPassword,
    token,
    navigator = null
  ) => {
    try {
      const response = await ChangePasswordApi({
        password,
        confirmPassword,
        token,
      });
      //in ra response
      console.log(response);
      //chuyen trang
      if (navigator) {
        navigator("/");
      }
      console.log(navigator);
    } catch (error) {
      console.log("Doi mat khau that bai", error.message);
    }
  };
  return { ChangePassword };
};

export default useChangePassword;
