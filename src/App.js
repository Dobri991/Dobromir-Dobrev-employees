import React, { useState } from 'react';
import EmployeeTable from './components/EmployeeTable';
import { handleSelectedFile } from './utils/utils';

export default function App() {
  const [displayOverlapTable, handleDisplayOverlapTable] = useState('');

  const handleUploadFile = () => {
    handleSelectedFile(handleDisplayOverlapTable)
  }

  return (
    <div className="App">
      <label className="form-label">Choose CSV File:</label>
      <input id="csv" type="file" accept=".csv" onChange={handleUploadFile} />

      {displayOverlapTable ? <EmployeeTable employeeData={displayOverlapTable} /> : ''}
    </div>
  );
}