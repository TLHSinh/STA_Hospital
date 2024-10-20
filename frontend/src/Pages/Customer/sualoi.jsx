import { useState, useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../config.js";
import { toast } from 'react-toastify';
import HashLoader from 'react-spinners/HashLoader';
import { authContext } from '../../context/AuthContext.jsx';

const Login = () => {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null); // Thêm state để lưu kết quả từ API
    const navigate = useNavigate();
    const { dispatch } = useContext(authContext);

    const submitHandler = async (event) => {
        event.preventDefault();
        setLoading(true);

        try {
            const res = await fetch(`${BASE_URL}/api/v1/auth/login`, {
                method: 'post',
                headers: {
                    'Content-type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            const data = await res.json();

            if (!res.ok) {
                throw new Error(data.message);
            }

            // Cập nhật state kết quả từ API
            setResult(data);

            // Dispatch action khi đăng nhập thành công
            dispatch({
                type: 'LOGIN_SUCCESS',
                payload: {
                    user: data.data,
                    token: data.token,
                    role: data.role,
                },
            });

            toast.success(data.message);
        } catch (err) {
            toast.error(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // Dùng useEffect để theo dõi kết quả đăng nhập và điều hướng
    useEffect(() => {
        if (result && result.token) {
            navigate("/");
        }
    }, [result, navigate]);

    return (

        
        <section className="px-3 lg:px-0">
            <div className="w-full max-w-[400px] mx-auto rounded-lg shadow-md md:p-6 mt-16">
                <h3 className="text-headingColor text-[20px] leading-8 font-bold mb-6">
                Hello! <span className="text-primaryColor">Welcome</span> Back{" "}
                <span role="img" aria-label="wave">👋</span>
                </h3>
                
                <form className="py-3 md:py-0" onSubmit={submitHandler}>
                    <div className="mb-4">

                        <input
                        type="email"
                        placeholder="Email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-6 text-headingColor placeholder:text-textColor rounded-md cursor-pointer"
                        required
                        />
                    </div>

                    <div className="mb-4">
                        <input
                        type="password"
                        placeholder="Mật Khẩu"
                        name="password"
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[16px] leading-6 text-headingColor placeholder:text-textColor rounded-md cursor-pointer"
                        required
                        />
                    </div>

                    <div className="mt-6">
                        <button

                        disabled={loading}
                        type="submit"
                        className="w-full bg-primaryColor text-white text-[16px] leading-[28px] rounded-lg px-3 py-2"
                        >
                        {loading ? (
                                <HashLoader size={35} color="#ffffff" />
                            ) : ('Đăng Nhập')}
                        </button>
                    </div>

                    <p className="mt-4 text-textColor text-center text-[14px]">
                        Bạn chưa có tài khoản?{" "}
                        <Link to="/customer/register" className="text-primaryColor font-medium ml-1">
                        Đăng Ký Ngay

                        </Link>
                    </p>
                </form>
            </div>
        </section>
    );
};

export default Login;