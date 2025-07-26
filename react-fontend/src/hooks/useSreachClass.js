import { AdminSreachClassApi } from "../api/UserCallApi";

const useSreachClass = () => {
  const sreachclass = async (keyword) => {
    const token = localStorage.getItem("token");
    try {
      const res = await AdminSreachClassApi(keyword, token);
      return res;
    } catch (error) {
      return error.message;
    }
  };
  return sreachclass;
};

export default useSreachClass;
