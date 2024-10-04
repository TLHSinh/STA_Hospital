import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Home from './Pages/Home'; 
import VeChungToi from './Pages/VeChungToi';
import ChuyenKhoa from './Pages/ChuyenKhoa';
import GoiKham from './Pages/GoiKham';
import BacSi from './Pages/BacSi';
import LienHe from './Pages/LienHe';
import DatLichHen from './Pages/DatLichHen';
import Card1 from './Pages/DetailBacSi/card1'; // Import trang Card1
import Card2 from './Pages/DetailBacSi/card2'; // Import trang Card1
import Card3 from './Pages/DetailBacSi/card3'; // Import trang Card1
import Card4 from './Pages/DetailBacSi/card4'; // Import trang Card1
import Card5 from './Pages/DetailBacSi/card5'; // Import trang Card1
import Card6 from './Pages/DetailBacSi/card6'; // Import trang Card1




import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/", 
    element: <App />, 
    children: [ 
      {
        path: "/", 
        element: <Home />, 
      },
      {
        path: "vechungtoi",
        element: <VeChungToi />, 
      },
      {
        path: "chuyenkhoa",
        element: <ChuyenKhoa />,
      },
      {
        path: "goikham",
        element: <GoiKham />,
      },
      {
        path: "bacsi",
        element: <BacSi />,
      },
      {
        path: "lienhe",
        element: <LienHe />,
      },
      {
        path: "datlichhen",
        element: <DatLichHen />,
      },
      {
        path: "bacsi/bs-tran-kim-duong", // Thêm route cho Card1
        element: <Card1 />,
      },
      {
        path: "bacsi/bs-le-thi-anh", // Thêm route cho Card1
        element: <Card2 />,
      },
      {
        path: "bacsi/bs-chu-minh-tuan", // Thêm route cho Card1
        element: <Card3 />,
      },
      {
        path: "bacsi/bs-bui-thi-truc-my", // Thêm route cho Card1
        element: <Card4 />,
      },
      {
        path: "bacsi/bs-nguyen-man-nhi", // Thêm route cho Card1
        element: <Card5 />,
      },
      {
        path: "bacsi/bs-nguyen-mai-huy", // Thêm route cho Card1
        element: <Card6 />,
      },
      // Bạn có thể thêm các route khác ở đây
    ],
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
