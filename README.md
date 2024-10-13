## Student Information

- *Name*: hawa muhumed ali
- *Class ID*: C1210070
- *Class Name*: CA211

---
Function: calculateTotalTarget
Description
The calculateTotalTarget function calculates the number of working days (excluding Fridays) between a given startDate and endDate, distributes an annual target evenly across the 12 months of the year, and returns the results in a JSON format.

Assumptions
The start and end dates provided must be in the format YYYY-MM-DD.
The total annual target is divided evenly across all 12 months.
Only non-Friday weekdays (Monday to Thursday) are considered as working days.

Limitations
The function does not handle cases where the startDate is after the endDate. The dates should be provided in chronological order.
The function assumes that all months belong to the same calendar year, meaning no adjustments are made for leap years or other edge cases (e.g., date ranges spanning multiple years).
How It Works

Date Parsing: The startDate and endDate strings are converted into JavaScript Date objects to allow date manipulation and comparison.
Working Days Calculation: The function iterates through each day between the startDate and endDate. If a day is not a Friday, it is counted as a working day and added to the corresponding month’s total.
Target Distribution: The total annual target is divided evenly across all 12 months of the year. A portion of the target is assigned only to months that have working days.
Output: The function returns a JSON object that contains:
The number of working days for each month (excluding Fridays).
The corresponding target for each month that has working days.
The total target, which is the sum of all monthly targets for the given period.

Parameters
startDate (String): The start date in YYYY-MM-DD format.
endDate (String): The end date in YYYY-MM-DD format.
totalAnnualTarget (Number): The total target for the year, which will be distributed across the months.
Returns
The function returns a JSON object with the following structure:

json

{
  "daysWorkedExcludingFridays": [Number, ...], // Array of working days per month (excluding Fridays)
  "monthlyTargets": [Number, ...], // Array of monthly targets for months with working days
  "totalTarget": Number // Sum of all the distributed monthly targets
}
Example
javascript
console.log(calculateTotalTarget('2024-01-01', '2024-03-31', 5220));
Output:

json
{
  "daysWorkedExcludingFridays": [
    22, // January
    21, // February
    21  // March
  ],
  "monthlyTargets": [
    435, // January
    435, // February
    435  // March
  ],
  "totalTarget": 1305 // Sum of monthly targets for January to March
}
