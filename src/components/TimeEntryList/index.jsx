import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { deleteTimeEntry, updateTimeEntry } from '../../store/timeTrackingSlice'

const TimeEntryList = () => {
  const timeEntries = useSelector(state => state.timeTracking.timeEntries);
  const dispatch = useDispatch();

  const handleDelete = (id) => {
    dispatch(deleteTimeEntry(id));
  };

  const handleUpdate = (id) => {
    const newEntry = prompt('Введите новые данные (формат: category, hours, date)', '');
    const [category, hours, date] = newEntry.split(',');
    dispatch(updateTimeEntry({ id, newEntry: { category, hours: Number(hours), date } }));
  };

  return (
    <div>
      <h2>Task List</h2>
      <ul>
        {timeEntries.map(entry => (
          <li key={entry.id}>
            {entry.category} - {entry.hours} Hours {entry.date}
            <button onClick={() => handleUpdate(entry.id)}>Edit</button>
            <button onClick={() => handleDelete(entry.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TimeEntryList;
