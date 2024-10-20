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
        <section className="px-5 lg:px-0">
            <div className="w-full max-w-[570px] mx-auto rounded-lg shadow-md md:p-10">
                <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10">
                    Hello! <span className="text-primaryColor">Welcome</span> Back{" "}
                    <span role="img" aria-label="wave">👋</span>
                </h3>
                <form className="py-4 md:py-0" onSubmit={submitHandler}>
                    <div className="mb-5">
                        <input
                            type="email"
                            placeholder="Nhập Email"
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
                            placeholder="Nhập Mật Khẩu"
                            name="password"
                            value={formData.password}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[18px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer"
                            required
                        />
                    </div>

                    <div className="mt-7">
                        <button
                            disabled={loading}
                            type="submit"
                            className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
                        >
                            {loading ? (
                                <HashLoader size={35} color="#ffffff" />
                            ) : ('Login')}
                        </button>
                    </div>

                    <p className="mt-5 text-textColor text-center">
                        Don&apos;t have an account? {" "}
                        <Link to="/register" className="text-primaryColor font-medium ml-1">
                            Register
                        </Link>
                    </p>
                </form>
            </div>
        </section>
    );
};

export default Login;
