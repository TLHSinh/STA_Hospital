// controllers/cronJobs.js
import cron from 'node-cron';
import HoaDon from '../models/HoaDonSchema.js';

// Tạo cron job để hủy các hóa đơn chưa thanh toán quá 24 giờ
export const scheduleBillCancellation = () => {
  cron.schedule('0 * * * *', async () => {
    console.log("Running scheduled task to check unpaid bills...");

    try {
      const now = new Date();
      const expiredBills = await HoaDon.find({
        trangThaiThanhToan: "chuaThanhToan",
        ngayLap: { $lte: new Date(now.getTime() - 24 * 60 * 60 * 1000) }
      });

      if (expiredBills.length > 0) {
        for (const bill of expiredBills) {
          bill.trangThaiThanhToan = "daHuy";
          await bill.save();
          console.log(`Bill with ID ${bill._id} has been canceled due to expiration.`);
        }
      } else {
        console.log("No expired bills found.");
      }
    } catch (error) {
      console.error("Error while checking and canceling unpaid bills:", error);
    }
  });
};
