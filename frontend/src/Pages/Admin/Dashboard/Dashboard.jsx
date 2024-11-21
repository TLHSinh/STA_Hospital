// import React, { useEffect, useState } from "react";
// import { BASE_URL, token } from "../../../config";
// import './Dashboard.css';


// const Dashboard = () => {
//   const [stats, setStats] = useState({
//     LichHen: "",
//     ThuocVatTu: "",
//     BenhNhan: "",
//     BacSi: "",
//   });

//   useEffect(() => {
//     // Fetch số liệu thống kê từ API
//     const fetchStats = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/v1/dashboard/stats`, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         const data = await res.json();
//         if (res.ok) {
//           setStats(data);
//         } else {
//           console.error(data.message);
//         }
//       } catch (err) {
//         console.error("Lỗi khi lấy dữ liệu thống kê:", err.message);
//       }
//     };
//     fetchStats();
//   }, []);

//   return (
//     <div className="dashboard-ad">
//       <h1 className="dashboard-title-ad">Dashboard</h1>
//       <div className="dashboard-cards-ad">
//         <div className="card-ad">
//           <div>
//             <div className="numbers">{stats.LichHen}</div>
//             <h2 className="cardName-ad">Lịch hẹn</h2>
//           </div>
//           <div className="iconBx">
//             <img width="96" height="96" src="https://img.icons8.com/color/96/tear-off-calendar--v1.png" alt="tear-off-calendar--v1" />
//           </div>
//         </div>
//         <div className="card-ad">
//           <div>
//             <div className="numbers">{stats.ThuocVatTu}</div>
//             <h2 className="cardName-ad">Thuốc - vật tư</h2>
//           </div>
//           <div className="iconBx">
//             <img width="96" height="96" src="https://img.icons8.com/color/96/pills.png" alt="pills" />
//           </div>
//         </div>
//         <div className="card-ad">
//           <div>
//             <div className="numbers">{stats.BenhNhan}</div>
//             <h2 className="cardName-ad">Bệnh nhân</h2>
//           </div>
//           <div className="iconBx">
//             <img width="96" height="96" src="https://img.icons8.com/color/96/user.png" alt="user" />
//           </div>
//         </div>
//         <div className="card-ad">
//           <div>
//             <div className="numbers">{stats.BacSi}</div>
//             <h2 className="cardName-ad">Bác sĩ</h2>
//           </div>
//           <div className="iconBx">
//             <img width="96" height="96" src="https://img.icons8.com/color/96/doctor-male--v1.png" alt="doctor-male--v1" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;







// import React, { useEffect, useState } from "react";
// import { BASE_URL, token } from "../../../config";
// import { motion } from "framer-motion"; // Import motion từ framer-motion
// import './Dashboard.css';

// const Dashboard = () => {
//   const [stats, setStats] = useState({
//     LichHen: "",
//     ThuocVatTu: "",
//     BenhNhan: "",
//     BacSi: "",
//   });

//   // useEffect(() => {
//     // Fetch số liệu thống kê từ API
//   //   const fetchStats = async () => {
//   //     try {
//   //       const res = await fetch(`${BASE_URL}/api/v1/dashboard/stats`, {
//   //         method: 'GET',
//   //         headers: {
//   //           'Content-Type': 'application/json',
//   //           Authorization: `Bearer ${token}`,
//   //         },
//   //       });
//   //       const data = await res.json();
//   //       if (res.ok) {
//   //         setStats(data);
//   //       } else {
//   //         console.error(data.message);
//   //       }
//   //     } catch (err) {
//   //       console.error("Lỗi khi lấy dữ liệu thống kê:", err.message);
//   //     }
//   //   };
//   //   fetchStats();
//   // }, []);


