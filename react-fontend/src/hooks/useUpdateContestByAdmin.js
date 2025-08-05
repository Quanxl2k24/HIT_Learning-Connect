import { AdminEditContest } from "../api/UserCallApi";

const useUpdateContestByAdmin = () => {
  const updatecontest = async (contestId, dataUpdate) => {
    const token = localStorage.get("token");
    try {
      const res = await AdminEditContest(contestId, dataUpdate, token);
      console.log("res: ", res);
      return res;
    } catch (error) {
      return error.message;
    }
  };
  return updatecontest;
};

export default useUpdateContestByAdmin;
