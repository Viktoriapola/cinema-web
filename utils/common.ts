export const minutesToHours = (minutes: number): number => {
    const hours = Math.floor(minutes / 60);
    const decimal = (minutes % 60) / 60;
    return Number.parseFloat((hours + decimal).toFixed(2));
};

export const getDate = (date: string) => {
    return date.split('T')[0] ?? '';
};

export const getTime = (date: string) => {
    const d = new Date(date);
    const hours = d.getHours().toString().padStart(2, '0');
    const minutes = d.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
};
