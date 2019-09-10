export function updateDate({ weekday, month, day, year }) {
    const now = new Date();
    return { weekday: now.getDay() , month: now.getMonth(), day: now.getDate(), year: now.getFullYear() }
}
