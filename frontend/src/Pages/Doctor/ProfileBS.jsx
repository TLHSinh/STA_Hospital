// // DoctorProfile.jsx
// import React, { useContext } from 'react';
// import { AuthContext } from '../../context/AuthContext';


// const DoctorProfile = () => {

//   const { user } = useContext(AuthContext);

//   if (!user) {
//       return <p>Loading...</p>;  // Hoặc điều hướng nếu chưa có thông tin
//   }

//   return (
//     // <div className="container mx-auto p-6">
//     //   <h2 className="text-2xl font-bold mb-4">Thông tin bác sĩ</h2>

//     //   {/* Hiển thị thông tin bác sĩ */}
//     //   <div className="bg-white shadow-md rounded-lg p-4 mb-4">
//     //     <h3 className="text-xl font-semibold">{user.ten}</h3>
//     //     <p>Chuyên khoa: {user.chuyenKhoa}</p>
//     //     <p>Kinh nghiệm: {user.kinhNghiem} năm</p>
//     //     <p>Địa chỉ phòng khám: {user.diaChi}</p>
//     //   </div>

//     //   {/* Hiển thị danh sách bác sĩ */}
//     //   <div>
        
//     //       <div key={user._id} className="bg-gray-100 p-4 rounded mb-2">
//     //         <h3 className="font-semibold">{user.ten}</h3>
//     //         <p>Chuyên khoa: {user.chuyenKhoa}</p>
//     //       </div>

//     //   </div>

//     //   {/* Hiển thị lịch hẹn */}
//     //   <h3 className="text-xl font-bold mt-6">Lịch hẹn</h3>
//     //   <div>

//     //   </div>
//     // </div>

//     <div className="max-w-lg flex flex-col gap-4 p-6 text-sm">
//             <img className="w-36 rounded-full mx-auto" src={user.image} alt="Profile" />

//             {isEdit ? (
//                 <input
//                     className="bg-gray-50 text-3xl font-medium max-w-60 text-center"
//                     type="text"
//                     value={user.name}
//                     onChange={(e) => setUserData({ ...userData, name: e.target.value })}
//                 />
//             ) : (
//                 <p className="font-medium text-3xl text-center text-neutral-800">{userData.name}</p>
//             )}

//             <hr className="bg-zinc-400 h-[1px] border-none" />

//             <div>
//                 <p className="font-semibold text-gray-600">CONTACT INFORMATION</p>
//                 <div className="mt-2">
//                     <p className="text-gray-600">Email id:</p>
//                     {isEdit ? (
//                         <input
//                             type="text"
//                             className="bg-gray-50 w-full mt-1 p-1 border rounded"
//                             value={userData.email}
//                             onChange={(e) => setUserData({ ...userData, email: e.target.value })}
//                         />
//                     ) : (
//                         <p className="text-blue-600">{userData.email}</p>
//                     )}
//                 </div>
//                 <div className="mt-2">
//                     <p className="text-gray-600">Phone:</p>
//                     {isEdit ? (
//                         <input
//                             type="text"
//                             className="bg-gray-50 w-full mt-1 p-1 border rounded"
//                             value={userData.phone}
//                             onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
//                         />
//                     ) : (
//                         <p className="text-blue-600">{userData.phone}</p>
//                     )}
//                 </div>
//                 <div className="mt-2">
//                     <p className="text-gray-600">Address:</p>
//                     {isEdit ? (
//                         <input
//                             type="text"
//                             className="bg-gray-50 w-full mt-1 p-1 border rounded"
//                             value={userData.address}
//                             onChange={(e) => setUserData({ ...userData, address: e.target.value })}
//                         />
//                     ) : (
//                         <p>{userData.address}</p>
//                     )}
//                 </div>
//             </div>

//             <hr className="bg-zinc-400 h-[1px] border-none" />

//             <div>
//                 <p className="font-semibold text-gray-600">BASIC INFORMATION</p>
//                 <div className="mt-2">
//                     <p className="text-gray-600">Gender:</p>
//                     {isEdit ? (
//                         <input
//                             type="text"
//                             className="bg-gray-50 w-full mt-1 p-1 border rounded"
//                             value={userData.gender}
//                             onChange={(e) => setUserData({ ...userData, gender: e.target.value })}
//                         />
//                     ) : (
//                         <p>{userData.gender}</p>
//                     )}
//                 </div>
//                 <div className="mt-2">
//                     <p className="text-gray-600">Birthday:</p>
//                     {isEdit ? (
//                         <input
//                             type="date"
//                             className="bg-gray-50 w-full mt-1 p-1 border rounded"
//                             value={userData.birthday}
//                             onChange={(e) => setUserData({ ...userData, birthday: e.target.value })}
//                         />
//                     ) : (
//                         <p>{userData.birthday}</p>
//                     )}
//                 </div>
//             </div>

