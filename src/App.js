import React from 'react';
import './App.css';
import AddTimeEntry from './components/AddTimeEntry/index';
import TimeEntryList from './components/TimeEntryList/index';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        
       <AddTimeEntry />
       <TimeEntryList />
      </header>
    </div>
  );
}

export default App;
