/* Your Code Here */

/**
 * 
 *Pseudocode:

Define a function createEmployeeRecord that accepts an array with [firstName, familyName, title, payPerHour].
Initialize the timeInEvents and timeOutEvents as empty arrays.
Return an object with keys:
firstName: set to the first element.
familyName: set to the second element.
title: set to the third element.
payPerHour: set to the fourth element.
timeInEvents and timeOutEvents: empty arrays.
 */
function createEmployeeRecord([firstName, familyName, title, payPerHour]){
  return {
      firstName,
      familyName,
      title,
      payPerHour,
      timeInEvents: [],
      timeOutEvents: [],
      allWagesFor: allWagesFor.bind(this)
  }
}


/**
*  createEmployeeRecords
Purpose: Convert an array of arrays into an array of employee records.

Pseudocode:

Define createEmployeeRecords which takes an array of employee arrays.
Map each array through createEmployeeRecord to convert it into an employee object.
Return the array of employee objects.

*
*/
function createEmployeeRecords(employeeData){
  return employeeData.map(createEmployeeRecord)
}


/**
* 
* createTimeInEvent
Purpose: Add a "TimeIn" event to an employee’s timeInEvents array.

Pseudocode:

Define createTimeInEvent as a method on the employee object.
Parse the date and hour from the string provided.
Add an event object with type: "TimeIn", hour, and date to timeInEvents.
Return the updated employee object.

*/
function createTimeInEvent(dateTime) {
let [date, hour] = dateTime.split(" ");
this.timeInEvents.push({ type: "TimeIn", hour: parseInt(hour), date });
return this;
}



/**
* 
* createTimeOutEvent
Purpose: Add a "TimeOut" event to an employee’s timeOutEvents array.

Pseudocode:

Define createTimeOutEvent as a method on the employee object.
Parse the date and hour.
Add an event object with type: "TimeOut", hour, and date to timeOutEvents.
Return the updated employee object.
*/
function createTimeOutEvent(dateTime) {
let [date, hour] = dateTime.split(" ");
this.timeOutEvents.push({ type: "TimeOut", hour: parseInt(hour), date });
return this;
}


/**
* 
* hoursWorkedOnDate
Purpose: Calculate hours worked on a specific date.

Pseudocode:

Find the timeIn and timeOut event objects for the given date.
Calculate hours worked by subtracting the time in from the time out.
Divide the result by 100 to get hours.
*/
function hoursWorkedOnDate(date) {
const timeIn = this.timeInEvents.find(event => event.date === date);
const timeOut = this.timeOutEvents.find(event => event.date === date);
return (timeOut.hour - timeIn.hour) / 100;
}



/**
* 
* wagesEarnedOnDate
Purpose: Calculate wages earned on a specific date.

Pseudocode:

Call hoursWorkedOnDate to get hours worked.
Multiply hours by payPerHour.
*/
function wagesEarnedOnDate(date) {
return hoursWorkedOnDate.call(this, date) * this.payPerHour;
}




/**
* 
* findEmployeeByFirstName
Purpose: Find an employee by their first name.

Pseudocode:

Use find on the array of employees to locate the one with a matching firstName.

*/
function findEmployeeByFirstName(employees, firstName) {
return employees.find(employee => employee.firstName === firstName);
}



/**
* calculatePayroll
Purpose: Sum up wages for all employees.

Pseudocode:

For each employee, call allWagesFor.
Sum up each employee’s wages.
*/
function calculatePayroll(employees) {
return employees.reduce((total, employee) => total + allWagesFor.call(employee), 0);
}








/*
We're giving you this function. Take a look at it, you might see some usage
that's new and different. That's because we're avoiding a well-known, but
sneaky bug that we'll cover in the next few lessons!

As a result, the lessons for this function will pass *and* it will be available
for you to use if you need it!
*/

const allWagesFor = function () {
  const eligibleDates = this.timeInEvents.map(function (e) {
      return e.date
  })

  const payable = eligibleDates.reduce(function (memo, d) {
      return memo + wagesEarnedOnDate.call(this, d)
  }.bind(this), 0) // <== Hm, why did we need to add bind() there? We'll discuss soon!

  return payable
}
