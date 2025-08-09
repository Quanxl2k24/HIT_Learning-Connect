import { StorageUploadFileApi } from "../api/UserCallApi";

const useUploadFile = () => {
  const uploadFile = async (file) => {
    const token = localStorage.getItem("token");

    if (!token) {
      throw new Error("Không tìm thấy token xác thực");
    }

    if (!file) {
      throw new Error("Không có file để upload");
    }

    try {
      const response = await StorageUploadFileApi(file, token);
      return {
        success: true,
        data: response.data.data,
        fileUrl: response.data.data.fileUrl,
      };
    } catch (error) {
      console.error("Upload file error:", error);
      return {
        success: false,
        error:
          error.response?.data?.message ||
          error.message ||
          "Upload file thất bại",
      };
    }
  };

  return { uploadFile };
};

export default useUploadFile;
