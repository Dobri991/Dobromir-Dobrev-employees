import './App.css';

function App() {

  const uniqueProjectIds = new Set();
  const recordsMap = new Map();
  const newMap = new Map();
  let employeeOverlap = []

  const calculateOverlap = (employee1, employee2, projectId) => {
    const employee1StartDate = new Date(employee1[2]);
    const employee1EndDate = employee1[3] === "NULL" ? new Date() : new Date(employee1[3]);
    const employee2StartDate = new Date(employee2[2]);
    const employee2EndDate = employee2[3] === "NULL" ? new Date() : new Date(employee2[3]);

    const overlapData =  {
      'employee1Id': employee1[0],
      'employee2Id': employee2[0],
      'projectId': projectId,
      'daysWorked': 0
    };

    /* No overlap case
      if start date of first employee is greater than
      end date of second employee
      they have not worked together */

    if (employee1StartDate > employee2EndDate) {
      employeeOverlap.push(overlapData)
      return;
    }

    if (employee1StartDate <= employee2EndDate && employee2StartDate <= employee1EndDate) {
      const startOverlap = employee1StartDate <= employee2StartDate ? employee2StartDate : employee1StartDate;
      const endOverlap = employee1EndDate <= employee2EndDate ? employee1EndDate : employee2EndDate;

      if (endOverlap >= employee2StartDate) {
        const daysWorkedTogether = endOverlap - startOverlap;
        overlapData['daysWorked'] = Math.floor(daysWorkedTogether / (1000 * 3600 * 24));
        employeeOverlap.push(overlapData);
      }
    }
  }

  const findLongestEmployeeOverlap = () => {

    newMap.forEach((value, key) => {
      calculateOverlap(value[0], value[1], key)
    })

    console.log(employeeOverlap)
  }


  

  // group projects by ID and remove any from array that are less than 2
  const reduceRecordsIfCompanyHasLessThanTwo = (compIds, employees) => {
    const minimumProjectsCounter = 1;
    let count = 1
    let countOcc = 1
    let groupEls = [];


    for (let i = 0; i < employees.length - 1; i++) { 
      let currentRecord = employees[i][1];

      // To check for last index
      // if it has to be the same etc....
      if (i + 1 === employees.length - 1) {
        if (currentRecord === employees[i + 1][1]) {
          groupEls.push(employees[i]);
        }
        if (countOcc > 1) {
          groupEls.push(employees[i]);
          newMap.set(currentRecord, groupEls);
        }
      }

      if (currentRecord === employees[i + 1][1]) {
        groupEls.push(employees[i]);
        countOcc++;
      } else if (currentRecord !== employees[i + 1][1]) {
        if (countOcc > 1) {
          groupEls.push(employees[i]);
          newMap.set(currentRecord, groupEls);
        }
        groupEls = []
        countOcc = 1;
      }
    }
    console.log(newMap)




    for (let i = 0; i < employees.length - 1; i++) {
      let currentRecord = employees[i][1];
      // Check if last indexes are different 
      // Remove if true
      if (i + 1 === employees.length - 1) {
        if (currentRecord !== employees[i + 1][1]) {
          recordsMap.delete(i + 1)
        }
        if (!uniqueProjectIds.has(currentRecord)) {
          uniqueProjectIds.add(currentRecord)
        }
      }

      /* Check current record with next
        If counted less than 1 remove else proceed */

      if (currentRecord !== employees[i + 1][1]) {
        if (count <= minimumProjectsCounter) {
          recordsMap.delete(i);
        }
        // newMap.set(i, tempArr)
        count = 1;
      } else {
        if (!uniqueProjectIds.has(currentRecord)) {
          uniqueProjectIds.add(currentRecord)
        }

        // if new map already has this  record, 
        // add it to the same value

        // tempArr.push(currentRecord)
        count++;
      }
    }
    // console.log(uniqueProjectIds)
    // console.log(newMap)
    // console.log(recordsMap);
    findLongestEmployeeOverlap()
  }

  const handleEmployeeData = (employeeData) => {

    let records = []

    employeeData.forEach((el) => {
      // let employeeRecord = el.split(',');
      records.push(el.split(','));
    })

    // Sort all records from lowest ascending company ID
    records.sort((a, b) => {
      return a[1] - b[1]
    });

    // Add records in map 
    records.forEach((element, i) => {
      recordsMap.set(i, element)
    })

    reduceRecordsIfCompanyHasLessThanTwo(uniqueProjectIds, records)
  }




  const handleSelectedFile = () => {
    const reader = new FileReader()
    const [file] = document.querySelector("input[type=file]").files;
    let data = []

    reader.addEventListener(
      "load",
      () => {
        data = reader.result.replaceAll(' ', '').replace(/[\r]/gm, '').split('\n');
        handleEmployeeData(data);
      },
      false,
    );

    if (file) {
      reader.readAsBinaryString(file);
    }
  }


  return (
    <div className="App">
      <label>Choose a profile picture:</label>

      <input id="csv" type="file" accept=".csv" onChange={handleSelectedFile} />
      <button type="button" id="btn">Process</button>
    </div>
  );
}

export default App;
