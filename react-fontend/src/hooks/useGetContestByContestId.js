import { UserGetContestByContestId } from "../api/UserCallApi";

const useGetContestByContestId = () => {
  const getcontestbyid = async (contestId) => {
    const token = localStorage.getItem("token");
    try {
      const res = await UserGetContestByContestId(contestId, token);
      return res.data;
    } catch (error) {
      return error.message;
    }
  };
  return getcontestbyid;
};

export default useGetContestByContestId;
