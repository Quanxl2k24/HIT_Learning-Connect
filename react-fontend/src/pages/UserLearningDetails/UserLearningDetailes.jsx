import SideBar from "../../components/SideBar/SideBar";
import "./UserLearningDetails.scss";
import useGetDocumentById from "../../hooks/useGetDocumentById";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
const UserLearningDetails = () => {
  //lay params
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const documentId = params.get("documentId");
  const classTitle = params.get("classTitle");

  //call api lay doc theo id
  const getdocumnetbyid = useGetDocumentById();
  const [data, setData] = useState([]);
  const fetchdata = async () => {
    const res = await getdocumnetbyid(documentId);
    setData(res.data.data);
  };
  console.log("data", data);

  useEffect(() => {
    fetchdata();
  }, []);
  return (
    <div className="UserLearningDetails-container">
      <div className="UserLearningDetails ">
        <div className="UserLearningDetails_left">
          <SideBar />
        </div>

        <div className="UserLearningDetails_right">
          <div className="UserLearningDetails_right--banner">
            <div className="logo-banner"></div>
            <div className="title-banner">
              <h3>{classTitle}</h3>
            </div>
          </div>

          <div className="UserLearningDetails_right--box">
            <div className="box-container">
              <div className="box-title">
                <h1 className="h1">{data.title}</h1>
                <p className="date-create">Ngày tạo: {data.createdAt}</p>
              </div>
              <div className="box-description">
                <p className="p">Mô tả: {data.description}</p>
              </div>

              <div className="box-document">
                <a href={data.fileUrl} className="a">
                  <button className="button">Tài liệu chi tiết</button>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserLearningDetails;
