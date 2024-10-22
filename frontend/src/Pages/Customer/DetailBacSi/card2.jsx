//import React from 'react';
import BannerBS from '../../../Components/Customer/Banner/BannerBacSi/BannerBS';
import SidePanel from '../SidePanel'; 
import { Link } from 'react-router-dom';

import PopupLichHen from '../../../Components/Customer/Dialog/PopupLichHen'; // Đường dẫn từ Components
import React, { useState } from 'react';

function BS2() {
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
                                src="/Images/STA_BACSI/bacsi_le-thi-anh.png"
                                alt="Doctor"
                                className="w-full max-w-xs h-auto rounded-md shadow-md"
                              />
                              
                              {/* Nút Quay lại trang tìm kiếm */}
                              <Link
                                to="/customer/bacsi"
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
                                    Lê Thị Ánh
                                </h3>
                                
                                <p className='text__para text-[14px] leading-6 md:text-[18px] mt-2'>
                                Bác sĩ Lê Thị Ánh tốt nghiệp Bác sĩ Đa khoa tại Đại học Y Dược Thái Bình vào năm 2011 và tiếp tục nhận bằng Bác sĩ Chuyên khoa I về Nhi khoa vào năm 2016 tại Đại học Y dược Thành phố Hồ Chí Minh. Bằng tình yêu nghề và lòng quý mến trẻ em, bác sĩ Ánh đã lựa chọn phát triển kinh nghiệm và năng lực chuyên sâu trong lĩnh vực Nhi khoa thông qua việc không ngừng nỗ lực nâng cao kiến thức chuyên môn, tích lũy kinh nghiệm làm việc, trau dồi y đức, hướng tới mục tiêu vì sức khỏe và chất lượng cuộc sống cho các bé.
                                </p>

                                <h3 className="text-headingColor text-[30px] leading-9 mt-2 font-bold">
                                    Chứng Nhận
                                </h3>

                                <p className='text__para text-[14px] leading-6 md:text-[18px] mt-2'>
                                Chứng chỉ an toàn truyền máu<br/>
                                Chứng chỉ Ho kéo dài <br/>
                                Chứng chỉ Hen và trào ngược<br/>
                                An toàn tiêm chủng<br/>
                                
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

export default BS2;
