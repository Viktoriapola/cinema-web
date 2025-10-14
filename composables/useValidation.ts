export function useValidation() {
    const isValidLength = (value: string, minLength: number): boolean => {
        return value.length >= minLength
    };

    const isExistNumber = (value: string): boolean => {
        return /\d/.test(value);
    };

    const isExistCapitalLetter = (value: string): boolean => {
        return /[A-Z\u0410-\u042F]/.test(value);
    };

    return {
        isValidLength,
        isExistNumber,
        isExistCapitalLetter
    };
}
