import { UserRegisterClassApi } from "../api/UserCallApi";
const useRegisterByUser = () => {
  const callAPI = async (classId) => {
    const token = localStorage.getItem("token");
    try {
      const res = await UserRegisterClassApi(classId, token);
      return { success: true };
    } catch (error) {
      return { success: false };
    }
  };
  return { callAPI };
};

export default useRegisterByUser;
