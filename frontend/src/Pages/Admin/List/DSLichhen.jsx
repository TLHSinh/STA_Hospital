import {Calendar, dayjsLocalizer} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from "dayjs";
import './DanhSach.css';
import 'dayjs/locale/vi';

dayjs.locale("vi");
const Appointment = () => {
  const localizer = dayjsLocalizer(dayjs);
  return (
    <div 
    style={{
      height:'95vh',
      width:'100%',
    }}
    >
       <Calendar localizer={localizer}
    />
    </div>
    
  )
}

export default Appointment