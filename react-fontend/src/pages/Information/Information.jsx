import React from 'react';
import Logo from '../../assets/imgs/LogoHit.png';
import './Information.css';
import Key from '../../assets/imgs/key.png';
import Pen from '../../assets/imgs/pen.png';
import Male from '../../assets/imgs/male.png';
import Lich from '../../assets/imgs/lich.png';
import Mail from '../../assets/imgs/mail.png';
import People from '../../assets/imgs/people.png';
import Logout from '../../assets/imgs/logout-logo.png';


function Information() {
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
                    <div className="profile-card">
                        <div className="card-header"></div>
                        <div className="card-body">
                            <div className="card-avatar">N</div>
                            <h2 className="card-name">Nguyễn Văn A</h2>
                            <p className="card-role">Học viên</p>

                            <div className="info-grid">
                                <div className="info-item">
                                    <img src={Male} alt="" />
                                    <div className="info-item-content">
                                        <span>Giới tính:</span>
                                        <p>Nam</p>
                                    </div>
                                </div>
                                <div className="info-item">
                                    <img src={Mail} alt="" />
                                    <div className="info-item-content">
                                        <span>Email:</span>
                                        <p>nguyenvana@example.com</p>
                                    </div>
                                </div>
                                <div className="info-item">
                                    <img src={Lich} alt="" />
                                    <div className="info-item-content">
                                        <span>Ngày sinh:</span>
                                        <p>01/01/1990</p>

                                    </div>
                                </div>
                                <div className="info-item">
                                    <img src={People} alt="" />
                                    <div className="info-item-content">
                                        <span>Tên tài khoản:</span>
                                        <p>nguyenvana</p>

                                    </div>
                                </div>
                            </div>

                            <div className="card-buttons">
                                <button className="btn-outline"><img src={Key} alt="key" /> Đổi mật khẩu</button>
                                <button className="btn-solid"><img src={Pen} alt="pen" /> Chỉnh sửa</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Information;
