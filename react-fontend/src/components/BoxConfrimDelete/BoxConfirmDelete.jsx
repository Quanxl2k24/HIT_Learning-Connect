import "./BoxConfirmDelete.scss";
import img_Bin from "../../assets/imgs/img_Bin.png";
const BoxConfirmDelete = ({
  display,
  handleCancel,
  handleDeleteBoxConfirm,
}) => {
  if (!display) return null;
  return (
    <div className="BoxConfirmDelete-container">
      <div className="BoxConfirmDelete">
        <div className="BoxConfirmDelete_title">
          <div className="BoxConfirmDelete_title--logo">
            <img src={img_Bin} alt="" />
          </div>
          <div className="BoxConfirmDelete_title--text">
            <h3>Xác nhận xoá</h3>
          </div>
        </div>
        <div className="BoxConfirmDelete_content">
          <p>Bạn có chắc chắn xóa lớp học này không?</p>
          <div className="BoxConfirmDelete_content--btn">
            <button className="btnDelete" onClick={handleDeleteBoxConfirm}>
              Xoá
            </button>
            <button className="btnCancel" onClick={handleCancel}>
              Huỷ
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default BoxConfirmDelete;
