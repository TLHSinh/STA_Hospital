import { Route, Routes } from 'react-router-dom';
import Dashboard from '../Pages/Admin/Dashboard/Dashboard';
import KhachHang from '../Pages/Admin/List/DSKhachHang';
import BacSi from '../Pages/Admin/List/DSBacSi';
import Lichhen from '../Pages/Admin/List/DSLichhen';
import Thuoc from '../Pages/Admin/List/DSThuoc';
import AdminLayout from '../Layouts/AdminLayout/AdminLayout';
import ThemKhachHang from '../Pages/Admin/Create/ThemKhachHang';
import ThemBacSi from '../Pages/Admin/Create/ThemBacSi';
import ThemLichHen from '../Pages/Admin/Create/ThemLichHen';


const AdminRouter = () => (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="dashboard" element={<Dashboard/>} />
        <Route path="danhsachkhachhang" element={<KhachHang/>} />
        <Route path="danhsachbacsi" element={<BacSi/>} />
        <Route path="danhsachthuoc" element={<Thuoc/>} />
        <Route path="danhsachlichhen" element={<Lichhen/>} />
        <Route path="themkhachhang" element={<ThemKhachHang/>} />
        <Route path="thembacsi" element={<ThemBacSi/>} />
        <Route path="themlichhen" element={<ThemLichHen/>} />
      </Route>
    </Routes>
);

export default AdminRouter;
