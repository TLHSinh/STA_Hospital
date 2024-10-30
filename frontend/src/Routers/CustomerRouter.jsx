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



import Card1 from '../Pages/Customer/DetailBacSi/card1';
import Card2 from '../Pages/Customer/DetailBacSi/card2';
import Card3 from '../Pages/Customer/DetailBacSi/card3';
import Card4 from '../Pages/Customer/DetailBacSi/card4';
import Card5 from '../Pages/Customer/DetailBacSi/card5';
import Card6 from '../Pages/Customer/DetailBacSi/card6'; 

import Profile from '../Pages/Customer/Profile';
import Appointment  from '../Pages/Customer/Appointment';



const CustomerRoutes = () => (
    <Routes>
      <Route element={<CustomerLayout />}>
        <Route path="home" element={<Home/>} />
        <Route path="vechungtoi" element={<VeChungToi/>} />
        <Route path="bacsi" element={<BacSi/>} />
        <Route path="lienhe" element={<LienHe/>} />
        <Route path="goikham" element={<GoiKham/>} />
        <Route path="chuyenkhoa" element={<ChuyenKhoa/>} />
        <Route path="login" element={<Login/>} />
        <Route path="register" element={<SignUp/>} />
        <Route path= "bacsi/671f658730638000311d55c7" element={<Card1/>} />
        <Route path= "bacsi/671fae9a33a6c34e0abcdf29" element={<Card2/>} />
        <Route path= "bacsi/672059a3328506d5c59852ea" element={<Card3/>} />
        <Route path= "bacsi/672074db328506d5c598535f" element={<Card4/>} />
        <Route path= "bacsi/67207800328506d5c598536a" element={<Card5/>} />
        <Route path= "bacsi/6720788f328506d5c5985373" element={<Card6/>} />


        <Route path="profile" element={<Profile/>} />
        <Route path="appointment" element={<Appointment/>} />

        

    


        <Route path= "/users/profile/me" element={<ProtectedRoute allowedRoles={["BenhNhan"]}>    <MyAccount />   </ProtectedRoute>} />


        {/* cho bác sĩ tá túc tạm */}
        <Route path= "/doctors/profile/me" element={<ProtectedRoute  allowedRoles={['BacSi']}>     <DoctorDashboard />    </ProtectedRoute>} />




      </Route>
    </Routes>
);

export default CustomerRoutes;
