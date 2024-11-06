import { Route, Routes } from 'react-router-dom';

import DoctorLayout from '../Layouts/DoctorLayout';
//import HomeBacSi from '../Pages/Doctor/HomeBacSi';
import DSLichHenBS from '../Pages/Doctor/DSLichHenBS';
import KeDonThuoc from '../Pages/Doctor/KeDonThuoc';
import KeBenhAnTH1 from '../Pages/Doctor/KeBenhAn/KeBenhAnTH1';
import KeBenhAnTH2 from '../Pages/Doctor/KeBenhAn/KeBenhAnTH2';
import KeBenhAnTH3 from '../Pages/Doctor/KeBenhAn/KeBenhAnTH3';
import ProfileBS from '../Pages/Doctor/ProfileBS';
import SeachPatient from '../Pages/Doctor/SeachPatient';
import ViewPrescription from '../Pages/Doctor/ViewPrescription';



const DoctorRouter = () => (
    <Routes>
      <Route element={<DoctorLayout />}>
        <Route path="home" element={<DSLichHenBS/>} />
        <Route path="danhsachlichhenBS" element={<DSLichHenBS/>} />
        <Route path="kedonthuoc/:id" element={<KeDonThuoc/>} />
        <Route path="kebenhanTH1/:id" element={<KeBenhAnTH1/>} />
        <Route path="kebenhanTH2" element={<KeBenhAnTH2/>} />
        <Route path="kebenhanTH3" element={<KeBenhAnTH3/>} />
        <Route path="profile-bs" element={<ProfileBS/>} />
        <Route path="timbenhnhan" element={<SeachPatient/>} />

        <Route path="xemlaibenhans/:id" element={<ViewPrescription/>} />

      </Route>
    </Routes>
);

export default DoctorRouter;