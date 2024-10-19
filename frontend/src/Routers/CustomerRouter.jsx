import { Route, Routes } from 'react-router-dom';
import VeChungToi from '../Pages/Customer/VeChungToi';
import BacSi from '../Pages/Customer/BacSi';
import Home from '../Pages/Customer/Home';
import LienHe from '../Pages/Customer/LienHe';
import GoiKham from '../Pages/Customer/GoiKham';
import ChuyenKhoa from '../Pages/Customer/ChuyenKhoa';
import Login from '../Pages/Customer/Login';
import CustomerLayout from '../Layouts/CustomerLayout';


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
      </Route>
    </Routes>
);

export default CustomerRoutes;
