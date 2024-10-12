import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import '../Pages/LoginRegister.css';
import { FaAngleLeft } from "react-icons/fa6";



function LoginRegister() {
    const navigate = useNavigate(); // Initialize the useNavigate hook

    useEffect(() => {
        const content = document.getElementById('content');
        const registerBtn = document.getElementById('register');
        const loginBtn = document.getElementById('login');

        registerBtn.addEventListener('click', () => {
            content.classList.add('active');
        });

        loginBtn.addEventListener('click', () => {
            content.classList.remove('active');
        });

        // Cleanup event listeners on unmount
        return () => {
            registerBtn.removeEventListener('click', () => {
                content.classList.add('active');
            });
            loginBtn.removeEventListener('click', () => {
                content.classList.remove('active');
            });
        };
    }, []);

    return (
        <div className='center-form'> {/* Thêm lớp center-form ở đây */}
            <button
                className="btn btn-home"
                onClick={() => navigate('/')} // Điều hướng về trang chủ khi nhấn nút
            >
                {/* <img src="/ic_back.png" alt="Quay về" className="icon-back" /> Sử dụng hình ảnh từ public */}
                {/* <i class='bx bx-arrow-back' style={}></i> */}
                <FaAngleLeft />
            </button>

            <div className='content shadow-ig' id='content'>
                <div className="row w-100">
                    {/* --Biểu mẫu Đăng kí */}
                    <div className="col-md-6 d-flex justify-content-center">
                        <form className="form-box">
                            <div className="header-text mb-4">
                                <h1>Tạo Tài Khoản</h1>
                            </div>
                            
                            <div className="input-group mb-3">
                                <input type="text" placeholder="Name" className="form-control form-control-lg bg-light fs-6" />
                            </div>
                            
                            <div className="input-group mb-3">
                                <input type="email" placeholder="Email" className="form-control form-control-lg bg-light fs-6" />
                            </div>
                            
                            <div className="input-group mb-3">
                                <input type="password" placeholder="Password" className="form-control form-control-lg bg-light fs-6" />
                            </div>
                            
                            <div className="input-group mb-3 justify-content-center">
                                <button className="btn border-white text-white w-50 fs-6">Đăng Kí</button>
                            </div>
                        </form>
                    </div>

                    {/* --Biểu mẫu Đăng Nhập */}
                    <div className="col-md-6 right-box">
                        <form className="form-box">
                            <div className="header-text mb-4">
                                <h1>Đăng Nhập</h1>
                            </div>
                            
                            <div className="input-group mb-3">
                                <input type="email" placeholder="Email" className="form-control form-control-lg bg-light fs-6" />
                            </div>
                            
                            <div className="input-group mb-3">
                                <input type="password" placeholder="Password" className="form-control form-control-lg bg-light fs-6" />
                            </div>
                            
                            <div className="input-group mb-5 d-flex justify-content-center">
                                <div className="form-check me-3"> {/* Thêm me-3 để tạo khoảng cách bên phải */}
                                    <input type="checkbox" className="form-check-input" />
                                    <label htmlFor="formcheck" className="form-check-label text-secondary">
                                        <small>Nhớ Mật Khẩu</small>
                                    </label>
                                </div>
                                
                                <div className="forgot">
                                    <small>
                                        <a href="#!">Quên Mật Khẩu?</a>
                                    </small>
                                </div>
                            </div>

                            <div className="input-group mb-3 justify-content-center">
                                <button className="btn border-white text-white w-50 fs-6">Đăng Nhập</button>
                            </div>
                        </form>
                    </div>

                    {/* --Chuyển đổi-- */}
                    <div className="switch-content">
                        <div className="switch">
                            <div className="switch-panel switch-left">
                                <h2>Xin Chào</h2>
                                <p>Chúng tôi rất vui khi thấy bạn trở lại</p>
                                <button className="hidden btn border-white text-white w-50 fs-6" id="login">Login</button>
                            </div>
                            <div className="switch-panel switch-right">
                                <h2>Chào Mừng</h2>
                                <p>Tham gia nền tảng độc đáo của chúng tôi, khám phá trải nghiệm mới</p>
                                <button className="hidden btn border-white text-white w-50 fs-6" id="register">Register</button>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default LoginRegister;
