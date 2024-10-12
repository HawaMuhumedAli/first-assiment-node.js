function calculateTotalTarget(startDate, endDate, totalAnnualTarget) {
    // Helper function to check if a date is a Friday
    const isFriday = (date) => date.getDay() === 5;

    // Helper function to check if a date is a weekend
    const isWeekend = (date) => date.getDay() === 0 || date.getDay() === 6;

    // Helper function to get the number of days in a month
    const daysInMonth = (year, month) => new Date(year, month + 1, 0).getDate();

    // Helper function to generate dates from the start of the month to the end of the month
    const getDaysOfMonth = (year, month, startDate, endDate) => {
        const days = [];
        const start = new Date(year, month, 1);
        const end = new Date(year, month, daysInMonth(year, month));

        for (let date = start; date <= end; date.setDate(date.getDate() + 1)) {
            if (date >= startDate && date <= endDate && !isFriday(date) && !isWeekend(date)) {
                days.push(new Date(date));

            }
        }

        return days;
    };

    // Parse input dates
    const start = new Date(startDate);
    const end = new Date(endDate);

    // Arrays to store the results
    const daysExcludingFridays = [];
    const daysWorkedExcludingFridays = [];
    const monthlyTargets = [];

    // Track the total working days (excluding Fridays)
    let totalWorkingDays = 0;

    // Start iterating from the start month to the end month
    let currentDate = new Date(start.getFullYear(), start.getMonth(), 1);

    while (currentDate <= end) {
        const currentMonth = currentDate.getMonth();
        const currentYear = currentDate.getFullYear();

        // Calculate the full range of days in the current month
        const allWorkingDays = getDaysOfMonth(currentYear, currentMonth, new Date(currentYear, currentMonth, 1), new Date(currentYear, currentMonth, daysInMonth(currentYear, currentMonth)));
        const actualWorkingDays = getDaysOfMonth(currentYear, currentMonth, start, end);

        // Calculate the number of valid working days excluding Fridays
        daysExcludingFridays.push(allWorkingDays.length);
        daysWorkedExcludingFridays.push(actualWorkingDays.length);

        // Accumulate total working days for the range
        totalWorkingDays += actualWorkingDays.length;

        // Move to the next month
        currentDate.setMonth(currentDate.getMonth() + 1);
        currentDate.setDate(1); // Ensure the date is the first of the next month
    }

    // Calculate the monthly target proportionally based on the total working days
    daysWorkedExcludingFridays.forEach((days) => {
        const proportion = days / totalWorkingDays;
        monthlyTargets.push(proportion * totalAnnualTarget);
    });

    // Calculate the total target based on worked days
    const totalTarget = monthlyTargets.reduce((acc, val) => acc + val, 0);

    // Return the result object
    return {
        daysExcludingFridays,
        daysWorkedExcludingFridays,
        monthlyTargets,
        totalTarget,
    };
}

// Example usage
const result = calculateTotalTarget('2024-01-01', '2024-02-31', 390);
console.log(result);
