import { AdminDeleteContestApi } from "../api/UserCallApi";

const useDeleteContestByAdmin = () => {
  const deletecontest = async (id) => {
    const token = localStorage.getItem("token");
    try {
      const res = await AdminDeleteContestApi(id, token);
      return true;
    } catch (error) {
      return error.message;
    }
  };
  return deletecontest;
};

export default useDeleteContestByAdmin;
