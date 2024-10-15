import BannerBS from '../../../Components/Customer/Banner/BannerBacSi/BannerBS';
import SidePanel from '../SidePanel'; 
import { Link } from 'react-router-dom';

import PopupLichHen from '../../../Components/Customer/Dialog/PopupLichHen'; // Đường dẫn từ Components
import React, { useState } from 'react';

function BS6() {
  const schedule = [
    { day: 'Thứ 3', time: '7:00 AM - 11:00 AM' },
    { day: 'Thứ 5', time: '7:00 AM - 11:00 AM' },
   
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
                                src="/Images/STA_BACSI/bacsi_nguyen-mai-huy.png"
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
                                    Nguyễn Mai Huy
                                </h3>
                                
                                <p className='text__para text-[14px] leading-6 md:text-[18px] mt-2'>
                                  Bác sĩ Nguyễn Ngọc Mai Huy là chuyên gia có 17 năm kinh nghiệm điều trị các trường hợp cấp cứu và được người bệnh cùng đồng nghiệp đánh giá cao bởi chuyên môn y khoa sâu rộng. <br/>

                                  Hiện tại, Bác sĩ Nguyễn Ngọc Mai Huy là Phó Chủ tịch Hội đồng Khoa Cấp cứu và Chẩn đoán Hình ảnh 24 giờ tại Bệnh viện Quốc tế Hạnh Phúc.<br/>

                                  Bác sĩ Nguyễn Ngọc Mai Huy tốt nghiệp Bác sĩ Đa khoa tại Đại học Y Dược Thành phố Hồ Chí Minh vào năm 2002 và nhận bằng Bác sĩ Chuyên khoa I về Nội tiết tại đây vào năm 2015.
                                </p>

                                <h3 className="text-headingColor text-[30px] leading-9 mt-2 font-bold">
                                    Chứng Nhận
                                </h3>

                                <p className='text__para text-[14px] leading-6 md:text-[18px] mt-2'>
                                  Thành viên Hội Hô hấp Thành phố Hồ Chí Minh <br/>
                                  Nhận chứng chỉ Cấp cứu người lớn cơ bản và nâng cao: BLS, ACLS (2022)<br/>
                                  Giải thưởng chuyên môn bác sĩ 2022 Khoa cấp cứu của Tập đoàn Y khoa Hoàn Mỹ
                                </p>
                            </div>
                          
                            {/* Cột 3: Để trống */}
                            <div>
                              <SidePanel
                                price="500.000 VNĐ"
                                schedule={schedule}
                                buttonLabel={<a href="#!" onClick={handleOpenPopup}>Đặt lịch hẹn</a>} // Gán nút bấm vào buttonLabel
                              />
                              <PopupLichHen open={openPopup} handleClose={handleClosePopup} /> {/* Hiển thị popup */}
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
}

export default BS6;