//   // Hàm tạo hiệu ứng tăng dần cho các số
//   const countUp = (start, end, duration = 0.5) => {
//     let startTime;
//     return new Promise((resolve) => {
//       const step = (timestamp) => {
//         if (!startTime) startTime = timestamp;
//         const progress = (timestamp - startTime) / 1000;
//         const value = Math.min(start + (end - start) * (progress / duration), end);
//         if (progress < duration) {
//           requestAnimationFrame(step);
//           setStats((prevState) => ({
//             ...prevState,
//             LichHen: value.toFixed(0),
//             ThuocVatTu: value.toFixed(0), 
//             BenhNhan: value.toFixed(0), 
//             BacSi: value.toFixed(0),// Cập nhật giá trị trong state
//           }));
//         } else {
//           setStats((prevState) => ({
//             ...prevState,
//             LichHen: end,  // Đảm bảo giá trị cuối cùng
//           }));
//           resolve();
//         }
//       };
//       requestAnimationFrame(step);
//     });
//   };

//   useEffect(() => {
//     // Fetch số liệu thống kê từ API
//     const fetchStats = async () => {
//       try {
//         const res = await fetch(`${BASE_URL}/api/v1/dashboard/stats`, {
//           method: 'GET',
//           headers: {
//             'Content-Type': 'application/json',
//             Authorization: `Bearer ${token}`,
//           },
//         });
//         const data = await res.json();
//         if (res.ok) {
//           setStats(data);
//           // Bắt đầu hiệu ứng tăng dần cho số liệu thống kê
//           countUp(0, data.LichHen);
//           countUp(0, data.ThuocVatTu);
//           countUp(0, data.BenhNhan);
//           countUp(0, data.BacSi);
//         } else {
//           console.error(data.message);
//         }
//       } catch (err) {
//         console.error("Lỗi khi lấy dữ liệu thống kê:", err.message);
//       }
//     };

//     fetchStats();
//   }, []);

//   return (
//     <div className="dashboard-ad">
//       <h1 className="dashboard-title-ad">Dashboard</h1>
//       <div className="dashboard-cards-ad">
//         <motion.div
//           className="card-ad"
//           initial={{ opacity: 0, y: 20 }} // Khởi tạo card với opacity là 0 và dịch chuyển 20px
//           animate={{ opacity: 1, y: 0 }}   // Kết thúc card với opacity là 1 và không dịch chuyển
//           transition={{ duration: 0.6 }}    // Thời gian hiệu ứng là 0.6 giây
//         >
//           <div>
//             <div className="numbers">{stats.LichHen}</div>
//             <h2 className="cardName-ad">Lịch hẹn</h2>
//           </div>
//           <div className="iconBx">
//             <img width="96" height="96" src="https://img.icons8.com/color/96/tear-off-calendar--v1.png" alt="tear-off-calendar--v1" />
//           </div>
//         </motion.div>

//         <motion.div
//           className="card-ad"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.2 }}  // Độ trễ cho card thứ 2
//         >
//           <div>
//             <div className="numbers">{stats.ThuocVatTu}</div>
//             <h2 className="cardName-ad">Thuốc - vật tư</h2>
//           </div>
//           <div className="iconBx">
//             <img width="96" height="96" src="https://img.icons8.com/color/96/pills.png" alt="pills" />
//           </div>
//         </motion.div>

//         <motion.div
//           className="card-ad"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.4 }}  // Độ trễ cho card thứ 3
//         >
//           <div>
//             <div className="numbers">{stats.BenhNhan}</div>
//             <h2 className="cardName-ad">Bệnh nhân</h2>
//           </div>
//           <div className="iconBx">
//             <img width="96" height="96" src="https://img.icons8.com/color/96/user.png" alt="user" />
//           </div>
//         </motion.div>

//         <motion.div
//           className="card-ad"
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.6, delay: 0.6 }}  // Độ trễ cho card thứ 4
//         >
//           <div>
//             <div className="numbers">{stats.BacSi}</div>
//             <h2 className="cardName-ad">Bác sĩ</h2>
//           </div>
//           <div className="iconBx">
//             <img width="96" height="96" src="https://img.icons8.com/color/96/doctor-male--v1.png" alt="doctor-male--v1" />
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;







