import { AdminGetAllContestApi } from "../api/UserCallApi";
const UserGetAllContestByAdmin = () => {
  const usegetcontestbyadmin = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await AdminGetAllContestApi(token);
      return res.data.data.content;
    } catch (error) {
      return error.message;
    }
  };
  return usegetcontestbyadmin;
};

export default UserGetAllContestByAdmin;
