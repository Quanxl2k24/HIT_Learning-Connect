import { UserSubmitContest } from "../api/UserCallApi";

const useSubmitContestByUser = () => {
  const submitbyuser = async (contestId, urlFile) => {
    const token = localStorage.getItem("token");
    try {
      const res = await UserSubmitContest(contestId, urlFile, token);
      return true;
    } catch (error) {
      return false;
    }
  };
  return submitbyuser;
};

export default useSubmitContestByUser;
