import { Route, Routes } from 'react-router-dom';
import Dashboard from '../Pages/Admin/Dashboard/Dashboard';
import KhachHang from '../Pages/Admin/List/KhachHang';
import BacSi from '../Pages/Admin/List/BacSi';
import Lichhen from '../Pages/Admin/List/Lichhen';
import Thuoc from '../Pages/Admin/List/Thuoc';
import AdminLayout from '../Layouts/AdminLayout';


const AdminRouter = () => (
    <Routes>
      <Route element={<AdminLayout />}>
        <Route path="dashboard" element={<Dashboard/>} />
        <Route path="danhsachkhachhang" element={<KhachHang/>} />
        <Route path="danhsachbacsi" element={<BacSi/>} />
        <Route path="danhsachthuoc" element={<Thuoc/>} />
        <Route path="danhsachlichhen" element={<Lichhen/>} />
      </Route>
    </Routes>
);

export default AdminRouter;
