import { AdminGetSubmissionByContestIdApi } from "../api/UserCallApi";

const useGetSubmissionByContestId = () => {
  const getsubmission = async (contestId) => {
    const token = localStorage.getItem("token");
    try {
      const res = await AdminGetSubmissionByContestIdApi(contestId, token);
      console.log("ressss", res);
      return res.data.content;
    } catch (error) {
      return error.message;
    }
  };
  return getsubmission;
};

export default useGetSubmissionByContestId;
