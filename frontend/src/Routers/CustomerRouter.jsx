import { Route, Routes } from 'react-router-dom';
import VeChungToi from '../Pages/Customer/VeChungToi';
import BacSi from '../Pages/Customer/BacSi';
import Home from '../Pages/Customer/Home';
import LienHe from '../Pages/Customer/LienHe';
import GoiKham from '../Pages/Customer/GoiKham';
import ChuyenKhoa from '../Pages/Customer/ChuyenKhoa';
import Login from '../Pages/Customer/Login';
import CustomerLayout from '../Layouts/CustomerLayout';
import SignUp from '../Pages/Customer/SignUp';

import MyAccount from '../Dashboard/user-account/MyAccount';

/* cho bác sĩ tá túc tạm */
import DoctorDashboard from '../Dashboard/doctor-account/Doctor-Dashboard';
import ProtectedRoute from './ProtecttedRoute';

import Profile from '../Pages/Customer/Profile';
import Appointment from '../Pages/Customer/Appointment';
import DetailsBacSi from '../Pages/Customer/DetailsBacSi';
import Benhans from '../Pages/Customer/Benhans';



const CustomerRoutes = () => (
  <Routes>
    <Route element={<CustomerLayout />}>
      <Route path="home" element={<Home />} />
      <Route path="vechungtoi" element={<VeChungToi />} />
      <Route path="bacsi" element={<BacSi />} />
      <Route path="lienhe" element={<LienHe />} />
      <Route path="goikham" element={<GoiKham />} />
      <Route path="chuyenkhoa" element={<ChuyenKhoa />} />
      <Route path="login" element={<Login />} />
      <Route path="register" element={<SignUp />} />
      <Route path="chitietbacsidatlich/:id" element={<DetailsBacSi />} />
      <Route path="profile" element={<Profile />} />
      <Route path="appointment" element={<Appointment />} />
      <Route path="benhans" element={<Benhans />} />






      <Route path="/users/profile/me" element={<ProtectedRoute allowedRoles={["BenhNhan"]}>    <MyAccount />   </ProtectedRoute>} />


      {/* cho bác sĩ tá túc tạm */}
      <Route path="/doctors/profile/me" element={<ProtectedRoute allowedRoles={['BacSi']}>     <DoctorDashboard />    </ProtectedRoute>} />


    </Route>
  </Routes>
);

export default CustomerRoutes;
