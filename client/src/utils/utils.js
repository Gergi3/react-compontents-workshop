export function getDate(stringDate) {
    const date = new Date(stringDate )
    const year = date.getFullYear();
    const day = date.getDate();
    const month = months[date.getMonth()];

    return `${month} ${day}, ${year}`;
}

const months = {
    0: 'January',
    1: 'February',
    2: 'March',
    3: 'April',
    4: 'May',
    5: 'June',
    6: 'July',
    7: 'August',
    8: 'September',
    9: 'October',
    10: 'November',
    11: 'December'
}