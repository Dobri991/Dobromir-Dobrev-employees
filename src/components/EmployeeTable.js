import { processProjectGroups } from '../util/Utils';

function EmployeeTable() {

    const groupedOverlapResults = processProjectGroups;
    console.log(groupedOverlapResults);

    return (
        <div class="container text-center">
            <div class="row align-items-start">
                <div class="col">
                    One of three columns
                </div>
                <div class="col">
                    One of three columns
                </div>
                <div class="col">
                    One of three columns
                </div>
            </div>
        </div>
    )
}



export default EmployeeTable;