/* // nâng cao hơn
import BenhNhan from '../models/BenhNhanSchema.js'
import BacSi from '../models/BacSiSchema.js'
import LichHen from '../models/LichHenSchema.js'
import Stripe from 'stripe'


export const getCheckoutSession = async(req, res)=>{
    try {


        //get currently booked doctor

        const doctor = await BacSi.findById(req.params.doctorId)
        const user= await BenhNhan.findById(req.userId)

        const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

        //Create stripe checkout session
        const session =await stripe.checkout.sessions.create({
            payment_method_types:['card'],
            mode:'payment',
            success_url:`${process.env.CLIENT_SITE_URL}/checkout-success`,
            cancel_url:`${req.protocol}://${req.get('host')}/doctors/${doctor.id}`,
            customer_email:user.email,
            client_reference_id:req.params.doctorId,
            line_items:[
                {
                    price_data:{
                        currency:'bdt',
                        unit_amount: doctor.giaKham *100,
                        product_data:{
                            name:doctor.ten,
                            description: doctor.gioiThieuNgan,
                            image:[doctor.hinhAnh]
                        }
                    },
                    quantity:1
                }
            ]
        })
        



        //create new booking
        const booking= new LichHen({
            doctor: doctor._id,
            user:user._id,
            ticketPrice:doctor.giaKham,
            session:session.id
        })

        await booking.save()

        res.status(200).json({success:true, message:'thanh toan thanh cong',session})

    } catch (err) {
        res.status(500).json({success:false, message:"thanh toan khong thanh cong"})
    }
} */


import BenhNhan from '../models/BenhNhanSchema.js';
import BacSi from '../models/BacSiSchema.js';
import LichHen from '../models/LichHenSchema.js';

export const booking = async (req, res) => {
    const { lichLamViecId, benhNhan, gia } = req.body;

    try {
        // Kiểm tra xem bác sĩ có lịch làm việc này không
        const doctor = await BacSi.findOne({ "lichLamViec._id": lichLamViecId });
        if (!doctor) {
            return res.status(404).json({ message: "Không tìm thấy lịch làm việc" });
        }

        // Tìm lịch làm việc dựa trên ID trong danh sách lịch làm việc của bác sĩ
        const lichLamViec = doctor.lichLamViec.find((slot) => slot._id.toString() === lichLamViecId);
        
        // Kiểm tra xem lịch làm việc đã được đặt chưa
        if (lichLamViec.daDuocDat) {
            return res.status(400).json({ message: "Khung giờ này đã có người đặt. Vui lòng chọn khung giờ khác." });
        }

        // Kiểm tra xem bệnh nhân có tồn tại không
        const patient = await BenhNhan.findById(benhNhan);
        if (!patient) {
            return res.status(404).json({ message: "Không tìm thấy bệnh nhân" });
        }

        // Tạo lịch hẹn mới
        const newBooking = new LichHen({
            bacSi: doctor._id,
            benhNhan,
            ngayHen: lichLamViec.ngay, // Sử dụng ngày làm việc
            thoiGianBatDau: lichLamViec.batDau, // Sử dụng giờ bắt đầu
            thoiGianKetThuc: lichLamViec.ketThuc, // Sử dụng giờ kết thúc
            gia,
            trangThai: 'choDuyet', // Mặc định là chờ duyệt
            daThanhToan: false, // Mặc định là chưa thanh toán
        });

        // Lưu lịch hẹn vào cơ sở dữ liệu
        await newBooking.save();

        // Cập nhật lịch hẹn cho bác sĩ và bệnh nhân
        doctor.lichHen.push(newBooking._id);
        patient.lichHen.push(newBooking._id);

        // Đánh dấu lịch làm việc đã được đặt
        doctor.lichLamViec = doctor.lichLamViec.map((slot) => {
            if (slot._id.toString() === lichLamViecId) {
                return { ...slot, daDuocDat: true };
            }
            return slot;
        });

        await doctor.save();
        await patient.save();

        res.status(200).json({ success: true, message: "Đặt lịch hẹn thành công", booking: newBooking });
    } catch (err) {
        res.status(500).json({ success: false, message: "Mất kết nối server" });
    }
};


