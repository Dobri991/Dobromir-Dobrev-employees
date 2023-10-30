let employeeOverlap = []

const calculateOverlap = (employee1, employee2, projectId) => {
    const employee1StartDate = new Date(employee1[2]);
    const employee1EndDate = employee1[3] === "NULL" ? new Date() : new Date(employee1[3]);
    const employee2StartDate = new Date(employee2[2]);
    const employee2EndDate = employee2[3] === "NULL" ? new Date() : new Date(employee2[3]);

    const overlapData = {
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
        employeeOverlap.push(overlapData);
        return;
    }

    if (employee1StartDate <= employee2EndDate && employee2StartDate <= employee1EndDate) {
        // find start & finish overlap dates
        const startOverlap = employee1StartDate <= employee2StartDate ? employee2StartDate : employee1StartDate;
        const endOverlap = employee1EndDate <= employee2EndDate ? employee1EndDate : employee2EndDate;

        if (endOverlap >= employee2StartDate) {
            // find period worked together & transform to days (1000 * 3600 * 24) || (1000 * 60 * 60 * 24)
            const daysWorkedTogether = endOverlap - startOverlap;
            overlapData['daysWorked'] = Math.ceil(daysWorkedTogether / (1000 * 3600 * 24));
            employeeOverlap.push(overlapData);
        }
    }
}

export const processProjectGroups = (groupedProjectsMap) => {
    groupedProjectsMap.forEach((value, key) => {
        calculateOverlap(value[0], value[1], key)
    })

    const highestOverlap = employeeOverlap.reduce((prev, current) => (prev && prev.daysWorked > current.daysWorked) ? prev : current);
    return highestOverlap;
}

/* Group data by project ID 
    Ignore any instances occuring less than 2 times */
const groupProjects = (records) => {
    const groupedProjectsMap = new Map();
    const minimumProjectsCount = 1;
    let count = 1;
    let projectsWithSameId = [];

    for (let i = 0; i < records.length - 1; i++) {
        let currentRecord = records[i];
        let currentProjectId = records[i][1];

        // check if last 2 elements in array are the same
        // if yes, add to group
        if (i + 1 === records.length - 1) {
            if (currentProjectId === records[i + 1][1]) {
                projectsWithSameId.push(currentRecord);
                groupedProjectsMap.set(currentProjectId, projectsWithSameId);
            }
        }
        /* check project id's
        if same add to array
        else check if element is greater than set minimum, if so: 
        add the last identical project ID to array & group entire array into single Map key/value */
        if (currentProjectId === records[i + 1][1]) {
            projectsWithSameId.push(currentRecord);
            count++;
        } else if (currentProjectId !== records[i + 1][1]) {
            if (count > minimumProjectsCount) {
                projectsWithSameId.push(currentRecord);
                // set Map with project ID + array of all employees who have worked on this project
                groupedProjectsMap.set(currentProjectId, projectsWithSameId);
            }
            projectsWithSameId = [];
            count = 1;
        }
    }

    return processProjectGroups(groupedProjectsMap)
}

export const readEmployeeDataFromCsv = (employeeData) => {
    const recordsMap = new Map();
    const records = [];

    // Get all records from csv file
    employeeData.forEach((el) => {
        records.push(el.split(','));
    })

    // Sort all records from lowest ascending company ID
    records.sort((a, b) => {
        return a[1] - b[1];
    });

    // Add records in records Map 
    records.forEach((element, i) => {
        recordsMap.set(i, element);
    })

    return groupProjects(records);
}

export const handleSelectedFile = (cb) => {
    const reader = new FileReader()
    const [file] = document.querySelector("input[type=file]").files;
    let data = [];
    let finalOverlap = {};

    reader.addEventListener(
      "load",
      () => {
        data = reader.result.replaceAll(' ', '').replace(/[\r]/gm, '').split('\n');
        finalOverlap = readEmployeeDataFromCsv(data);
      },
      false,
    );
    // callback to change state & pass data to table
    reader.addEventListener("loadend", () => {
        cb(finalOverlap)
    });

    if (file) {
      reader.readAsBinaryString(file);
    }
  }