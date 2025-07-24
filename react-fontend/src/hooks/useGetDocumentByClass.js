import { AdminGetAllDocumnetByClass } from "../api/UserCallApi";

const useGetDocumentByClass = () => {
  const getdocumentbyclass = async (classId) => {
    const token = localStorage.getItem("token");
    try {
      const res = await AdminGetAllDocumnetByClass(classId, token);
      return res.data.data;
    } catch (error) {
      return error.message;
    }
  };
  return getdocumentbyclass;
};
export default useGetDocumentByClass;
