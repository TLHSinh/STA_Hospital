import BannerBS from '../../../Components/Customer/Banner/BannerBacSi/BannerBS';
import SidePanel from '../SidePanel'; 
import { Link } from 'react-router-dom';

import PopupLichHen from '../../../Components/Customer/Dialog/PopupLichHen'; // Đường dẫn từ Components
import React, { useState } from 'react';

function BS5() {
  const schedule = [
    { day: 'Thứ 2', time: '7:00 AM - 11:00 AM' },
    { day: 'Thứ 4', time: '7:00 AM - 11:00 AM' },
    { day: 'Thứ 6', time: '7:00 AM - 11:00 AM' },
  ];
  const [openPopup, setOpenPopup] = useState(false); // State để kiểm soát popup

  const handleOpenPopup = () => {
    setOpenPopup(true); // Mở popup
  };

  const handleClosePopup = () => {
    setOpenPopup(false); // Đóng popup
  };
    return (
        <div>
            <BannerBS />
            <div className='container-content'>
                <div className='intro'>
                  <h1 className='article-item'>Thông Tin Bác Sĩ</h1>
                </div>

                <section>
                    <div className="max-w-[1170px] mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-[50px]">
                            {/* Cột 1: Hình ảnh */}
                            <div className="flex flex-col items-center p-4">
                              {/* Hình ảnh bác sĩ */}
                              <img
                                src="/Images/STA_BACSI/bacsi_nguyen-man-nhi.png"
                                alt="Doctor"
                                className="w-full max-w-xs h-auto rounded-md shadow-md"
                              />
                              
                              {/* Nút Quay lại trang tìm kiếm */}
                              <Link
                                to="/bacsi"
                                className="mt-6 w-full max-w-xs px-4 py-2 bg-purple-400 text-white rounded-md hover:bg-purple-500 text-center no-underline"
                                style={{ textDecoration: 'none' }}  // Thêm style này
                              >
                                Quay lại trang tìm kiếm
                              </Link>
                            </div>

                            {/* Cột 2: Văn bản */}
                            <div className="flex flex-col">
                                <div className="flex justify-center">
                                    {/* <span className="bg-[#CCF0F3] text-irisBlueColor py-1 px-2 lg:py-1 lg:px-3 text-[12px] leading-4 lg:text-[16px] lg:leading-7 font-semibold rounded inline-block">
                                        Bác Sĩ Đa Khoa
                                    </span> */}
                                </div>
                                <h3 className="text-headingColor text-[30px] leading-9 mt-2 font-bold">
                                    Nguyễn Mẫn Nhi
                                </h3>
                                
                                <p className='text__para text-[14px] leading-6 md:text-[18px] mt-2'>
                                Bác sĩ Nguyễn Mẫn Nhi tốt nghiệp Bác sĩ đa khoa tại Đại học Y Dược Thành phố Hồ Chí Minh vào năm 2017 và có bằng Bác sĩ Chuyên khoa I về Da liễu tại Đại học Y Dược TP. Hồ Chí Minh năm 2022. Bác sĩ Nhân chuyên thăm khám và điều trị bệnh lý da liễu như viêm da cơ địa, nấm da, nhiễm trùng da, điều trị thẩm mỹ trẻ hoá da như nám má, mụn trứng cá, đồi mồi, tàn nhang, sẹo mụn… Sử dụng thành thạo các loại máy móc làm đẹp công nghệ cao như laser, IPL, RF, Hifu, thực hiện cả thủ thuật da như mesotherapy, botox, filler…
                                </p>

                                <h3 className="text-headingColor text-[30px] leading-9 mt-2 font-bold">
                                    Chứng Nhận
                                </h3>

                                <p className='text__para text-[14px] leading-6 md:text-[18px] mt-2'>
                                An toàn tiêm chủng<br/>
                                Can thiệp dinh dưỡng tỏng bệnh lý tiêu hóa<br/>
                                Điều trị và dự phòng hiệu quả Hen phế quản<br/>
                                Hồi sức sốc trẻ em
                                </p>
                            </div>
                          
                            {/* Cột 3: Để trống */}
                            <div>
                              <SidePanel
                                price="500.000 VNĐ"
                                schedule={schedule}
                                buttonLabel={
                                  <buttonLabel
                                    className=" text-white rounded-md text-center no-underline"
                                    onClick={handleOpenPopup}
                                  >
                                    Đặt lịch hẹn
                                  </buttonLabel>
                                }
                              />
                              <PopupLichHen open={openPopup} handleClose={handleClosePopup} />
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default BS5;
