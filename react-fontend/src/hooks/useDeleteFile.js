import { AdminDeleteFileByClass } from "../api/UserCallApi";

const useDeleteFile = () => {
  const deletefile = async (urlFile) => {
    const token = localStorage.getItem("token");
    try {
      const res = await AdminDeleteFileByClass(urlFile, token);
      return res;
    } catch (error) {
      return error.message;
    }
  };
  return deletefile;
};

export default useDeleteFile;
