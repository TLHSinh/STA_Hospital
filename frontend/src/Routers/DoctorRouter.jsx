import { Route, Routes } from "react-router-dom";

import DoctorLayout from "../Layouts/DoctorLayout";
//import HomeBacSi from '../Pages/Doctor/HomeBacSi';
import DSLichHenBS from "../Pages/Doctor/DSLichHenBS";
import KeDonThuoc from "../Pages/Doctor/KeDonThuoc";
import KeBenhAnTH1 from "../Pages/Doctor/KeBenhAn/KeBenhAnTH1";
import KeBenhAnTH2 from "../Pages/Doctor/KeBenhAn/KeBenhAnTH2";
import KeBenhAnTH3 from "../Pages/Doctor/KeBenhAn/KeBenhAnTH3";
import ProfileBS from "../Pages/Doctor/ProfileBS";
import SeachPatient from "../Pages/Doctor/SeachPatient";
import DSBenhAn from "../Pages/Doctor/DSBenhAn";
import ViewPrescription from "../Pages/Doctor/ViewPrescription";
import KeXetNghiem from "../Pages/Doctor/Test";
import NewPayment from "../Pages/Doctor/NewPayment";
import EditBenhAn from "../Pages/Doctor/EditBenhAn";
import ChiTietBenhans from "../Pages/Customer/ChiTietBenhAn";

const DoctorRouter = () => (
  <Routes>
    <Route element={<DoctorLayout />}>
      <Route path="home" element={<DSLichHenBS />} />
      <Route path="danhsachlichhenBS" element={<DSLichHenBS />} />
      <Route path="kedonthuoc/:id" element={<KeDonThuoc />} />
      <Route path="kebenhanTH1/:id" element={<KeBenhAnTH1 />} />
      <Route path="kebenhanTH2" element={<KeBenhAnTH2 />} />
      <Route path="kebenhanTH3" element={<KeBenhAnTH3 />} />
      <Route path="profile-bs" element={<ProfileBS />} />
      <Route path="timbenhnhan" element={<SeachPatient />} />
      <Route path="danhsachbenhan" element={<DSBenhAn />} />

      <Route path="xemlaibenhans/:id" element={<ViewPrescription />} />
      <Route path="newTest/:id" element={<KeXetNghiem />} />
      <Route path="NewPayment/:id" element={<NewPayment />} />
      <Route path="EditBenhAn/:id" element={<EditBenhAn />} />
      <Route path="chitietbenhans/:id" element={<ChiTietBenhans />} />
    </Route>
  </Routes>
);

export default DoctorRouter;
