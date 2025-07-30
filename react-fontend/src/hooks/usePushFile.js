import { AdminPushFileByClass } from "../api/UserCallApi";
const usePushFile = () => {
  const pushfile = async (file) => {
    const token = localStorage.getItem("token");
    try {
      const res = await AdminPushFileByClass(file, token);
      return res.data.data.filePath;
    } catch (error) {
      return false;
    }
  };
  return pushfile;
};
export default usePushFile;
