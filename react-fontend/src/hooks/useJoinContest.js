import { UserJoinContestApi } from "../api/UserCallApi";

const useJoinContest = () => {
  const joincontest = async (contestId) => {
    const token = localStorage.getItem("token");

    try {
      await UserJoinContestApi(contestId, token);
      return true;
    } catch (error) {
      return false;
    }
  };
  return joincontest;
};

export default useJoinContest;
