import React from 'react';
import { Form } from 'react-bootstrap';

interface DateSelectProps {
  name: string;
  onChange: (date: Date) => void;
}

const DateSelect: React.FC<DateSelectProps> = ({ onChange }) => {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - i);

  const handleDayChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const day = parseInt(e.target.value);
    // You can construct the date object here using the selected day, month, and year
    const date = new Date(years[0], months[0] - 1, day);
    onChange(date);
  };

  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const month = parseInt(e.target.value);
    // You can construct the date object here using the selected day, month, and year
    const date = new Date(years[0], month - 1, days[0]);
    onChange(date);
  };

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const year = parseInt(e.target.value);
    // You can construct the date object here using the selected day, month, and year
    const date = new Date(year, months[0] - 1, days[0]);
    onChange(date);
  };

  return (
    <div>
      <Form.Select onChange={handleDayChange}>
        {days.map((day) => (
          <option key={day} value={day}>
            {day}
          </option>
        ))}
      </Form.Select>
      <Form.Select onChange={handleMonthChange}>
        {months.map((month) => (
          <option key={month} value={month}>
            {month}
          </option>
        ))}
      </Form.Select>
      <Form.Select onChange={handleYearChange}>
        {years.map((year) => (
          <option key={year} value={year}>
            {year}
          </option>
        ))}
      </Form.Select>
    </div>
  );
};

export default DateSelect;