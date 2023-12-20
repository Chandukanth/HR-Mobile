export const formatDate = (date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-indexed
    const day = String(date.getDate()).padStart(2, '0');

    return `${year}-${month}-${day}`;
};

export const getTime = (time) => {
    const dateObject = new Date(time);

    const timeOptions = {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true, // Set to true to display in AM/PM format
    };

    const formattedTime = new Intl.DateTimeFormat('en-US', timeOptions).format(dateObject);
    return formattedTime
}