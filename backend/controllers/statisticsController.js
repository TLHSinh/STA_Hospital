import LichHen from '../models/LichHenSchema.js';
import ThuocVatTu from '../models/ThuocVatTuSchema.js';
import BenhNhan from '../models/BenhNhanSchema.js';
import BacSi from '../models/BacSiSchema.js';

export const getDashboardStats = async (req, res) => {
    try {
      console.log('Bắt đầu lấy dữ liệu thống kê');
      const appointmentsCount = await LichHen.countDocuments();
      console.log('Số lượng lịch hẹn:', appointmentsCount);

      const medicinesCount = await ThuocVatTu.countDocuments();
      console.log('Số lượng thuốc/vật tư:', medicinesCount);

      const customersCount = await BenhNhan.countDocuments();
      console.log('Số lượng bệnh nhân:', customersCount);

      const doctorsCount = await BacSi.countDocuments();
      console.log('Số lượng bác sĩ:', doctorsCount);

      res.status(200).json({
        LichHen: appointmentsCount,
        ThuocVatTu: medicinesCount,
        BenhNhan: customersCount,
        BacSi: doctorsCount,
      });
    } catch (error) {
      console.error('Lỗi khi lấy thống kê:', error.message);
      res.status(500).json({ message: 'Không thể lấy dữ liệu thống kê.', error: error.message });
    }
};
