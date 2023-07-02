//function to create employee record
function createEmployeeRecord([firstname,familyname,title,payPerHour]){
    return {
        firstname,
        familyname,
        title,
        payPerHour,
        timeInEvents:[],
        timeOutEvents:[]
    }
}

//function to create multiple employee records
function createEmployeeRecords(arrayOfArrays){
    return arrayOfArrays.map(createEmployeeRecord)
}

//function to create time in event for an employee
function createTimeInEvent(employeeRecord,dateStamp){
    const [date, hour] = dateStamp.split(' ');
  employeeRecord.timeInEvents.push({
    type: "TimeIn",
    hour: parseInt(hour, 10),
    date,
  });
  return employeeRecord;

}
//function to create time out event.
function createTimeOutEvent(employeeRecord,dateStamp){
    const [date,hour]=dateStamp.split(' ')
    employeeRecord.timeOutEvents.push({
        type:"TimeOut",
        hour:parseInt(hour, 10),
        date,
    })
    return employeeRecord
}

//function to calculate hours worked on a single day by a single employee
function hoursWorkedOnDate(employeeRecord, date) {
    const timeInEvent = employeeRecord.timeInEvents.find(event => event.date === date);
    const timeOutEvent = employeeRecord.timeOutEvents.find(event => event.date === date);
    return (timeOutEvent.hour - timeInEvent.hour) / 100;
}
//function to calculate wages earned on a single Date
function wagesEarnedOnDate(employeeRecord, date){
    const hoursWorked=hoursWorkedOnDate
    return hoursWorked*employeeRecord.payPerHour

}
//function that calculates pay owed for all dates for an employee
function allWagesFor(employeeRecord) {
    const datesWorked = employeeRecord.timeInEvents.map(event => event.date);
    const totalWages = datesWorked.reduce((total, date) => total + wagesEarnedOnDate(employeeRecord, date), 0);
    return totalWages;
  }

  //function to calculate the payroll
  function calculatePayroll(employeeRecords){
    return employeeRecords.reduce((totalPay, employeeRecord) => totalPay + allWagesFor(employeeRecord), 0)
  }