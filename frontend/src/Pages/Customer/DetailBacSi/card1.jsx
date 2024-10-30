import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DoctorBooking = () => {
  const [selectedDate, setSelectedDate] = useState('MON');
  const [selectedTime, setSelectedTime] = useState(null);
  const navigate = useNavigate();

  const dates = [
    { day: 'MON', date: 10 },
    { day: 'TUE', date: 11 },
    { day: 'WED', date: 12 },
    { day: 'THU', date: 13 },
    { day: 'FRI', date: 14 },
    { day: 'SAT', date: 15 },
    { day: 'SUN', date: 16 },
  ];

  const times = ['8:00 am', '8:30 am', '9:00 am', '9:30 am', '10:00 am', '10:30 am', '11:00 am', '11:30 am'];

  return (
    
    <div className="flex flex-col items-center p-6">
      <div className="flex space-x-6 mb-6 w-full max-w-3xl">
        <div className="w-1/4 bg-gray-200 rounded-lg overflow-hidden flex-shrink-0">
          <img
            src="doctor_image_url" // Replace with the doctor's image URL
            alt="Doctor"
            className="w-full h-full object-cover"
            style={{ height: '100%' }}
          />
        </div>

        <div className="flex-1">
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow-md">
            <h1 className="text-2xl font-semibold text-gray-800">
              Dr. Richard James <span className="text-blue-500">✔</span>
            </h1>
            <p className="text-gray-500 mt-1">MBBS - General Physician • 2 Years</p>
            <p className="text-gray-700 mt-4 text-sm">
              <strong>About:</strong> Dr. Davis has a strong commitment to delivering comprehensive medical care, focusing on preventive medicine, early diagnosis, and effective treatment strategies.
            </p>
            <p className="text-gray-800 mt-4 font-semibold">
              Giá Khám: <span className="text-black font-bold">$50</span>
            </p>
          </div>
        </div>
      </div>

      <div className="w-full max-w-3xl bg-white border border-gray-200 rounded-lg shadow-md p-4">
        <h2 className="text-lg font-semibold text-gray-800">Lịch Làm Việc</h2>
        <div className="flex space-x-3 mt-4">
          {dates.map((date) => (
            <button
              key={date.day}
              onClick={() => setSelectedDate(date.day)}
              className={`px-4 py-2 rounded-full border ${
                selectedDate === date.day ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              {date.day} <br /> {date.date}
            </button>
          ))}
        </div>
        
        <div className="flex flex-wrap gap-3 mt-4">
          {times.map((time) => (
            <button
              key={time}
              onClick={() => setSelectedTime(time)}
              className={`px-4 py-2 rounded-full border ${
                selectedTime === time ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700'
              }`}
            >
              {time}
            </button>
          ))}
        </div>
      </div>

      {/* Buttons aligned to the right */}
      <div className="flex justify-end w-full max-w-3xl mt-4 space-x-4">
        <button
          onClick={() => navigate('/customer/bacsi')}
          className="px-6 py-3 bg-gray-300 text-gray-800 font-semibold rounded-lg hover:bg-gray-400"
        >
          Quay lại
        </button>
        <button
          className="px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
        >
          Đặt Lịch Hẹn
        </button>
      </div>
    </div>
    
  );
};

export default DoctorBooking;
