import React from 'react'
import Logo from '../../assets/imgs/LogoHit.png';
import Logout from '../../assets/imgs/logout-logo.png';
import './Change-Infor.css';
import Peoplee from '../../assets/imgs/peoplee.png';
import Vector from '../../assets/imgs/Vector.png';
import Book from '../../assets/imgs/book.png';
import Thu from '../../assets/imgs/thu.png';
function Change_Infor() {
    return (
        <div className="infor">
            <div className="infor-colum1">
                <div className="solid-on-logo"></div>
                <div className="infor-logo">
                    <img src={Logo} alt="Logo" />
                </div>
                <div className="solid-logo"></div>
                <div className="infor-title">
                    <div className="user-card">
                        <div className="avatar">N</div>
                        <div className="info">
                            <div className="name">Nguyễn Văn A</div>
                            <div className="role">Học viên</div>
                        </div>
                        <div className="circle-bg"></div>
                        <div className="circle-bgg"></div>
                    </div>
                </div>
                <div className="logout-btn">
                    <img src={Logout} alt="logout" />
                    <button>Đăng xuất</button>
                </div>
            </div>
            <div className="infor-colum2">
                <div className="infor-colum2-banner">
                    <div className="solid-banner-infor-co2"></div>
                    <div className="infor-colum2-banner-content">
                        <h3>Thông tin cá nhân</h3>
                    </div>
                </div>
                <div className="infor-colum2-body">
                    <div className="edit-card">
                        <div className="edit-header">Chỉnh sửa thông tin cá nhân</div>
                        <form className="edit-form">
                            <div className="form-row">
                                <div className="form-group">
                                    <label><img src={Peoplee} alt="" /> Họ và tên *</label>
                                    <input type="text" defaultValue="Nguyễn Văn B" required />
                                </div>
                                <div className="form-group">
                                    <label><img src={Vector} alt="" /> Giới tính *</label>
                                    <input type="text" defaultValue="Nam" required />
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label><img src={Book} alt="" /> Ngày sinh *</label>
                                    <input type="date" defaultValue="1990-01-01" required />
                                </div>
                                <div className="form-group">
                                    <label><img src={Thu} alt="" /> Email</label>
                                    <input type="email" defaultValue="nguyenvana@example.com" disabled />
                                    <small>Email không thể thay đổi</small>
                                </div>
                            </div>
                            <div className="form-row">
                                <div className="form-group">
                                    <label><img src={Peoplee} alt="" /> Tên tài khoản</label>
                                    <input type="text" defaultValue="nguyenvana" disabled />
                                    <small>Tên tài khoản không thể thay đổi</small>
                                </div>
                            </div>
                            <div className="form-buttons">
                                <button type="button" className="btn-outline">Hủy</button>
                                <button type="submit" className="btn-solid">Xác nhận</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Change_Infor;