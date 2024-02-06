import { useSetStorage } from './useSetStorage'

interface IDayState {
    isHoliday: boolean;
    weekDay: number;
    plan?: number;
    fact?: number;
}

function strToArray(str: string) {
    return str
        .split(',')
        .map(item => Number(item))
        .filter(Boolean)
}

export async function useMonthMap(year: number, month: number) {
    const { data } = await useFetch(`/api/calendar?year=${year}`);
    const monthData = data.value && data.value instanceof Array ? strToArray(data.value[month].days) : []
    const daysInMonth = 32 - new Date(year, month, 32).getDate();
    const key = `${year}-${month}`;
    let test: { [key: string]: IDayState } = {};
    for (let day = 1; day <= daysInMonth; day++) {
        const weekDay = new Date(year, month, Number(day)).getDay();
        test[`${day}`] = { isHoliday: monthData.includes(day), weekDay }
    }
    useSetStorage(`${key}`, test);
}
  