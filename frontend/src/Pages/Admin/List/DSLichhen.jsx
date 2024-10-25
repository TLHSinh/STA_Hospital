import {Calendar, dayjsLocalizer} from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import dayjs from "dayjs";
import { useNavigate  } from "react-router-dom";
import './DanhSach.css';
import { Fab } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import 'dayjs/locale/vi';

dayjs.locale("vi");
const Appointment = () => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/admin/themlichhen');
  };
  const localizer = dayjsLocalizer(dayjs);
  return (
    <div 
    style={{
      height:'85vh',
      width:'100%',
    }}
    >
       <Calendar localizer={localizer}
    />
    <div 
    // style={{ position: 'relative' }}
    >
      <Fab
        onClick={handleClick}
        sx={{
          backgroundColor: '#66B5A3',
          '&:hover': { backgroundColor: '#97c9bc' },
          position: 'fixed',
          bottom: 50,
          right: 50,
          animation: 'animate 2s linear infinite',
        }}
        aria-label="add"
      >
        <AddIcon color='white' />
      </Fab>
    </div>
    </div>
    
  )
}

export default Appointment