import { Route, Routes } from 'react-router-dom';

// khong biet sai hay dung
import DoctorLayout_doctor from '../Layouts/DoctorLayout';
import HomeBacSi from '../Pages/Doctor/HomeBacSi';
// ko biet sai hay dung


import Dashboard from '../Pages/Admin/Dashboard/Dashboard';
import KhachHang from '../Pages/Admin/List/KhachHang';
import BacSi from '../Pages/Admin/List/BacSi';
import Lichhen from '../Pages/Admin/List/Lichhen';
import Thuoc from '../Pages/Admin/List/Thuoc';
import DoctorLayout from '../Layouts/AdminLayout';
import DoctorDashboard from '../Dashboard/doctor-account/Doctor-Dashboard';


const DoctorRouter = () => (
    <Routes>
      <Route element={<DoctorLayout />}>

          // ko biet sai hay dung
        <Route path="dashboard-HomeBacSi" element={<HomeBacSi/>} />
          // ko biet sai hay dung

        <Route path="dashboard" element={<Dashboard/>} />
        <Route path="danhsachkhachhang" element={<KhachHang/>} />
        <Route path="danhsachbacsi" element={<BacSi/>} />
        <Route path="danhsachthuoc" element={<Thuoc/>} />
        <Route path="danhsachlichhen" element={<Lichhen/>} />



        <Route path= "/doctors/profile/me" element={<DoctorDashboard />} />





      </Route>
    </Routes>
);

export default DoctorRouter;
