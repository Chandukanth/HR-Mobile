export const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};

export const getCurrentMonthStartDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // Months are zero-based, so we add 1

    // Get the first day of the current month
    const firstDay = new Date(year, month - 1, 1);
    const formattedFirstDay = formatDate(firstDay);

    // Get the last day of the next month and subtract one day to get the last day of the current month
    const lastDay = new Date(year, month, 0);
    const formattedLastDay = formatDate(lastDay);

    return formattedFirstDay;
}

export const getCurrentMonthEndDate = () => {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth() + 1; // Months are zero-based, so we add 1

    // Get the last day of the next month and subtract one day to get the last day of the current month
    const lastDay = new Date(year, month, 0);
    const formattedLastDay = formatDate(lastDay);

    return formattedLastDay;
}

export const getTime = (time) => {
    const dateObject = new Date(time);

    const timeOptions = {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true,
    };

    const formattedTime = new Intl.DateTimeFormat('en-US', timeOptions).format(dateObject);
    return formattedTime
}

export const getMonthNumber = (month) => {
    let monthNumber;

    switch (month) {
        case 'January':
            monthNumber = '01';
            break;
        case 'February':
            monthNumber = '02';
            break;
        case 'March':
            monthNumber = '03';
            break;
        case 'April':
            monthNumber = '04';
            break;
        case 'May':
            monthNumber = '05';
            break;
        case 'June':
            monthNumber = '06';
            break;
        case 'July':
            monthNumber = '07';
            break;
        case 'August':
            monthNumber = '08';
            break;
        case 'September':
            monthNumber = '09';
            break;
        case 'October':
            monthNumber = '10';
            break;
        case 'November':
            monthNumber = '11';
            break;
        case 'December':
            monthNumber = '12';
            break;
        default:
            // Handle default case if needed
            monthNumber = null;
    }

    return monthNumber;
}
