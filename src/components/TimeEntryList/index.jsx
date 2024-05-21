    import React, { useState, useEffect} from 'react';
    import { useSelector, useDispatch } from 'react-redux';
    import { deleteTimeEntry, updateTimeEntry, addTimeEntry } from '../../store/timeTrackingSlice';

    const TimeEntryList = () => {
    const timeEntries = useSelector(state => state.timeTracking.timeEntries);
    const dispatch = useDispatch();
    const [editedEntry, setEditedEntry] = useState({ id: null, category: '', hours: '', date: '' });

    const handleDelete = (id) => {
        dispatch(deleteTimeEntry(id));
    };

    const handleEdit = (entry) => {
        setEditedEntry({ id: entry.id, category: entry.category, hours: entry.hours, date: entry.date });
    };

    const handleSave = () => {
        dispatch(updateTimeEntry(editedEntry));
        setEditedEntry({ id: null, category: '', hours: '', date: '' }); 
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setEditedEntry({ ...editedEntry, [name]: value });
    };
      const loadFromLocalStorage = () => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    if (savedTasks && savedTasks.length > 0) {
      savedTasks.forEach(task => {
        dispatch(addTimeEntry(task));
      });
    }
  };

  useEffect(() => {
    loadFromLocalStorage();
  }, []);


    return (
        <div>
        <h2>Task List</h2>
        <ul>
            {timeEntries.map(entry => (
            <li key={entry.id}>
                {entry.id !== editedEntry.id ? (
                <>
                    {entry.category} - {entry.hours} Hours {entry.date}
                    <button onClick={() => handleEdit(entry)}>Edit</button>
                    <button onClick={() => handleDelete(entry.id)}>Delete</button>
                </>
                ) : (
                <>
                        <input type="text" name="category" value={editedEntry.category} onChange={handleChange} />
                        <input type="time" name="hours" value={editedEntry.hours} onChange={handleChange} />
                        <input type="date" name="date" value={editedEntry.date} onChange={handleChange} />
                        <button onClick={handleSave}>Save</button>
                    </>
                )}
            </li>
            ))}
        </ul>
        </div>
    );
    };

    export default TimeEntryList;
