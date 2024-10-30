// DoctorHome.jsx
import React from 'react';

const DoctorHome = () => {
  return (
    <div>
      <h1>Welcome, Dr. [Doctor's Name]</h1>
      <section>
        <h2>Quick Stats</h2>
        <ul>
          <li>Patients Waiting: 5</li>
          <li>Appointments Today: 3</li>
          <li>Prescriptions Written: 10</li>
        </ul>
      </section>
      
      <section>
        <h2>Upcoming Schedule</h2>
        <ul>
          <li>10:00 AM - Patient A</li>
          <li>11:00 AM - Patient B</li>
          <li>02:00 PM - Patient C</li>
        </ul>
      </section>
    </div>
  );
};

export default DoctorHome;
