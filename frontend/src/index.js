import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import Home from './Pages/Home'; 





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
      
      {
        path: "/login", 
        element: <Login />,
      },
      {
        path: "/register", 
        element: <Register />,
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
