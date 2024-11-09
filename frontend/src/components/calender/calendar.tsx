import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calendar.css';
import { useState } from 'react';

interface CustomCalendarProps {
  handleDeadLineChange: (selectedDate: string) => void;
}

export default function CustomCalendar({ handleDeadLineChange }: CustomCalendarProps) {
  const [date, setDate] = useState<Date>(new Date());

  const handleDateChange = (selectedDate: Date) => {
    setDate(selectedDate);
    const formattedDate = selectedDate.toLocaleDateString();
    handleDeadLineChange(formattedDate);
  };

  return (
    <div className="calendar-container ">
      <Calendar onChange={() => handleDateChange} value={date} />
    </div>
  );
}