//             <button
//                 className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded mt-4 mx-auto"
//                 onClick={() => setIsEdit(!isEdit)}
//             >
//                 {isEdit ? 'Save' : 'Edit'}
//             </button>
//         </div>

//   );
// };

// export default DoctorProfile;



import React, { useContext, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { BASE_URL } from '../../config';
import { toast } from 'react-toastify';

const DoctorProfile = () => {
    const { user, dispatch } = useContext(AuthContext);
    const [isEdit, setIsEdit] = useState(false);
    const [userData, setUserData] = useState({
      ten: user?.ten || '',
        email: user?.email || '',
        soDienThoai: user?.soDienThoai || '',
        diaChi: user?.diaChi || '',
        gioiTinh: user?.gioiTinh || '',
        ngaySinh: user?.ngaySinh || '',
    });

    // Hàm cập nhật thông tin bác sĩ
    const handleSave = async () => {
        try {
            const res = await fetch(`${BASE_URL}/api/v1/doctors/${user.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${user.token}`,
                },
                body: JSON.stringify(userData),
            });

            const data = await res.json();
            if (!res.ok) throw new Error(data.message);

            // Cập nhật AuthContext với dữ liệu mới
            dispatch({ type: 'UPDATE_USER', payload: data.updatedUser });

            toast.success('Thông tin đã được cập nhật thành công');
            setIsEdit(false);
        } catch (error) {
            toast.error(`Lỗi: ${error.message}`);
        }
    };

    return (
        <div className="max-w-lg flex flex-col gap-4 p-6 text-sm">
            <img className="w-36 rounded-full mx-auto" src={user.hinhAnh} alt="Profile" />

            {isEdit ? (
                <input
                    className="bg-gray-50 text-3xl font-medium max-w-60 text-center"
                    type="text"
                    value={userData.name}
                    onChange={(e) => setUserData({ ...userData, name: e.target.value })}
                />
            ) : (
                <p className="font-medium text-3xl text-center text-neutral-800">{userData.ten}</p>
            )}

            <hr className="bg-zinc-400 h-[1px] border-none" />

            <div>
                <p className="font-semibold text-gray-600">CONTACT INFORMATION</p>
                <div className="mt-2">
                    <p className="text-gray-600">Email:</p>
                    {isEdit ? (
                        <input
                            type="text"
                            className="bg-gray-50 w-full mt-1 p-1 border rounded"
                            value={userData.email}
                            onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                        />
                    ) : (
                        <p className="text-blue-600">{userData.email}</p>
                    )}
                </div>
                <div className="mt-2">
                    <p className="text-gray-600">Phone:</p>
                    {isEdit ? (
                        <input
                            type="text"
                            className="bg-gray-50 w-full mt-1 p-1 border rounded"
                            value={userData.soDienThoai}
                            onChange={(e) => setUserData({ ...userData, soDienThoai: e.target.value })}
                        />
                    ) : (
                        <p className="text-blue-600">{userData.soDienThoai}</p>
                    )}
                </div>
                <div className="mt-2">
                    <p className="text-gray-600">Address:</p>
                    {isEdit ? (
                        <input
                            type="text"
                            className="bg-gray-50 w-full mt-1 p-1 border rounded"
                            value={userData.diaChi}
                            onChange={(e) => setUserData({ ...userData, diaChi: e.target.value })}
                        />
                    ) : (
                        <p>{userData.diaChi}</p>
                    )}
                </div>
            </div>

            <hr className="bg-zinc-400 h-[1px] border-none" />

            <div>
                <p className="font-semibold text-gray-600">BASIC INFORMATION</p>
                <div className="mt-2">
                    <p className="text-gray-600">Giới tính:</p>
                    {isEdit ? (
                        <input
                            type="text"
                            className="bg-gray-50 w-full mt-1 p-1 border rounded"
                            value={userData.gioiTinh}
                            onChange={(e) => setUserData({ ...userData, gioiTinh: e.target.value })}
                        />
                    ) : (
                        <p>{userData.gioiTinh}</p>
                    )}
                </div>
                <div className="mt-2">
                    <p className="text-gray-600">Ngày sinh:</p>
                    {isEdit ? (
                        <input
                            type="date"
                            className="bg-gray-50 w-full mt-1 p-1 border rounded"
                            value={userData.ngaySinh}
                            onChange={(e) => setUserData({ ...userData, ngaySinh: e.target.value })}
                        />
                    ) : (
                        <p>{userData.ngaySinh}</p>
                    )}
                </div>
            </div>

            <button
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded mt-4 mx-auto"
                onClick={isEdit ? handleSave : () => setIsEdit(true)}
            >
                {isEdit ? 'Save' : 'Edit'}
            </button>
        </div>
    );
};

export default DoctorProfile;
