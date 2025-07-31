import { AdminCreateContestApi } from "../api/UserCallApi";

const useCreateContest = () => {
  const createcontest = async (dataCreate) => {
    const token = localStorage.getItem("token");
    try {
      const res = await AdminCreateContestApi(dataCreate, token);
      console.log("ress", res);
      return res;
    } catch (error) {
      return error.message;
    }
  };
  return createcontest;
};

export default useCreateContest;
