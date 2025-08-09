import { AdminScoringSubmissionApi } from "../api/UserCallApi";

const useScoring = () => {
  const scoring = async (submissionId, dataScoring) => {
    const token = localStorage.getItem("token");
    try {
      const res = await AdminScoringSubmissionApi(
        submissionId,
        dataScoring,
        token
      );
      return true;
    } catch (error) {
      return false;
    }
  };
  return scoring;
};

export default useScoring;
