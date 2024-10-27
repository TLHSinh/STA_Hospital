//import React from 'react';
import BannerBS from '../../../Components/Customer/Banner/BannerBacSi/BannerBS';
import SidePanel from '../SidePanel'; 
import { Link } from 'react-router-dom';

import PopupLichHen from '../../../Components/Customer/Dialog/PopupLichHen'; // Đường dẫn từ Components
import React, { useState } from 'react';






function BS1() {
  const schedule = [
    { day: 'Thứ 2', time: '4:00 PM - 9:00 PM' },
    { day: 'Thứ 4', time: '4:00 PM - 9:00 PM' },
    { day: 'Thứ 6', time: '5:00 PM - 8:00 PM' },
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
                            <div className="flex flex-col items-center p-4 ">
                              {/* Hình ảnh bác sĩ */}
                              <img
                                src="/Images/STA_BACSI/bacsi_tran-kim-duong.png"
                                alt="Doctor"
                                className="w-full max-w-xs h-auto rounded-md shadow-md"
                              />
                              
                              {/* Nút Quay lại trang tìm kiếm */}
                              <Link
                                to="/customer/bacsi"
                                className="mt-6 w-full max-w-xs px-4 py-2 bg-purple-400 text-white rounded-md hover:bg-purple-500 text-center no-underline"
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
                                    Trần Kim Dương
                                </h3>
                                
                                <p className='text__para text-[14px] leading-6 md:text-[18px] mt-2'>
                                    Bác sĩ Trần Kim Dương tốt nghiệp bác sĩ đa khoa tại Học viện Quân Y năm 2013 và hơn 11 năm kinh nghiệm trong lĩnh vực hiếm muộn, hỗ trợ sinh sản. Bằng sự chuyên nghiệp trong công tác điều trị, sự cảm thông, thấu hiểu trong quá trình tương tác, hỗ trợ bệnh nhân, bác sĩ Dương đã góp phần hiện thực hóa ước mơ làm cha mẹ của nhiều cặp vợ chồng hiếm muộn hoàn thiện mảnh ghép hạnh phúc cho nhiều gia đình.
                                </p>

                                <h3 className="text-headingColor text-[30px] leading-9 mt-2 font-bold">
                                    Chứng Nhận
                                </h3>

                                <p className='text__para text-[14px] leading-6 md:text-[18px] mt-2'>
                                    Nam khoa cơ bản. <br/>
                                    Kiến thức và kỹ năng hỗ trợ sinh sản cơ bản trên lâm sàng.<br/>
                                    Phẫu thuật nội soi cơ bản trong Phụ khoa.
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

export default BS1;
