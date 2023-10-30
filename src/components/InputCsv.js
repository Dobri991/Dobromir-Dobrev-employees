import React from 'react';
import { handleSelectedFile } from '../utils/utils';

export default function InputCsv({ handleOnChange }) {
    const handleUploadFile = () => {
        handleSelectedFile(handleOnChange);
    }

    return (
        <>
            <label className="form-label">Choose CSV File:</label>
            <input id="csv" type="file" accept=".csv" onChange={handleUploadFile} />
        </>
    )
}