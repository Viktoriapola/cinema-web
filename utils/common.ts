export const minutesToHours = (minutes: number): number => {
    const hours = Math.floor(minutes / 60);
    const decimal = (minutes % 60) / 60;
    return Number.parseFloat((hours + decimal).toFixed(2));
};

export const getDate = (date: string) => {
    return date.split('T')[0] ?? '';
};

export const getTime = (date: string) => {
    const time = date.split('T')[1];
    if (!time) return '';
    return time.slice(0, 5);
};