import React, { useEffect, useState } from "react";
import { BASE_URL, token } from "../../../config";
import { motion } from "framer-motion";
import './Dashboard.css';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    LichHen: 0,
    ThuocVatTu: 0,
    BenhNhan: 0,
    BacSi: 0,
  });

  // Hàm tạo hiệu ứng tăng dần cho từng số riêng biệt trong card
  const countUp = (start, end, duration = 0, key) => {
    let startTime;
    return new Promise((resolve) => {
      const step = (timestamp) => {
        if (!startTime) startTime = timestamp;
        const progress = (timestamp - startTime) / 1000;
        const value = Math.min(start + (end - start) * (progress / duration), end);
        if (progress < duration) {
          requestAnimationFrame(step);
          setStats((prevState) => ({
            ...prevState,
            [key]: value.toFixed(0),  // Cập nhật giá trị riêng biệt cho mỗi key
          }));
        } else {
          setStats((prevState) => ({
            ...prevState,
            [key]: end,  // Đảm bảo giá trị cuối cùng cho mỗi key
          }));
          resolve();
        }
      };
      requestAnimationFrame(step);
    });
  };

  useEffect(() => {
    // Fetch số liệu thống kê từ API
    const fetchStats = async () => {
      try {
        const res = await fetch(`${BASE_URL}/api/v1/dashboard/stats`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setStats(data);
          // Bắt đầu hiệu ứng tăng dần cho từng card
          countUp(0, data.LichHen, 2, "LichHen");
          countUp(0, data.ThuocVatTu, 2, "ThuocVatTu");
          countUp(0, data.BenhNhan, 2, "BenhNhan");
          countUp(0, data.BacSi, 2, "BacSi");
        } else {
          console.error(data.message);
        }
      } catch (err) {
        console.error("Lỗi khi lấy dữ liệu thống kê:", err.message);
      }
    };

    fetchStats();
  }, []);


  const handleBacSi = () => {
    navigate('/admin/danhsachbacsi');
  };
  const handleLichHen = () => {
    navigate('/admin/danhsachlichhen');
  };
  const handleThuocVatTu = () => {
    navigate('/admin/danhsachthuocvattu');
  };
  const handleKhachHang = () => {
    navigate('/admin/danhsachkhachhang');
  };


  return (
    <div className="dashboard-ad">
      <h1 className="dashboard-title-ad">Dashboard</h1>
      <div className="dashboard-cards-ad">
        {/* Card Lịch Hẹn */}
        <motion.div
          className="card-ad"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          onClick={() => handleLichHen()}
        >
          <div>
            <motion.div className="numbers">
              {stats.LichHen}
            </motion.div>
            <h2 className="cardName-ad">Lịch hẹn</h2>
          </div>
          <div className="iconBx">
            <img width="96" height="96" src="https://img.icons8.com/color/96/tear-off-calendar--v1.png" alt="tear-off-calendar--v1" />
          </div>
        </motion.div>

        {/* Card Thuốc - Vật Tư */}
        <motion.div
          className="card-ad"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          onClick={() => handleThuocVatTu()}
        >
          <div>
            <motion.div className="numbers">
              {stats.ThuocVatTu}
            </motion.div>
            <h2 className="cardName-ad">Thuốc - vật tư</h2>
          </div>
          <div className="iconBx">
            <img width="96" height="96" src="https://img.icons8.com/color/96/pills.png" alt="pills" />
          </div>
        </motion.div>

        {/* Card Bệnh Nhân */}
        <motion.div
          className="card-ad"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          onClick={() => handleKhachHang()}
        >
          <div>
            <motion.div className="numbers">
              {stats.BenhNhan}
            </motion.div>
            <h2 className="cardName-ad">Bệnh nhân</h2>
          </div>
          <div className="iconBx">
            <img width="96" height="96" src="https://img.icons8.com/color/96/user.png" alt="user" />
          </div>
        </motion.div>

        {/* Card Bác Sĩ */}
        <motion.div
          className="card-ad"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          onClick={() => handleBacSi()}
        >
          <div>
            <motion.div className="numbers">
              {stats.BacSi}
            </motion.div>
            <h2 className="cardName-ad">Bác sĩ</h2>
          </div>
          <div className="iconBx">
            <img width="96" height="96" src="https://img.icons8.com/color/96/doctor-male--v1.png" alt="doctor-male--v1" />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard;