export const updateBookingStatus = async (req, res) => {
    const { trangThai } = req.body;
    const id = req.params.id;
    const bookingId=id 

    try {
        // Tìm lịch hẹn
        const booking = await LichHen.findById(bookingId).populate('bacSi');
        if (!booking) {
            return res.status(404).json({ message: "Không tìm thấy lịch hẹn" });
        }

        // Kiểm tra xem trạng thái có phải là "huy" và cập nhật lịch làm việc của bác sĩ
        if (trangThai === "huy") {
            // Tìm bác sĩ có chứa lịch làm việc liên quan
            const doctor = await BacSi.findById(booking.bacSi);
            if (doctor) {
                // Cập nhật trạng thái lịch làm việc của bác sĩ thành chưa được đặt (daDuocDat = false)
                doctor.lichLamViec = doctor.lichLamViec.map((slot) => {
                    if (
                        slot.ngay.toISOString().split('T')[0] === booking.ngayHen.toISOString().split('T')[0] &&
                        slot.batDau === booking.thoiGianBatDau &&
                        slot.ketThuc === booking.thoiGianKetThuc
                    ) {
                        return { ...slot, daDuocDat: false };
                    }
                    return slot;
                });

                await doctor.save();
            }
        }

        // Cập nhật trạng thái lịch hẹn
        booking.trangThai = trangThai;
        await booking.save();

        res.status(200).json({ success: true, message: "Cập nhật trạng thái lịch hẹn thành công", booking });
    } catch (err) {
        res.status(500).json({ success: false, message: "Mất kết nối server" });
    }
};

export const getAllBookings = async (req, res) => {
    try {
        console.log('Getting all bookings');
        // Tìm tất cả lịch hẹn, bao gồm cả trạng thái đã duyệt, chưa duyệt, và huỷ
        const bookings = await LichHen.find()
            .populate('bacSi', 'ten email soDienThoai') // Lấy thông tin cơ bản của bác sĩ
            .populate('benhNhan', 'ten email soDienThoai'); // Lấy thông tin cơ bản của bệnh nhân

        console.log('Bookings retrieved:', bookings);
        // Trả về danh sách lịch hẹn
        res.status(200).json({ success: true, bookings });
    } catch (err) {
        console.error('Error getting all bookings:', err);
        res.status(500).json({ success: false, message: 'Mất kết nối server' });
    }
};

export const getBookingById = async (req, res) => {
    const { id } = req.params;
    try {
        console.log(`Getting booking by ID: ${id}`);
        // Tìm lịch hẹn theo ID
        const booking = await LichHen.findById(id)
            .populate('bacSi', 'ten email soDienThoai') // Lấy thông tin cơ bản của bác sĩ
            .populate('benhNhan', 'ten email soDienThoai'); // Lấy thông tin cơ bản của bệnh nhân

        if (!booking) {
            console.warn(`Booking not found for ID: ${id}`);
            return res.status(404).json({ success: false, message: 'Không tìm thấy lịch hẹn' });
        }

        console.log('Booking retrieved:', booking);
        // Trả về thông tin lịch hẹn
        res.status(200).json({ success: true, booking });
    } catch (err) {
        console.error(`Error getting booking by ID: ${id}`, err);
        res.status(500).json({ success: false, message: 'Mất kết nối server' });
    }
};

export const deleteBookingById = async (req, res) => {
    const { id } = req.params;
    try {
        console.log(`Deleting booking by ID: ${id}`);
        // Xóa lịch hẹn theo ID
        const booking = await LichHen.findByIdAndDelete(id);

        if (!booking) {
            console.warn(`Booking not found for deletion with ID: ${id}`);
            return res.status(404).json({ success: false, message: 'Không tìm thấy lịch hẹn' });
        }

        console.log(`Booking deleted successfully for ID: ${id}`);
        // Trả về thông báo xóa thành công
        res.status(200).json({ success: true, message: 'Xóa lịch hẹn thành công' });
    } catch (err) {
        console.error(`Error deleting booking by ID: ${id}`, err);
        res.status(500).json({ success: false, message: 'Mất kết nối server' });
    }
};




