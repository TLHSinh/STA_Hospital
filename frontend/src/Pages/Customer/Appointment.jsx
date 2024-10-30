import React from 'react';

function DoctorCard({ doctor }) {
    return (
        <div className="flex items-center py-4 border-b">
            {/* Phần ảnh bác sĩ */}
            <div className="flex-shrink-0 mr-6">
                <img className="w-24 h-24 object-cover rounded-full" src={doctor.image} alt={doctor.name} />
            </div>

            {/* Thông tin bác sĩ */}
            <div className="flex-grow">
                <p className="font-semibold text-lg">{doctor.name}</p>
                <p className="text-gray-500">{doctor.speciality}</p>
                <p className="text-gray-600 mt-2">Address:</p>
                <p className="text-gray-500">{doctor.address.line1}</p>
                <p className="text-gray-500">{doctor.address.line2}</p>
                <p className="text-gray-500 mt-2">
                    <span className="font-semibold">Date & Time:</span> 25, July, 2024 | 8:30 PM
                </p>
            </div>

            {/* Nút hành động */}
            <div className="flex flex-col ml-6">
                <button className="bg-blue-500 text-white py-2 px-4 rounded mb-2">Pay Online</button>
                <button className="bg-gray-200 text-gray-700 py-2 px-4 rounded">Cancel appointment</button>
            </div>
        </div>
    );
}

function Appointments({ doctors }) {
    return (
        <div className="max-w-4xl mx-auto p-4">
            <p className="pb-3 mt-12 font-medium text-zinc-700 border-b">My appointments</p>
            <div>
                {doctors.slice(0, 3).map((doctor, index) => (
                    <DoctorCard key={index} doctor={doctor} />
                ))}
            </div>
        </div>
    );
}

export default Appointments;
