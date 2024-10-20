import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import uploadImageToCloudinary from "../../utils/uploadCloudinary.js";
import { BASE_URL } from "../../config.js";
import { toast } from 'react-toastify';
import HashLoader from 'react-spinners/HashLoader';

const SignUp = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState("");
  const [loading, setLoading] =useState(false)

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    photo: selectedFile,
    gender: "",
    role: "patient",
  });

  const navigate=useNavigate()

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileInputChange = async (event) => {
    const file = event.target.files[0];


    const data =await uploadImageToCloudinary(file);

    setPreviewURL(data.url)
    setSelectedFile(data.url)
    setFormData({...formData, photo:data.url})

    // Handle file upload logic here
  };

  const submitHandler = async (event) => {
    
    event.preventDefault();
    setLoading(true)

    try{
      const res = await fetch(`${BASE_URL}/api/v1/auth/register`,{
         method:'post',
         headers:{
          'Content-type':'application/json'
         },
         body: JSON.stringify(formData)
      })

      const {message}=await res.json()

      if(!res.ok){
        throw new Error(message)
      }

      setLoading(false)
      toast.success(message)
      navigate("/login")

    }catch(err){

      toast.error(err.message)
      setLoading(false)
    }
  };

  return (
    <section className="px-5 xl:px-0 py-16">
      <div className="max-w-[1170px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 bg-white rounded-lg shadow-lg overflow-hidden">
          {/* img box */}
          <div className="hidden lg:flex bg-primaryColor justify-center items-center p-10">
            <img src="/background_signup.png" alt="Background" className="w-[80%]" />
          </div>

          {/* ---Form Đăng Ký--- */}
          <div className="p-10 bg-gray-50 flex flex-col justify-center">
            <h3 className="text-headingColor text-[22px] leading-9 font-bold mb-10 text-center lg:text-left">
              Create an <span className="text-primaryColor">account</span>
            </h3>

            <form onSubmit={submitHandler}>
              <div className="mb-5">
                <input
                  type="text"
                  placeholder="Full Name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[18px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer"
                  required
                />
              </div>

              <div className="mb-5">
                <input
                  type="email"
                  placeholder="Enter your email"
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
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border-b border-solid border-[#0066ff61] focus:outline-none focus:border-b-primaryColor text-[18px] leading-7 text-headingColor placeholder:text-textColor rounded-md cursor-pointer"
                  required
                />
              </div>

              <div className="mb-5 flex items-center justify-between">
                        <label  className="text-headingColor font-bold text-[16px] leading-7">
                            Are you a:
                            <select
                            name="role"
                            value={formData.role}
                            onChange={handleInputChange}
                            className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
                            >
                            <option value="patient">Patient</option>
                            <option value="doctor">Doctor</option>
                            </select>
                        </label>

                        <label  className="text-headingColor font-bold text-[16px] leading-7">
                            Giới Tính:
                            <select
                            name="gender"
                            value={formData.gender}
                            onChange={handleInputChange}
                            className="text-textColor font-semibold text-[15px] leading-7 px-4 py-3 focus:outline-none"
                            >
                            <option value="male">Nam</option>
                            <option value="female">Nữ</option>
                            <option value="other">Khác</option>
                            </select>
                        </label>
                    </div>

              <div className="mb-5 flex items-center gap-3">
                { selectedFile &&  <figure className="w-[60px] h-[60px] rounded-full border-2 border-solid border-primaryColor flex items-center justify-center">
                  <img src={previewURL} alt="" className="w-full rounded-full" />
                </figure>}

                <div className="relative w-[130px] h-[50px]">
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
                    className="absolute top-0 left-0 w-full h-full flex items-center px-[0.75rem] py-[0.375rem] text-[15px] leading-6 overflow-hidden bg-[#0066ff46] text-headingColor font-semibold rounded-lg truncate cursor-pointer"
                  >
                    Upload Photo
                  </label>
                </div>
              </div>

              <div className="mt-7">
                <button
                  disabled={loading && true}
                  type="submit"
                  className="w-full bg-primaryColor text-white text-[18px] leading-[30px] rounded-lg px-4 py-3"
                >
                  {loading ? 
                  (<HashLoader size={35} color="#ffffff"/>)
                   :('Sign Up')}
                </button>
              </div>

              <p className="mt-5 text-textColor text-center">
                Already have an account?{" "}
                <Link to="/login" className="text-primaryColor font-medium ml-1">
                  Login
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
