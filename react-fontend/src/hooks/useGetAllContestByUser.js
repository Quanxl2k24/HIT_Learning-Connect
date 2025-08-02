import { UserGetAllContestApi } from "../api/UserCallApi";
const useGetAllContestByUser = () => {
  const getcontestbyuser = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await UserGetAllContestApi(token);
      return res.data.content;
    } catch (error) {
      return error.message;
    }
  };
  return getcontestbyuser;
};

export default useGetAllContestByUser;
