import { isWithinInterval } from "date-fns";

type DateType = string | number | Date

export default function (year: number, month: number, day: number, range: DateType[]): boolean {
    const date = new Date(year, month, day, 3);
    return isWithinInterval(date, { start: range[0], end: range[1] });
}
  