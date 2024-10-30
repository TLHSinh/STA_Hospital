import { Route, Routes } from 'react-router-dom';

import DoctorLayout from '../Layouts/DoctorLayout';
import HomeBacSi from '../Pages/Doctor/HomeBacSi';
import DSLichHenBS from '../Pages/Doctor/DSLichHenBS';
import KeDonThuoc from '../Pages/Doctor/KeDonThuoc';
import ProfileBS from '../Pages/Doctor/ProfileBS';



const DoctorRouter = () => (
    <Routes>
      <Route element={<DoctorLayout />}>
        <Route path="home" element={<HomeBacSi/>} />
        <Route path="danhsachlichhenBS" element={<DSLichHenBS/>} />
        <Route path="kedonthuoc" element={<KeDonThuoc/>} />
        <Route path="profile-bs" element={<ProfileBS/>} />
      </Route>
    </Routes>
);

export default DoctorRouter;