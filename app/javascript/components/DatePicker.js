import DatePicker from 'react-datepicker';

const WrappedDatePicker = ({ selected, onSelect, onChange }) => {
  return (
    <DatePicker selected={selected} onSelect={onSelect} onChange={onChange} />
  );
};

export default WrappedDatePicker;
