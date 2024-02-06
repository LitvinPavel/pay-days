import type { AsyncData } from 'nuxt/dist/app/composables/asyncData';

interface IDataItem {
    month: number;
    days: string;
}

interface IResultItem {
    first: number;
    last: number;
    lastYear?: number;
    month: number;
    work: number[];
    days: { [key: string]: IDayState }
}

interface IDayState {
    isHoliday: boolean;
    weekDay: number;
    plan?: number;
    fact?: number;
}

function strToArray(str: string) {
    return str
        .split(',')
        .map(item => Number(item.replace('+', '')))
        .filter(Boolean)
}

function formatData(dataItems: IDataItem[], year: number) {
    const data = dataItems.map((item: IDataItem) => {
        const monthIndex = item.month - 1;
        const daysInMonth = 33 - new Date(year, monthIndex, 33).getDate();
        const monthDays = Array.from({ length: daysInMonth }, (_, i) => i+1);
        const holidays = strToArray(item.days);

        let r: number[][] = [[], []];
        const workDays = monthDays.filter(f => !holidays.includes(f))
        const [first, last] = workDays.reduce((acc, val: number) => {
                const index = val <= 15 ? 0 : 1
                acc[index] = [...acc[index], val];
                return acc;
            },r
        );
        let days: { [key: string]: IDayState } = {};
        monthDays.forEach((day: number) => {
            const weekDay = new Date(year, monthIndex, Number(day)).getDay();
            days[`${day}`] = { isHoliday: holidays.includes(day), weekDay }
        })  
        
        return { month: monthIndex, first: first.length, last: last.length, work: workDays, days };
    })

    return data.map((i: IResultItem, index) => {
        const last = index === 0 ? 0 : data[index - 1].last;
        return { ...i, last, lastYear: index === 11 ? i.last : undefined };
    })
    
}

export async function useFetchCalendar(year: number): Promise<AsyncData<any, Error | null>> {
    const config = useRuntimeConfig();
    const data = await $fetch(`/${year}/calendar.json`, { baseURL: config.public.xmlApi || 'https://xmlcalendar.ru/data/ru' });
    if (!data?.months) return null;
    return formatData(data?.months, Number(year));
}