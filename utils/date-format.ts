import { format } from "date-fns";

export default function (date: Date, formatType: string): string {
    return format(date, formatType);
}