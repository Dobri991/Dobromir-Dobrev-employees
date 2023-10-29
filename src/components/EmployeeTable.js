import React from 'react';

export default function EmployeeTable(props) {
    return (
        <table className="table table-dark table-hover">
            <thead>
                <tr>
                    <th scope="col">Employee ID #1</th>
                    <th scope="col">Employee ID #2</th>
                    <th scope="col">Project ID</th>
                    <th scope="col">Days Worked</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{props.employeeData.employee1Id}</td>
                    <td>{props.employeeData.employee2Id}</td>
                    <td>{props.employeeData.projectId}</td>
                    <td>{props.employeeData.daysWorked}</td>
                </tr>
            </tbody>
        </table>
    )
}