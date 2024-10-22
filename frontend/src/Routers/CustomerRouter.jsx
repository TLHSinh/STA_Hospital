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

import Card1 from '../Pages/Customer/DetailBacSi/card1';
import Card2 from '../Pages/Customer/DetailBacSi/card2';
import Card3 from '../Pages/Customer/DetailBacSi/card3';
import Card4 from '../Pages/Customer/DetailBacSi/card4';
import Card5 from '../Pages/Customer/DetailBacSi/card5';
import Card6 from '../Pages/Customer/DetailBacSi/card6'; 


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
        <Route path= "bacsi/bs-tran-kim-duong" element={<Card1/>} />
        <Route path= "bacsi/bs-le-thi-anh" element={<Card2/>} />
        <Route path= "bacsi/bs-chu-minh-tuan" element={<Card3/>} />
        <Route path= "bacsi/bs-bui-thi-truc-my" element={<Card4/>} />
        <Route path= "bacsi/bs-nguyen-man-nhi" element={<Card5/>} />
        <Route path= "bacsi/bs-nguyen-mai-huy" element={<Card6/>} />
    
      </Route>
    </Routes>
);

export default CustomerRoutes;
