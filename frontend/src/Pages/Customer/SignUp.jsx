import { useState } from "react";
import { Link } from "react-router-dom";

const SignUp = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photo: selectedFile,
    gender: "",
    role: "patient",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];
    // Handle file upload logic here
  };

  const submitHandler = async (event) => {
    event.preventDefault();
  };

  return (
    <section className="px-2 xl:px-0 py-10">
  <div className="max-w-[800px] mx-auto">
    <div className="grid grid-cols-1 lg:grid-cols-2 bg-white rounded-lg shadow-lg overflow-hidden">
      {/* img box */}
      <div className="hidden lg:flex bg-primaryColor justify-center items-center ">
        <img src="/banner_SignUp.png" alt="Background" className="w-[100%]" />
      </div>

      {/* ---Form Đăng Ký--- */}
      <div className="p-6 bg-gray-50 flex flex-col justify-center">
        <h3 className="text-headingColor text-[18px] leading-7 font-bold mb-6 text-center lg:text-left">
          Tạo Tài <span className="text-primaryColor">Khoản</span>
        </h3>

        <form onSubmit={submitHandler}>
          <div className="mb-4">
            <input
              type="text"
              placeholder="Họ và Tên"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-2 py-2 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[14px] leading-6 text-headingColor placeholder:text-textColor rounded-md cursor-pointer"
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-2 py-2 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[14px] leading-6 text-headingColor placeholder:text-textColor rounded-md cursor-pointer"
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
              className="w-full px-2 py-2 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[14px] leading-6 text-headingColor placeholder:text-textColor rounded-md cursor-pointer"
              required
            />
          </div>

          <div className="mb-4">
            <input
              type="password"
              placeholder="Xác Nhận Mật Khẩu"
              name="rePassword"
              value={formData.rePassword}
              onChange={handleInputChange}
              className="w-full px-2 py-2 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[14px] leading-6 text-headingColor placeholder:text-textColor rounded-md cursor-pointer"
              required
            />
          </div>

          <div className="mb-4 flex items-center justify-between">
            <label className="text-headingColor font-bold text-[13px] leading-6 inline-flex items-center">
              Bạn là:
              <select
                name="role"
                value={formData.role}
                onChange={handleInputChange}
                className="text-textColor font-semibold text-[13px] leading-6 px-2 py-2 focus:outline-none ml-2"
              >
                <option value="patient">Patient</option>
                <option value="doctor">Doctor</option>
              </select>
            </label>

            <label className="text-headingColor font-bold text-[13px] leading-6 inline-flex items-center">
              Giới Tính:
              <select
                name="gender"
                value={formData.gender}
                onChange={handleInputChange}
                className="text-textColor font-semibold text-[13px] leading-6 px-2 py-2 focus:outline-none ml-2"
              >
                <option value="male">Nam</option>
                <option value="female">Nữ</option>
                <option value="other">Khác</option>
              </select>
            </label>
          </div>

          <div className="mb-4 flex items-center gap-2">
            <figure className="w-[50px] h-[50px] mt-3 rounded-full border-2 border-solid border-primaryColor flex items-center justify-center overflow-hidden">
              <img
                src="/avatar_user1.jpg"
                alt=""
                className="w-full h-full object-cover"
              />
            </figure>

            <div className="relative w-[110px] h-[40px]">
              <input
                type="file"
                name="photo"
                id="customFile"
                onChange={handleFileInputChange}
                accept=".jpg, .png"
                className="absolute top-0 left-0 w-full h-full opacity-0 cursor-pointer"
              />
              <label
                htmlFor="customFile"
                className="absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[13px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer"
              >
                Upload Photo
              </label>
            </div>
          </div>

          <div className="mt-6">
            <button
              type="submit"
              className="w-full bg-primaryColor text-white text-[14px] leading-[26px] rounded-lg px-2 py-2"
            >
              Đăng Ký
            </button>
          </div>

          <p className="mt-4 text-textColor text-center text-[13px]">
            Bạn đã có tài khoản?{" "}
            <Link to="/customer/login" className="text-primaryColor font-medium ml-1">
              Đăng nhập
            </Link>
          </p>
        </form>
      </div>
    </div>
  </div>
</section>

  );
};

export default SignUp;
