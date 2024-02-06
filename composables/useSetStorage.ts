import localforage from "localforage";

interface IDayState {
    isHoliday: boolean;
    plan?: number;
    fact?: number;
}

export const useSetStorage = async (key: string, data: any): Promise<void> => {
    if (data) {
        await localforage.setItem(key, JSON.stringify(data));
    }
}