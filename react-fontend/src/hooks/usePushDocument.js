import { AdminPushFromDocument } from "../api/UserCallApi";
const usePushDocument = () => {
  const pushdocument = (dataPush) => {
    const token = localStorage.getItem("token");
    try {
      const res = AdminPushFromDocument(dataPush, token);
      return true;
    } catch (error) {
      return false;
    }
  };
  return pushdocument;
};

export default usePushDocument;
