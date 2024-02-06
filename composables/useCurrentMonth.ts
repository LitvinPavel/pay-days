export const useCurrentMonth = (): { year: number, month: number } => {
    const year = new Date().getFullYear();
    const month = new Date().getMonth();
    return { year, month: 0 }
}