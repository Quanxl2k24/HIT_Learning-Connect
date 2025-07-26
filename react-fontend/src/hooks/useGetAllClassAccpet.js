import { AdminGetAllClassAccpet } from "../api/UserCallApi";

const useGetAllClassAccpet = () => {
  const getallclassaccpet = async () => {
    const token = localStorage.getItem("token");
    try {
      const res = await AdminGetAllClassAccpet(token);
      return res;
    } catch (error) {
      return error.message;
    }
  };

  return getallclassaccpet;
};

export default useGetAllClassAccpet;
