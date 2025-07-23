import React from 'react';
import './AdminDocumentActionAdd.css'
import SideBar from '../../components/SideBar/SideBar';

function AdminDocumentActionAdd() {
    return (
        <div className="AdminDocumentActionEdit">
            <div className="Home_left">
                <SideBar />
            </div>

            <div className="Home_Right">
                <div className="AdminClass_Banner">
                    <div className="logo-banner"></div>
                    <div className="title-banner">
                        <h3>Thêm tài liệu</h3>
                    </div>
                </div>

                <div className="DocumentFormContainer">


                    <form className="DocumentForm">
                        <div className="DocumentFormTitle">Tạo tài liệu</div>
                        <label>
                            Tên tài liệu *
                            <input type="text" placeholder="Nhập tên tài liệu" required />
                        </label>

                        <label>
                            Người tạo *
                            <input type="text" placeholder="Nhập người tạo" required />
                        </label>

                        <label>
                            Ngày tạo
                            <input type="text" value="05/09/2025" readOnly />
                        </label>

                        <label className="push-file">
                            Tệp đính kèm *
                            <input type="file" />
                        </label>

                        <label>
                            Ghi chú
                            <textarea placeholder="Nhập ghi chú"></textarea>
                        </label>

                        <div className="DocumentFormActions">
                            <button type="button" className="cancel-btn">Hủy</button>
                            <button type="submit" className="submit-btn">Tạo</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default AdminDocumentActionAdd;
