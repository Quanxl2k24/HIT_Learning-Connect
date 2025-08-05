import { AdminEditContest } from "../api/UserCallApi";

const useUpdateContestByAdmin = () => {
  const updatecontest = async (contestId, dataUpdate) => {
    const token = localStorage.getItem("token");
    console.log(contestId);
    console.log(dataUpdate);
    try {
      await AdminEditContest(contestId, dataUpdate, token);
      return true;
    } catch (error) {
      return false;
    }
  };
  return updatecontest;
};

export default useUpdateContestByAdmin;
