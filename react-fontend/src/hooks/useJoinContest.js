import { UserJoinContestApi } from "../api/UserCallApi";

const useJoinContest = () => {
  const joincontest = async (contestId) => {
    const token = localStorage.getItem("token");

    try {
      const res = await UserJoinContestApi(contestId, token);
      console.log(">>>>", res);
      return res;
    } catch (error) {
      return error.message;
    }
  };
  return joincontest;
};

export default useJoinContest;
