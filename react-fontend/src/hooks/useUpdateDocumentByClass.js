import { AdminEditDocumentByClassApi } from "../api/UserCallApi";
const useUpdateDocumentByClass = () => {
  const updatedocumentbyclass = async (documentId, dataUpdate) => {
    const token = localStorage.getItem("token");
    try {
      await AdminEditDocumentByClassApi(documentId, dataUpdate, token);
      return true;
    } catch (error) {
      return false;
    }
  };
  return updatedocumentbyclass;
};

export default useUpdateDocumentByClass;
