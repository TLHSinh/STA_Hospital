import React from 'react';
import { FaMagnifyingGlass } from "react-icons/fa6";
import "./Doctor.css";

const KeDonThuoc = () => {
  return (
    <div className="container-kdt">
      {/* THÔNG TIN */}
      <div className='column-kdt'>
        <form action="#" className="form">
          <div className='title-bs-2'>
            <h1 style={{ fontWeight: 'bold' }}>THÔNG TIN KHÁCH HÀNG</h1>
          </div>

          <div className="column">
            <div className="input-box">
              <label>Họ và tên</label>
              <input type="text" />
            </div>
            <div className="input-box">
              <label>Giới tính</label>
              <input type="text" />
            </div>
          </div>
          <div className="column">
            <div className="input-box">
              <label>Số điện thoại</label>
              <input type="text" />
            </div>
            <div className="input-box">
              <label>Ngày sinh</label>
              <input type="date" />
            </div>
          </div>
        </form>
      </div>  



      {/* DS THUỐC */}
      <div className='column-kdt'>
        <div>
          <div className='title-bs-2'>
            <h1 style={{ fontWeight: 'bold' }}>DANH SÁCH THUỐC</h1>
          </div>
          <div className='input-wrapper'>
            <FaMagnifyingGlass />
            <input 
              className='input-search'
              placeholder='Tìm kiếm thuốc tại đây'
            />
          </div>
          <table className="medicine-table">
            <thead>
              <tr>
                <th>Tên</th>
                <th>Đơn vị</th>
                <th>Số lượng</th>
                <th>Liều dùng</th>
                <th>Ghi chú</th>
                <th>Đơn giá</th>
                <th>Tổng tiền</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default KeDonThuoc;