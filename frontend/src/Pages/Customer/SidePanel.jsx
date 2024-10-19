const SidePanel = ({ price, schedule, buttonLabel }) => {
    return (
      <div className="shadow panelShadow p-3 lg:p-5 rounded-md px-4">
        <div className="flex items-center justify-between">
          <p className="text_para mt-3 font-semibold">Chi Phí</p>
          <span className="text-[16px] leading-7 lg:text-[22px] lg:leading-8 text-headingColor font-bold">
            {price} {/* Hiển thị giá từ props */}
          </span>
        </div>
  
        <div className="mt-[30px]">
          <p className="text_para mt-0 font-semibold text-headingColor">
            Lịch Khám:
          </p>
          <ul className="mt-3">
            {/* Hiển thị lịch khám từ props */}
            {schedule.map((item, index) => (
              <li key={index} className="flex items-center justify-between mb-1">
                <p className="text-[15px] leading-6 text-headingColor font-semibold">
                  {item.day}
                </p>
                <p className="text-[15px] leading-6 text-textColor font-semibold">
                  {item.time}
                </p>
              </li>
            ))}
          </ul>
        </div>
  
        <div className="flex justify-center">
          {/* Hiển thị label của nút từ props */}
          <button className="bt-datlich px-2 w-full text-white rounded-md text-center no-underline">{buttonLabel}</button>
        </div>
      </div>
    );
  };
  
  export default SidePanel;
  