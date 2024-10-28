import { Route, Routes } from 'react-router-dom';

// khong biet sai hay dung
import DoctorLayout from '../Layouts/DoctorLayout';
import HomeBacSi from '../Pages/Doctor/HomeBacSi';
// ko biet sai hay dung

//import DoctorLayout from '../Layouts/AdminLayout';
import DoctorDashboard from '../Dashboard/doctor-account/Doctor-Dashboard';


const DoctorRouter = () => (
    <Routes>
      <Route element={<DoctorLayout />}>
        <Route path= "/doctors/profile/me" element={<DoctorDashboard />} />
      </Route>
    </Routes>
);

export default DoctorRouter;
