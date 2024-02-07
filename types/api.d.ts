declare global {
  interface IResultItem {
    first: number;
    last: number;
    lastYear?: number;
    month: number;
    work: number[];
    days: { [key: string]: IDayState };
  }

  interface IDayState {
    isHoliday: boolean;
    weekDay: number;
    plan?: number;
    fact?: number;
  }
}
