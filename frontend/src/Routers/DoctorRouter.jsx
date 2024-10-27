import { Route, Routes } from 'react-router-dom';

import DoctorLayout from '../Layouts/DoctorLayout';
import HomeBacSi from '../Pages/Doctor/HomeBacSi';



const DoctorRouter = () => (
    <Routes>
      <Route element={<DoctorLayout />}>
        <Route path="dashboard" element={<HomeBacSi/>} />
      </Route>
    </Routes>
);

export default DoctorRouter;
