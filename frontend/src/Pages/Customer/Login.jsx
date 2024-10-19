import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        
        <section className="px-5 lg:px-0">
            <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10 mt-20">
                <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
                    Hello! <span className="text-primaryColor">Welcome</span> Back{" "}
                    <span role="img" aria-label="wave">👋</span>
                </h3>
                <form className="py-4 md:py-0">
                    <div className="mb-5">
                        <input
                            type="email"
                            placeholder="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[18px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer"
                            required
                        />
                    </div>

                    <div className="mb-5">
                        <input
                            type="password"
                            placeholder="Mật Khẩu"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[18px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer"
                            required
                        />
                    </div>

                    <div className="mt-7">
                        <button
                        type= "submit"
                        className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3">
                        Đăng Nhập
                        </button>
                    </div>

                    <p className="mt-5 text-textColor text-center">
                    Bạn chưa có tài khoản? {" "}
                        <Link to="/register" className="text-primaryColor font-medium ml-1">
                        Đăng Ký Ngay
                        </Link>
                    </p>
                </form>
            </div>
        </section>
        
    );
};

export default Login;
