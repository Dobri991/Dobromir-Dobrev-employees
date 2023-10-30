import React, { useState } from 'react';
import EmployeeTable from './components/EmployeeTable';
import InputCsv from './components/InputCsv';

export default function App() {
  const [displayOverlapTable, handleDisplayOverlapTable] = useState('');

  const handleOnChange = (data) => {
    handleDisplayOverlapTable(data);
  }

  return (
    <div className="App">
      <InputCsv handleOnChange={handleOnChange} />
      {displayOverlapTable ? <EmployeeTable employeeData={displayOverlapTable} /> : ''}
    </div>
  );
}