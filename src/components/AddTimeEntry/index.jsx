import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addTimeEntry } from '../../store/timeTrackingSlice';
import { v4 as uuidv4 } from 'uuid';

const AddTimeEntry = () => {
  const [category, setCategory] = useState('');
  const [hours, setHours] = useState('');
  const [date, setDate] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (category && hours && date) {
      dispatch(addTimeEntry({ id: uuidv4(), category, hours: Number(hours), date }));
      setCategory('');
      setHours('');
      setDate('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Categories:</label>
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select</option>
          <option value="Learning">Learning</option>
          <option value="Work">Work</option>
          <option value="Private">Private</option>
         
        </select>
      </div>
      <div>
        <label>Time: </label>
        <input type="number" value={hours} onChange={(e) => setHours(e.target.value)} />
      </div>
      <div>
        <label>Date: </label>
        <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      <button type="submit">Add</button>
    </form>
  );
};

export default AddTimeEntry;
