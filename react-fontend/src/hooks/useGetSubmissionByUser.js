import { UserGetSubmissionApi } from "../api/UserCallApi";

const useGetSubmissionByUser = () => {
  const getsubmission = async (contestId) => {
    const token = localStorage.getItem("token");
    try {
      const res = await UserGetSubmissionApi(contestId, token);

      return res.data.content;
    } catch (error) {
      return error.message;
    }
  };
  return getsubmission;
};

export default useGetSubmissionByUser;
