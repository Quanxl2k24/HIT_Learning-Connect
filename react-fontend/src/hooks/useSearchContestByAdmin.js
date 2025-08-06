import { AdminSearchContestApi } from "../api/UserCallApi";

const useSearchContestByAdmin = () => {
  const searchcontest = async (keyword) => {
    const token = localStorage.getItem("token");
    try {
      const res = await AdminSearchContestApi(keyword, token);
      return res.data.content;
    } catch (error) {
      return error.message;
    }
  };
  return searchcontest;
};

export default useSearchContestByAdmin;
